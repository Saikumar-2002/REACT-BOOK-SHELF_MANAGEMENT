'use client';
import { useState, useMemo, useCallback } from 'react';
import { useBooks } from '@/hooks/useBooks';
import BookCard from '@/components/BookCard';
import BookForm from '@/components/BookForm';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';

let toastId = 0;

export default function HomePage() {
  const { books, loading, error, addBook, editBook, removeBook } = useBooks();

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');

  // Modal state: null | { mode: 'add' } | { mode: 'edit', book } | { mode: 'delete', book }
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Filtered books
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return books.filter((b) => {
      const matchQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      const matchG = genre === 'All' || b.genre === genre;
      return matchQ && matchG;
    });
  }, [books, query, genre]);

  // Genre counts for stats
  const genreCount = useMemo(() => {
    const map = {};
    books.forEach((b) => { map[b.genre] = (map[b.genre] || 0) + 1; });
    return map;
  }, [books]);

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      if (modal?.mode === 'add') {
        await addBook(formData);
        addToast('📚 Book added successfully!');
      } else if (modal?.mode === 'edit') {
        await editBook(modal.book.id, formData);
        addToast('✅ Book updated successfully!');
      }
      setModal(null);
    } catch (err) {
      addToast(err.message || 'Something went wrong.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await removeBook(modal.book.id);
      addToast('🗑️ Book deleted successfully!');
      setModal(null);
    } catch (err) {
      addToast(err.message || 'Failed to delete.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">BookShelf</span>
          </div>
          <div className="header-actions">
            <button
              id="add-book-btn"
              className="btn btn-primary"
              onClick={() => setModal({ mode: 'add' })}
            >
              ➕ Add Book
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="main">
        {/* Hero */}
        <div className="hero">
          <h1 className="hero-title">Your Personal Library</h1>
          <p className="hero-sub">
            Manage, discover, and organize your book collection in one place.
          </p>
        </div>

        {/* Stats bar */}
        {!loading && !error && (
          <div className="stats-bar">
            <div className="stat-chip">Total: <span>{books.length}</span></div>
            <div className="stat-chip">Showing: <span>{filtered.length}</span></div>
            {Object.entries(genreCount).slice(0, 4).map(([g, c]) => (
              <div key={g} className="stat-chip">{g}: <span>{c}</span></div>
            ))}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            padding: '1.2rem 1.5rem',
            color: '#fca5a5',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.3rem' }}>⚠️</span>
            <div>
              <strong>Could not connect to the API.</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', opacity: 0.8 }}>
                Make sure JSON Server is running: <code>npm run server</code>
              </p>
            </div>
          </div>
        )}

        {/* Search */}
        {!loading && !error && (
          <SearchBar
            query={query} setQuery={setQuery}
            genre={genre} setGenre={setGenre}
          />
        )}

        {/* Content */}
        {loading && <LoadingSpinner />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            query={query}
            genre={genre}
            onAdd={() => setModal({ mode: 'add' })}
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="books-grid">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={(b) => setModal({ mode: 'edit', book: b })}
                onDelete={(b) => setModal({ mode: 'delete', book: b })}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── ADD / EDIT MODAL ── */}
      {(modal?.mode === 'add' || modal?.mode === 'edit') && (
        <BookForm
          book={modal.mode === 'edit' ? modal.book : null}
          onSave={handleSave}
          onClose={() => !saving && setModal(null)}
          saving={saving}
        />
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {modal?.mode === 'delete' && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">🗑️ Delete Book</h2>
              <button className="modal-close" onClick={() => !saving && setModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <p className="confirm-text">
                Are you sure you want to delete{' '}
                <span className="confirm-book-name">"{modal.book.title}"</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModal(null)} disabled={saving}>
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
                onClick={handleDelete}
                disabled={saving}
              >
                {saving ? '⏳ Deleting...' : '🗑️ Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOASTS ── */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}
