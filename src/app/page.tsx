import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WhyWeExist from "@/components/home/WhyWeExist";
import Stats from "@/components/home/Stats";
import Faqs from "@/components/home/Faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <HowItWorks />
      <WhyChooseUs />
      <WhyWeExist />
      <Stats />
      <Faqs />
    </>
  );
}
