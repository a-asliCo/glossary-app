"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Larger Logo */}
      <Link href="/">
        <Image 
          src="/logo.png" 
          alt="Glossary Logo" 
          width={200}  // Increased width
          height={80}  // Increased height
          className="hover:opacity-90 transition-all"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">Glossary</Link>
        <Link href="/about" className="hover:bg-gray-700 px-4 py-2 rounded">About</Link>
      </nav>
    </header>
  );
}
