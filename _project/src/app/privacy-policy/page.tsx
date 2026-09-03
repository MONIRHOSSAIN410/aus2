import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL // ZENJI"
      title={"PRIVACY\nPOLICY"}
      updated="1 August 2026"
      sections={[
        {
          heading: "WHAT WE COLLECT",
          body: [
            "When you place an order or create an account we collect your name, email address, shipping address and order history.",
            "If you sign in with Google or Apple, we receive only the basic profile fields those providers share — name, email and profile image.",
          ],
        },
        {
          heading: "HOW WE USE IT",
          body: [
            "To fulfil orders, send dispatch and tracking updates, answer support requests, and — if you opt in — tell you when a drop goes live.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "COOKIES",
          id: "cookies",
          body: [
            "We use essential cookies to keep your cart and session working, and analytics cookies to understand which pieces people look at.",
            "You can decline analytics cookies from the banner at the bottom of the site. Essential cookies cannot be turned off without breaking checkout.",
          ],
        },
        {
          heading: "YOUR RIGHTS",
          body: [
            "You can request a copy of the data we hold about you, ask for corrections, or ask us to delete your account at any time through the contact page.",
          ],
        },
      ]}
    />
  );
}
