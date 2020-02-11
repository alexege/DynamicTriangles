document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is connected");
  drawTriangles();
  triangleListeners();
  traingleEffect();
});

function flashScreen(){
  document.getElementById("body").classList.add("hit");
  setTimeout(function(){
    document.getElementById("body").classList.remove("hit");
  }, 500 )
  // document.getElementById("body").style.border = "5px solid red";
  // const numSVGs = document.getElementsByClassName("svg")
  // for(let i = 0; i < numSVGs; i++){
  //   numSVGs[i].style.fill = "red";
  // }
  // setTimeout(() => {
  //   document.getElementById("body").style.border = "5px solid green";
  // }, 1000);
}

function randomSeed(){
  console.log("random seed");
  const svgs = document.getElementsByClassName("triangle");
    let rand = Math.floor(Math.random() * svgs.length);
    console.log(svgs[rand]);
}

function triangleListeners() {
  const triangles = document.getElementsByClassName("triangle");
  for (const triangle of triangles) {
    triangle.addEventListener("click", function (e) {

      // Grab the width and height of the screen
      const screenWidth = document.documentElement.clientWidth;
      const screenHeight = document.documentElement.clientHeight;

      // Number of triangles high / wide
      const numX = Math.ceil(screenWidth / 50);
      const numY = Math.ceil(screenHeight / 100);

      // Pull x and y coordinates off of the element
      let xval = parseInt(e.target.parentNode.getAttribute("id").split(",")[0]);
      let yval = parseInt(e.target.parentNode.getAttribute("id").split(",")[1]);

      // Measured distance from top and bottom
      distanceFromTop = parseInt(yval);
      distanceFromBottom = Math.ceil(screenHeight / 100) - yval;

      travelRandom(xval, yval, 100, null);

      // let randColor = "";

      function randomColor(){
        let colors = ["red", "orange", "yellow", "lime", "blue", "#06aae2", "violet"];
        let color = colors[Math.floor(Math.random()* colors.length)];
        return color;
      }

      // Set random path to travel
      function travelRandom(x, y, delay, lastChange) {
        let node = document.getElementById(`${parseInt(x)},${parseInt(y)}`);
        let orientation = "up";
        if(node){
          if(node.children[0].getAttribute("points") == "0,100, 50,0,100,100"){
            orientation = "up";
          } else {
            orientation = "down";
          }
        }

        let randColor = randomColor();

        console.log("Orientation: ", orientation);
        if (node == null || x > numX || y > numY) {
          console.log("--------- Wall was hit ----------");
          randomSeed();
          flashScreen();
          // travelRandom(xval, yval, 100, "x");
          return;
        }
        
        // What functionality the function is actually achieving.
        // In this case, change the fill color of the effected triangle
        // document.getElementById(`${parseInt(x)},${parseInt(y)}`).children[0].style.fill = randColor;
        document.getElementById(`${parseInt(x)},${parseInt(y)}`).children[0].parentNode.classList.toggle("grow");

        let rand = 0;
        console.log("lastChange:", lastChange);
        if (lastChange == "x") {                      // 2 -> 3
          rand = Math.floor(Math.random() * 2) + 2;
        } else if (lastChange == "y") {               // 0 -> 1
          rand = Math.floor(Math.random() * 2);
        } else {                                      // 0 -> 3
          rand = Math.floor(Math.random() * 3);
        }

        if(orientation == "up"){
          // Go left
          // Go right
          // Go down
          // Instaed of going up, go down
          if(rand == 3){
            rand = 2;
          }
        }
        if(orientation == "down"){
          // Go left
          // Go right
          // Go up
          // Instead of going down, go up
          if(rand == 2){
            rand = 3;
          }
        }

        console.log("Random Number:", rand);

        switch (rand) {
          case 0: // Move Right
            setTimeout(function () {
              travelRandom(x + 1, y, delay + 5, "x");
            }, delay);
            break;
          case 1: // Move Left
            setTimeout(function () {
              travelRandom(x - 1, y, delay + 5, "x");
            }, delay);
            break;
          case 2: // Move Down
            setTimeout(function () {
              travelRandom(x, y + 1, delay + 5, "y");
            }, delay);
            break;
          case 3: // Move Up
            setTimeout(function () {
              travelRandom(x, y - 1, delay + 5, "y");
            }, delay);
            break;
        }
      }
    })
  };
}

