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
                // console.log("Running");
                condition = (typeof testFx === "string" ? eval(testFx) : testFx()); //< defensive code
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


var page = require('webpage').create();

// Open Twitter on 'sencha' profile and, onPageLoad, do...
page.open("http://www.google.co.kr", function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        // Wait for 'signin-dropdown' to be visible
        // console.log("came to 'else'");
        // waitFor(function() {
        //     return page.evaluate(function() {
        //         return document.querySelector("[title='Google']").offsetParent === null;
        //     });
        // }, function() {
        //     console.log("The Google Doodle should be visible now.");
        //     phantom.exit();
        // });
        page.includeJs('http://code.jquery.com/jquery-2.1.4.js', function() { //page.includeJs 안에서 돌리는 게 핵심
            // console.log("came to includeJs");
            waitFor(function() {
            // Check in the page if a specific element is now visible
            // return $("[title='Google']").is(":visible");
            return page.evaluate(function() {
                return $("[title='Google']").is(":visible");
                // page.evaluate(function() {
                //     return $("div").is(":visible");
                // });
                });
            }, function() {
                console.log("The sign-in dialog should be visible now.");
                phantom.exit();
            });       
        });   
    }
});
