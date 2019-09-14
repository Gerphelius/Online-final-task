import { mediator } from "./mediator";

export function sortArrOfObjsBy(propObj) {
  if (!sortedArr) {
    sortedArr = propObj.arr.sort((a, b) => {
      if (a[propObj.sortBy] > b[propObj.sortBy]) {
        if (propObj.sortDescending) {
          return -1;
        }
        return 1;
      }
    });

    mediator.publish("makeBtnsForm", {
      dataArr: sortedArr,
      btnName: "release_date",
      menuInfo: "title",
      strLength: 4
    });
  } else if (propObj.objPropName) {
    let specObj;

    sortedArr.forEach(obj => {
      for (let key in obj) {
        if (obj[key] === propObj.objPropName) {
          specObj = obj;
        }
      }
    });

    mediator.publish("makeMovieForm", specObj);
  }
}

let sortedArr;
