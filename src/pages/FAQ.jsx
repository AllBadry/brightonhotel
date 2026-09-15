import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const faqSections = [
  {
    title: 'Booking & Reservations',
    items: [
      { q: 'How do I book a property through Brighton WorkStays?', a: 'Browse our Directory, find the property that fits your requirements, and click "Visit Website" to book directly with the property, or contact us via our Contact page and our concierge team will manage the entire reservation on your behalf.' },
      { q: 'Can I hold a room before confirming dates?', a: 'Most of our partner properties offer a complimentary 24-hour hold while you finalise your travel dates. Our concierge team can arrange this for you on any listed property.' },
      { q: 'What is the cancellation policy?', a: 'Cancellation policies vary by property and rate type. All details are clearly displayed at the time of booking. In most cases, cancellations made 48+ hours before check-in receive a full refund.' },
    ],
  },
  {
    title: 'Extended Stays & Corporate',
    items: [
      { q: 'Do you offer discounts for stays longer than 30 days?', a: 'Yes. We negotiate special long-stay rates with all partner properties. Contact us with your dates and requirements and we will present you with the best corporate rate available.' },
      { q: 'Can you accommodate a team retreat or offsite?', a: 'Absolutely. We coordinate group bookings across multiple rooms and can help with meeting rooms, catering, and transport logistics. Start by sharing your group size and preferred dates via our Contact page.' },
      { q: 'Do the properties have reliable Wi-Fi for video calls?', a: 'Every property in our directory is strictly verified for high-speed broadband. Minimum speed requirements are enforced, and most properties offer speeds suitable for HD video conferencing.' },
      { q: 'Is there a dedicated concierge for corporate accounts?', a: 'Yes. Corporate clients are assigned a dedicated concierge who handles bookings, special requests, and any on-stay requirements throughout the duration of your engagement with us.' },
    ],
  },
  {
    title: 'Around Brighton',
    items: [
      { q: 'How easy is it to commute to London from Brighton?', a: 'Brighton is well connected to London via train, with direct services to London Victoria and London Bridge taking approximately one hour. Many of our guests commute regularly or use Brighton as a base for southern England operations.' },
      { q: 'Are the properties near the train station?', a: 'Our properties span Brighton & Hove. Many are walking distance from Brighton station, and others are near Hove station or seafront tram stops. Filters and maps are available on each property page.' },
      { q: 'Is parking available at most properties?', a: 'Many of our properties offer on-site or nearby parking, though availability varies. Parking information is included in each property listing. Brighton\'s city centre can be limited for parking, so we recommend confirming this when booking.' },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <motion.div variants={fadeUp} className="border-b border-sage/10">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 md:py-8 flex items-start justify-between gap-4 group"
      >
        <span className="text-xl md:text-2xl font-serif font-medium text-sage group-hover:text-terracotta transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-sage/20 flex items-center justify-center mt-1 text-terracotta"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-600 font-light leading-relaxed text-base md:text-lg max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  let globalCounter = 0;

  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm min-h-screen font-sans text-sage pb-32">

        {/* Header */}
        <section className="pt-32 pb-12 px-8 md:px-16 max-w-4xl mx-auto border-b border-sage/10">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-terracotta uppercase tracking-[0.2em] text-sm font-bold mb-6">
            Help Centre
          </motion.p>
          <motion.h1
            initial={{ clipPath: 'inset(0 0 100% 0)', y: 40 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="text-5xl md:text-7xl font-serif font-bold text-sage mb-8 tracking-tight"
          >
            FAQ.
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-xl text-gray-600 font-light leading-relaxed">
            Answers to the questions our guests ask most.
          </motion.p>
        </section>

        {/* Accordion Sections */}
        <section className="px-8 md:px-16 max-w-4xl mx-auto">
          {faqSections.map((section, si) => {
            return (
              <div key={si} className="mt-12 md:mt-16">
                <motion.h2
                  initial={{ clipPath: 'inset(0 0 100% 0)', y: 20 }}
                  whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease }}
                  className="text-2xl md:text-3xl font-serif font-bold mb-4"
                >
                  {section.title}
                </motion.h2>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} variants={stagger}>
                  {section.items.map((item) => {
                    const itemIndex = globalCounter++;
                    return (
                      <AccordionItem
                        key={itemIndex}
                        question={item.q}
                        answer={item.a}
                        isOpen={openIndex === itemIndex}
                        onToggle={() => setOpenIndex(openIndex === itemIndex ? null : itemIndex)}
                      />
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="mt-24 md:mt-32 bg-sage text-warm py-24 md:py-32 text-center px-6 rounded-t-[3rem]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]">
              Still have questions?
            </h2>
            <p className="text-warm/70 font-light text-lg mb-10 max-w-md mx-auto">
              Our concierge team responds within 2 hours during business hours.
            </p>
            <Link to="/contact" className="inline-block bg-terracotta text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-terracotta transition duration-300">
              Contact Us
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}