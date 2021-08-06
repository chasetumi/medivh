const baseUrl = "https://qinxiaoshuo.com/";
const Authkey = ["Authorization:111111111111111111111111:1:1618901160:"];
/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
  let response = GET(`${baseUrl}/api/book/search/${encodeURI(key)}/1`);
  let array = [];
  let data = JSON.parse(response);
  let $ = data.Books;
  for (var p in $) {
    array.push({
      name: `${$[p]["Book_name"]}`,
      author: `${$[p]["Author_name"]}`,
      cover: `http://static.qinxiaoshuo.com:4000/bookimg/${$[p]["Book_id"]}.jpg`,
      detail: `${baseUrl}api/book/get/${$[p]["Book_name"]}`,
    });
  }
  return JSON.stringify(array);
};

/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
  let response = GET(url);
  let data = JSON.parse(response);
  let $ = data.Book;
  let book = {
    summary: `${$.Book_intro}`,
    status: `${$.Status}`,
    category: `${$.Tags}`,
    update: `${$.Last_update_time}`,
    lastChapter: `${$.Last_update_chapter_name}`,
    catalog: `${baseUrl}api/user/book/get/${$.Book_id}`,
  };
  return JSON.stringify(book);
};

/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
  let response = POST(`${url}`, {
    data: `data=None`,
    headers: Authkey,
  });
  let array = [];
  let $ = JSON.parse(response);

  $.Volumes.forEach((p) => {
    let Volume = p;
    Volume.Chapters.forEach((chapter) => {
      array.push({
        name: `${Volume.Volume_name} ${chapter.Chapter_name}`,
        url: `${baseUrl}api/book/chapter/get//${chapter.Chapter_id}`,
      });
    });
  });
  return JSON.stringify(array);
};

/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
  let array = [];
  let response = GET(url);
  let $ = JSON.parse(response);
  $.Chapter.Chapter_content.forEach((p) => {
    array.push(p);
  });
  let content = array.toLocaleString("\n");

  return content;
};

var bookSource = JSON.stringify({
  name: "亲小说",
  url: "qinxiaoshuo.com",
  version: 106,
});
