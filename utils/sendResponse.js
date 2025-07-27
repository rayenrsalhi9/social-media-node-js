export function sendResponse(res, code, content, type) {
    res.statusCode = code
    res.setHeader('Content-Type', type)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
    res.end(content)
}