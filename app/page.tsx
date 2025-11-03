"use client";

import { motion } from "framer-motion";
import { Video, Zap, Upload, Share2, ArrowRight, Film, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-sm text-cyan-400"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={16} />
            AI-Powered Video Optimization
          </motion.div>
          
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 bg-clip-text text-transparent">
            Transform, Compress & Share Your Videos
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl max-w-2xl mx-auto">
            Upload videos, compress them by up to 70%, create stunning social media images, 
            and share optimized content—all in one powerful platform.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/video-upload"
              className="flex h-12 items-center gap-2 rounded-full bg-cyan-500 px-8 text-base font-semibold text-black transition-all hover:bg-cyan-400 hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              <Upload size={20} />
              Upload Your Video
            </Link>
            <Link
              href="/home"
              className="flex h-12 items-center gap-2 rounded-full border border-cyan-500 px-8 text-base font-semibold text-cyan-400 transition-all hover:bg-cyan-500/10"
            >
              Browse Videos
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Floating Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-900/50">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Everything You Need for Video Optimization
          </motion.h2>
          <motion.p
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From upload to download, we've got you covered with cutting-edge tools
          </motion.p>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Video className="w-10 h-10 text-cyan-400" />,
                title: "Smart Video Compression",
                desc: "Reduce file size by up to 70% without losing quality. Perfect for social media and web.",
              },
              {
                icon: <Share2 className="w-10 h-10 text-pink-400" />,
                title: "Social Media Creator",
                desc: "Generate eye-catching images for Instagram, Facebook, and Twitter with custom text overlays.",
              },
              {
                icon: <Film className="w-10 h-10 text-blue-400" />,
                title: "Video Library",
                desc: "Browse, preview, and download all your compressed videos from one centralized dashboard.",
              },
              {
                icon: <Zap className="w-10 h-10 text-yellow-400" />,
                title: "Lightning Fast Processing",
                desc: "Cloud-powered compression delivers results in seconds, not minutes.",
              },
              {
                icon: <Clock className="w-10 h-10 text-green-400" />,
                title: "Instant Preview",
                desc: "Hover over videos to see a 15-second preview before downloading.",
              },
              {
                icon: <Upload className="w-10 h-10 text-purple-400" />,
                title: "Drag & Drop Upload",
                desc: "Upload videos up to 70MB with a simple drag-and-drop interface.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Upload Your Video",
                desc: "Drag and drop or select a video file up to 70MB. Add a title and description.",
              },
              {
                step: "2",
                title: "AI Compression",
                desc: "Our cloud engine automatically compresses your video while maintaining quality.",
              },
              {
                step: "3",
                title: "Download & Share",
                desc: "Preview, download your optimized video, or create social media images instantly.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-2xl font-bold text-white shadow-lg shadow-cyan-500/50">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-y border-cyan-500/20">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Videos?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join content creators who are saving time and bandwidth with smart video compression.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-10 text-lg font-semibold text-white transition-all hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/home"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-cyan-500 px-10 text-lg font-semibold text-cyan-400 transition-all hover:bg-cyan-500/10"
            >
              <Film size={20} />
              View Demo Videos
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2025 Video Optimizer SaaS. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/home" className="hover:text-cyan-400 transition-colors">Videos</Link>
            <Link href="/video-upload" className="hover:text-cyan-400 transition-colors">Upload</Link>
            <Link href="/social-share" className="hover:text-cyan-400 transition-colors">Social Creator</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
