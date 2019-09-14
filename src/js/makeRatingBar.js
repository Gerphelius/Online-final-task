import { mediator } from "./mediator";

export function makeRatingBar(propObj) {
  let movieRating = propObj[".movie-rating"];
  let progColorBright = "rgb(102,102,102)";
  let progColorDark = "rgb(102,102,102)";
  let percentage = 0;
  let rad;
  let noRating = false;
  let percentageIcon = "%";

  const canvas = document.createElement("canvas");
  canvas.setAttribute("class", "movie-rating");
  const ctx = canvas.getContext("2d");
  canvas.width = 150;
  canvas.height = 150;
  canvas.style.width = "4vw";
  canvas.style.height = "4vw";

  const startFrom = 4.72;
  const cw = ctx.canvas.width / 2;
  const ch = ctx.canvas.height / 2;

  if (movieRating > 69) {
    progColorBright = "rgb(1,210,119)";
    progColorDark = "rgb(32,69,41)";
  } else if (movieRating > 39) {
    progColorBright = "rgb(210,213,49)";
    progColorDark = "rgb(66, 61, 15)";
  } else if (movieRating > 0) {
    progColorBright = "rgb(219,35,96)";
    progColorDark = "rgb(82,20,51)";
  } else {
    noRating = true;
    movieRating = 1;
    percentageIcon = "";
  }

  function progressBar() {
    rad = (percentage / 100) * Math.PI * 2;
    ctx.clearRect(0, 0, 400, 200);

    ctx.beginPath();
    ctx.arc(cw, ch, 65, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgb(8,28,34)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cw, ch, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgb(8,28,34)";
    ctx.fill();
    ctx.strokeStyle = progColorDark;
    ctx.stroke();
    ctx.lineCap = "round";
    ctx.fillStyle = "white";
    ctx.strokeStyle = progColorBright;
    ctx.textAlign = "center";
    ctx.lineWidth = 10;
    ctx.font = "230% Comic Sans MS";

    if (!noRating) {
      ctx.beginPath();
      ctx.arc(cw, ch, 50, startFrom, rad + startFrom, false);
      ctx.stroke();
    } else {
      percentage = "NR";
    }

    ctx.fillText(percentage, cw - 3, ch + 12);
    ctx.font = "100% Comic Sans MS";
    ctx.fillText(percentageIcon, cw + 25, ch - 5);

    if (percentage >= movieRating) {
      clearInterval(IntervalId);
    }
    percentage++;
  }
  const IntervalId = setInterval(progressBar, 15);

  propObj[".movie-rating"] = canvas;
  mediator.publish("render", propObj);
}
