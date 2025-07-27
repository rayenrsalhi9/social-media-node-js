import path from "node:path";
import fs from "node:fs/promises";
import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handlePost(dir, req, res) {
    try {
        let body = ''
        for await(const chunk of req) body += chunk

        const data = await getData(dir)
        const tweetObj = JSON.parse(body)

        data.unshift(tweetObj)
        const dataPath = path.join(dir, 'data', 'data.json')
        await fs.writeFile(dataPath, JSON.stringify(data))
        sendResponse(res, 201, JSON.stringify(tweetObj), 'application/json')
    } catch(err) {
        console.log(err)
        sendResponse(res, 400, JSON.stringify({ error: err }) , 'application/json')
    }
}
