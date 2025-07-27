import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'

export async function handleGet(dir, req, res) {
    try {
        const data = await getData(dir)
        sendResponse(res, 200, JSON.stringify(data), 'application/json')
    } catch (err) {
        console.log(err)
        sendResponse(res, 401, JSON.stringify({ error: err }), 'application/json')
    }
}