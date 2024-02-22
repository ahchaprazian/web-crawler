const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalizedPath = `${urlObj.host}${urlObj.pathname}`
    if(normalizedPath.slice(-1) === '/') {
        normalizedPath = normalizedPath.slice(0, -1)
    }

    return normalizedPath
}

function getURLsFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const elements = dom.window._document.querySelectorAll('a')

    for (const element of elements) {
        if (element.href.slice(0, 1) === '/') {
            try {
                urls.push(new URL(element.href, baseUrl).href)
            } catch (error) {
                console.log(`${error.message}: ${element.href}`)
            }
        } else {
            try {
                urls.push(new URL(element.href).href)
            } catch (error) {
                console.log(`${error.message}: ${element.href}`)
            }
        }     
    }
    return urls
}

async function crawlPage(baseUrl, currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)

    if (baseUrlObj.host !== currentUrlObj.host) {
        return pages
    }
    
    const noramlizedCurrentUrl = normalizeURL(currentUrl)
    if(pages[noramlizedCurrentUrl]) {
        pages[noramlizedCurrentUrl]++
        return pages
    }

    if(currentUrl === baseUrl) {
        pages[noramlizedCurrentUrl] = 0
    } else {
        pages[noramlizedCurrentUrl] = 1
    }

    console.log(`crawling url: ${noramlizedCurrentUrl}`)
    let html = ''

    try {
        const response = await fetch(noramlizedCurrentUrl)
        if (response.status >= 400) {
            console.log(`Http error: status code ${response.status}`)
            return pages
        }
        //console.log(await response.headers.get('content-type').text())
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Non-html response: ${contentType}`)
            return
        }
        html = await response.text()
    } catch (error) {
        console.log(`${error.message}`)
    }

    const nextUrls = getURLsFromHTML(html, baseUrl)

    for (const nextUrl of nextUrls) [
        pages = await crawlPage(baseUrl, nextUrl, pages)
    ]

    return pages
}

//getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>','https://blog.boot.dev')

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}