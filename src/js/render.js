export function render(propObj) {
  for (let key in propObj) {
    if (propObj[key] instanceof HTMLElement) {
      const HtmlElems = document.querySelectorAll(key);
      if (HtmlElems.length > 1) {
        HtmlElems.forEach(elem => {
          const clone = propObj[key].cloneNode(true);
          elem.replaceWith(clone);
        });
      } else {
        HtmlElems[0].replaceWith(propObj[key]);
      }
    } else if (propObj[key] instanceof Object) {
      changeStyle(key, propObj[key]);
    } else {
      const HtmlElem = document.querySelector(key);
      HtmlElem.innerText = propObj[key];
    }
  }
}

function changeStyle(elemClass, stylesPropObj) {
  const elemets = document.querySelectorAll(elemClass);

  elemets.forEach(elem => {
    elem.style[stylesPropObj.styleName] = stylesPropObj.styleProp;
  });
}
