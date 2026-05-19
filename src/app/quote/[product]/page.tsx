import QuoteForm from "@/components/forms/QuoteForm";
import { CheckCircle2, ShieldCheck, Home, Smartphone, Watch, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

// Define the static product data
const productData = {
  "home-system": {
    name: "Home System",
    title: "Reliable Protection at Home",
    description: "Our Home System connects to a base station to provide coverage throughout your house and yard. It's the perfect solution for individuals who spend most of their time at home and want immediate access to help without relying on a mobile phone.",
    image: "/Home-Cellular-System-with-Help-Buttons-Trans@2x.avif",
    features: [
      "No landline required (cellular connection built-in)",
      "Water-resistant pendant or wristband",
      "Two-way voice communication directly through the base station",
      "1,000 ft range from base station",
      "Backup battery lasts up to 32 hours"
    ],
    icon: <Home className="w-12 h-12 text-primary" />
  },
  "mobile-system": {
    name: "Mobile System",
    title: "Protection Wherever You Go",
    description: "The Mobile System is an all-in-one device that provides protection both inside and outside your home. Utilizing nationwide cellular networks and GPS technology, our operators can locate you in an emergency and send help right to your location.",
    image: "/Mobile-Systems@2x.avif",
    features: [
      "Advanced GPS and Wi-Fi location tracking",
      "Automatic fall detection available",
      "Lightweight, wearable design",
      "Built-in two-way speaker and microphone",
      "Water-resistant for use in the shower"
    ],
    icon: <Smartphone className="w-12 h-12 text-primary" />
  },
  "smartwatch": {
    name: "Smartwatch",
    title: "Active Protection, Discreetly Designed",
    description: "The vCareAlert Smartwatch offers emergency protection wrapped in a modern, sleek design. It looks like a standard smartwatch but provides one-touch access to our 24/7 monitoring center, plus fitness tracking to support a healthy lifestyle.",
    image: "/Smartwatch-Trans@2x.avif",
    features: [
      "Heart rate monitor & step counter",
      "Built-in automatic fall detection",
      "Discreet SOS button",
      "Weather forecasts and daily tracking",
      "Text-to-speech two-way communication"
    ],
    icon: <Watch className="w-12 h-12 text-primary" />
  }
};

const productMeta: Record<string, { title: string; description: string }> = {
  "home-system": {
    title: "Home Medical Alert System - Free Quote",
    description:
      "Get a free quote for our home medical alert system. Cellular connection, 1000ft range, water-resistant pendant, 24/7 monitoring. No landline required.",
  },
  "mobile-system": {
    title: "Mobile Medical Alert System - Free Quote",
    description:
      "Get a free quote for our GPS mobile medical alert system. Automatic fall detection, nationwide coverage, lightweight wearable design.",
  },
  smartwatch: {
    title: "Medical Alert Smartwatch - Free Quote",
    description:
      "Get a free quote for our medical alert smartwatch. Modern design, one-touch emergency button, fitness tracking, 24/7 monitoring.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { product: string };
}) {
  const resolvedParams = await params;
  const meta = productMeta[resolvedParams.product];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.vcarealert.com/quote/${resolvedParams.product}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { product: 'home-system' },
    { product: 'mobile-system' },
    { product: 'smartwatch' },
  ]
}

export default async function ProductQuotePage({ params }: { params: { product: string } }) {
  // Await the params object before accessing its properties (Next.js 15 requirement)
  const resolvedParams = await params;
  const productKey = resolvedParams.product as keyof typeof productData;
  const product = productData[productKey];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/#products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
        
        {/* Product Details Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto bg-gray-50 flex items-center justify-center p-8 lg:p-16 border-r border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain drop-shadow-xl"
              />
              <div className="absolute top-6 left-6 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                {product.icon}
              </div>
            </div>
            
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 w-max border border-primary/20">
                <ShieldCheck className="w-4 h-4" />
                Medical Alert Systems
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quote Form Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Pricing for the {product.name}</h2>
          <p className="text-gray-600">Fill out the form below and we will contact you with a customized quote.</p>
        </div>
        
        <QuoteForm initialDevice={product.name} />
      </div>
    </div>
  );
}
