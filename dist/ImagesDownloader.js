var ImagesDownloader = (function () {
    function ImagesDownloader(urls, urlDownloaded, allUrlsDownloaded) {
        this._urlsLength = 0;
        this._urlsDownloaded = [];
        this._urlIndexDownloaded = 0;
        this._pauseDownload = false;
        if (urls && urls instanceof Array) {
            this._urls = urls;
            this._urlsLength = urls.length;
        }
        if (this.isFunction(urlDownloaded)) {
            this._urlDownloaded = urlDownloaded;
        }
        this._allUrlsDownloaded = {};
        if (this.isFunction(allUrlsDownloaded)) {
            this._allUrlsDownloaded = allUrlsDownloaded;
        }
    }
    ImagesDownloader.prototype.start = function () {
        this._pauseDownload = false;
        if (this._urlsLength > 0) {
            this.downloadImage();
        }
    };
    ImagesDownloader.prototype.pause = function () {
        this._pauseDownload = true;
    };
    ImagesDownloader.prototype.resume = function () {
        this._pauseDownload = false;
    };
    Object.defineProperty(ImagesDownloader.prototype, "images", {
        get: function () {
            return this._urls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagesDownloader.prototype, "downloadedImages", {
        get: function () {
            return this._urlsDownloaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagesDownloader.prototype, "urlCurrentlyDownloaded", {
        get: function () {
            return this._urls[this._urlIndexDownloaded];
        },
        enumerable: true,
        configurable: true
    });
    ImagesDownloader.prototype.isFunction = function (fn) {
        return fn && typeof fn === "function";
    };
    ImagesDownloader.prototype.downloadImage = function () {
        var img = new Image();
        img.onload = this.onDownloadComplete.bind(this);
        img.src = this.urlCurrentlyDownloaded;
    };
    ImagesDownloader.prototype.onDownloadComplete = function () {
        this._urlsDownloaded.push(this.urlCurrentlyDownloaded);
        if (this.isFunction(this._urlDownloaded)) {
            this._urlDownloaded(this.urlCurrentlyDownloaded);
        }
        if (this._pauseDownload === false) {
            this._urlIndexDownloaded++;
            if (this._urlsLength >= (this._urlIndexDownloaded + 1)) {
                this.downloadImage();
            }
            else if (this.isFunction(this._allUrlsDownloaded)) {
                this._allUrlsDownloaded();
            }
        }
    };
    return ImagesDownloader;
}());
