import BestProductsSection from "@/components/BestProductsSection";
import GetStartedSection from "@/components/GetStartedSection";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <>
      <div className="flex flex-col pt-19 w-full gap-12 pb-16">

          <HeroBanner />

         <BestProductsSection />

         <GetStartedSection />
      </div>
    </>
  );
}
