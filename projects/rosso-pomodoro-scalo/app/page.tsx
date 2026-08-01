import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Location from "@/components/Location";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-tomato focus:px-4 focus:py-2 focus:text-white"
      >
        Vai al contenuto
      </a>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Location />
        <Reservations />
      </main>
      <Footer />
    </>
  );
}
