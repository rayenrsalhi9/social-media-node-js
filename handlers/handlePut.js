import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'

export async function handlePut(dir, req, res) {
    const urlSplitted = req.url.split('/')
    try {
        const data = await getData(dir)
        const tweetId = urlSplitted[2]
        const actionType = urlSplitted.pop()

        data.forEach(el => {
            if (el.uuid === tweetId) {
                if (actionType === 'like') {
                    el.isLiked = !el.isLiked
                    el.likes += el.isLiked ? 1 : -1
                } else if (actionType === 'retweet') {
                    el.isRetweeted = !el.isRetweeted
                    el.retweets += el.isRetweeted ? 1 : -1
                }
            }
        })

        const matchingTweet = data.find(el => el.uuid === tweetId)

        const dataPath = path.join(dir, 'data', 'data.json')
        await fs.writeFile(dataPath, JSON.stringify(data))
        sendResponse(res, 200, JSON.stringify(matchingTweet), 'application/json')
    } catch (err) {
        console.log(err)
        sendResponse(res, 401, JSON.stringify({ error: err }), 'application/json')
    }
}