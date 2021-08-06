const baseUrl = "https://www.9txs.org"

/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
  let response = POST(`https://so.9txs.org/www`,{data:`searchkey=${encodeURI(key)}`})
  let array = []
  let $ = HTML.parse(response)
    $('ul.library > li').forEach((child) => {
      let $ = HTML.parse(child)
      array.push({
        name: $('a.bookname').text(),
        author: $('a.author').text(),
        cover: $('a.bookimg > img').attr('src'),
        detail: $('a.bookname').attr('href'),
      })
    })
  
  return JSON.stringify(array)
}

/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
  let response = GET(url)
  let $ = HTML.parse(response)
  let book = {
    summary: $('.content > p.intro').text(),
    status: $('[property=og:novel:status]').attr('content'),
    category: $('.detail > p:nth-child(3) > a:nth-child(2)').text(),
    words: $('.detail > p:nth-child(3)').text().replace(/作者：.+分类：.+字数：/,""),
    update: $('span.light').text().replace("(","").replace(")",""),
    lastChapter: $('.detail > p:nth-child(6) > a').text(),
    catalog: `${baseUrl}${$('div:nth-child(3) > div > a').attr('href')}`
  }
  return JSON.stringify(book)
}

/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
  let response = GET(url)
  let $ = HTML.parse(response)
  let array = []
    $('dl:nth-child(n+2) > dd').forEach((chapter) => {
      let $ = HTML.parse(chapter)
      array.push({
        name: $('a').text(),
        url: `${baseUrl}${$('a').attr('href')}`
      })
    })
  return JSON.stringify(array)
}

/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
  let res = GET(url)
  let response = res.replace("九桃小说 老域名(9txs.com)被墙，请您牢记本站最新域名(9txs.org)","").replace(/您可以在百度里搜索“.+九桃小说\(9txs.org\)”查找最新章节！/,"")
  let $ = HTML.parse(response)
  return $('#content')
}

var bookSource = JSON.stringify({
  name: "九桃小说",
  url: "9txs.org",
  version: 100
})
