/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
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

// function simulateClick() {
//   var event = new MouseEvent('click', {
//     'view': window,
//     'bubbles': true,
//     'cancelable': true
//   });
//   var ab = document.querySelector('a.boxMNm'); 
//   var canceled = !ab.dispatchEvent(event);
//   if (canceled) {
//     // A handler called preventDefault.
//     console.log("canceled");
//   } else {
//     // None of the handlers called preventDefault.
//     console.log("not canceled");
//   }
// }

var page = require('webpage').create();

// Open Twitter on 'sencha' profile and, onPageLoad, do...
page.open("http://www.kobis.or.kr/kobis/business/stat/boxs/findFormerBoxOfficeList.do?loadEnd=0&searchType=search&sMultiMovieYn=&sRepNationCd=K&sWideAreaCd=", function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        console.log("inside else");
        page.evaluate(function() {
            document.querySelector("a.boxMNm").click();
        });
        // var txtCnt = firstAn.textContent;
        // console.log(txtCnt);
        console.log("Clicked");
        waitFor(function() {
            return page.evaluate(function() {
                return document.querySelector("li.peopContSub2 + li a");
            });
        }, function() {
            // console.log("the div.staffMore element should be visible now.");
            console.log("the actor list should be visible now.");
            var minsik = page.evaluate(function() {
                if(typeof document.querySelector("li.peopContSub2 + li a") === 'undefined') {
                    return "Fail";
                } else {
                    return document.querySelector("li.peopContSub2 + li a").getAttribute("onclick");
                }
            });
            console.log(minsik);
            phantom.exit();
        }); 

    }
});

