"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black">
      <h1>School Management Portal</h1>

      <Link className="mr-4 underLine" href="/login"></Link>
    </div>
  );
}
