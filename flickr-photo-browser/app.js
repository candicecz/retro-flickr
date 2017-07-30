// Key:
// a40b19fbab002761dc8988b5bc4e7f96
//
// Secret:
// 3bcbbadea6cd9bb2

var API_KEY = `a40b19fbab002761dc8988b5bc4e7f96`
var API_LINK = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=`


function getPhotosForSearch(searchItem){
  var url = `${API_LINK}${API_KEY}&text=${searchItem}`
  return(
  fetch(url)
  .then(response => response.json())
  .then(jsonResponse => {
    var photos= jsonResponse.photos.photo;
    var photoData = photos.map(function(photo){
      return {
        title:photo.title,
        thumb:`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`,
        large:`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
      }
    });
      return photoData;
  }));
}

function createFlickrThumb(photoData) {
  var link = document.createElement('a');
  link.setAttribute('href', photoData.large);
  link.setAttribute('target', '_blank');

  var image = document.createElement('img');
  image.setAttribute('src', photoData.thumb);
  image.setAttribute('alt', photoData.title);

  link.appendChild(image);

  return link;
}

var app = document.querySelector('#app');
var photoSearchForm = app.querySelector('.photoSearchForm');
var photoInput = photoSearchForm.querySelector('.photoInput');
var images = app.querySelector('.images');

photoSearchForm.addEventListener('submit', function(event){
  event.preventDefault();
  var searchItem = photoInput.value;
  photoInput.value="";

getPhotosForSearch(searchItem)
  .then(photoData => {
    photoData.forEach(photo => {
      // console.log(photo);
      images.appendChild(createFlickrThumb(photo))
      // return images.appendChild(createFlickrThumb);
    });
  })
  .catch(console.error)
});
