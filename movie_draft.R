library(rvest)
library(httr)
library(XML)
movieSession = html_session("http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovActorLists.do")
submit_form(movieSession, form, movieCd = 20129370)
POST("http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovActorLists.do", 
     add_headers(
       
     ), 
     movieCd = 20129370)
#POST("http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovActorLists.do", add_headers(Host= "www.kobis.or.kr", "User-Agent"= "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv=41.0) Gecko/20100101 Firefox/41.0", Accept= "application/json, text/javascript, */*; q=0.01", "Accept-Language"= "en-GB,en;q=0.5", "Accept-Encoding"= "gzip, deflate", "Content-Type"= "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With"= "XMLHttpRequest", Referer= "http://www.kobis.or.kr/kobis/business/stat/offc/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K", "Content-Length"= 16, Cookie= "JSESSIONID=cV9gWT5Tp48s6jRG5bKxHqpKmnBGk2kNy8FtsFGGTbrJS2hLLmKy!-795071362!-588262143", Connection= "keep-alive", Pragma= "no-cache", "Cache-Control"= "no-cache"), movieCd = 20129370)
tempResult = read_html(POST("http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovActorLists.do", add_headers("Accept"= "text/text", "X-Requested-With"= "XMLHttpRequest", Referer= "http://www.kobis.or.kr/kobis/business/stat/offc/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K"), movieCd = 20129370))
tempResult
tempATag = html_nodes(tempResult, "a")
tempATag
html_nodes(tempResult, "div")
POST("http://www.kobis.or.kr/kobis/business/mast/mvie/searchMovieDtl.do", 
     add_headers(
       Host = "www.kobis.or.kr",
#                 "User-Agent" = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:41.0) Gecko/20100101 Firefox/41.0",
                 Accept = "text/plain, */*; q=0.01",
#                 "Accept-Language" = "en-GB,en;q=0.5",
                 "Accept-Encoding" = "gzip, deflate",
                 "Content-Type" = "application/x-www-form-urlencoded; charset=UTF-8",
                 "X-Requested-With" = "XMLHttpRequest",
                 Referer = "http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=",
                   "Content-Length" = 57,
#                 Cookie = "JSESSIONID=Z6zvWJ1B66dM9L0pxghnJVfCXcZvQwsVgpmWw8B13xZsZ2LTfWnL!-795071362!-588262143",
                 Connection = "keep-alive",
                 Pragma = "no-cache",
                 "Cache-Control" = "no-cache"
  ), 
  movieCd = 20129370)

#add_headers(Referer = "http://www.kobis.or.kr/kobis/business/stat/offc/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K")
add_headers(Host= "www.kobis.or.kr", "User-Agent"= "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv=41.0) Gecko/20100101 Firefox/41.0", Accept= "application/json, text/javascript, */*; q=0.01", "Accept-Language"= "en-GB,en;q=0.5", "Accept-Encoding"= "gzip, deflate", "Content-Type"= "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With"= "XMLHttpRequest", Referer= "http://www.kobis.or.kr/kobis/business/stat/offc/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K", "Content-Length"= 16, Cookie= "JSESSIONID=cV9gWT5Tp48s6jRG5bKxHqpKmnBGk2kNy8FtsFGGTbrJS2hLLmKy!-795071362!-588262143", Connection= "keep-alive", Pragma= "no-cache", "Cache-Control"= "no-cache")
add_headers(a = 1, b = 2)
add_headers(.headers = c(a = "1", b = "2"))
html_form(read_html("https://hadley.wufoo.com/forms/libraryrequire-quiz/"))

test <- google_form("1M9B8DsYNFyDjpwSK6ur_bZf8Rv_04ma3rmaaBiveoUI")
f0 <- html_form(test)[[1]]
f1 <- set_values(f0, entry.564397473 = "abc")
str(movieSession)

b2 <- "http://httpbin.org/post"
POST(b2, body = "A simple text string")
POST(b2, body = list(x = "A simple text string"))
POST(b2, body = list(y = upload_file(system.file("CITATION"))))
POST(b2, body = list(x = "A simple text string"), encode = "json")