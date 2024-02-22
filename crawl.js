function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalizedPath = `${urlObj.host}${urlObj.pathname}`
    if(normalizedPath.slice(-1) === '/') {
        normalizedPath = normalizedPath.slice(0, -1)
    }

    return normalizedPath
}

module.exports = {
    normalizeURL
}