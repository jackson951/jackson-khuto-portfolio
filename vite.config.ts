import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import contactHandler from './api/contact.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const emailEnvKeys = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_SECURE',
    'SMTP_USER',
    'SMTP_PASS',
    'CONTACT_TO',
    'CONTACT_FROM',
  ]

  for (const key of emailEnvKeys) {
    if (process.env[key] === undefined && env[key] !== undefined) {
      process.env[key] = env[key]
    }
  }

  return {
    plugins: [react(), localApiPlugin()],
  }
})

type JsonRequest = IncomingMessage & {
  body?: unknown
}

type JsonResponse = ServerResponse & {
  status: (statusCode: number) => JsonResponse
  json: (body: unknown) => void
}

const readBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')

  return rawBody ? JSON.parse(rawBody) : undefined
}

const localApiPlugin = (): Plugin => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (request: JsonRequest, response) => {
      const jsonResponse = response as JsonResponse

      jsonResponse.status = (statusCode) => {
        jsonResponse.statusCode = statusCode
        return jsonResponse
      }

      jsonResponse.json = (body) => {
        jsonResponse.setHeader('Content-Type', 'application/json')
        jsonResponse.end(JSON.stringify(body))
      }

      try {
        request.body = await readBody(request)
        await contactHandler(request, jsonResponse)
      } catch (error) {
        console.error(error)
        jsonResponse.status(500).json({ message: 'Unable to send message' })
      }
    })
  },
})
