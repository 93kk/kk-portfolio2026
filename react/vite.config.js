import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ES module equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve images from the parent directory at /images/*
const serveParentImages = {
  name: 'serve-parent-images',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith('/images/')) {
        const imgPath = path.join(__dirname, '..', req.url)
        if (fs.existsSync(imgPath)) {
          const ext = path.extname(imgPath).slice(1).toLowerCase()
          const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml' }
          res.setHeader('Content-Type', mime[ext] ?? 'application/octet-stream')
          res.end(fs.readFileSync(imgPath))
          return
        }
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), serveParentImages],
  server: { port: 4201 },
})
