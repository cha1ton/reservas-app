// src/app/page.tsx

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import ComoFunciona from "@/components/ComoFunciona";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Servicios />
      <ComoFunciona />
      <Footer />
    </main>
  );
}