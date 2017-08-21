# Images Preloader
Images Preloader will be helpfull incase if you want to download images without showing cluttered/half downloaded images to the end users.

```javascript
var images = ['images/001.jpg', 'images/002.jpg', 'images/003.jpg', 'images/004.jpg'];

var imagesdownloader = new ImagesDownloader(images, urlDownloaded, allImagesDownloadComplete);

imagesdownloader.start();

function urlDownloaded(downloadedUrl) {
    console.log(downloadedUrl);
}

function allImagesDownloadComplete() {
    console.log('All images completed downloading');
}
```

In the above code images are downloaded sequentially manner.

## Constructor
```javascript
new ImagesDownloader(img_src_array, callback_image_downloaded, callback_all_Images_Downloaded);
```
Here

* img_src_array - Images to be downloaded and accepts array of Image's source/url 
* callback_image_downloaded - Callback method to notify that an image is downloaded
* callback_all_Images_Downloaded - Callback method to notify that all images are downloaded

## Methods
* start() - lets you to start downloading the images
* pause() - lets you to pause downloading images
* resume() - lets you to resumes downloading which are paused

## Properties
* images - returns array of image sources which are assigned for downloading
* downloadedImages - returns array of image source which are downloaded