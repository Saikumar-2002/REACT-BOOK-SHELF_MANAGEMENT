'use client';
import { useState, useEffect, useCallback } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '@/lib/api';

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const addBook = async (data) => {
    const newBook = await createBook({ ...data, rating: parseFloat(data.rating) || 4.0 });
    setBooks((prev) => [...prev, newBook]);
    return newBook;
  };

  const editBook = async (id, data) => {
    const updated = await updateBook(id, { ...data, rating: parseFloat(data.rating) || 4.0 });
    setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  const removeBook = async (id) => {
    await deleteBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return { books, loading, error, reload: load, addBook, editBook, removeBook };
}
