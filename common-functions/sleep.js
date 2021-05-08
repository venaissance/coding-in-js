const sleep = time => new Promise(resolve => setTimeout(resolve, time))

const red = () => console.log("red");
const green = () => console.log("green");
const yellow = () => console.log("yellow");
const onLight = (cb, delay) => {
    return new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve();
        }, delay);
    });
};
const lightChange = () => {
    Promise.resolve()
        .then(() => onLight(red, 1000))
        .then(() => onLight(green, 2000))
        .then(() => onLight(yellow, 3000))
        .then(lightChange);
};
lightChange();
