import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handlers/handleGet.js'
import { handlePut } from './handlers/handlePut.js'
import { handlePost } from './handlers/handlePost.js'
import { handleWeather } from './handlers/handleWeather.js'

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/tweets')) {
        if (req.method === 'GET') {
            await handleGet(__dirname, req, res)
        } else if (req.method === 'PUT') {
            await handlePut(__dirname, req, res)
        } else if (req.method === 'POST') {
            await handlePost(__dirname, req, res)
        }
    } else if (req.url === '/weather') {
        await handleWeather(res)
    } else if (!req.url.startsWith('/tweets')) {
        await serveStatic(__dirname, req, res)
    }
})

server.listen(8000, () => {
    console.log('server running on port 8000')
})