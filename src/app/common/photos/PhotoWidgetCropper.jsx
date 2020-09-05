import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  const cropper = useRef(null)

  console.log({cropper});

  function cropImage() {
    if (typeof cropper.current.cropper.getCroppedCanvas() === 'undefined') {
      return
    }

    cropper.current.cropper.getCroppedCanvas().toBlob(blob => {
      setImage(blob)
    }, 'image/jpeg')
  }

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      aspectRatio={0}
      preview='.img-preview'
      guides={false}
      viewMode={3}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  )
}
