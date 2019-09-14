import "../scss/styles.scss";
import "bootstrap";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { mediator } from "./mediator";
import { getMovies } from "./xmlHttpRequest";
import { sortArrOfObjsBy } from "./sortArr";
import { makeBtnsForm } from "./makeBtnsForm";
import { render } from "./render";
import { makeMovieForm } from "./makeMovieForm";
import { makeRatingBar } from "./makeRatingBar";

mediator.subscribe("getServerData", sortArrOfObjsBy);
mediator.subscribe("makeBtnsForm", makeBtnsForm);
mediator.subscribe("render", render);
mediator.subscribe("getMoviesArr", sortArrOfObjsBy);
mediator.subscribe("makeMovieForm", makeMovieForm);
mediator.subscribe("addRatingBar", makeRatingBar);

getMovies();
