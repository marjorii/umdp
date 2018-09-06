//UTILS

/* load JSON */

function readJSONFile(url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET", url);
        request.onload = () => {
            if (request.readyState === 4 && request.status == "200") {
                resolve(JSON.parse(request.responseText));
            }
        }
        request.onerror = () => reject(Error("Couldn't load " + url));
        request.send();
    });
}

/* delay */

// (time in milliseconds)
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/* allow random from to */

function randomFromTo(from, to, decimal){
    if (decimal) {
        //return decimal value if (..,..,true)
        return Math.random() * (to - from + 1) + from;
    }
    else {
        //return integar
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}

/* reverse sleep */

function reversableSleep(duration) {
    // this function has its own "direction" variable
    return new Promise (resolve => {
        const _this = this;
        function reverse() {
            clearTimeout(timeOut);
            saveState();
            direction = direction === 1 ? -1 : 1;
            timeOut = setTimeout(resolver, direction === 1 ? duration - totalSpent : totalSpent);
        }

        function pause() {
            clearTimeout(timeOut);
            saveState();
            console.log("wait is paused", totalSpent);
            window.removeEventListener("reverse", reverse);
            window.removeEventListener("pause", pause);
            window.addEventListener("resume", resume);
        }

        function resume() {
            console.log("wait is resumed", totalSpent);
            start = performance.now();
            window.removeEventListener("resume", resume);
            window.addEventListener("reverse", reverse);
            window.addEventListener("pause", pause);
            timeOut = setTimeout(resolver, direction === 1 ? duration - totalSpent : totalSpent);
        }

        function saveState() {
            var now = performance.now();
            var timeSpent = now - start;
            start = now;
            totalSpent += direction === 1 ? timeSpent : -timeSpent;
        }

        function resolver() {
            window.removeEventListener("pause", pause);
            window.removeEventListener("reverse", reverse);
            resolve();
        }

        var totalSpent = 0;
        var direction = 1;
        var start = performance.now();
        var paused = false;
        var timeOut = setTimeout(resolver, duration);
        window.addEventListener("reverse", reverse);
        window.addEventListener("pause", pause);
    });
}