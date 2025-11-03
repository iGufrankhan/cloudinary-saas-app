"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Upload, Download, Palette } from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] =
    useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image 😢");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-start py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 bg-clip-text text-transparent text-center mb-4 drop-shadow-lg py-2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Palette className="w-8 h-8 inline mr-3 text-cyan-400" aria-hidden="true" />
        Social Media Image Creator
      </motion.h1>

      {/* Card Container */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl w-full max-w-3xl p-6 space-y-6 mt-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Upload Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-cyan-300">
            <Upload className="w-5 h-5" /> Upload an Image
          </h2>
          <input
            type="file"
            onChange={handleFileUpload}
            className="file-input file-input-bordered w-full file-input-accent"
          />

          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-accent w-full"></progress>
            </div>
          )}
        </div>

        {/* Transformation Section */}
        {uploadedImage && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Format Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-cyan-300">
                Select Format
              </h2>
              <select
                className="select select-bordered w-full bg-black/40 border-cyan-500/40 focus:border-cyan-400"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
              >
                {Object.keys(socialFormats).map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Preview */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-cyan-200">
                Preview
              </h3>
              <div className="relative flex justify-center items-center rounded-xl overflow-hidden border border-white/10 p-3 bg-black/30 shadow-inner">
                {isTransforming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                    <span className="loading loading-spinner loading-lg text-cyan-400"></span>
                  </div>
                )}
                <CldImage
                  width={socialFormats[selectedFormat].width}
                  height={socialFormats[selectedFormat].height}
                  src={uploadedImage}
                  sizes="100vw"
                  alt="Transformed image"
                  crop="fill"
                  aspectRatio={socialFormats[selectedFormat].aspectRatio}
                  gravity="auto"
                  ref={imageRef}
                  onLoad={() => setIsTransforming(false)}
                  className="rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end">
              <button
                className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-none text-white flex items-center gap-2 px-6 py-2 rounded-lg shadow-md hover:shadow-cyan-500/40 transition-all"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
                Download for {selectedFormat}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
