import Image from "next/image";

import { productView, type LookbookView, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  product: Product;
  view?: LookbookView;
  /** Explicit src — pass a frame from productGallery() instead of a named view. */
  src?: string;
  alt?: string;
  /** Sizes hint for next/image. Defaults to a sensible grid value. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Product photography.
 *
 * Wraps next/image in a fill container so callers only control the aspect ratio.
 * Images come from the ZENJI Cloudinary account — see IMAGE_BASE in lib/products.
 */
export function ProductImage({
  product,
  view = "FRONT",
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
  className,
  imgClassName,
}: ProductImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-900", className)}>
      <Image
        src={src ?? productView(product, view)}
        alt={alt ?? `${product.name} — ${view.toLowerCase()}`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
