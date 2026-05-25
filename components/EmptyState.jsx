export default function EmptyState({ query, genre, onAdd }) {
  const isFiltered = query || (genre && genre !== 'All');
  return (
    <div className="empty-state">
      <div className="empty-icon">{isFiltered ? '🔍' : '📚'}</div>
      <h2 className="empty-title">
        {isFiltered ? 'No books found' : 'Your library is empty'}
      </h2>
      <p className="empty-desc">
        {isFiltered
          ? `No results for "${query || genre}". Try a different search or filter.`
          : 'Get started by adding your first book to the collection.'}
      </p>
      {!isFiltered && (
        <button className="btn btn-primary" onClick={onAdd} style={{ marginTop: '0.5rem' }}>
          ➕ Add First Book
        </button>
      )}
    </div>
  );
}
