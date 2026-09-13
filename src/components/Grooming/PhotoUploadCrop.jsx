import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/crop";
import { useDropzone } from "react-dropzone";

/**
 * PhotoUploadCrop - simple uploader + cropper
 * onSave returns a dataURL (base64) of cropped image
 */
export default function PhotoUploadCrop({ onSave }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave && onSave(cropped);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {!imageSrc ? (
        <div {...getRootProps()} className="p-4 border-dashed border-2 rounded text-center cursor-pointer hover:border-green-500 transition">
          <input {...getInputProps()} />
          <div className="text-sm text-gray-600">Drag or click to upload image</div>
        </div>
      ) : (
        <>
          <div className="relative h-64 bg-gray-200 rounded overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4/3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium" onClick={handleSave}>Save</button>
            <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50" onClick={() => setImageSrc(null)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
