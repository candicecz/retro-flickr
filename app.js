// Key:
// a40b19fbab002761dc8988b5bc4e7f96
//
// Secret:
// 3bcbbadea6cd9bb2
(function(){
let API_KEY = `a40b19fbab002761dc8988b5bc4e7f96`
let API_LINK = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=`


function getPhotosForSearch(searchItem){
  let url = `${API_LINK}${API_KEY}&text=${searchItem}`
  return(
    $.getJSON(url)
    .then(data => data.photos.photo)
    .then(photoData => {
      return $.map(photoData, function(photo){
        return {
          title:photo.title,
          medium:`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
          large:`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
        }
      })
    })
  )
}


function createFlickrThumb(photoData) {
  let li = $("<li></li>");
  li.attr('class',"frame .col-small-6 .col-medium-4 .col-large-3");

  let div = $("<div></div>");
  div.attr('class',"polaroid .col-small-6 .col-medium-4 .col-large-3");

  let img = $("<img></img>");
  img.attr('src', photoData.medium);
  img.attr('alt', photoData.title);
  img.attr('class','retro .col-small-6 .col-medium-4 .col-large-3')

  div.append(img)
  li.append(div);
  return li;
}




let app = $('#app');
let photoSearchForm = $('.photoSearchForm');
let photoInput = $('.photoInput');
let gallery = $('.gallery');
let loading = $('.fetch')

photoSearchForm.on('submit', function(event){
  event.preventDefault();
  let searchItem = photoInput.val();
  loading.text("FETCHING...")

  getPhotosForSearch(searchItem)
  .then(response => {
    $.each(response, function(index, photo){
      // console.log(photo)
      loading.text("")
      gallery.append(createFlickrThumb(photo))
      // $(window).scroll(function(){
      //   if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
      //     gallery.append(createFlickrThumb(photo))
      //   }
      // });
    })
  })
  photoInput.val(" ")
  gallery.empty();

  // photoSearchForm.text(" ")
});
})();
