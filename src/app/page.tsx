import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import CTA from "@/components/CTA";
import Features from "@/components/Features";

const HomePage: React.FC = () => {
  return (
    <>
      {/* 🟦 Glavna sekcija Hero */}
      <Hero />

      

      {/* 🟩 Ostala vsebina */}
      <Container className="mt-10">
        <Features />
        <Benefits />
        <FAQ />
      </Container>

      {/* 🟧 CTA (tu se že nahaja TravelSearch – tega pusti pri miru!) */}
      <CTA />
    </>
  );
};

export default HomePage;

