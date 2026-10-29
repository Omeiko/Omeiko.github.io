# Omeiko Site Manager

A local-only visual manager for the Jekyll website in the parent directory.

## Start in development mode

```bash
cd manager
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Build and run as one local service

```bash
cd manager
npm run build
npm start
```

Open `http://127.0.0.1:4174`.

## Scholar refresh

The manager uses one of three secure modes:

1. Paste a one-time SerpApi key into the Scholar screen. It is sent only to the local API process and is never saved.
2. Set `SERPAPI_API_KEY` in the local shell before starting the manager to update `_data/scholar.json` directly.
3. Authenticate GitHub CLI with `gh auth login`; the manager can then start `update-scholar.yml` without reading the repository secret.

Never place a SerpAPI key in website source files.

Formal publication metadata is maintained in `_data/publications.json`. Scholar refreshes update metrics only, so DOI, venue, author, and page information cannot be overwritten by a search result.

## Publishing

The Publish screen stages the public site, layouts, styles, data, workflows, generated CV, and manager source; it then creates a Git commit and pushes the current branch. Review the listed changes before pressing **Commit and push**.
