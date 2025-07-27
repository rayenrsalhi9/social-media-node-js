import { weather } from "../data/weather.js"

export async function handleWeather(res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * weather.length)

        res.write(
            `data: ${JSON.stringify({
                event: 'weather-updated',
                weather: weather[randomIndex]
            })}\n\n`
        )
    }, 3000)
}