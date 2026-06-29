import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Unique metadata for this route (title, description, canonical, OG) — restored on unmount.
    // Note: this helps Google (renders JS); social crawlers don't run JS and read index.html.
    const url = "https://ridgeperfectcleaning.com/privacy";
    const title = "Privacy Policy & Terms | Ridge Perfect Cleaning";
    const description =
      "Privacy Policy and Terms of Service for Ridge Perfect Cleaning Solutions, serving Palm Beach County, FL.";

    const setAttr = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector) as HTMLElement | null;
      const prev = el?.getAttribute(attr) ?? null;
      el?.setAttribute(attr, value);
      return () => {
        if (!el) return;
        prev === null ? el.removeAttribute(attr) : el.setAttribute(attr, prev);
      };
    };

    const prevTitle = document.title;
    document.title = title;

    const restores = [
      setAttr('meta[name="description"]', "content", description),
      setAttr('link[rel="canonical"]', "href", url),
      setAttr('meta[property="og:title"]', "content", title),
      setAttr('meta[property="og:description"]', "content", description),
      setAttr('meta[property="og:url"]', "content", url),
    ];

    return () => {
      document.title = prevTitle;
      restores.forEach((restore) => restore());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-[#0D2B4E] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-[#3AB5E5] text-sm font-semibold mb-6 hover:underline">
            <ArrowLeft size={16} /> Back to Home
          </a>
          <h1 className="text-3xl font-black text-white">Privacy Policy & Terms of Service</h1>
          <p className="text-white/50 text-sm mt-2">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 prose prose-slate">
        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            When you use our contact form or call us, we may collect the following personal information:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Full name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Property address (for service quotes)</li>
            <li>Service preferences and notes you provide</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Ridge Perfect Cleaning Solutions uses your information solely to:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Respond to your quote requests and inquiries</li>
            <li>Schedule and confirm cleaning appointments</li>
            <li>Send appointment reminders (via phone or text)</li>
            <li>Improve our service quality based on your feedback</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed mt-3">
            We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">3. Data Retention</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We retain your contact information only as long as necessary to provide our services or as required by law.
            You may request deletion of your data at any time by emailing us at{" "}
            <a href="mailto:info@ridgeperfectcleaning.com" className="text-[#3AB5E5]">
              info@ridgeperfectcleaning.com
            </a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">4. Cookies & Analytics</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This website may use standard web analytics tools to understand visitor behavior (e.g., pages visited, device type).
            These analytics do not collect personally identifiable information. We do not use advertising cookies or tracking pixels.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">5. Third-Party Services</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Our website may use the following third-party services:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li><strong>Formspree</strong> — processes contact form submissions securely</li>
            <li><strong>WhatsApp</strong> — for direct messaging; subject to Meta's privacy policy</li>
            <li><strong>Google Maps</strong> — for location references; subject to Google's privacy policy</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">6. Your Rights (Florida & US)</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Under applicable US privacy laws, you have the right to:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1 mt-2">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of any future communications</li>
          </ul>
          <p className="text-gray-600 text-sm mt-3">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:info@ridgeperfectcleaning.com" className="text-[#3AB5E5]">
              info@ridgeperfectcleaning.com
            </a>{" "}
            or call <a href="tel:5618180778" className="text-[#3AB5E5]">(561) 818-0778</a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">7. Terms of Service</h2>
          <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
            <p><strong>Services:</strong> Ridge Perfect Cleaning Solutions provides professional cleaning services as described on this website. Final pricing is confirmed before service begins.</p>
            <p><strong>Cancellations:</strong> We ask for at least 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee.</p>
            <p><strong>Satisfaction Guarantee:</strong> If you are not satisfied with our service, contact us within 24 hours and we will return to address any concerns at no additional charge.</p>
            <p><strong>Liability:</strong> Ridge Perfect Cleaning Solutions is fully insured. In the unlikely event of damage caused by our team, we will work with you to resolve the issue in good faith.</p>
            <p><strong>Access to Property:</strong> By booking our services, you authorize our team to access your property at the agreed time.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-black text-[#0D2B4E] mb-3">8. Contact Us</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            For any privacy-related questions or requests, please reach out:
          </p>
          <div className="mt-3 text-sm text-gray-600 space-y-1">
            <p><strong>Ridge Perfect Cleaning Solutions</strong></p>
            <p>Palm Beach County, FL</p>
            <p>Phone: <a href="tel:5618180778" className="text-[#3AB5E5]">(561) 818-0778</a></p>
            <p>Email: <a href="mailto:info@ridgeperfectcleaning.com" className="text-[#3AB5E5]">info@ridgeperfectcleaning.com</a></p>
          </div>
        </section>
      </div>

      <div className="bg-[#0D2B4E] py-6 text-center">
        <p className="text-gray-400 text-xs">© {new Date().getFullYear()} Ridge Perfect Cleaning Solutions. All rights reserved.</p>
      </div>
    </div>
  );
};
