'use client';

const GENRES = ['All', 'Fiction', 'Dystopian', 'Science Fiction', 'Fantasy', 'Mystery', 'Non-Fiction', 'Self-Help'];

export default function SearchBar({ query, setQuery, genre, setGenre }) {
  const hasFilters = query || (genre && genre !== 'All');

  return (
    <div className="search-section">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search books"
        />
      </div>

      <select
        id="genre-filter"
        className="filter-select"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        aria-label="Filter by genre"
      >
        {GENRES.map((g) => (
          <option key={g} value={g}>{g === 'All' ? '📚 All Genres' : g}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          className="clear-btn"
          onClick={() => { setQuery(''); setGenre('All'); }}
          aria-label="Clear filters"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}
