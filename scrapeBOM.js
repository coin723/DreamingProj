function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};

var webPage = require('webpage');
page = webPage.create();

// var fs = require('fs');
// var path = 'boxOffice.html';

page.open("http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=", function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
    	page.includeJs("http://code.jquery.com/jquery-2.1.4.js", function() {
			console.log("came into includeJs");
            waitFor(function() {
                return page.evaluate(function() {
                    return $("#sRepNationCd").is(":visible");
                });
            }, function() {
                console.log("Found #sRepNationCd");
                phantom.exit();
            });
    	});     
    }
});

// page.open("http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=", function(status) {
// 	page.includeJs("http://code.jquery.com/jquery-2.1.4.js", function() {
// 		var minsik = page.evaluate(function() {
// 			$("tbody:nth-child(1) a").click();
// 			window.setTimeout(function() {
// 				return document.querySelector("div.layerBox").getAttribute("style");
// 			}, 200);
// 		});
// 		console.log(minsik);
// 		phantom.exit();
// 	});
// });

// var page = require('webpage').create();
// page.open("http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=", function(status) {
//   var title = page.evaluate(function() {
//     return document.title;
//   });
//   console.log('Page title is ' + title);
//   phantom.exit();
// });

// page.onConsoleMessage = function(msg) {
//   console.log('Page title is ' + msg);
// };
// page.open("http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=", function(status) {
//   page.evaluate(function() {
//     console.log(document.title);
//   });
//   phantom.exit();
// });

// page.open('http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=', 
// 	function(status) {
// 		page.includeJS("http://code.jquery.com/jquery-2.1.4.js", function() {
// 			page.evaluate(function() {
// 				var btn1 = document.querySelector("table a.boxMNm");
// 				$(btn1).click();
// 				var content = page.content;
// 				fs.write(path, content, 'w');
// 				phantom.exit();
// 			});
// 		});
// 	});

// page.open('http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=',
// 	function() {
// 		var events = page.evaluate(function(status) {
// 			mstView('movie', '20129370');

// 			var waiter = window.setInterval(function() {
// 				var minsik = page.evaluate(function() {
// 					var elm = document.querySelector("div#20129370_staff div.peopContent2")
// 						.querySelector("div.peopContNm")
// 						.getAttribute("onclick");
// 					return elm;
// 				});
// 				if(minsik !== false) {
// 					window.clearInterval(waiter);
// 					var file = require('fs');
// 					file.write('results.txt', minsik, 'w+');
// 				}
// 			}, 300);

// 			phantom.exit();
// 		});
// 	});