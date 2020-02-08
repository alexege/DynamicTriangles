document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript is connected");
    triangleListeners();
    drawTriangles();
});


function triangleListeners(){
      
  const triangles = document.getElementsByClassName("triangle");
  for(const triangle of triangles) {
    triangle.addEventListener("click", function(e) {
      console.log("triangle:",e.target.parentElement.classList.toggle("grow"));
    })
  };
}

// Watch for a resize event, redraw triangles to fit screen size
window.addEventListener('resize', function(e) {
  console.log("Screen was resized");
  drawTriangles();
});

function drawTriangles() {

  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  console.log("ClientWidth: ", screenWidth);
  console.log("ClientHeight: ", screenHeight);

  const numTrianglesX = Math.ceil(screenWidth / 50);
  const numTrianglesY = Math.ceil(screenHeight / 50);
  console.log("Number of triangles to draw: ", numTrianglesX * numTrianglesY);

  for(let j = 0; j <= numTrianglesY; j++){

    for(let i = 0; i <= numTrianglesX; i++){

      // Create a new SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      // Set attributes
      svg.setAttribute("width", "100px");
      svg.setAttribute("height", "100px");
      svg.setAttribute("fill", "red");
      svg.setAttribute("position", "absolute");
      svg.style.left = i * 50 - 50;
      svg.style.top =  j * 100;

      // Add SVG class
      svg.classList.add("svg");
      
      // Create the polygon and add it to the SVG
      if(j % 2 == 0){
        if(i % 2 == 0){
          svg.innerHTML = '<polygon points="0,  0,100,0, 50,100" class="triangle"></polygon>';
        } else {
          svg.innerHTML = '<polygon points="0,100, 50,0,100,100" class="triangle"></polygon>';
        }
      } else {
        if(i % 2 == 0){
          svg.innerHTML = '<polygon points="0,100, 50,0,100,100" class="triangle"></polygon>';
        } else {
          svg.innerHTML = '<polygon points="0,  0,100,0, 50,100" class="triangle"></polygon>';
        }
      }

      // Add the SVG to the body
      document.getElementById("body").appendChild(svg);
    }
  }
}
