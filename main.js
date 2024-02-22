const { crawlPage } = require('./crawl.js')

async function main(){
    if(process.argv.length < 3 ) {
        console.log('error: no url was provided\n')
        return
    } else if (process.argv.length > 3) {
        console.log('error: too many values entered\n')
        return
    }

    const baseUrl = process.argv[2]

    console.log(`Crawler is starting at ${baseUrl}\n`)
    const pages = await crawlPage(baseUrl, baseUrl, {})

    console.log(pages)
 }

main()