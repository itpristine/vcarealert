import Hero from "@/components/home/Hero";
import WhyWeExist from "@/components/home/WhyWeExist";
import ServicesGrid from "@/components/home/ServicesGrid";
import Innovation from "@/components/home/Innovation";
import Faqs from "@/components/home/Faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyWeExist />
      <ServicesGrid />
      <Innovation />
      <Faqs />
    </>
  );
}
