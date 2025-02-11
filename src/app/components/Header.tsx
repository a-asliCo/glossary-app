"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1 className="text-xl font-bold">Glossary</h1>
      <nav>
        <Link href="/" className="hover:bg-blue-700">Glossary</Link>
        <Link href="/about" className="hover:bg-blue-700">About</Link>
      </nav>
    </header>
  );
}
