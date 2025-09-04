/*
 * IDB Programming: Blank template
 *
 */

// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
  hue: 0, // Of the large circle (0-360)
  lightness: 50, // Of the small circle (%)
});

// The settings should contain all of the "fixed" parts of your programs, like static HTMLElements and parameters.
const settings = Object.freeze({
  x: 500,
  y: 250,
  width: 200,
  height: 200,
  increment: 1,
});

/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {
  state = Object.freeze({ ...state, ...newState });
}

/**
 * This is where we put the code that transforms our data.
 * update() is run every 10 ms, assuming that we keep calling it with `setTimeout`.
 */
function update() {
  // Uncomment the lines below to destructure your state and settings variables, if necessary
  const { hue, lightness } = state;
  const { increment } = settings;

  let newHue = hue + increment;

  let newLightness = 100;
  if (lightness < 100) {
    newLightness = lightness / 1.001;
  }
  // Uncomment the line below to update your state variable, if necessary
  updateState({ hue: newHue, lightness: newLightness });

  setTimeout(update, 10);
}

/**
 * This is where we put the code that outputs our data.
 * use() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function use() {
  // Uncomment the lines below to destructure your state and settings variables, if necessary
  const { hue, lightness, circle } = state;
  // const {  } = settings;

  circle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

  let smallCircle = document.querySelector(".circle");
  smallCircle.style.backgroundColor = `hsl(0, 100%, ${lightness}%)`;

  window.requestAnimationFrame(use);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
  const body = document.querySelector("body");

  const circle = document.createElement("div");
  circle.style.width = `${settings.width}px`;
  circle.style.height = `${settings.height}px`;
  circle.style.transform = `translate(${settings.x}px, ${settings.y}px)`;
  circle.style.backgroundColor = "hsl(0, 100%, 50%)";
  circle.style.borderRadius = "50%";
  body.appendChild(circle);

  updateState({ circle });

  setTimeout(update, 50);
  window.requestAnimationFrame(use);
}

setup(); // Always remember to call setup()!
