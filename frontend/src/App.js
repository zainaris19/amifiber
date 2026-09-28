import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import ServicesOverview from "@/pages/ServicesOverview";
import DarkFiber from "@/pages/DarkFiber";
import CustomInfrastructure from "@/pages/CustomInfrastructure";

function HomePage() {
  return (
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
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
        else el.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollManager />
        <div className="bg-white font-sans text-brand-ink antialiased">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesOverview />} />
            <Route path="/services/dark-fiber" element={<DarkFiber />} />
            <Route path="/services/custom-network-infrastructure" element={<CustomInfrastructure />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
