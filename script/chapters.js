/* Subchapter */

function SubChapter(jsonOBJ) {
    //constructor (first letter = maj)
    this.index = 0;
    this.medias = jsonOBJ.medias.map( media => createMedia(media));
    // this.medias = jsonOBJ.medias.map( media => {
    //     if(Array.isArray(media)) {
    //         return new MultiMedia(media[1]);
    //     }
    //     return new Img(media);
    // });
}

SubChapter.prototype.load = function() {
    return Promise.all(this.medias.map(media => {
        return media.load();
    }));
};

SubChapter.prototype.play = function() {
    return new Promise ((resolve, reject) => {
        var _this = this;
        async function playMedia() {
            var media = _this.medias[_this.index];
            if(media !== undefined) {
                media.play();
                await reversableSleep(5000);
                _this.index = _this.findLastStopped(direction === -1);
                playMedia();
                console.log("index", _this.index);
            }
            else {
                resolve();
            }
        }
        playMedia();
    });
};

SubChapter.prototype.reverse = function() {
    this.medias.forEach(media => media.reverse());
};

SubChapter.prototype.pause = function() {
    this.medias.forEach(media => media.pause());
};

SubChapter.prototype.resume = function() {
    this.medias.forEach(media => media.play());
};


SubChapter.prototype.findLastStopped = function (reversed) {
    var medias = reversed ? this.medias.slice(0).reverse() : this.medias;
    var startIndex = reversed ? medias.length - 1 - this.index : this.index;
    var newIndex =  medias.findIndex((media, index) => {
        return index > startIndex && media.playState !== "running";
    });
    return reversed ? medias.length - 1 - newIndex : newIndex;
};
