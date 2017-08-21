class ImagesDownloader {
    _urls: string[];
    _urlsLength: number = 0;
    _urlsDownloaded: string[] = [];
    _urlIndexDownloaded: number = 0;
    _pauseDownload: boolean = false;
    _urlDownloaded: any;
    _allUrlsDownloaded: any;

    constructor(urls: string[], urlDownloaded: any, allUrlsDownloaded: any) {
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

    start(): void {
        this._pauseDownload = false;
        if (this._urlsLength > 0) {
            this.downloadImage();
        }
    }

    pause(): void {
        this._pauseDownload = true;
    }

    resume(): void {
        this._pauseDownload = false;
    }

    get images(): string[] {
        return this._urls;
    }

    get downloadedImages(): string[] {
        return this._urlsDownloaded;
    }

    get urlCurrentlyDownloaded(): string {
        return this._urls[this._urlIndexDownloaded];
    }

    private isFunction(fn: any): boolean {
        return fn && typeof fn === "function";
    }

    private downloadImage(): void {
        let img = new Image();
        img.onload = this.onDownloadComplete.bind(this);
        img.src = this.urlCurrentlyDownloaded;
    }

    private onDownloadComplete(): void {
        this._urlsDownloaded.push(this.urlCurrentlyDownloaded);
        if (this.isFunction(this._urlDownloaded)) {
            this._urlDownloaded(this.urlCurrentlyDownloaded);
        }

        if (this._pauseDownload === false) {
            this._urlIndexDownloaded++;
            if (this._urlsLength >= (this._urlIndexDownloaded + 1)) {
                this.downloadImage();
            } else if (this.isFunction(this._allUrlsDownloaded)) {
                this._allUrlsDownloaded();
            }
        }
    }
}