// src/pages/Legal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

function LegalLayout({ eyebrow, title, updated, children }) {
  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm min-h-screen font-sans text-sage pb-32">
        <section className="pt-32 pb-12 px-8 md:px-16 max-w-4xl mx-auto border-b border-sage/10">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-terracotta uppercase tracking-[0.2em] text-sm font-bold mb-6">
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-serif font-bold text-sage mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            Last updated: {updated}
          </motion.p>
        </section>

        <section className="px-8 md:px-16 max-w-4xl mx-auto">
          <div className="flex flex-col gap-8 text-gray-700">
            {children}
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}

function Block({ heading, children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
    >
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-sage mb-4">{heading}</h2>
      <div className="text-base md:text-lg font-light leading-relaxed space-y-3">{children}</div>
    </motion.div>
  );
}

export default function Privacy() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" updated="August 2026">
      <Block heading="1. Information We Collect">
        <p>We collect information you provide directly, such as your name and contact details when you submit an inquiry through our contact form. We also collect limited technical data, including browser type and pages visited, to improve our website.</p>
      </Block>
      <Block heading="2. How We Use Your Information">
        <p>Your information is used solely to respond to your inquiries, manage your stay requests, and improve the services we offer through Brighton WorkStays. We never sell your personal data to third parties.</p>
      </Block>
      <Block heading="3. Data Retention">
        <p>We retain personal information only for as long as necessary to fulfil the purposes described in this policy, after which it is securely deleted.</p>
      </Block>
      <Block heading="4. Your Rights">
        <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at contact@brightonhotel.co.uk.</p>
      </Block>
      <Block heading="5. Contact">
        <p>For any privacy-related questions, please reach out to contact@brightonhotel.co.uk or write to us at Brighton &amp; Hove, East Sussex, United Kingdom.</p>
      </Block>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Service" updated="August 2026">
      <Block heading="1. Acceptance of Terms">
        <p>By accessing or using the Brighton WorkStays website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      </Block>
      <Block heading="2. Property Information">
        <p>The property listings on this directory are provided for informational purposes. Ratings, reviews, and details are based on publicly available information and may change without notice.</p>
      </Block>
      <Block heading="3. Booking and Payments">
        <p>Bookings are arranged directly with each property. Brighton WorkStays is a directory and is not responsible for the fulfilment of any reservation made with a third-party property.</p>
      </Block>
      <Block heading="4. Limitation of Liability">
        <p>Brighton WorkStays shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.</p>
      </Block>
      <Block heading="5. Changes to These Terms">
        <p>We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.</p>
      </Block>
    </LegalLayout>
  );
}

export function Cookies() {
  return (
    <LegalLayout eyebrow="Legal" title="Cookie Policy" updated="August 2026">
      <Block heading="1. What Are Cookies">
        <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how visitors use it.</p>
      </Block>
      <Block heading="2. Cookies We Use">
        <p>We use strictly necessary cookies to keep the website functional, and analytics cookies to understand aggregate usage patterns. We do not use advertising cookies.</p>
      </Block>
      <Block heading="3. Managing Cookies">
        <p>You can control or delete cookies through your browser settings at any time. Disabling certain cookies may affect how the website functions.</p>
      </Block>
      <Block heading="4. Contact">
        <p>If you have questions about our use of cookies, please contact us at contact@brightonhotel.co.uk.</p>
      </Block>
    </LegalLayout>
  );
}
