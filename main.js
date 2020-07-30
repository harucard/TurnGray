(function(){
var canvas = document.getElementById("my-canvas");
var context = canvas.getContext("2d");
var img = document.createElement("img");
var btnGrayScale = document.querySelector("#grayscale");
var oImgData,aPix,nPixLen,oGrayImgvar,oGrayImg,dataURL;
var  btnDownload =document.getElementById("btn-download");

var hasText = true;
var clearCanvas = function (){
  if(hasText){
    context.clearRect(0, 0, canvas.width, canvas.height);
    hasText = false;
  }
}


context.textAlign="center";
context.font = "30px Arial";
context.fillText("Drop an image ", 960, 540);


console.log(canvas.width)

canvas.addEventListener("dragover",dragOver,false);
canvas.addEventListener("drop",dropImage,false);
img.addEventListener("load",loadingImage,false);
btnGrayScale.addEventListener("click",turnImageGray,false);
btnDownload.addEventListener("click",download,false);

function turnImageGray(){
  for (nPixel = 0; nPixel < nPixLen; nPixel += 4) {
    aPix[nPixel + 2] = aPix[nPixel + 1] = aPix[nPixel] = (aPix[nPixel] + aPix[nPixel + 1] + aPix[nPixel + 2]) / 3;
  }
  setImageOnCanvas();
}
function setImageOnCanvas(){
  context.putImageData(oImgData,0,0);
}
function download(){
 
 // oGrayImg = new Image();
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
  context.drawImage(img,0,0,canvas.width,canvas.height);
  //context.drawImage(img,0,0);
  //context.drawImage(img,0,0,1920,1080,0,0,canvas.width,canvas.height);
  oImgData = context.getImageData(0, 0, img.width, img.height);
  
  aPix = oImgData.data;
  nPixLen = aPix.length;
}
})()


