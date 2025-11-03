"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, Film } from "lucide-react";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70 MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("⚠️ File size exceeds 70MB limit.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to upload video. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start py-12 px-6 bg-gradient-to-b from-black via-gray-900 to-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Film className="w-8 h-8 inline mr-3 text-cyan-400" aria-hidden="true" />
        Video Uploader
      </motion.h1>

      {/* Upload Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl p-8 space-y-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-cyan-300">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-black/40 border-cyan-400/40 focus:border-cyan-300 text-white"
              placeholder="Enter video title..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-cyan-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full bg-black/40 border-cyan-400/40 focus:border-cyan-300 text-white"
              placeholder="Enter a short description..."
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-cyan-300">
              Select Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file-input file-input-bordered w-full file-input-accent bg-black/40 border-cyan-400/40"
              required
            />
          </div>

          {/* Upload Button */}
          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3 rounded-lg shadow-lg transition-all hover:shadow-cyan-500/30 disabled:opacity-60"
            disabled={isUploading}
            whileTap={{ scale: 0.97 }}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5" /> Upload Video
              </>
            )}
          </motion.button>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-accent w-full"></progress>
              <p className="text-sm text-center text-gray-300 mt-2">
                Uploading your video... Please wait ⏳
              </p>
            </div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