// Watch for a resize event, redraw triangles to fit screen size
window.addEventListener('resize', function (e) {
  console.log("Screen was resized");
  drawTriangles();
});

function drawTriangles() {

  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  console.log("ClientWidth: ", screenWidth);
  console.log("ClientHeight: ", screenHeight);

  const numTrianglesX = Math.ceil(screenWidth / 50);
  const numTrianglesY = Math.ceil(screenHeight / 100);
  console.log("Number of triangles to draw: ", numTrianglesX * numTrianglesY);

  console.log("Number of triangles X: ", screenHeight / 100);
  console.log("Number of triangles Y: ", screenWidth / 50);

  const remainderX = (screenWidth % 50);
  console.log("remainderX:", remainderX);

  const remainderY = (screenHeight % 100);
  console.log("remainderY:", remainderY);

  for (let j = 0; j <= numTrianglesY; j++) {

    for (let i = 0; i <= numTrianglesX + 2; i++) {

      // Create a new SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      // Set attributes
      svg.setAttribute("width", "100px");
      svg.setAttribute("height", "100px");
      svg.setAttribute("fill", "red");
      svg.setAttribute("position", "absolute");
      svg.setAttribute("id", i + "," + j);
      svg.style.left = i * 50 - 50 - remainderX;
      svg.style.top = j * 100 - 100 - remainderY;

      // Add SVG class
      svg.classList.add("svg");

      // Create the polygon and add it to the SVG
      if (j % 2 == 0) {
        if (i % 2 == 0) {
          svg.innerHTML = `<polygon points="0,  0,100,0, 50,100" class="triangle up"><text x="40" y="40" class="small">${i + ":" +j}</text></polygon>`;
        } else {
          svg.innerHTML = `<polygon points="0,100, 50,0,100,100" class="triangle down"><text x="40" y="40" class="small">${i + ":" +j}</text></polygon>`;
        }
      } else {
        if (i % 2 == 0) {
          svg.innerHTML = `<polygon points="0,100, 50,0,100,100" class="triangle down"><text x="40" y="40" class="small">${i + ":" +j}</text></polygon>`;
        } else {
          svg.innerHTML = `<polygon points="0,  0,100,0, 50,100" class="triangle up"><text x="40" y="40" class="small">${i + ":" +j}</text></polygon>`;
        }
      }

      // Add the SVG to the body
      document.getElementById("body").appendChild(svg);
    }
  }
}

function traingleEffect() {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  console.log("ClientWidth: ", screenWidth);
  console.log("ClientHeight: ", screenHeight);

  const numTrianglesX = Math.ceil(screenWidth / 50);
  const numTrianglesY = Math.ceil(screenHeight / 100);
  console.log("Number of triangles to draw: ", numTrianglesX * numTrianglesY);

  console.log("Number of triangles X: ", screenHeight / 100);
  console.log("Number of triangles Y: ", screenWidth / 50);

  const x = Math.floor(Math.random() * screenWidth / 50);
  const y = Math.floor(Math.random() * screenHeight / 100);

  const t0 = document.getElementById(`${x},${y}`).childNodes[0].classList;
  console.log(t0);

  // if (t0.contains("up")) {
  //   setTimeout(function () {
  //     const t1 = document.getElementById(`${x},${y}`).childNodes[0].style.fill = "white";
  //   }, 500);
  //   setTimeout(function () {
  //     const t2 = document.getElementById(`${x},${y-1}`).childNodes[0].style.fill = "red";
  //     const t3 = document.getElementById(`${x+1},${y}`).childNodes[0].style.fill = "red";
  //     const t4 = document.getElementById(`${x-1},${y}`).childNodes[0].style.fill = "red";
  //   }, 1000);
  // } else {
  //   const t1 = document.getElementById(`${x},${y}`).childNodes[0].style.fill = "white";
  //   const t2 = document.getElementById(`${x},${y+1}`).childNodes[0].style.fill = "red";
  //   const t3 = document.getElementById(`${x+1},${y}`).childNodes[0].style.fill = "red";
  //   const t4 = document.getElementById(`${x-1},${y}`).childNodes[0].style.fill = "red";
  // }

  const t1 = document.getElementById(`${x},${y}`);
  const t2 = document.getElementById(`${x + 1},${y}`);
  const t3 = document.getElementById(`${x + 1},${y}`);

}