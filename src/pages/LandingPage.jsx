import Cta from "../components/LandingPage/Cta";
import Feedback from "../components/LandingPage/Feedback";
import Hero from "../components/LandingPage/Hero";
import Jobs from "../components/LandingPage/Jobs";
import PillarSection from "../components/LandingPage/PillarSection";
import Stats from "../components/LandingPage/Stats";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <PillarSection />
      <Jobs />
      <Feedback />
      <Cta />
    </>
  );
};

export default LandingPage;
