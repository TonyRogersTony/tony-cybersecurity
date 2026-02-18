import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs/promises'

const articleFileWriterPlugin = () => ({
  name: 'local-article-file-writer',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/__local/articles', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        const chunks = []
        for await (const chunk of req) {
          chunks.push(chunk)
        }

        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        const article = body?.article
        const fileName = body?.fileName

        if (!article || !fileName) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Missing article payload or fileName' }))
          return
        }

        const safeName = String(fileName)
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, '-')
          .replace(/(^-|-$)/g, '')

        if (!safeName) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid fileName' }))
          return
        }

        const articlesDir = path.resolve(process.cwd(), 'src/content/articles')
        await fs.mkdir(articlesDir, { recursive: true })

        const filePath = path.join(articlesDir, `${safeName}.json`)
        await fs.writeFile(filePath, `${JSON.stringify(article, null, 2)}\n`, 'utf8')

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: true, filePath: `src/content/articles/${safeName}.json` }))
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Failed to write article file' }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), articleFileWriterPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});