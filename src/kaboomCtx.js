import kaboom from "kaboom";

export const k = kaboom({
    global: false,

    // makes it so you can write tap events for mobile the same as mouse events so it is intigratable
    touchToMouse: true,
    canvas: document.getElementById("game"),
});
