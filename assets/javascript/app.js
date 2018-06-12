$(document).ready(function() {

// These players start as buttons
    var topics = ["Manuel Neuer ", "Harry Kane ", "Cristiano Ronaldo ", "Sergio Ramos ", "Eden Hazard ", "Lionel Messi", "Robert Lewandowski", "John Obi Mikel", "Masoud Shojaei", "Aron Gunnarsson",];

//creates buttons for the array above
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("player");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
            }
        }
        renderButtons();


// on click of button display gifs
$(document).on("click", '.player', function() {
    var worldCup = $(this).html();
    console.log(worldCup);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + worldCup + "&api_key=7enNFpyFGkOkZL3LCR738wqoH3LMSD9r&limit=10";
    console.log(queryURL);

// Ajax Call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var results = response.data;

            $("#players-view").empty();
            for (var j = 0; j < results.length; j++) {
                var imgDiv = $("<div>");
                var imgView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
            
            var gifImage = $("<img>").attr("src", still).attr("data-animate", imgView).attr("data-still", still);
                gifImage.on("click", playGif);

            var rating = results[j].rating;
                console.log(rating);

            var displayRating = $("<p>").text("Rating: " + rating);
            $("players-view").prepend(displayRating);
            }
        });     
            
function playGif() {
    var state = $("this").attr("data-state");
if (state === "still") {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');
} else{
   $(this).attr('src', $(this).data('still'));
   $(this).attr('data-state', 'still');
  }
}
});

$(document).on('click', '#add-player', function() {
    if ($('#player-input').val().trim() == ''){
      alert('Input can not be left blank');
   }
   else {
    var players = $('#player-input').val().trim();
    topics.push(players);
    $('#player-input').val('');
    renderButtons();
    return false;

        }
    });
});
              


