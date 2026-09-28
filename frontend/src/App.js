import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import Marquee from "@/components/Marquee";
import Introduction from "@/components/Introduction";
import NetworkStats from "@/components/NetworkStats";
import NetworkMap from "@/components/NetworkMap";
import Services from "@/components/Services";
import InfrastructureFeature from "@/components/InfrastructureFeature";
import Solutions from "@/components/Solutions";
import WhyAmifiber from "@/components/WhyAmifiber";
import Industries from "@/components/Industries";
import ConnectivityDiagram from "@/components/ConnectivityDiagram";
import Reliability from "@/components/Reliability";
import RegionalVision from "@/components/RegionalVision";
import FinalCTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-white font-sans text-brand-ink antialiased">
        <Navbar />
        <main>
          <HeroVideo />
          <Marquee />
          <Introduction />
          <NetworkStats />
          <NetworkMap />
          <Services />
          <InfrastructureFeature />
          <Solutions />
          <WhyAmifiber />
          <Industries />
          <ConnectivityDiagram />
          <Reliability />
          <RegionalVision />
          <FinalCTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
