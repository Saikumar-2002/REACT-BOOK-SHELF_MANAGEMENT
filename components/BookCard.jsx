'use client';

function getGenreClass(genre) {
  const map = {
    'Fiction': 'fiction',
    'Dystopian': 'dystopian',
    'Science Fiction': 'scifi',
    'Fantasy': 'fantasy',
    'Mystery': 'mystery',
    'Non-Fiction': 'nonfiction',
    'Self-Help': 'selfhelp',
  };
  return map[genre] || 'default';
}

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="book-rating">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
      &nbsp;{rating.toFixed(1)}
    </span>
  );
}

export default function BookCard({ book, onEdit, onDelete }) {
  const gc = getGenreClass(book.genre);

  return (
    <article className="book-card" aria-label={`Book: ${book.title}`}>
      <div className={`book-spine spine-${gc}`} />
      <div className="book-body">
        <span className={`book-genre genre-${gc}`}>
          {book.genre}
        </span>
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">by {book.author}</p>
        <div className="book-meta">
          <span>📅 {book.year}</span>
          <Stars rating={book.rating || 4.0} />
        </div>
        {book.description && (
          <p className="book-desc">{book.description}</p>
        )}
      </div>
      <div className="book-actions">
        <button
          id={`edit-book-${book.id}`}
          className="btn btn-outline btn-sm"
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
        >
          ✏️ Edit
        </button>
        <button
          id={`delete-book-${book.id}`}
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(book)}
          aria-label={`Delete ${book.title}`}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}
