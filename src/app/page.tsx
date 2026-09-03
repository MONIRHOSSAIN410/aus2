import { AboutSection } from "@/components/home/about-section";
import { DropShowcase } from "@/components/home/drop-showcase";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { HeroStage } from "@/components/home/hero-stage";
import { IntroSplash } from "@/components/home/intro-splash";
import { Manifesto } from "@/components/home/manifesto";
import { ProductRail } from "@/components/product/product-rail";
import { COLLECTION_NAME, featuredProducts, products, showcaseProducts } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <HeroStage />
      <AboutSection />
      <DropShowcase products={showcaseProducts()} />
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
