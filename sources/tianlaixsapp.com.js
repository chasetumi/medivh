const baseUrl = "https://api.tianlaixsapp.com"

//搜索
const search = (key) => {
  let response = GET(`${baseUrl}/api/v1/novelsearch?content=${encodeURI(key)}&pageIndex=1&pageSize=20&type=2`)
  let array = []
  let $ = JSON.parse(response)
  $.data.list.forEach((child) => {
    array.push({
      name: child.name,
      author: child.author,
      cover: child.picture,
      detail: `http://statics.rungean.com/static/book/zip${child.picture.match(/cover(\/\d+\/\d+)/)[1]}.zip`,
    })
  })
  return JSON.stringify(array)
}

//详情
const detail = (url) => {
  let response = GET(url,{zip:"detail.json"})
  let $ = JSON.parse(response).data
  let book = {
    summary: $.intro,
    status: $.bookStatus,
    words: $.wordNum,
    update: $.updatedTime,
    lastChapter: $.chapterName,
    catalog: `http://statics.rungean.com/static/book/zip${$.picture.match(/cover(\/\d+\/\d+)/)[1]}.zip`
  }
  return JSON.stringify(book)
}

//目录
const catalog = (url) => {
  let response = GET(url,{zip:"chapter.json"})
  let $ = JSON.parse(response)
  let array = []
   $.data.forEach(chapter => {
      array.push({
        name: chapter.name,
        url: chapter.content_url
      })
    })
  return JSON.stringify(array)
}

//章节
const chapter = (url) => {
    let response = GET(url)
  return response.replace(/&nbsp;/g,"")
}

var bookSource = JSON.stringify({
  name: "天籁小说",
  url: "tianlaixsapp.com",
  version: 101
})
