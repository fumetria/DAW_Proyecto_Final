import Header from "./ui/components/Header";
import Hero from "./ui/landing/Hero";
import Features from "./ui/landing/Features";
import Pricing from "./ui/landing/Pricing";
import Contact from "./ui/landing/Contact";
import Footer from "./ui/landing/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-slate-950">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
