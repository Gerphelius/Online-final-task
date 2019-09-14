import { mediator } from "./mediator";

export function makeBtnsForm(propObj) {
  const DivYearBtns = document.createElement("div");
  DivYearBtns.setAttribute("class", "buttons-menu-wrapper");

  let checkYear = [];

  propObj.dataArr.forEach(elem => {
    let btnName = elem[propObj.btnName].slice(0, propObj.strLength);

    if (checkYear.indexOf(btnName) === -1) {
      checkYear.push(btnName);

      const DropdownDiv = document.createElement("div");
      const DropdownBtn = document.createElement("button");

      DropdownDiv.setAttribute("class", `dropdown drop-to-listen`);
      DropdownBtn.setAttribute("class", `btn btn-secondary dropdown-toggle btn-${btnName}`);
      DropdownBtn.setAttribute("type", "button");
      DropdownBtn.setAttribute("id", "dropdownMenu2");
      DropdownBtn.setAttribute("data-toggle", "dropdown");
      DropdownBtn.setAttribute("aria-haspopup", "true");
      DropdownBtn.setAttribute("aria-expanded", "false");
      DropdownBtn.innerHTML = btnName;

      const DropdownMenuDiv = document.createElement("div");
      DropdownMenuDiv.setAttribute("class", `dropdown-menu ${btnName}`);
      DropdownMenuDiv.setAttribute("aria-labelledby", "dropdownMenu2");

      propObj.dataArr.forEach(elem => {
        if (elem[propObj.btnName].slice(0, propObj.strLength) === btnName) {
          const MenuBtn = document.createElement("button");
          MenuBtn.setAttribute("class", "dropdown-item");
          MenuBtn.setAttribute("type", "button");
          MenuBtn.innerHTML = elem[propObj.menuInfo];
          DropdownMenuDiv.append(MenuBtn);
        }
      });
      DropdownBtn.append(DropdownMenuDiv);
      DropdownDiv.append(DropdownBtn);
      DivYearBtns.append(DropdownDiv);
    }
  });

  jQuery(document).ready(function($) {
    $(".drop-to-listen").on("show.bs.dropdown", function(e) {
      const MenuClassName = e.currentTarget.children[0].children[0].className.split(" ")[1];
      const CurClassName = e.currentTarget.children[0].className.split(" ")[3];

      $(`.${MenuClassName}`).toggle();
      changeBtnState(CurClassName, "active-btn");
    });

    $(".drop-to-listen").on("hide.bs.dropdown", function(e) {
      const MenuClassName = e.currentTarget.children[0].children[0].className.split(" ")[1];
      const CurClassName = e.currentTarget.children[0].className.split(" ")[3];

      $(`.${MenuClassName}`).hide();
      changeBtnState(CurClassName, "active-btn");
    });

    $(".dropdown-item").on("click", function(e) {
      mediator.publish("getMoviesArr", {
        objPropName: e.currentTarget.innerHTML
      });
      mediator.publish("render", {
        ".language-text": "",
        ".original-language": "",
        ".movie-popularity-text": "",
        ".movie-stars": {
          styleName: "display",
          styleProp: "none"
        },
        ".more-info-menu": {
          styleName: "padding",
          styleProp: "0"
        }
      });
      const CurClassName = e.currentTarget.parentElement.parentElement.className;
      changeBtnState(CurClassName.split(" ")[3], "active-btn", "dropdown-toggle");
    });
  });

  mediator.publish("render", {
    ".year-btns": DivYearBtns
  });
}

function changeBtnState(className, styleName, resetClass) {
  if (resetClass) {
    const ResetElems = document.querySelectorAll(`.${resetClass}`);

    ResetElems.forEach(elem => {
      if (!elem.classList.contains(className)) {
        elem.classList.remove(styleName);
      }
    });
  }
  const Elems = document.querySelectorAll(`.${className}`);

  Elems.forEach(elem => {
    elem.classList.toggle(styleName);
  });
}
