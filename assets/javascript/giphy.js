$(document).ready(function () {

    var pokemon = [
        "twerking pikachu", "bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey",
        "rattata", "spearow", "ekans", "pikachu"
    ];


    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".poke-button", function () {
        $("#pokemon").empty();
        $(".poke-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=KJ3A0XyIQUTOIQjcYv4jYAJroCV3nL0e";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var pokeDiv = $("<div class=\"pokemon-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var pokemonImage = $("<img>");
                    pokemonImage.attr("src", still);
                    pokemonImage.attr("data-still", still);
                    pokemonImage.attr("data-animate", animated);
                    pokemonImage.attr("data-state", "still");
                    pokemonImage.addClass("pokemon-image");

                    pokeDiv.append(p);
                    pokeDiv.append(pokemonImage);

                    $("#pokemon").append(pokeDiv);
                }
            });
    });

    $(document).on("click", ".pokemon-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#pokeCreate").on("click", function (event) {
        event.preventDefault();
        var newPokemon = $("input").eq(0).val();

        if (newPokemon.length > 2) {
            pokemon.push(newPokemon);
        }

        populateButtons(pokemon, "poke-button", "#poke-buttons");

    });

    populateButtons(pokemon, "poke-button", "#poke-buttons");
});