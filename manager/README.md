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

The manager uses one of two secure modes:

1. Set `SERPAPI_API_KEY` in the local shell before starting the manager to update `_data/scholar.json` directly.
2. Authenticate GitHub CLI with `gh auth login`; the manager then starts `update-scholar.yml` without reading the repository secret.

Never place a SerpAPI key in website source files.

## Publishing

The Publish screen stages only managed website content, creates a Git commit, and pushes the current branch. Review the listed changes before pressing **Commit and push**.
