//OBJECTS

/* Img */

function Img(options) {
    //constructor
    this.title = options.title;
    this.elem = undefined;
    this.uri = "medias/img/medium/1-norvege/" + this.title;
    this.loaded = false;
    this.playState = undefined;
    this.anim = undefined;
    this.ready = false;
}

Object.defineProperties(Img.prototype, {
    playState: {
        get: function() {
            if(!this.anim) {
                return null;
            }
            return this.anim.playState;
        }
    }
});

Img.prototype.load = function() {
    return new Promise ((resolve, reject) => {
        this.elem = new Image();
        this.elem.onload = () => {
            resolve();
            this.loaded = true;
        };
        this.elem.onerror = () => {
            reject(new Error("Couldn't find" + this.uri));
        };
        this.elem.src = this.uri;
    });
};

Img.prototype.init = function() {
    // create animation
    this.createAnimation();
    //Add elem to DOM
    document.getElementById('container').prepend(this.elem);
    // hide on click
    this.elem.addEventListener("click", () => this.elem.classList.add("hide"));
    this.ready = "true";
};

Img.prototype.play = function() {
    if(!this.ready) {
        this.init();
    }
    if(direction === this.anim.playbackRate) {
        this.anim.play();
    }
    else {
        this.anim.reverse();
    }
    this.elem.classList.remove("hide");
};

Img.prototype.reverse = function() {
    this.anim.reverse();
    this.elem.classList.remove("hide");
};

Img.prototype.createAnimation = function() {
    var width = this.elem.width;
    var height = this.elem.height;
    var maxX = window.innerWidth;
    var maxY = window.innerHeight;
    var pos = {
        startX: (maxX - width) / 2,
        startY: (maxY - height) /2,
        endX: randomFromTo(-width * 1.5, maxY + width / 2),
        endY: randomFromTo(-height * 1.5, maxY + height / 2)
    };
    var keyframes = [
        {
            transform: "translate(" + pos.startX + "px, " + pos.startY + "px) scale(0)",
            offset: 0
        },
        {
            transform: "translate(" + pos.endX + "px, " + pos.endY + "px) scale(2)",
            offset: 1
        }
    ];

    var options = {
        duration: 10000,
        //easing: "",
        iterations: 1,
        direction: "normal",
        fill: "both"
    };
    this.anim = this.elem.animate(keyframes, options);
    this.anim.pause();
}


/* Video */

function Video(options) {
    this.title = options.title;
    this.elem = undefined;
    this.uri = "medias/video/1-norvege/" + this.title;
    this.loaded = false;
    // this.playState = undefined;
    this.ready = false;
}

Object.defineProperties(Video.prototype, {
    playState: {
        get: function() {
            return this.elem.playState;
        }
    }
});

Video.prototype.load = function() {
    return new Promise ((resolve, reject) => {
        this.elem = document.createElement("video");
        this.elem.oncanplaythrough = () => {
            resolve();
            this.loaded = true;
            console.log("Video loaded !");
        };
        this.elem.onerror = () => {
            reject(new Error("Couldn't find " + this.uri));
        };
        this.elem.src = this.uri;
    });
};

Video.prototype.init = function() {
    document.getElementById("videotable").append(this.elem);
    this.ready = true;
};

Video.prototype.play = function() {
    if(!this.ready) {
        this.init();
    }
    this.elem.play();
};

Video.prototype.reverse = function() {
    this.elem.reverse();
}
