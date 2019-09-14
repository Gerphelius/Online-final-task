import { mediator } from "./mediator";

export function getMovies() {
  const Url = "https://api.themoviedb.org/3/discover/movie?api_key=8a7374e4249ca8ec7fded07291f4c778&with_genres=878";

  let xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", Url, true);

  xmlRequest.onload = function() {
    if (xmlRequest.status === 200) {
      let moviesInfo = JSON.parse(xmlRequest.responseText);
      mediator.publish("getServerData", {
        arr: moviesInfo.results,
        sortBy: "release_date",
        sortDescending: true
      });
    } else {
      console.error(xmlRequest.statusText);
    }
  };

  xmlRequest.onerror = function() {
    console.error(xmlRequest.statusText);
  };

  xmlRequest.send(null);
}
