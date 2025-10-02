"use client";

import { Check, FileText, Link as LinkIcon, Printer } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsOfServicePage() {
  const lastUpdated = "October 2, 2025";

  const sections = useMemo(
    () => [
      {
        id: "intro",
        title: "Welcome to AutoBay.com",
        content: (
          <>
            <p>
              Welcome to <strong>autobay.com</strong> (hereinafter, the "Website") owned and managed by <strong>AutoBay Ltd.</strong>, a limited liability
              company incorporated under the laws of the State of Israel (hereinafter, "AutoBay", "We" or "Us").
            </p>
            <p>
              These Terms of Service (the "Terms") constitute a legally binding agreement between you and AutoBay regarding your use of the Website and any
              related services. Please read carefully. By accessing or using the Website, you confirm that you have read, understood, and agree to be bound by
              these Terms and by any other terms referenced on the Website. If you do not agree, do not use the Website.
            </p>
            <p>
              You are required to read these Terms and the Website's privacy policy available at{" "}
              <a className="text-blue-600 underline" href="https://www.autobay.com/privacy-policy" rel="noopener noreferrer" target="_blank">
                https://www.autobay.com/privacy-policy
              </a>{" "}
              before using the Website. The Terms may change from time to time. Your continued use constitutes acceptance of the then-current Terms.
            </p>
            <p>
              You represent and warrant that you are legally eligible to enter into these Terms and are at least 18 years old or the age of majority in your
              jurisdiction.
            </p>
          </>
        ),
      },
      {
        id: "general-terms",
        title: "General Terms",
        content: (
          <>
            <p>AutoBay is an all-in-one dropshipping platform that helps sellers and buyers automate their dropshipping business.</p>
          </>
        ),
      },
      {
        id: "access-permission",
        title: "Access Permission; Shop Accounts",
        content: (
          <>
            <p>
              AutoBay is not affiliated with, recommended by, or endorsing any third-party website or e-commerce platform referenced on the Website or used as a
              data source. Your use of AutoBay and its services is at your sole risk.
            </p>
            <p>
              By accepting these Terms, you authorize AutoBay to access and sign into your private accounts in the selected online e-commerce stores (the "Shop
              Accounts") and to operate within those Shop Accounts, including listing items for sale or purchase, changing prices, quantities, and other
              information, ending listings, performing buying activities, and taking any actions available to you in such Shop Accounts. These Terms apply,
              mutatis mutandis, to both seller and buyer accounts.
            </p>
            <p>
              You further authorize AutoBay to operate your Shop Accounts under an "Out of Stock" mode option, allowing listings to keep running and be charged
              monthly even with zero inventory. You may revoke AutoBay's access at any time by canceling the access token in your Shop Account.
            </p>
            <p>
              By accepting these Terms, you assume all liability arising from or in connection with any breach or non-compliance with third-party store terms or
              applicable law, for acts or omissions taken in your Shop Accounts by you or by Us, and you irrevocably waive and release any claims against Us in
              connection therewith.
            </p>
            <p>
              You may connect and integrate Shop Accounts and your User Account with third-party payments or financial platforms or digital wallets ("3rd
              Parties Integrated Solutions"). Your use of any such solutions is subject to these Terms and the applicable third-party terms of use. In case of
              conflict, the third-party terms prevail.
            </p>
          </>
        ),
      },
      {
        id: "use-risks",
        title: "Use Risks and Liabilities",
        content: (
          <>
            <p>
              AutoBay is an intelligent automated system that integrates multiple third-party APIs; data may be inaccurate, outdated, or incomplete. Your use of
              AutoBay, the Website, and related services is at your sole risk. You irrevocably waive and release any claims against AutoBay, its shareholders,
              directors, employees, and representatives (collectively, "Representatives") for any direct or indirect damages or losses.
            </p>
            <p>
              If you visit or register a domain name serviced by DotServe Inc. (or any affiliate or successor), you are solely responsible for reviewing and
              complying with their Terms and Conditions and the applicable Domain Name Registration Agreement. The Registrar Registrant Agreement for Domain
              Names is available at{" "}
              <a className="text-blue-600 underline" href="https://get.store/legal" rel="noopener noreferrer" target="_blank">
                https://get.store/legal
              </a>
              .
            </p>
            <p>
              The Website may be unavailable from time to time due to maintenance, technical issues, removal of information, or discontinuation at AutoBay's
              discretion. You waive any claims relating to such unavailability.
            </p>
            <p>
              AutoBay provides a platform to manage dropshipping needs and connect Shop Accounts with third-party providers. Any dealings with third parties are
              at your sole responsibility. AutoBay is not liable for any damages from such engagements. AutoBay is not responsible for suspensions or deletions
              of your Shop Accounts.
            </p>
          </>
        ),
      },
      {
        id: "account-registration",
        title: "Account Registration",
        content: (
          <>
            <p>
              Use of the Website requires registration and payment of a monthly subscription fee, as per the commercial terms and packages published at
              registration or renewal.
            </p>
            <p>
              To create a personal user account enabling access to Website services (the "User Account"), you must provide information at AutoBay’s discretion,
              which may include full name, email, address, a unique username, password, Shop Accounts to connect and their integration details (e.g., tokens),
              and any other requested information.
            </p>
            <p>
              You may register and log in using Facebook or Google. By doing so, you permit Us to access certain profile information, subject to your privacy
              settings.
            </p>
            <p>
              Providing inaccurate or outdated information may prevent service provision or result in suspension or removal of your User Account. Usernames that
              misrepresent or mislead may be refused. Providing false information or using someone else’s information may constitute a criminal offense and a
              civil tort.
            </p>
            <p>
              Your User Account is for your exclusive use. Sharing access constitutes a material breach and may result in termination without notice or refund.
              Keep your username and password confidential; we may apply additional security measures.
            </p>
            <p>
              Unless expressly authorized by AutoBay, you may not create accounts primarily intended to promote specific products/services, duplicate accounts,
              or create multiple accounts.
            </p>
            <p>
              AutoBay secures your information and encrypts passwords per applicable laws. AutoBay is not liable for unauthorized access resulting from your
              failure to safeguard credentials. Report suspected intrusions promptly.
            </p>
          </>
        ),
      },
      {
        id: "minors",
        title: "Minors Registration",
        content: (
          <>
            <p>
              Users under 18 require parental or guardian review and approval to create a User Account, which may include age verification steps.
              Parents/guardians are responsible for such users’ compliance with these Terms.
            </p>
            <p>
              By registering an account for a minor, you represent that you are the parent/legal guardian, over 18, and responsible for password integrity and
              the minor’s compliance.
            </p>
          </>
        ),
      },
      {
        id: "using-website",
        title: "Using the Website",
        content: (
          <>
            <p>
              Any use from your User Account is deemed your personal use and liability. Subject to registration and compliance, you are granted a limited,
              revocable, personal, non-sublicensable, non-transferable right to use the Website per your package and these Terms.
            </p>
            <p>
              AutoBay may edit, remove, or change publications and content at its sole discretion. Advertising packages, promotions, discounts, and display
              modes may be offered; you waive claims concerning content display.
            </p>
            <p>
              You must not misuse the Website. Prohibited conduct includes, without limitation: competing service development; misrepresentation; unauthorized
              use of data/images; sending unsolicited communications; gaining unauthorized access; non-standard linking; use of AutoBay's trademarks without
              consent; ad interference; multi-device sharing; sublicensing; unlawful use; crawling/scraping; imposing disproportionate load; intercepting data;
              collecting personal data; hacking; reverse engineering; copying/modifying the Website; circumventing security; removing notices; server/network
              interference; harmful automated use; spam; transmitting malware; violating network policies. AutoBay may restrict access for violations.
            </p>
          </>
        ),
      },
      {
        id: "your-store-content",
        title: "Your Store; Content",
        content: (
          <>
            <p>
              You must have Shop Accounts with supported platforms and connect them to use services. Visual differences may occur between product images and
              actual products. Products are sold by third parties and subject to their terms.
            </p>
            <p>
              Your User Account may enable adding, scraping, creating, uploading, submitting, distributing, or posting content ("User Content"). You retain
              ownership of your User Content, but by posting it you grant AutoBay a worldwide, perpetual, irrevocable, royalty-free, fully transferable and
              sublicensable license to use, copy, distribute, reproduce, modify, adapt, publish, translate, create derivative works, publicly perform, and
              display such content. You warrant you have rights to post, that it is non-confidential, non-infringing, lawful, and not misleading.
            </p>
            <p>
              Prohibited User Content includes illegal, harmful, indecent, deceptive, infringing, confidential, privacy-invasive, or reputation-harming content.
              AutoBay is not obligated to pre-screen third-party content and is not responsible for third-party sites or transactions resulting from
              advertisements.
            </p>
            <p>
              To report infringing content, email{" "}
              <a className="text-blue-600 underline" href="mailto:support@autobay.com">
                support@autobay.com
              </a>{" "}
              with sufficient details for review.
            </p>
          </>
        ),
      },
      {
        id: "payment-refunds",
        title: "Payment Terms and Refunds",
        content: (
          <>
            <p>
              Use of the Website and services is subject to payment. Prices may change at any time. Unless explicitly provided otherwise, payments recur
              monthly.
            </p>
            <p>
              Payoneer: Your use of Payoneer’s platform is also subject to Payoneer’s terms and privacy policy at{" "}
              <a className="text-blue-600 underline" href="https://www.payoneer.com/legal/privacy-policy/" rel="noopener noreferrer" target="_blank">
                https://www.payoneer.com/legal/privacy-policy/
              </a>{" "}
              (the "Payoneer Terms"). If the Payoneer Terms set lower liability limits or additional restrictions, those shall apply and control.
            </p>
            <p>
              Plans renew automatically unless you cancel via your settings or terminate your account. Cancellation may incur fees. Refunds for subscription
              payments are generally unavailable unless required by law, though AutoBay may grant refunds at its discretion (which may include up to 15% fees
              and processor fees). You can cancel future payments by terminating your account.
            </p>
            <p>
              Credits are valid for a limited period (generally 3 months for dormant/suspended/terminated accounts) and may be subject to handling or processing
              fees, all subject to applicable law. AutoBay may report suspected illegal behavior to authorities.
            </p>
            <p>
              Third-party product cancellations are governed by applicable laws and the third party’s terms. You waive chargeback/cash-back requests with
              respect to fees or payments made to AutoBay; disputes must be raised with Us directly.
            </p>
            <p>
              Prices may include taxes and other fees. We may deduct fees up to 15% of any order value (excluding taxes). You are responsible for any taxes,
              customs, or levies; we may withhold required amounts by law.
            </p>
            <p>Keep your password secure. You are responsible for all activity resulting from failure to maintain confidentiality.</p>
            <p>
              Payment methods must be owned by you. Transactions suspected as fraudulent or illegal may be canceled. Invoices are downloadable from the Website
              via the invoices area.
            </p>
          </>
        ),
      },
      {
        id: "modifications",
        title: "Modifications to the Services",
        content: (
          <>
            <p>
              AutoBay may modify, update, change, suspend, or discontinue services, remove content, or restrict activities or access at any time, with or
              without notice. AutoBay is not liable for scheduled or unplanned outages or resultant data loss or delays.
            </p>
          </>
        ),
      },
      {
        id: "termination",
        title: "Termination of User Account",
        content: (
          <>
            <p>
              We may suspend or terminate your User Account immediately and without notice for any violation of these Terms and may remove your User Content. We
              are not liable for such suspension/termination. You may discontinue use at any time and remain liable for outstanding charges.
            </p>
          </>
        ),
      },
      {
        id: "privacy",
        title: "Privacy and Data Protection",
        content: (
          <>
            <p>Your use of the Website is subject to the Website’s Privacy Policy, which is incorporated by reference and may be updated from time to time.</p>
          </>
        ),
      },
      {
        id: "ip-rights",
        title: "Intellectual Property Rights",
        content: (
          <>
            <p>
              AutoBay owns all rights, titles, and interests, including intellectual property rights, in and to the Website and services, including software,
              design, and content, excluding third-party content. "AutoBay" and related marks are trademarks of AutoBay. No license is granted except as
              expressly stated.
            </p>
          </>
        ),
      },
      {
        id: "protected-content",
        title: "Protected Content Rights",
        content: (
          <>
            <p>
              All rights in content and information on the Website are owned by AutoBay and protected by law. Any use of Protected Content without prior written
              approval is prohibited. Feedback you provide constitutes AutoBay confidential information and may be used without restriction.
            </p>
          </>
        ),
      },
      {
        id: "third-party-ip",
        title: "Third Parties' Intellectual Property",
        content: (
          <>
            <p>
              Some content may be owned by third parties. Rights in third-party content remain with their owners. AutoBay may disable, block, suspend, or
              terminate accounts suspected of infringing third-party rights.
            </p>
          </>
        ),
      },
      {
        id: "dmca",
        title: "DMCA Contact Information",
        content: (
          <>
            <p>
              To report alleged infringement under the Digital Millennium Copyright Act (DMCA), contact our designated representative at{" "}
              <a className="text-blue-600 underline" href="mailto:support@autobay.com">
                support@autobay.com
              </a>{" "}
              or by mail: Even Gvirol 30, WeWork–AutoBay Offices, 6407807, Tel Aviv, Israel.
            </p>
            <p>
              Please include: description and sample of the copyrighted work; description and location of the allegedly infringing content; your mailing
              address, telephone, and email; a statement of ownership or good-faith belief; a statement of accuracy under penalty of perjury; and your
              electronic or physical signature.
            </p>
          </>
        ),
      },
      {
        id: "compliance",
        title: "Compliance with Laws",
        content: (
          <>
            <p>
              You agree to comply with all applicable laws and regulations, including those related to consumer protection, e-commerce, acceptable content,
              intellectual property, and export controls. Do not harm minors, promote illegal or inappropriate products, or promote violence or cruelty.
            </p>
          </>
        ),
      },
      {
        id: "indemnification",
        title: "Indemnification; Limitation of Liability",
        content: (
          <>
            <p>
              You agree to indemnify and hold AutoBay and its Representatives harmless from any claims, damages, losses, or expenses arising from your violation
              of these Terms, applicable law, third-party claims related to your use, your User Content, or actions from your User Account.
            </p>
            <p>
              THE SERVICES AND CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY
              LAW, IN NO EVENT SHALL AUTOBAY OR ITS REPRESENTATIVES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR ANY
              LOSS OF DATA, PROFITS, OR BUSINESS, ARISING OUT OF OR RELATED TO YOUR USE OR INABILITY TO USE THE WEBSITE, EVEN IF ADVISED OF THE POSSIBILITY.
            </p>
            <p>
              AutoBay is not liable for errors in operation, prices, quantities, descriptions, or order performance unless willful misconduct is proven. AutoBay
              may conduct its defense in any third‑party claim at its discretion; you must cooperate and bear defense costs as applicable.
            </p>
          </>
        ),
      },
      {
        id: "governing-law",
        title: "Governing Law; Mandatory Arbitration",
        content: (
          <>
            <p>These Terms and any matter connected with the Website are governed by the substantive laws of the State of Israel.</p>
            <p>
              Any dispute shall be finally resolved by arbitration under the Rules of Arbitration of the International Chamber of Commerce (ICC) by one or more
              arbitrators appointed in accordance with those Rules. Seat: Israel (place determined by the ICC). Arbitrator: a practicing lawyer admitted in
              Israel with relevant commercial expertise.
            </p>
            <p>
              Proceedings shall be confidential and recorded. Pending award, arbitrator fees are borne equally. The proceedings and awards shall be in English
              unless otherwise agreed. This section constitutes an arbitration agreement under the New York Convention, 1958.
            </p>
            <p className="text-sm italic">
              Note: The parties may discuss application of the ICC Expedited Procedure Rules where the amount in dispute does not exceed US$20,000.
            </p>
          </>
        ),
      },
      {
        id: "communications",
        title: "Communications",
        content: (
          <>
            <p>
              By registering, you consent to receive advertising, promotional, marketing, and service-related communications. You may request removal from our
              mailing list at any time by emailing{" "}
              <a className="text-blue-600 underline" href="mailto:support@autobay.com">
                support@autobay.com
              </a>
              .
            </p>
          </>
        ),
      },
      {
        id: "misc",
        title: "Miscellaneous",
        content: (
          <>
            <ul className="list-disc space-y-1 pl-5">
              <li>Headings are for convenience only.</li>
              <li>The Privacy Policy is incorporated by reference.</li>
              <li>No agency, partnership, joint venture, employment, or franchise relationship is created.</li>
              <li>AutoBay is not obligated to become involved in disputes between you and third parties.</li>
              <li>IP protections, warranties, and liability limitations survive termination.</li>
              <li>
                If any provision is unenforceable, remaining provisions remain in effect; courts should effectuate the parties’ intent to the maximum extent
                permitted.
              </li>
              <li>No waiver by AutoBay of any right or provision shall be deemed a waiver of any other or subsequent breach.</li>
              <li>You may not assign your rights or delegate obligations without AutoBay’s written consent; AutoBay may assign or delegate without notice.</li>
              <li>
                Notices are deemed delivered 7 business days after registered mail with confirmation, or the next business day after email without error
                receipt.
              </li>
              <li>Any modifications are binding upon publication on the Website.</li>
            </ul>
          </>
        ),
      },
      {
        id: "contact",
        title: "Contact Us",
        content: (
          <>
            <p>
              For questions, contact us via the Contact Us tab on the Website, or email{" "}
              <a className="text-blue-600 underline" href="mailto:support@autobay.com">
                support@autobay.com
              </a>
              .
            </p>
            <p>
              Include your name, contact details, registration email, username, and a link to the relevant content page. We will respond as soon as possible
              based on the circumstances.
            </p>
          </>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    // Add basic smooth scroll behavior for in-page anchors
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    return () => {
      if (typeof window !== "undefined") {
        document.documentElement.style.scrollBehavior = "auto";
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText aria-hidden className="h-6 w-6" />
          <h1 className="font-semibold text-2xl tracking-tight">Terms of Service</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button aria-label="Print Terms" onClick={() => window.print()} variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button aria-label="View Privacy Policy" asChild>
            <a href="https://www.autobay.com/privacy-policy" rel="noopener noreferrer" target="_blank">
              <LinkIcon className="mr-2 h-4 w-4" /> Privacy Policy
            </a>
          </Button>
        </div>
      </header>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="font-medium text-base text-muted-foreground">Last updated: {lastUpdated}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <nav className="sticky top-4 self-start md:col-span-1">
              <div className="rounded-2xl border p-4 shadow-sm">
                <h2 className="mb-3 font-semibold text-muted-foreground text-sm uppercase tracking-wide">Table of Contents</h2>
                <ul className="space-y-2 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a className="text-blue-700 hover:underline" href={`#${s.id}`}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="md:col-span-3">
              {sections.map((s, idx) => (
                <section className="scroll-mt-24" id={s.id} key={s.id}>
                  <h2 className="mb-3 font-semibold text-xl tracking-tight">{s.title}</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none">{s.content}</div>
                  {idx < sections.length - 1 && <Separator className="my-6" />}
                </section>
              ))}
              <div className="mt-8 flex items-center gap-2 rounded-2xl border p-4">
                <Check className="h-5 w-5" />
                <p className="text-sm">By using the Website, you acknowledge that you’ve read and agree to these Terms.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* JSON-LD for legal page */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AutoBay Terms of Service",
            url: "https://www.autobay.com/terms",
            isPartOf: {
              "@type": "WebSite",
              name: "AutoBay",
              url: "https://www.autobay.com",
            },
            dateModified: new Date(lastUpdated).toISOString(),
            about: {
              "@type": "Organization",
              name: "AutoBay Ltd.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Even Gvirol 30, WeWork–AutoBay Offices",
                addressLocality: "Tel Aviv",
                postalCode: "6407807",
                addressCountry: "IL",
              },
              email: "support@autobay.com",
            },
          }),
        }}
        type="application/ld+json"
      />
    </div>
  );
}
