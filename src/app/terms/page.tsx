import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL // ZENJI"
      title={"TERMS OF\nSERVICE"}
      updated="1 August 2026"
      sections={[
        {
          heading: "ORDERS",
          body: [
            "Placing an order is an offer to buy. We accept it when the parcel is dispatched.",
            "Orders are final once placed. Because every drop is limited we cannot change or cancel an order after checkout.",
          ],
        },
        {
          heading: "DROPS AND STOCK",
          body: [
            "Every release is a limited run. Sold-out pieces are not restocked.",
            "Sale pricing runs until the discounted stock sells through.",
          ],
        },
        {
          heading: "SHIPPING",
          body: [
            "Free shipping Australia-wide on orders over A$150, otherwise A$9.99 flat.",
            "Standard delivery is 5–10 business days. We are not liable for carrier delays outside our control.",
          ],
        },
        {
          heading: "INTELLECTUAL PROPERTY",
          body: [
            "All artwork, wordmarks and site content belong to ZENJI and may not be reproduced without written permission.",
          ],
        },
      ]}
    />
  );
}
