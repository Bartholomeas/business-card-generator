import { BenefitsSection } from "~/components/public/landing/benefits-section/benefits-section";
import { HeroShuffleSection } from "~/components/public/landing/hero-shuffle-section/hero-shuffle-section";
import { ImgShowcaseSection } from "~/components/public/landing/img-showcase-section/img-showcase-section";

export default async function Home() {
  return (
    <>
      <HeroShuffleSection />
      <BenefitsSection />
      <ImgShowcaseSection />
    </>
  );
}
