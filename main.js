(function(){
var oImgData,aPix,nPixLen,oGrayImgvar,oGrayImg,dataURL,imageTest;
var startX, endX, startY, endY;
var currShape = 'rectangle';
var hasText = true;
var mouseIsDown =0;
var x = "#7CFC00";
var y =2;

var img = document.createElement("img");
var canvas = document.getElementById("my-canvas");
var btnGrayScale = document.querySelector("#grayscale");
var  btnDownload =document.getElementById("btn-download");
var btnCutImage = document.getElementById("cutImage");

var context = canvas.getContext("2d");

context.textAlign="center";
context.font = "30px Arial";
context.fillText("Drop an image ", 960, 540);

canvas.addEventListener("dragover",dragOver,false);
canvas.addEventListener("drop",dropImage,false);
img.addEventListener("load",loadingImage,false);
btnGrayScale.addEventListener("click",turnImageGray,false);
btnDownload.addEventListener("click",download,false);
btnCutImage.addEventListener("click",cutImage,false);

function cutImage(){
  img.src =  canvas.toDataURL('image/png');
  imageTest =img;
 canvas.addEventListener("mousedown",mouseDown,false);
 canvas.addEventListener("mousemove",mouseMove,false);
 canvas.addEventListener("mouseup",mouseUp,false);
}

function mouseDown(evt){
  mouseIsDown = 1;
  var pos = getMousePos(canvas, evt);
  startX = endX = pos.x;
  startY = endY = pos.y;
  if(currShape=='rectangle')
  {
      drawSquare(); //update on mouse-up
  }
}

function mouseMove(evt){
  if (mouseIsDown !== 0) {
    var pos = getMousePos(canvas, evt);
    endX = pos.x;
    endY = pos.y;
    drawSquare();
}
}

function mouseUp(evt){
 if(mouseIsDown !== 0){
   mouseIsDown=0;
   var pos =getMousePos(canvas,evt);
   endX = pos.x;
   endY = pos.y;
   if(currShape=="rectangle"){
     drawSquare();
   }
 }
}

function drawSquare(){
  if(imageTest){
    context.drawImage(imageTest,0,0);
  }

    var w = endX - startX;
    var h = endY - startY;
    var offsetX = (w < 0) ? w : 0;
    var offsetY = (h < 0) ? h : 0;
    var width = Math.abs(w);
    var height = Math.abs(h);

    context.beginPath();
    context.globalAlpha=0.7;
    context.rect(startX + offsetX, startY + offsetY, width, height);
    context.fillStyle = x;
    context.setLineDash([20,20]);
    context.lineWidth = y;
    context.strokeStyle = x;
    context.stroke();
}

function getMousePos(canvas,evt){
  var rect = canvas.getBoundingClientRect();
  return{
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



function turnImageGray(){
  for (nPixel = 0; nPixel < nPixLen; nPixel += 4) {
    aPix[nPixel + 2] = aPix[nPixel + 1] = aPix[nPixel] = (aPix[nPixel] + aPix[nPixel + 1] + aPix[nPixel + 2]) / 3;
  }
  setImageOnCanvas();
}

function clearCanvas(){
  if(hasText){
    context.clearRect(0, 0, canvas.width, canvas.height);
    hasText = false;}
}

function setImageOnCanvas(){
 // imageTest = oImgData;
  context.putImageData(oImgData,0,0);
}

function download(){
 dataURL = canvas.toDataURL('image/png');
 btnDownload.href = dataURL;
}

function dragOver(evt){
evt.preventDefault();
}

function dropImage(evt){
  var files = evt.dataTransfer.files;
  if (files.length > 0) {
    var file = files[0];
    if (typeof FileReader !== "undefined" && file.type.indexOf("image") !=-1) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        img.src = evt.target.result;
       
      };
      reader.readAsDataURL(file);
    }
  }
  evt.preventDefault();
}

function loadingImage(){
  clearCanvas();
  canvas.width = img.width;
  canvas.height = img.height;
  //imageTest=img;
  context.drawImage(img,0,0,canvas.width,canvas.height);
  //context.drawImage(img,0,0);
  //context.drawImage(img,0,0,1920,1080,0,0,canvas.width,canvas.height);
 //console.log("dataURL:"+ canvas.toDataURL('image/png'))
  oImgData = context.getImageData(0, 0, img.width, img.height);
 
  aPix = oImgData.data;
  nPixLen = aPix.length;
}
})()


