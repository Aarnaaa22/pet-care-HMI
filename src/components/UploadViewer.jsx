// src/components/UploadViewer.jsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadViewer({ attachments = [], onAddAttachment, onDeleteAttachment }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      setUploadProgress(20);
      const reader = new FileReader();
      
      let progress = 20;
      const interval = setInterval(() => {
        progress += 30;
        setUploadProgress(Math.min(progress, 90));
      }, 100);

      reader.onloadend = () => {
        clearInterval(interval);
        setUploadProgress(100);
        setTimeout(() => {
          setUploadProgress(null);
          const newAtt = {
            id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            name: file.name,
            type: file.type.includes('pdf') ? 'pdf' : 'image',
            url: reader.result,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            uploadedAt: new Date().toLocaleDateString()
          };
          onAddAttachment && onAddAttachment(newAtt);
        }, 300);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div className="space-y-3">
      {/* Drag & Drop File Upload Box */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-ww-brass bg-emerald-50/50'
            : 'border-ww-wood-light bg-ww-paper-dark/30 hover:border-ww-brass hover:bg-ww-paper-dark/60'
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-2xl block mb-1">📁</span>
        <p className="text-xs font-extrabold text-ww-ink">
          {isDragActive ? 'Drop medical attachment files here...' : 'Click or drag lab reports, vaccines, or PDFs here'}
        </p>
        <p className="text-[10px] text-ww-wood font-medium mt-0.5">
          Supports PNG, JPG, WEBP, and PDF documents (Max 10MB)
        </p>
      </div>

      {/* Upload Progress Bar */}
      {uploadProgress !== null && (
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-ww-wood">
            <span>Uploading medical document...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-ww-paper-dark rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-ww-brass h-1.5 rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Attachments Thumbnail Grid */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {attachments.map(att => (
            <div
              key={att.id}
              className="group relative bg-ww-paper border border-ww-paper-dark rounded-xl p-2 flex items-center gap-2.5 shadow-sm hover:border-ww-brass transition"
            >
              {att.type === 'pdf' ? (
                <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
              ) : (
                <img
                  src={att.url}
                  alt={att.name}
                  className="w-9 h-9 rounded-lg object-cover border border-ww-paper-dark shrink-0"
                />
              )}

              <div className="min-w-0 pr-5">
                <p className="text-xs font-bold text-ww-ink truncate max-w-[120px]" title={att.name}>
                  {att.name}
                </p>
                <p className="text-[10px] text-ww-wood">{att.size}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(att)}
                  className="text-[10px] font-extrabold px-2 py-1 bg-ww-paper-dark hover:bg-ww-brass hover:text-white rounded-lg transition"
                >
                  View
                </button>
                {onDeleteAttachment && (
                  <button
                    type="button"
                    onClick={() => onDeleteAttachment(att.id)}
                    className="text-[10px] text-rose-500 hover:text-rose-700 px-1 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Document Viewer Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ww-paper border-2 border-ww-wood-light rounded-3xl p-5 shadow-warm-lg max-w-3xl w-full max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ww-paper-dark mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedDoc.type === 'pdf' ? '📄' : '🖼️'}</span>
                  <h3 className="font-extrabold text-sm text-ww-ink truncate max-w-sm">
                    {selectedDoc.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="w-8 h-8 rounded-full bg-ww-paper-dark text-ww-wood hover:bg-rose-100 hover:text-rose-600 font-bold transition flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-ww-paper-dark/40 rounded-2xl p-4 flex items-center justify-center min-h-[300px]">
                {selectedDoc.type === 'pdf' ? (
                  <iframe
                    src={selectedDoc.url}
                    title={selectedDoc.name}
                    className="w-full h-[450px] rounded-xl border border-ww-paper-dark"
                  />
                ) : (
                  <img
                    src={selectedDoc.url}
                    alt={selectedDoc.name}
                    className="max-h-[450px] max-w-full rounded-xl object-contain shadow-warm-md"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-ww-paper-dark mt-3">
                <a
                  href={selectedDoc.url}
                  download={selectedDoc.name}
                  className="px-4 py-2 bg-ww-brass text-white font-extrabold text-xs rounded-xl shadow hover:brightness-105 transition"
                >
                  📥 Download Document
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
