const baseUrl = "https://www.babayu.com"

//搜索
const search = (key) => {
  let response = POST(`${baseUrl}/search.html`,{data:`keyword=${encodeURI(key)}`})
  let array = []
  let $ = HTML.parse(response)
  $('ul.search-list > li').forEach((child) => {
    let $ = HTML.parse(child)
    array.push({
      name: $('h3').text(),
      author: $('p.author').remove("span").text(),
      cover: $('img').attr('src'),
      detail: `${baseUrl}${$('h3 > a').attr('href')}`,
    })
  })
  return JSON.stringify(array)
}

//详情
const detail = (url) => {
  let response = GET(url)
  let $ = HTML.parse(response)
  let book = {
    catalog: `${baseUrl}${$('a.catalogbtn').attr('href')}`
  }
  return JSON.stringify(book)
}

//目录
const catalog = (url) => {
  let response = GET(url)
  let $ = HTML.parse(response)
  let array = []
    $('ul.chapter-list > li').forEach((chapter) => {
      let $ = HTML.parse(chapter)
      array.push({
        name: $('a').text(),
        url: `${baseUrl}${$('a').attr('href')}`
      })
    })
  return JSON.stringify(array)
}

//章节
const chapter = (url) => {
    let $ = HTML.parse(GET(url))
  return $('#BookText')
}

var bookSource = JSON.stringify({
  name: "巴巴鱼小说",
  url: "babayu.com",
  version: 100
})
