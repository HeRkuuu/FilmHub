let searchFilm = () => {
  $("#movie-list").html("")

  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dd7db506",
      s: $("#search-input").val(),
    },
    success: (result) => {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, (i, data) => {
          $("#movie-list").append(`
            <div class="col-4 mb-3">
              <div class="card text-dark">
                <img src="${data.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title text-dark">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                  <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                </div>
              </div>
            </div>
          `);
        });

        $("#search-input").val("");

      } 
      
      else {
        $("#movie-list").html(`
            <div class="col">
                <h1 class="text-center text-light"> ${result.Error} </h1>
            </div>
            `);
      }
    },
  });
};

$("#search-button").on("click", () => {
  searchFilm();
});

$("#search-input").on("keyup", (e) => {
  if (e.keyCode === 13) {
    searchFilm();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dd7db506",
      i: $(this).data("id"),
    },
    success: (movie) => {
      if (movie.Response == "True") {
        $(".modal-body").html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${movie.Poster}" class="img-fluid">
              </div>

              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>${movie.Title}</h3></li>
                  <li class="list-group-item">Released: ${movie.Released}</li>
                  <li class="list-group-item">Genre: ${movie.Genre}</li>
                  <li class="list-group-item">Director: ${movie.Director}</li>
                  <li class="list-group-item">Actors: ${movie.Actors}</li>
                  <li class="list-group-item">${movie.Plot}</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    },
  });
});

