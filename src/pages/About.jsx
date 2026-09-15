import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import TextReveal from '../components/TextReveal';
import ImageReveal from '../components/ImageReveal';
import CountUp from '../components/CountUp';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Verified',
    desc: 'Every property is personally inspected for Wi-Fi speed, workspace quality, and quietness before joining our collection.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'Curated',
    desc: 'We handpick every listing — no pay-to-list, no anonymous reviews. Only properties that meet our professional standard.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Connected',
    desc: 'A dedicated concierge links your booking, your property, and your needs into one seamless extended stay experience.',
  },
];

const team = [
  {
    name: 'James Whitmore',
    role: 'Founder & Managing Director',
    img: '/images/team-james.jpg',
  },
  {
    name: 'Priya Menon',
    role: 'Head of Partnerships',
    img: '/images/team-priya.jpg',
  },
  {
    name: 'Tom Gallagher',
    role: 'Guest Experience Lead',
    img: '/images/team-tom.jpg',
  },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm font-sans text-sage overflow-hidden">

        {/* Hero */}
        <section ref={heroRef} className="relative h-[100vh] flex flex-col justify-end pb-20 md:pb-24 px-6 md:px-16 overflow-hidden">
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: "url('/images/about-hero.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: heroY,
              scale: heroScale,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage/95 via-sage/40 to-sage/10 z-10" />

          <motion.div style={{ opacity: heroOpacity }} className="relative z-20 max-w-7xl mx-auto w-full">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
              className="text-terracotta uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 ml-1 md:ml-2"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ clipPath: 'inset(0 0 100% 0)', y: 60 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease }}
              className="text-6xl sm:text-7xl md:text-[8rem] leading-[1.05] font-serif font-bold text-white mb-6"
            >
              Brighton<br />
              <span className="italic font-light text-warm">Reimagined.</span>
            </motion.h1>
          </motion.div>
        </section>

        {/* Intro */}
        <section className="py-24 md:py-40 px-6 md:px-16 max-w-6xl mx-auto text-center">
          <TextReveal
            as="h2"
            text="We built Brighton WorkStays to make the corporate traveller feel at home — wherever their work takes them along the Sussex coast."
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.4] md:leading-[1.3]"
          />
        </section>

        {/* Story */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2">
              <ImageReveal
                src="/images/team-meeting.jpg"
                alt="Our team collaborating"
                className="overflow-hidden rounded-2xl h-[50vh] md:h-[60vh]"
                imgClassName="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">
                How it began
              </motion.p>
              <motion.h3
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 30 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease }}
                className="text-4xl md:text-5xl font-serif font-bold mb-6"
              >
                From a single conversation to 40+ listings.
              </motion.h3>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6">
                In 2018, a group of corporate professionals visiting Brighton faced the same frustration: no reliable way to find a stay that worked for business, not just holidays.
              </motion.p>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                We started with five verified properties and one promise: every listing on our site genuinely supports the professional traveller. Today, that promise spans 40+ curated stays across Brighton & Hove.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-32 px-6 md:px-16 bg-sage text-warm overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">
              What drives us
            </motion.p>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-4xl md:text-5xl font-serif font-bold mb-16"
            >
              Built on <span className="italic font-light text-gold">three pillars.</span>
            </motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {values.map((v, i) => (
                <motion.div key={i} variants={fadeUp} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-2xl hover:bg-white/10 transition-colors duration-500">
                  <div className="w-14 h-14 rounded-xl bg-terracotta/20 flex items-center justify-center text-terracotta mb-6 group-hover:bg-terracotta group-hover:text-white transition-colors duration-500">
                    {v.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3">{v.title}</h3>
                  <p className="text-warm/70 font-light leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 md:py-36 px-6 md:px-16 max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
            {[
              { value: 40, suffix: '+', label: 'Curated Properties' },
              { value: 8, suffix: '', label: 'Years of Service' },
              { value: 4.9, suffix: '', label: 'Average Rating', decimals: 1 },
              { value: 1200, suffix: '+', label: 'Guests Hosted' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-serif font-bold text-sage leading-none mb-3">
                  <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </span>
                <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-32 px-6 md:px-16 max-w-6xl mx-auto text-center">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">
            The People
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold mb-16">
            Meet the team
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="text-gray-500 font-light text-sm">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="bg-warm relative py-28 md:py-40 border-t border-sage/10 text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-sage mb-8 leading-[1.1]">
              Ready to <span className="italic font-light">work with us?</span>
            </h2>
            <Link to="/contact" className="inline-block bg-sage text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-terracotta transition duration-300">
              Get in touch
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}