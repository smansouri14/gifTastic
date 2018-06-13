$(document).ready(function () {

    // These players start as buttons
    var topics = ["Manuel Neuer ", "Harry Kane ", "Cristiano Ronaldo ", "Sergio Ramos ", "Eden Hazard ", "Lionel Messi", "Robert Lewandowski", "Mesut Ozil", "Olivier Giroud", "Neymar", "Coutinho", "Antoine Griezmann", "Christian Eriksen", "Kevin De Bruyne"];


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



    // on click of button display those gifs
    $(document).on("click", '.player', function () {
        var worldCup = $(this).html();
        console.log(worldCup);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + worldCup + "&api_key=7enNFpyFGkOkZL3LCR738wqoH3LMSD9r&limit=10";
        console.log(queryURL);


        // Ajax Call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            var gifImage;
            $("#players-view").empty();
            for (var j = 0; j < results.length; j++) {
                var imgDiv = $("<div>").addClass("col-md-4");
                var imgView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;

                gifImage = $("<img>").attr("src", still).attr("data-animate", imgView).attr("data-still", still).attr("data-state", "still");
                // $(document).on('click', gifImage, playGif);
                var rating = results[j].rating;
                console.log(rating);

                var displayRating = $("<p>").text("Rating: " + rating);
                $(imgDiv).prepend(displayRating);
                $(imgDiv).prepend(gifImage);
                $("#players-view").prepend(imgDiv);
            }
            // $(document).on('click', gifImage, function(){
            //     var state = $(this).attr("data-state");
            //     console.log(state); 
            // });

        });
    });

    // makes images play and stop        
    $(document).on('click', "img", playGif);
    function playGif() {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    }



    //adds new buttons that were typed in 
    $(document).on('click', '#add-player', function () {
        if ($('#player-input').val().trim() == '') {
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



