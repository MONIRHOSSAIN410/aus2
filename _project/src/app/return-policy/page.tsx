import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = { title: "Return Policy" };

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      eyebrow="SUPPORT // ZENJI"
      title={"RETURN\nPOLICY"}
      updated="1 August 2026"
      sections={[
        {
          heading: "THE WINDOW",
          body: [
            "You have 14 days from delivery to start a return on unworn pieces with tags still attached.",
            "Sale pieces are final — no returns or exchanges.",
          ],
        },
        {
          heading: "HOW TO START ONE",
          body: [
            "Send your order number through the contact page. We reply within one business day with a return label.",
            "Pack the piece in its original bag. Returns that arrive worn, washed or without tags are sent back.",
          ],
        },
        {
          heading: "REFUNDS",
          body: [
            "Refunds go back to the original payment method within 5 business days of the parcel arriving with us.",
            "Original shipping is not refunded unless the piece arrived faulty.",
          ],
        },
        {
          heading: "FAULTY PIECES",
          body: [
            "If a print or seam fails, send photos with your order number. We cover return postage and replace the piece where stock allows, or refund in full.",
          ],
        },
      ]}
    />
  );
}
