import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-24 flex-1 text-center">
        <h1 className="text-4xl font-bold">404 — Page not found</h1>
        <p className="mt-4">The page you are looking for does not exist.</p>
      </main>
      <Footer />
    </div>
  );
}
