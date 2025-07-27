import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(dir, req, res) {

    try {

        const contentPath = path.join(
            dir, 
            'public', 
            req.url === '/' ? 'index.html' : req.url
        )

        const contentExtension = path.extname(contentPath)
        const contentType = getContentType(contentExtension)
        const content = await fs.readFile(contentPath)

        sendResponse(res, 200, content, contentType)

    } catch(err) {
        console.log(err)
    }

}