# Nextgensis — Book Management

This repository is a Next.js frontend that talks to a JSON Server API for storing books.

Quick notes
- The frontend reads `NEXT_PUBLIC_API_URL` to locate the API. If unset, it falls back to `http://localhost:3001` (for local development).
- A running json-server (or any compatible API) is required for full CRUD. You already hosted json-server at: `https://react-book-shelf-management.onrender.com`.

Local development

1. Install dependencies:

```bash
npm install
```

2. Run both Next.js and json-server (the project includes a combined script):

```bash
npm run dev
```

Or run servers separately:

```bash
npm run server   # starts json-server on port 3001
npm run dev      # starts Next.js on port 3000
```

Deploying the frontend (Vercel)

1. Push this repo to GitHub.
2. Go to Vercel and import the repository.
3. In Vercel project settings > Environment Variables add:

- `NEXT_PUBLIC_API_URL` = `https://react-book-shelf-management.onrender.com`

4. Deploy. Vercel will give you the production URL (your frontend prod link).

Deploying the frontend (Render)

1. Push this repo to GitHub.
2. Create a new Web Service on Render, connect the repo and set the branch.
3. Build command: `npm run build`
4. Start command: `npm run start`
5. In Environment > Environment Variables add:

- `NEXT_PUBLIC_API_URL` = `https://react-book-shelf-management.onrender.com`

6. Deploy. Render will give you the production URL for the frontend.

Notes on persistence
- If you want full persistent CRUD you must host the json-server (or a real DB) and keep it running. You already have `https://react-book-shelf-management.onrender.com` which fulfills that role.

Troubleshooting
- If the frontend still shows "Could not connect to the API", verify `NEXT_PUBLIC_API_URL` is correctly set in your hosting provider and that the json-server service is online and returning `/books`.
