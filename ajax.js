const request = new XMLHttpRequest();
request.open("GET", "/aaa", true);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    console.log("OK");
  }
};
request.send();
