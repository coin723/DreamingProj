function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
    start = new Date().getTime(),
    condition = false,
    interval = setInterval(function() {
        if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof testFx === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof onReady === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};

// function ithClick(i) {
//     page.evaluate(function(i) {
//         document.querySelectorAll("a.boxMNm")[i].click();
//     });
// }

var page = require('webpage').create();

page.open("http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=", function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        console.log("inside else");
        // var movieLinks = page.evaluate(function() {
        //     return document.querySelectorAll("a.boxMNm");
        // });
        // console.log(typeof movieLinks);

        console.log("inside for loop");
        console.log(1 + "th movie");
        page.evaluate(function(index) {
            document.querySelectorAll("a.boxMNm")[index].click();
        }, 1);
        console.log("Clicked");
        waitFor(function() {
            return page.evaluate(function() {
                return document.querySelector("li.peopContSub2 + li a");
            });
        }, function() {
            var fActor = page.evaluate(function() {
                if(typeof document.querySelector("li.peopContSub2 + li a") === 'undefined') {
                    return "Fail";
                } else {
                    return document.querySelector("li.peopContSub2 + li a").getAttribute("onclick");
                }
            });
            console.log(fActor);
            page.evaluate(function() {
                document.querySelector("a.layer_close").click();
            });
            phantom.exit();
        });

        // page.evaluate(function() {
        //     document.querySelector("a.layer_close").click();
        // });

        // phantom.exit();
    }
});

