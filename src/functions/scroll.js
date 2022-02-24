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
