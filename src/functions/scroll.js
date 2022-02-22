/**
 * Function used to lock the scrollbar.
 */
export function disableScroll() {
  !!document && document.body.classList.add("no-scroll");
}

/**
 * Function used to enable the scrollbar.
 */
export function enableScroll() {
  !!document && document.body.classList.remove("no-scroll");
}

/**
 * Function used to smooth scroll to specified height.
 *
 * @param {number} num The height to scroll to.
 */
export function smoothScroll(num) {
  num &&
    window.scrollTo({
      top: num - 80,
      behavior: "smooth",
    });
}

/**
 * Function used to get top height of the requested element.
 *
 * @param  {string}      id The element to search.
 * @return {number|null}    Returns the top most height of the HTML Element.
 */
export function getTopHeight(id) {
  if (typeof document !== "undefined") {
    const ele = document.getElementById(id);
    const eleTop = ele?.getBoundingClientRect().top;
    let offsetPosition = eleTop && eleTop + window.pageYOffset;
    return offsetPosition;
  } else {
    return null;
  }
}
