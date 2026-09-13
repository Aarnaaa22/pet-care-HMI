// src/components/Grooming/PhotoUploadCrop.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import { getCroppedImg } from '../../utils/crop';

export default function PhotoUploadCrop({ onSaveCroppedPhoto }) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedResult, setCroppedResult] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setCroppedResult(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false
  });

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedResult(croppedImage);
      onSaveCroppedPhoto && onSaveCroppedPhoto(croppedImage);
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  return (
    <div className="space-y-3">
      {/* File Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-ww-brass bg-emerald-50/50'
            : 'border-ww-wood-light bg-ww-paper-dark/30 hover:border-ww-brass hover:bg-ww-paper-dark/60'
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-2xl block mb-1">📷</span>
        <p className="text-xs font-extrabold text-ww-ink">
          {isDragActive ? 'Drop pet photo here...' : 'Upload pet photo for grooming comparison / portfolio'}
        </p>
        <p className="text-[10px] text-ww-wood">Supports PNG, JPG, WEBP formats</p>
      </div>

      {/* Interactive Cropper Area */}
      {image && !croppedResult && (
        <div className="space-y-3 bg-ww-paper-dark/50 p-3 rounded-2xl border border-ww-paper-dark">
          <div className="relative h-56 w-full rounded-xl overflow-hidden bg-black">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-ww-wood">Zoom:</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-ww-brass cursor-pointer"
            />
            <button
              onClick={handleSaveCrop}
              className="px-4 py-1.5 bg-ww-brass text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
            >
              ✂️ Save Cropped Photo
            </button>
          </div>
        </div>
      )}

      {/* Cropped Result Preview */}
      {croppedResult && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
          <img
            src={croppedResult}
            alt="Cropped Preview"
            className="w-16 h-16 rounded-xl object-cover border border-emerald-300 shadow-sm"
          />
          <div className="flex-1">
            <p className="text-xs font-extrabold text-emerald-900">✓ Photo Cropped &amp; Saved!</p>
            <p className="text-[10px] text-emerald-700">Ready to attach to grooming booking or portfolio.</p>
          </div>
          <button
            onClick={() => {
              setImage(null);
              setCroppedResult(null);
            }}
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
