import { AboutSection } from "@/components/home/about-section";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { Hero } from "@/components/home/hero";
import { IntroSplash } from "@/components/home/intro-splash";
import { Manifesto } from "@/components/home/manifesto";
import { ProductRail } from "@/components/product/product-rail";
import { COLLECTION_NAME, featuredProducts, products, saleProducts } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <Hero />
      <AboutSection />
      <ProductRail
        products={saleProducts()}
        eyebrow={`COLLECTION // ${COLLECTION_NAME}`}
        title="SALE"
      />
      <FeaturedCarousel products={featuredProducts()} />
      <ProductRail
        products={products}
        eyebrow={`COLLECTION // ${COLLECTION_NAME}`}
        title="LATEST_DROPS"
      />
      <Manifesto />
    </>
  );
}
