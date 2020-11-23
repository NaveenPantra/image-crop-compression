// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const image = document.querySelector('img');
const getCanvas = document.querySelector('.getCanvas')
const preview = document.querySelector('.preview')
const imgPreview = document.querySelector('.imgPreview')

image.onload = function() {
    const croppingImage = new window.Cropper(image)
    getCanvas.addEventListener('click', function(event) {
        const croppedCanvas = croppingImage.getCroppedCanvas({
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high',
        })
        preview.appendChild(croppedCanvas)
        // imgPreview.src = croppedCanvas.toDataURL()
        imgPreview.src = croppedCanvas.toBlob((blob) => {
            console.log(blob.buffer)
            let url = URL.createObjectURL(blob);
            imgPreview.onload = function() {
                // no longer need to read the blob so it's revoked
                URL.revokeObjectURL(url);
            };
            imgPreview.src = url;
        })
    })
}