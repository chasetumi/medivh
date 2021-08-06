const baseUrl = "https://api.midukanshu.com"

//搜索
const search = (key) => {
  let response = POST(`${baseUrl}/fiction/search/search`,{data:`keyword=${encodeURI(key)}`})
  let array = []
  let $ = JSON.parse(response)
  $.data.forEach((child) => {
    array.push({
      name: child.title,
      author: child.author,
      cover: child.cover,
      detail: child.book_id,
    })
  })
  return JSON.stringify(array)
}

//详情
const detail = (url) => {
  let response = POST(`${baseUrl}/fiction/book/getDetail`,{data:`book_id=${url}`})
  let $ = JSON.parse(response)
  let book = {
    summary: $.data.description,
    category: $.data.category,
    words: $.data.word_count,
    update: $.data.updateStatus.replace("更新于",""),
    catalog: `https://book.midukanshu.com/book/chapter_list/100/${$.data.book_id}.txt`
  }
  return JSON.stringify(book)
}

//目录
const catalog = (url) => {
  let response = GET(url)
  let $ = JSON.parse(response)
  let array = []
  $.forEach(chapter => {
      array.push({
        name: chapter.title,
        url: `https://book.midukanshu.com/book/chapter/segment/master/${chapter.bookId}_${chapter.chapterId}.txt?md5=${chapter.content_md5}`
      })
    })
  return JSON.stringify(array)
}

//章节
const chapter = (url) => {
    let $ = JSON.parse(GET(url))
  return $.map((item)=>{ return item.content}).join("\n")
}

var bookSource = JSON.stringify({
  name: "米读小说",
  url: "midukanshu.com",
  version: 100
})
