library(rvest)

url_nWebtoon = 'http://comic.naver.com/webtoon/weekdayList.nhn?week=sun'
nWebtoon = read_html(url_nWebtoon)

#html_nodes(nWebtoon, xpath = "//dt//a[@title]/@title") 이것도 가능
SunToonList = 
  nWebtoon %>% 
  html_nodes("dt") %>% 
  html_nodes("a") %>% 
  html_attr("title") %>% 
  na.exclude() %>% 
  data.frame()
names(SunToonList) = "Title"
SunToonList$Title = as.character(SunToonList$Title)
str(SunToonList)
