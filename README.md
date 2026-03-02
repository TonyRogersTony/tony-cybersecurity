# Tony Rogers Portfolio

## Development

1. Install dependencies:

```bash
npm install
```

2. Start the local dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Notes

- This project runs as a standalone Vite React app.
- App data interactions are handled locally in-browser via local storage in `src/api/client.js`.

## Discovery Survey via Google Apps Script (Optional)

You can save Discovery Survey responses directly to Google Drive without Vercel backend credentials.

1. Open [script.new](https://script.new) while logged into the Google account that owns the Drive folder.
2. Paste the code from [Discovery-web-app.gs](Discovery-web-app.gs) into `Code.gs` and save.
3. Deploy → **New deployment** → Type: **Web app**.
	- Execute as: **Me**
	- Who has access: **Anyone**
4. Copy the deployed Web App URL.
5. In your `.env`, set:
	- `VITE_DISCOVERY_WEBHOOK_URL=<your-web-app-url>`
6. Ensure the script has access to this folder ID:
	- `1j_G05R6pAq_EQ5Za67_QQClwAWfo-juY`

The frontend posts Discovery Survey submissions directly to `VITE_DISCOVERY_WEBHOOK_URL`.
