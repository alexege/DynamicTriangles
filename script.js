document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is connected");
  drawTriangles();
  triangleListeners();
  traingleEffect();
});

function triangleListeners() {
  const triangles = document.getElementsByClassName("triangle");
  for (const triangle of triangles) {
    triangle.addEventListener("click", function (e) {
      const screenHeight = document.documentElement.clientHeight;
      let xval = e.target.parentNode.getAttribute("id").split(",")[0];
      let yval = e.target.parentNode.getAttribute("id").split(",")[1];

      distanceFromTop = parseInt(yval);
      distanceFromBottom = Math.ceil(screenHeight / 100) - yval;

      // Establish which is higher. Distance from top or bottom. Loop through that in both directions
      if (distanceFromBottom > distanceFromTop) {
        let j = distanceFromTop;
        console.log("distanceTop:", distanceFromTop);
        console.log("distanceBottom:", distanceFromBottom);
        for (let i = distanceFromTop; i <= screenHeight; i++) {
          // console.log(parseInt(xval) + "," + parseInt(i));
          console.log("i:", i, ",", "j:", j);
          let rand = Math.ceil(Math.random() * 3);
          console.log(rand);
          try {
            document.getElementById(`${parseInt(xval)},${parseInt(i)}`).children[0].parentNode.classList.add("grow");
            document.getElementById(`${parseInt(xval)},${parseInt(j)}`).children[0].parentNode.classList.add("grow");
          } catch (e) {

          }
          j--;
        }
      } else {
        console.log("TOP > BOTTOM");
        let j = distanceFromTop;
        for (let i = distanceFromTop; i > 0; i--) {
          console.log("i:", i, ", j:", j);
          try {
            document.getElementById(`${parseInt(xval)},${parseInt(i)}`).children[0].parentNode.classList.toggle("grow");
            document.getElementById(`${parseInt(xval)},${parseInt(j)}`).children[0].parentNode.classList.toggle("grow");
          } catch (e) {

          }
          j++;
        }
      }

      console.log("TOP:", distanceFromTop);
      console.log("Bottom:", distanceFromBottom);
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
          svg.innerHTML = `<polygon points="0,  0,100,0, 50,100" class="triangle up"></polygon><text x="40" y="40" class="small">${i + ":" +j}</text>`;
        } else {
          svg.innerHTML = `<polygon points="0,100, 50,0,100,100" class="triangle down"></polygon><text x="40" y="40" class="small">${i + ":" +j}</text>`;
        }
      } else {
        if (i % 2 == 0) {
          svg.innerHTML = `<polygon points="0,100, 50,0,100,100" class="triangle down"></polygon><text x="40" y="40" class="small">${i + ":" +j}</text>`;
        } else {
          svg.innerHTML = `<polygon points="0,  0,100,0, 50,100" class="triangle up"></polygon><text x="40" y="40" class="small">${i + ":" +j}</text>`;
        }
      }

      // setTimeout(function(){
      //   document.getElementById("body").appendChild(svg);
      // }, 200 * i/2);

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

  if (t0.contains("up")) {
    setTimeout(function () {
      const t1 = document.getElementById(`${x},${y}`).childNodes[0].style.fill = "white";
    }, 500);
    setTimeout(function () {
      const t2 = document.getElementById(`${x},${y-1}`).childNodes[0].style.fill = "red";
      const t3 = document.getElementById(`${x+1},${y}`).childNodes[0].style.fill = "red";
      const t4 = document.getElementById(`${x-1},${y}`).childNodes[0].style.fill = "red";
    }, 1000);
  } else {
    const t1 = document.getElementById(`${x},${y}`).childNodes[0].style.fill = "white";
    const t2 = document.getElementById(`${x},${y+1}`).childNodes[0].style.fill = "red";
    const t3 = document.getElementById(`${x+1},${y}`).childNodes[0].style.fill = "red";
    const t4 = document.getElementById(`${x-1},${y}`).childNodes[0].style.fill = "red";
  }

  const t1 = document.getElementById(`${x},${y}`);
  const t2 = document.getElementById(`${x + 1},${y}`);
  const t3 = document.getElementById(`${x + 1},${y}`);

}