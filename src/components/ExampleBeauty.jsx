import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Sparkles, Star, ChevronRight, Phone, Clock, Check, Heart, Calendar, Award, Users, Shield } from 'lucide-react';

function useReveal(opts = {}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(el); } }, { threshold: opts.threshold || 0.1 });
    ob.observe(el); return () => ob.unobserve(el);
  }, []);
  return { ref, vis };
}

/* ── Beauty Clinics Data ── */
const clinics = [
  {
    id: 'lumiere',
    name: "Clinique Lumière",
    tagline: "Medical Aesthetics & Wellness",
    location: "Lac 2, Tunis",
    phone: "+216 71 965 000",
    hours: "09:00 – 19:00",
    rating: 4.9,
    reviews: 412,
    hero: "from-rose-950 via-pink-950/80 to-neutral-950",
    accent: "rose",
    accentColor: "#f43f5e",
    description: "Tunisia's most prestigious medical aesthetics clinic. Board-certified practitioners, cutting-edge technology, and a commitment to natural-looking results.",
    treatments: [
      { cat: "Face", items: [{ name: "Hydrafacial Premium", desc: "Deep cleanse, exfoliate, hydrate", time: "45 min", price: "180 DT" }, { name: "Botox Treatment", desc: "Targeted wrinkle reduction, natural look", time: "30 min", price: "350 DT" }, { name: "Chemical Peel", desc: "Glycolic acid, skin rejuvenation", time: "60 min", price: "120 DT" }, { name: "Dermal Fillers", desc: "Lip enhancement, cheek contouring", time: "45 min", price: "450 DT" }] },
      { cat: "Body", items: [{ name: "CoolSculpting", desc: "Non-invasive fat reduction", time: "60 min", price: "800 DT" }, { name: "Laser Hair Removal", desc: "Full body, permanent reduction", time: "90 min", price: "250 DT" }, { name: "Body Contouring", desc: "Radio-frequency skin tightening", time: "45 min", price: "350 DT" }] },
      { cat: "Wellness", items: [{ name: "Vitamin IV Drip", desc: "Energy boost, immunity, hydration", time: "45 min", price: "200 DT" }, { name: "PRP Therapy", desc: "Platelet-rich plasma, hair & skin", time: "60 min", price: "500 DT" }] }
    ],
    team: [
      { name: "Dr. Amira Ben Salem", role: "Medical Director", specialty: "Dermatology & Aesthetics" },
      { name: "Dr. Youssef Mrad", role: "Cosmetic Surgeon", specialty: "Facial Rejuvenation" },
      { name: "Leila Mansour", role: "Senior Aesthetician", specialty: "Skin Care & Facials" }
    ],
    features: ["Board Certified", "Latest Technology", "Private Suites", "Before/After Gallery", "Payment Plans"],
    stats: [{ label: "Treatments Done", value: "15,000+" }, { label: "Happy Clients", value: "4,200+" }, { label: "Years Experience", value: "12" }, { label: "Specialists", value: "8" }]
  },
  {
    id: 'serene',
    name: "Serene Beauty Bar",
    tagline: "Modern Beauty & Self-Care",
    location: "La Marsa, Tunis",
    phone: "+216 71 774 500",
    hours: "10:00 – 20:00",
    rating: 4.8,
    reviews: 287,
    hero: "from-violet-950 via-purple-950/80 to-neutral-950",
    accent: "violet",
    accentColor: "#8b5cf6",
    description: "A trendy beauty destination for the modern woman. Expert makeup, nail art, lash extensions, and express beauty treatments in a chic setting.",
    treatments: [
      { cat: "Lashes & Brows", items: [{ name: "Classic Lash Extensions", desc: "Natural, full set, lightweight", time: "90 min", price: "120 DT" }, { name: "Volume Lashes", desc: "Dramatic, Russian volume technique", time: "120 min", price: "180 DT" }, { name: "Microblading", desc: "Semi-permanent brow shaping", time: "120 min", price: "350 DT" }] },
      { cat: "Nails", items: [{ name: "Gel Manicure", desc: "Long-lasting, chip-resistant", time: "45 min", price: "45 DT" }, { name: "Nail Art Design", desc: "Custom art, 3D designs", time: "60 min", price: "65 DT" }, { name: "Spa Pedicure", desc: "Soak, scrub, massage, polish", time: "60 min", price: "55 DT" }] },
      { cat: "Makeup", items: [{ name: "Bridal Makeup", desc: "Full glam, trial included", time: "120 min", price: "250 DT" }, { name: "Event Makeup", desc: "Photo-ready, long-lasting", time: "60 min", price: "120 DT" }] }
    ],
    team: [
      { name: "Yasmine Jaziri", role: "Founder & Lead Artist", specialty: "Makeup & Lash Design" },
      { name: "Rania Bouazizi", role: "Nail Art Expert", specialty: "Gel Art & 3D Designs" }
    ],
    features: ["Instagram-Worthy Interior", "Express Services", "Loyalty Program", "Online Booking", "Gift Cards"],
    stats: [{ label: "Clients/Month", value: "800+" }, { label: "Instagram Followers", value: "25K" }, { label: "Services Offered", value: "35+" }, { label: "5-Star Reviews", value: "95%" }]
  },
  {
    id: 'zen',
    name: "Zen Wellness Spa",
    tagline: "Holistic Healing & Relaxation",
    location: "Gammarth, Tunisia",
    phone: "+216 71 913 000",
    hours: "08:00 – 21:00",
    rating: 4.9,
    reviews: 356,
    hero: "from-emerald-950 via-teal-950/80 to-neutral-950",
    accent: "emerald",
    accentColor: "#10b981",
    description: "A sanctuary of tranquility overlooking the Mediterranean. Traditional hammam, therapeutic massages, and holistic wellness programs in a five-star setting.",
    treatments: [
      { cat: "Massage", items: [{ name: "Deep Tissue Massage", desc: "Targeted muscle tension relief", time: "60 min", price: "130 DT" }, { name: "Hot Stone Therapy", desc: "Volcanic stones, full body relaxation", time: "90 min", price: "180 DT" }, { name: "Couples Massage", desc: "Side-by-side, aromatherapy oils", time: "75 min", price: "280 DT" }] },
      { cat: "Hammam", items: [{ name: "Traditional Hammam", desc: "Black soap, kessa glove, rhassoul", time: "60 min", price: "80 DT" }, { name: "Royal Hammam", desc: "Premium oils, honey wrap, facial", time: "120 min", price: "180 DT" }] },
      { cat: "Wellness", items: [{ name: "Yoga Retreat (Day)", desc: "Morning session, meditation, juice", time: "4 hrs", price: "150 DT" }, { name: "Detox Program", desc: "3-day cleanse, treatments, nutrition", time: "3 days", price: "900 DT" }] }
    ],
    team: [
      { name: "Nadia Trabelsi", role: "Spa Director", specialty: "Holistic Wellness" },
      { name: "Karim Ben Amor", role: "Head Therapist", specialty: "Sports & Deep Tissue" },
      { name: "Fatma Khedher", role: "Hammam Expert", specialty: "Traditional Treatments" }
    ],
    features: ["Sea View Suites", "Organic Products", "Steam & Sauna", "Juice Bar", "Member Packages"],
    stats: [{ label: "Treatments/Year", value: "12,000+" }, { label: "Repeat Clients", value: "78%" }, { label: "Therapists", value: "15" }, { label: "Spa Awards", value: "6" }]
  }
];

