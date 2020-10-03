function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1231");
      resolve();
    }, delay);
  });
}

sleep(1000);

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

function light(cb, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, delay);
  });
}

function step() {
  Promise.resolve()
    .then(() => light(red, 1000))
    .then(() => light(green, 2000))
    .then(() => light(yellow, 3000))
    .then(() => step());
}

step();
