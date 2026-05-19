import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WhyWeExist from "@/components/home/WhyWeExist";
import Stats from "@/components/home/Stats";
import Faqs from "@/components/home/Faqs";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "vCareAlert",
      url: "https://www.vcarealert.com",
      logo: "https://www.vcarealert.com/cropped_circle_image.png",
      description:
        "Award-winning medical alert systems for seniors with GPS tracking, fall detection, and 24/7 professional monitoring.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      name: "vCareAlert",
      url: "https://www.vcarealert.com",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a medical alert system?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A medical alert system is a personal emergency response device that connects you to a 24/7 monitoring center at the push of a button, ensuring help is dispatched quickly during a medical emergency.",
          },
        },
        {
          "@type": "Question",
          name: "How does fall detection work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fall detection uses built-in sensors to automatically detect when a fall occurs and alerts our 24/7 monitoring center, even if you are unable to press the button yourself.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a landline for a medical alert system?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. vCareAlert systems use cellular connections, so no landline is required. Our devices work anywhere with cellular coverage.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
