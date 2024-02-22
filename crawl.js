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

    for (element of elements) {
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

async function crawlPage(url) {
    try {
        const response = await fetch(url)
        if (response.status >= 400) {
            console.log(`Http error: status code ${response.status}`)
            return
        }
        //console.log(await response.headers.get('content-type').text())
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Non-html response: ${contentType}`)
            return
        }
        console.log(await response.text())
    } catch (error) {
        console.log(`${error.message}`)
    }
    
}

//getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>','https://blog.boot.dev')

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}