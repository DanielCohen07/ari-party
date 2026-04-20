import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import LocationSection from "@/components/LocationSection";
import RSVPForm from "@/components/RSVPForm";
import GiftSection from "@/components/GiftSection";
import WhatsWaiting from "@/components/WhatsWaiting";
import FallingLeaves from "@/components/FallingLeaves";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Aegean deep-sea gradient */}
      <div className="fixed inset-0 -z-10" style={{
        background: "linear-gradient(168deg, #050e1f 0%, #0a1e3d 25%, #0f3460 55%, #1565c0 80%, #0a3d7a 100%)",
      }} />

      {/* Subtle marble texture overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Greek column pillars — decorative sides */}
      <div className="fixed top-0 bottom-0 left-0 w-3 opacity-30" style={{
        background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 2px, transparent 2px, transparent 20px)",
      }} />
      <div className="fixed top-0 bottom-0 right-0 w-3 opacity-30" style={{
        background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 2px, transparent 2px, transparent 20px)",
      }} />

      {/* Falling olive leaves */}
      <FallingLeaves />

      <div className="relative z-10 flex flex-col items-center gap-0 pb-24">
        <HeroSection />
        <EventDetails />
        <WhatsWaiting />
        <LocationSection />
        <RSVPForm />
        <GiftSection />
      </div>
    </main>
  );
}
