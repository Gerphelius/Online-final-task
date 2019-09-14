import { mediator } from "./mediator";

export function makeMovieForm(movieObj) {
  const MoviePosterUrl = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
  const MoviePoster = document.createElement("img");
  const MoreInfoButton = document.createElement("button");

  MoviePoster.setAttribute("class", "movie-poster");
  MoviePoster.setAttribute("src", MoviePosterUrl);
  MoviePoster.setAttribute("alt", `${movieObj.title} poster`);
  MoreInfoButton.setAttribute("class", "more-info-btn");
  MoreInfoButton.innerHTML = "More info";

  MoreInfoButton.addEventListener("click", () => {
    mediator.publish("render", {
      ".original-language": "Original language:",
      ".language-text": makeFullLanguage(movieObj.original_language),
      ".movie-popularity-text": "Popularity:",
      ".movie-stars": makeRatingStars(movieObj.vote_average / 2),
      ".more-info-menu": {
        styleName: "padding",
        styleProp: "1vw 2vw"
      },
      ".more-info": {
        styleName: "border",
        styleProp: "none"
      },
      ".more-info-btn": ""
    });
  });

  mediator.publish("addRatingBar", {
    ".movie-poster": MoviePoster,
    ".movie-title": movieObj.title,
    ".movie-rating": movieObj.vote_average * 10,
    ".movie-release-date": formatDate(movieObj.release_date),
    ".movie-overview": movieObj.overview,
    ".main-content": {
      styleName: "background",
      styleProp: "none"
    },
    ".more-info": {
      styleName: "border-top",
      styleProp: "1px solid grey"
    },
    ".more-info-btn": MoreInfoButton
  });
}

function formatDate(date) {
  const StrDatesArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const DateArr = date.split("-");
  let newDate = `${StrDatesArr[parseInt(DateArr[1])]} ${DateArr[2]}, ${DateArr[0]}`;

  return newDate;
}

function makeRatingStars(votes) {
  const StarsElem = document.createElement("p");
  const HollowStar = document.createElement("i");
  const FullStar = document.createElement("i");

  StarsElem.setAttribute("class", "movie-stars");
  HollowStar.setAttribute("class", "far fa-star");
  FullStar.setAttribute("class", "fas fa-star");

  votes = Math.round(votes);

  for (let i = 0; i < 5; i++, votes--) {
    if (votes > 0) {
      StarsElem.append(FullStar.cloneNode(false));
    } else {
      StarsElem.append(HollowStar.cloneNode(false));
    }
  }

  return StarsElem;
}

function makeFullLanguage(langStr) {
  const langsObj = {
    en: "English",
    ja: "Japanese",
    de: "German",
    ru: "Russian",
    ua: "Ukrainian",
    es: "Spanish",
    fr: "French"
  };

  for (let key in langsObj) {
    if (key === langStr) {
      return langsObj[key];
    }
  }
}
