var URL = "https://api.spotify.com/v1/search?type=artist&query=";

$('#search-artist-btn').click(

  function(event){

    event.preventDefault();
    var artist = $('#artist-name').val()
    artist = artist.split(" ").join("%20");
    console.log("request sended to: " + URL+artist+"&type=artist");
    $('#answer').empty();

    $.ajax({
      url:URL+artist+"&type=artist",
      dataType: "json",
      success: handleSucess,
      error: handleError
    });
})

$('.results').on('click', '.btn-primary', '', function(){
    var id = $(this).attr('id');
    $.ajax({
      url:'https://api.spotify.com/v1/artists/'+id+"/albums",
      dataType: "json",
      success: handleAlbumSucess,
      error: handleError
    });
  })

function handleSucess(response){
  response.artists.items.forEach(function(artist) {
    $('#first-result-title').text("The list of artists you were searching for:");
    $('#answer').append("<li>" + 
      '<button class= "btn btn-primary" id="'+ artist.id +'" type="submit">'+ artist.name +'</button>' +"</li>"+ 
      '<img src="' + artist.images[0].url + '" alt="jQuery" height="140">');   
  })
}

function handleAlbumSucess(response){
  response.items.forEach(function(album) {
    $('#albums-result-title').text("The list of albums from the selected artist:");
    $('#albums-answer').append("<li>" + 
      '<button class= "btn btn-primary" id="'+ album.id +'" type="submit">'+ album.name +'</button>' +"</li>"+ 
      '<img src="' + album.images[0].url + '" alt="jQuery" height="140">');   
  })
}

function handleError(jqXHR, status, errorThrown){
        alert("Something bad happened: "
          + status + ', ' + errorThrown)
}