'use client';
import { useState, useEffect } from 'react';

const GENRES = ['Fiction', 'Dystopian', 'Science Fiction', 'Fantasy', 'Mystery', 'Non-Fiction', 'Self-Help'];

const EMPTY = { title: '', author: '', genre: 'Fiction', year: '', description: '', rating: '' };

function validate(form) {
  const errs = {};
  if (!form.title.trim()) errs.title = 'Title is required.';
  if (!form.author.trim()) errs.author = 'Author is required.';
  if (!form.genre) errs.genre = 'Genre is required.';
  const yr = parseInt(form.year);
  if (!form.year || isNaN(yr) || yr < 1000 || yr > new Date().getFullYear())
    errs.year = `Enter a valid year (1000–${new Date().getFullYear()}).`;
  const rt = parseFloat(form.rating);
  if (form.rating && (isNaN(rt) || rt < 0 || rt > 5))
    errs.rating = 'Rating must be between 0 and 5.';
  return errs;
}

export default function BookForm({ book, onSave, onClose, saving }) {
  const isEdit = Boolean(book);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || 'Fiction',
        year: book.year?.toString() || '',
        description: book.description || '',
        rating: book.rating?.toString() || '',
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ ...form, year: parseInt(form.year), rating: parseFloat(form.rating) || 4.0 });
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit Book' : 'Add Book'}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? '✏️ Edit Book' : '➕ Add New Book'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="form-title">Title <span>*</span></label>
              <input id="form-title" name="title" className="form-input" placeholder="e.g. The Great Gatsby"
                value={form.title} onChange={handleChange} disabled={saving} />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="form-author">Author <span>*</span></label>
              <input id="form-author" name="author" className="form-input" placeholder="e.g. F. Scott Fitzgerald"
                value={form.author} onChange={handleChange} disabled={saving} />
              {errors.author && <p className="form-error">{errors.author}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="form-genre">Genre <span>*</span></label>
                <select id="form-genre" name="genre" className="form-select"
                  value={form.genre} onChange={handleChange} disabled={saving}>
                  {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.genre && <p className="form-error">{errors.genre}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="form-year">Publication Year <span>*</span></label>
                <input id="form-year" name="year" type="number" className="form-input" placeholder="e.g. 2023"
                  value={form.year} onChange={handleChange} disabled={saving} min="1000" max={new Date().getFullYear()} />
                {errors.year && <p className="form-error">{errors.year}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="form-rating">Rating (0–5)</label>
              <input id="form-rating" name="rating" type="number" step="0.1" className="form-input"
                placeholder="e.g. 4.5" value={form.rating} onChange={handleChange}
                disabled={saving} min="0" max="5" />
              {errors.rating && <p className="form-error">{errors.rating}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="form-description">Description</label>
              <textarea id="form-description" name="description" className="form-textarea"
                placeholder="Brief description of the book..."
                value={form.description} onChange={handleChange} disabled={saving} />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" id="form-submit-btn" className="btn btn-primary" disabled={saving}>
              {saving ? '⏳ Saving...' : isEdit ? '✅ Save Changes' : '➕ Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
