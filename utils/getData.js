import fs from 'node:fs/promises'
import path from 'node:path'

export async function getData(dir) {
    try {
        const dataPath = path.join(dir, 'data', 'data.json')
        const dataContent = await fs.readFile(dataPath, 'utf8')
        return JSON.parse(dataContent)
    } catch (err) {
        console.log(err)
        return []
    }
}