const accentClasses = {
  rose: { text: 'text-rose-400', bg: 'bg-rose-500', bgSoft: 'bg-rose-500/10', border: 'border-rose-500/30', gradient: 'from-rose-500 to-pink-600' },
  violet: { text: 'text-violet-400', bg: 'bg-violet-500', bgSoft: 'bg-violet-500/10', border: 'border-violet-500/30', gradient: 'from-violet-500 to-purple-600' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', bgSoft: 'bg-emerald-500/10', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-600' }
};

/* ── Single Clinic Site ── */
const ClinicSite = ({ clinic }) => {
  const a = accentClasses[clinic.accent];
  const [treatCat, setTreatCat] = useState(0);
  const treatRef = useReveal();
  const statsRef = useReveal();
  const teamRef = useReveal();

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center`}>
              <Sparkles size={14} className={a.text} />
            </div>
            <span className="text-white font-bold text-sm">{clinic.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#treatments" className="hover:text-white transition-colors">Treatments</a>
            <a href="#team" className="hover:text-white transition-colors">Team</a>
            <button className={`px-4 py-2 ${a.bg} text-white rounded-lg text-xs font-bold`}>Book Now</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`relative min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-b ${clinic.hero}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-white/20 animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-white/10 animate-float-medium"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 pt-32 w-full">
          <div className="animate-slide-up">
            <div className={`inline-flex items-center gap-2 ${a.bgSoft} ${a.border} border rounded-full px-4 py-1.5 mb-6`}>
              <Star size={12} className={`${a.text} fill-current`} />
              <span className={`text-xs font-bold ${a.text}`}>{clinic.rating} · {clinic.reviews} reviews</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight">{clinic.name}</h1>
            <p className="text-xl text-neutral-300 italic mb-6">{clinic.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-2"><MapPin size={14} className={a.text} />{clinic.location}</span>
              <span className="flex items-center gap-2"><Clock size={14} className={a.text} />{clinic.hours}</span>
              <span className="flex items-center gap-2"><Phone size={14} className={a.text} />{clinic.phone}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-3 animate-slide-up-delay">
            <button className={`px-8 py-3.5 bg-gradient-to-r ${a.gradient} text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:scale-105 transition-all duration-300`}>
              Book Appointment
            </button>
            <button className="px-8 py-3.5 bg-white/[0.05] border border-white/10 text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:bg-white/[0.1] transition-all">
              View Treatments
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent"></div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div ref={statsRef.ref} className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {clinic.stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
              style={{ opacity: statsRef.vis ? 1 : 0, transform: statsRef.vis ? 'none' : 'translateY(20px)', transition: `all 0.5s ease ${i * 100}ms` }}>
              <div className={`text-3xl font-black ${a.text} mb-1`}>{s.value}</div>
              <div className="text-neutral-500 text-xs uppercase tracking-widest font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="py-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div ref={treatRef.ref} className="max-w-6xl mx-auto px-4">
          <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Our Treatments</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10">Feel Your Best</h2>
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {clinic.treatments.map((cat, i) => (
              <button key={i} onClick={() => setTreatCat(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${treatCat === i ? `${a.bg} text-white shadow-lg` : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08]'}`}>
                {cat.cat}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {clinic.treatments[treatCat].items.map((item, i) => (
              <div key={i} className="group flex justify-between items-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500"
                style={{ opacity: treatRef.vis ? 1 : 0, transition: `all 0.5s ease ${i * 100}ms` }}>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{item.name}</h3>
                  <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <div className={`${a.text} font-bold text-lg`}>{item.price}</div>
                  <div className="text-neutral-500 text-xs">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16">
        <div ref={teamRef.ref} className="max-w-6xl mx-auto px-4">
          <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Our Team</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10">Expert Practitioners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinic.team.map((m, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all duration-500 text-center"
                style={{ opacity: teamRef.vis ? 1 : 0, transition: `all 0.5s ease ${i * 120}ms` }}>
                <div className={`w-16 h-16 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center mx-auto mb-4`}>
                  <Users size={24} className={a.text} />
                </div>
                <h3 className="text-white font-bold">{m.name}</h3>
                <p className={`${a.text} text-sm font-medium`}>{m.role}</p>
                <p className="text-neutral-500 text-xs mt-1">{m.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Glow?</h2>
          <p className="text-neutral-400 mb-8 text-lg">Book your appointment at {clinic.name}</p>
          <button className={`px-10 py-4 bg-gradient-to-r ${a.gradient} text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:scale-105 transition-all`}>
            Book Now
          </button>
        </div>
      </section>

      <footer className="py-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3"><Sparkles size={16} className={a.text} /><span className="text-white font-bold">{clinic.name}</span></div>
          <p className="text-neutral-500 text-xs">Website crafted by <span className="text-purple-400 font-bold">DCB Authority Group</span></p>
        </div>
      </footer>
    </div>
  );
};

/* ── Main Beauty Example Page ── */
export default function ExampleBeauty({ onBack }) {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const { ref, vis } = useReveal();

  if (selectedClinic) {
    return (
      <div>
        <button onClick={() => setSelectedClinic(null)} className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all">
          <ArrowLeft size={16} /> All Clinics
        </button>
        <ClinicSite clinic={selectedClinic} />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen pt-24 pb-20">
      <button onClick={onBack} className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to DCB
      </button>

      <div ref={ref} className="max-w-6xl mx-auto px-4 mb-16">
        <div className="transition-all duration-700" style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)' }}>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-rose-400" />
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Beauty & Wellness Sector</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Beauty & Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Websites</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">Full example websites we build for the beauty & wellness industry. Click any card to explore the complete site.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {clinics.map((c, i) => {
          const a = accentClasses[c.accent];
          return (
            <div key={c.id} onClick={() => setSelectedClinic(c)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-card-in"
              style={{ animationDelay: `${i * 150}ms` }}>
              <div className={`relative h-52 bg-gradient-to-br ${c.hero} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),transparent_70%)]"></div>
                <div className="absolute top-4 left-4">
                  <div className={`w-10 h-10 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center`}>
                    <Sparkles size={16} className={a.text} />
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-3 py-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs font-bold">{c.rating}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-black text-xl">{c.name}</h3>
                  <p className={`${a.text} text-sm italic`}>{c.tagline}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                  <span className="flex items-center gap-1"><MapPin size={10} />{c.location}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{c.hours}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{c.description}</p>
                <div className={`flex items-center gap-2 ${a.text} text-sm font-bold group-hover:gap-3 transition-all`}>
                  View Full Site <ChevronRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-20 text-center">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <p className="text-neutral-500 text-sm mb-2">These example sites showcase our capabilities</p>
          <p className="text-white font-bold text-lg">Want a website like this for your beauty business?</p>
          <button onClick={onBack} className="mt-4 px-8 py-3 bg-rose-500 text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:bg-rose-400 transition-all">
            Contact DCB Authority Group
          </button>
        </div>
      </div>
    </div>
  );
}
