// Direct data array - no backend server needed
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    description: "A story of wealth, obsession, and the American Dream set in the Jazz Age.",
    rating: 4.2
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    description: "A powerful story of racial injustice and moral growth in the American South.",
    rating: 4.8
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    description: "A chilling vision of a totalitarian society and the fight for truth.",
    rating: 4.7
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    year: 1965,
    description: "An epic tale of politics, religion, and ecology on a desert planet.",
    rating: 4.6
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    year: 1937,
    description: "Bilbo Baggins embarks on an unexpected journey with a company of dwarves.",
    rating: 4.7
  },
  {
    id: 6,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    year: 2011,
    description: "A brief history of humankind, from ancient ancestors to the modern era.",
    rating: 4.4
  },
  {
    id: 7,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    year: 2003,
    description: "A murder in the Louvre museum leads to a trail of clues hidden in the works of Leonardo da Vinci.",
    rating: 3.9
  },
  {
    id: 8,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    description: "An easy and proven way to build good habits and break bad ones.",
    rating: 4.8
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    year: 1988,
    description: "A young shepherd's journey to find a worldly treasure leads to self-discovery.",
    rating: 4.5
  },
  {
    id: 10,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    year: 2021,
    description: "A lone astronaut must save Earth from an extinction-level threat.",
    rating: 4.9
  },
  {
    id: 11,
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Mystery",
    year: 2012,
    description: "On their fifth wedding anniversary, Nick Dunne's wife Amy suddenly disappears.",
    rating: 4
  }
];

export async function fetchBooks() {
  return Promise.resolve([...books]);
}

export async function createBook(data) {
  const newBook = {
    ...data,
    id: Math.max(...books.map(b => b.id || 0)) + 1
  };
  books.push(newBook);
  return Promise.resolve(newBook);
}

export async function updateBook(id, data) {
  const index = books.findIndex(b => b.id === parseInt(id));
  if (index === -1) throw new Error('Book not found');
  books[index] = { ...books[index], ...data, id: parseInt(id) };
  return Promise.resolve(books[index]);
}

export async function deleteBook(id) {
  const index = books.findIndex(b => b.id === parseInt(id));
  if (index === -1) throw new Error('Book not found');
  books.splice(index, 1);
  return Promise.resolve();
}
