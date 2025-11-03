"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Video } from "@prisma/client";
import VideoCard from "@/components/VideoCard";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Film } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

  // Force reload on first sign-in to update UI
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const hasReloaded = sessionStorage.getItem("hasReloadedAfterAuth");
      if (!hasReloaded) {
        sessionStorage.setItem("hasReloadedAfterAuth", "true");
        window.location.reload();
      }
    }
  }, [isLoaded, isSignedIn]);

  // Fetch videos from API
  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch videos 😢");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchVideos();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [fetchVideos, isLoaded, isSignedIn]);

  // Download video function
  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Loading State
  if (loading || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <Loader2 className="animate-spin w-12 h-12 mb-4 text-blue-500" />
        <p className="text-lg font-medium">Loading your videos...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="w-12 h-12 mb-3" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Empty State
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <Film className="w-16 h-16 mb-3 text-gray-400" />
        <p className="text-lg font-medium">No videos available yet 🎥</p>
      </div>
    );
  }

  // Main Content
  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white-800">
          <Film className="w-8 h-8 inline mr-3 text-cyan-400" aria-hidden="true" />
          Explore Videos
        </h1>
        <p className=" bold text-white-500 mt-2 sm:mt-0 text-white-800">
          {videos.length} video{videos.length > 1 && "s"} available
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <VideoCard video={video} onDownload={handleDownload} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Home;
