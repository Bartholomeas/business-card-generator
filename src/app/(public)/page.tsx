import { BenefitsSection } from "~/components/public/landing/benefits-section/benefits-section";
import { HeroCoreSection } from "~/components/public/landing/hero-core-section/hero-core-section";
import { ImgShowcaseSection } from "~/components/public/landing/img-showcase-section/img-showcase-section";

export default async function Home() {
  return (
    <>
      <HeroCoreSection />
      <BenefitsSection />
      <ImgShowcaseSection />
    </>
  );
}
