let img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
img.crossOrigin = "Anonymous";
img.onload = function() {
  let canvasOringinal = document.getElementById('canvas');
  let ctxOriginal = canvasOringinal.getContext('2d');
  canvasOringinal.setAttribute("width", `${img.naturalWidth}`)
  canvasOringinal.setAttribute("height", `${img.naturalHeight}`)
  ctxOriginal.drawImage(img, 0, 0);
  let originalImageData = ctxOriginal.getImageData(0, 0, canvas.width, canvas.height);
  let originalData = originalImageData.data;

  for (i = 0; i < originalData.length; i +=4 ) {
    let meanPixel = (originalData[i] + originalData[i + 1] + originalData[i + 2]) / 3;
    originalData[i] = meanPixel;
    originalData[i + 1] = meanPixel;
    originalData[i + 2] = meanPixel;
  }

  // ctxOriginal.putImageData(originalImageData, 0, 0);

  draw(this, originalData, originalImageData);
};

function draw(img, originalData, originalImageData) {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  ctx.putImageData(originalImageData, 0, 0);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let data = imageData.data;



  let convertToGreyscale = () => {
    for (i = 0; i < data.length; i +=4 ) {
      let meanPixel = (originalData[i] + originalData[i + 1] + originalData[i + 2]) / 3;
      data[i] = meanPixel;
      data[i + 1] = meanPixel;
      data[i + 2] = meanPixel;
    }
    ctx.putImageData(imageData, 0, 0);
  }


  let button = document.getElementById('make-greyscale');
  button.addEventListener('click',convertToGreyscale);



  let sliderThresh = document.getElementById('threshold-slider');
  sliderThresh.setAttribute('max', 255)

  let applyThreshAndMask = () => {
    // console.log(data.slice(0, 16))
    data = originalData;
    for (i = 0; i < data.length; i += 4) {
      if (originalData[i] > sliderThresh.valueAsNumber) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  sliderThresh.addEventListener('input',applyThreshAndMask)
}
