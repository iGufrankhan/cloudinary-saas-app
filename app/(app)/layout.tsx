"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Upload Video" },
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => router.push("/");
  const handleSignOut = async () => await signOut();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="drawer-content flex flex-col">
        {/* 🌈 NAVBAR */}
        <header className="w-full bg-black/40 backdrop-blur-lg border-b border-white/10 shadow-lg">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Sidebar toggle (mobile) */}
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-ghost lg:hidden text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <MenuIcon className="h-6 w-6" />
              </label>

              {/* Brand Logo */}
              <div
                onClick={handleLogoClick}
                className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
              >
                Cloudinary Showcase
              </div>
            </div>

            {/* User Section */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-2 ring-cyan-400 ring-offset-2 ring-offset-black">
                    <img
                      src={user.imageUrl}
                      alt={user.username || user.emailAddresses[0].emailAddress}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-300 truncate max-w-[120px] md:max-w-[200px]">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full bg-white/10 hover:bg-cyan-500/20 transition-all text-gray-300 hover:text-cyan-400"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* 🧊 SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-white/5 backdrop-blur-xl border-r border-white/10 w-64 h-full flex flex-col shadow-xl">
          {/* Sidebar Header */}
          <div className="flex items-center justify-center py-6 border-b border-white/10">
            <div className="flex flex-col items-center">
              <ImageIcon className="w-10 h-10 text-cyan-400 mb-1" />
              <h2 className="text-lg font-semibold tracking-wide text-cyan-300">
                Dashboard
              </h2>
            </div>
          </div>

          {/* Sidebar Menu */}
          <ul className="menu p-4 w-full text-sm flex-grow space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/40 shadow-md"
                        : "hover:bg-white/10 text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-cyan-400"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Sign Out Button */}
          {user && (
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-pink-500/40 transition-all duration-300"
              >
                <LogOutIcon className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
