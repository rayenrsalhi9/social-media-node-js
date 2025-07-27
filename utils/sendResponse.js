export function sendResponse(res, code, content, type) {
    res.statusCode = code
    res.setHeader('Content-Type', type)
    res.end(content)
}