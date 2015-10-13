var data=['100','101','102','103','104'];

for(var indexA = 0 ; indexA < data.length ; indexA++){
 phantom.create({'port' : freeport}, function(ph) {
  ph.createPage(function(page) {
    page.open("http://..."+ data[indexB] + "...", function(status) {
      console.log("opened site: " + data[indexB], status); 
      /*OLD*/ indexB++;
      page.evaluate(function() { //Scrape the page and return an object
      },function(result){
        console.log(result.dataRequest); //Here is the problem
      }); /*NEW AND FIXED*/ indexB++
    }