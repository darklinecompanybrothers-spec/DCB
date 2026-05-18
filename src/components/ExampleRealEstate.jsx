import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Building2, Star, ChevronRight, Phone, Mail, Eye, Bed, Bath, Maximize, Car, Shield, Wifi, Check, ArrowRight, Heart } from 'lucide-react';

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

/* ── Real Estate Data ── */
const agencies = [
  {
    id: 'prestige',
    name: "Prestige Immobilier",
    tagline: "Luxury Villas & Apartments",
    location: "Les Berges du Lac, Tunis",
    phone: "+216 71 860 000",
    hero: "from-amber-950 via-stone-950/80 to-neutral-950",
    accent: "amber",
    accentColor: "#f59e0b",
    description: "Tunisia's premier luxury real estate platform. Exclusive villas, penthouses, and waterfront properties for discerning buyers.",
    properties: [
      { name: "Villa Aurora", type: "Villa", location: "Sidi Bou Said", price: "1,850,000 DT", beds: 5, baths: 4, area: "450 m²", parking: 3, features: ["Pool", "Sea View", "Smart Home", "Garden"], tag: "Exclusive" },
      { name: "Penthouse Étoile", type: "Penthouse", location: "Les Berges du Lac", price: "1,200,000 DT", beds: 4, baths: 3, area: "320 m²", parking: 2, features: ["Rooftop Terrace", "City View", "Concierge", "Gym"], tag: "New" },
      { name: "Résidence du Parc", type: "Apartment", location: "Lac 2, Tunis", price: "650,000 DT", beds: 3, baths: 2, area: "180 m²", parking: 1, features: ["Gated Community", "Pool Access", "24/7 Security", "Garden"], tag: "Popular" },
      { name: "Maison Blanche", type: "Villa", location: "La Marsa", price: "2,400,000 DT", beds: 6, baths: 5, area: "600 m²", parking: 4, features: ["Beach Access", "Wine Cellar", "Cinema Room", "Staff Quarters"], tag: "Premium" }
    ],
    services: ["Virtual Tours 360°", "Investment Advisory", "Property Management", "Legal Assistance", "Interior Design"],
    stats: [{ label: "Properties Sold", value: "850+" }, { label: "Happy Clients", value: "1,200+" }, { label: "Years Experience", value: "15" }, { label: "Cities Covered", value: "12" }]
  },
  {
    id: 'medina',
    name: "Medina Homes",
    tagline: "Modern Urban Living",
    location: "Centre Urbain Nord, Tunis",
    phone: "+216 71 752 000",
    hero: "from-emerald-950 via-teal-950/80 to-neutral-950",
    accent: "emerald",
    accentColor: "#10b981",
    description: "Redefining city living in Tunisia. Smart apartments, co-living spaces, and urban developments for the modern professional.",
    properties: [
      { name: "Studio Vertex", type: "Studio", location: "Centre Urbain Nord", price: "185,000 DT", beds: 1, baths: 1, area: "55 m²", parking: 1, features: ["Smart Lock", "Co-working", "Gym", "Rooftop"], tag: "Best Value" },
      { name: "Loft Industriel", type: "Loft", location: "La Goulette", price: "320,000 DT", beds: 2, baths: 1, area: "110 m²", parking: 1, features: ["High Ceilings", "Open Plan", "Industrial Design", "Sea Proximity"], tag: "Unique" },
      { name: "Garden Duplex", type: "Duplex", location: "Ariana", price: "480,000 DT", beds: 3, baths: 2, area: "200 m²", parking: 2, features: ["Private Garden", "Terrace", "New Build", "Energy Efficient"], tag: "New" },
      { name: "Sky Residence", type: "Apartment", location: "Lac 1, Tunis", price: "550,000 DT", beds: 3, baths: 2, area: "160 m²", parking: 1, features: ["Lake View", "Fitness Center", "Concierge", "Parking"], tag: "Hot" }
    ],
    services: ["3D Floor Plans", "Mortgage Calculator", "Neighborhood Guide", "Moving Assistance", "Renovation Services"],
    stats: [{ label: "Units Available", value: "320+" }, { label: "Residents", value: "2,500+" }, { label: "Developments", value: "28" }, { label: "Satisfaction", value: "98%" }]
  },
  {
    id: 'sahel',
    name: "Sahel Properties",
    tagline: "Coastal & Resort Living",
    location: "Sousse, Tunisia",
    phone: "+216 73 225 000",
    hero: "from-sky-950 via-cyan-950/80 to-neutral-950",
    accent: "sky",
    accentColor: "#0ea5e9",
    description: "Your gateway to Tunisia's stunning coastline. Beach villas, resort apartments, and vacation properties along the Mediterranean.",
    properties: [
      { name: "Villa Méditerranée", type: "Beach Villa", location: "Hammamet", price: "980,000 DT", beds: 4, baths: 3, area: "350 m²", parking: 2, features: ["Beach Front", "Private Pool", "BBQ Area", "Guest House"], tag: "Beachfront" },
      { name: "Marina Bay Apt", type: "Apartment", location: "Port El Kantaoui", price: "420,000 DT", beds: 2, baths: 2, area: "120 m²", parking: 1, features: ["Marina View", "Pool", "Resort Access", "Furnished"], tag: "Resort" },
      { name: "Olive Grove Estate", type: "Estate", location: "Nabeul", price: "1,500,000 DT", beds: 5, baths: 4, area: "800 m²", parking: 3, features: ["Olive Grove", "Pool", "Orchard", "Guest Cottages"], tag: "Exclusive" },
      { name: "Sunset Penthouse", type: "Penthouse", location: "Sousse Corniche", price: "750,000 DT", beds: 3, baths: 2, area: "200 m²", parking: 2, features: ["Panoramic Sea View", "Jacuzzi", "Modern Design", "Smart Home"], tag: "Premium" }
    ],
    services: ["Virtual Coastal Tours", "Rental Management", "Vacation Packages", "Property Insurance", "Concierge Service"],
    stats: [{ label: "Coastal Properties", value: "450+" }, { label: "Rental Income Avg", value: "8.5%" }, { label: "Coastline km", value: "120+" }, { label: "5-Star Reviews", value: "890+" }]
  }
];

const accentClasses = {
  amber: { text: 'text-amber-400', bg: 'bg-amber-500', bgSoft: 'bg-amber-500/10', border: 'border-amber-500/30', gradient: 'from-amber-500 to-orange-600' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', bgSoft: 'bg-emerald-500/10', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-600' },
  sky: { text: 'text-sky-400', bg: 'bg-sky-500', bgSoft: 'bg-sky-500/10', border: 'border-sky-500/30', gradient: 'from-sky-500 to-cyan-600' }
};

/* ── Single Agency Site ── */
const AgencySite = ({ agency }) => {
  const a = accentClasses[agency.accent];
  const [filter, setFilter] = useState('All');
  const propRef = useReveal();
  const statsRef = useReveal();
  const svcRef = useReveal();
  const types = ['All', ...new Set(agency.properties.map(p => p.type))];
  const filtered = filter === 'All' ? agency.properties : agency.properties.filter(p => p.type === filter);

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center`}>
              <Building2 size={14} className={a.text} />
            </div>
            <span className="text-white font-bold text-sm">{agency.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#properties" className="hover:text-white transition-colors">Properties</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <button className={`px-4 py-2 ${a.bg} text-white rounded-lg text-xs font-bold`}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`relative min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-b ${agency.hero}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white/20 animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-white/10 animate-float-medium"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 pt-32 w-full">
          <div className="animate-slide-up">
            <div className={`inline-flex items-center gap-2 ${a.bgSoft} ${a.border} border rounded-full px-4 py-1.5 mb-6`}>
              <Building2 size={12} className={a.text} />
              <span className={`text-xs font-bold ${a.text} uppercase tracking-widest`}>{agency.tagline}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight">{agency.name}</h1>
            <p className="text-xl text-neutral-300 mb-6 max-w-2xl">{agency.description}</p>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-2"><MapPin size={14} className={a.text} />{agency.location}</span>
              <span className="flex items-center gap-2"><Phone size={14} className={a.text} />{agency.phone}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-3 animate-slide-up-delay">
            <button className={`px-8 py-3.5 bg-gradient-to-r ${a.gradient} text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:scale-105 transition-all duration-300`}>
              Browse Properties
            </button>
            <button className="px-8 py-3.5 bg-white/[0.05] border border-white/10 text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:bg-white/[0.1] transition-all">
              Schedule Visit
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent"></div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div ref={statsRef.ref} className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {agency.stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
              style={{ opacity: statsRef.vis ? 1 : 0, transform: statsRef.vis ? 'none' : 'translateY(20px)', transition: `all 0.5s ease ${i * 100}ms` }}>
              <div className={`text-3xl font-black ${a.text} mb-1`}>{s.value}</div>
              <div className="text-neutral-500 text-xs uppercase tracking-widest font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="py-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div ref={propRef.ref} className="max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Properties</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">Featured Listings</h2>
          </div>
          {/* Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${filter === t ? `${a.bg} text-white shadow-lg` : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08]'}`}>
                {t}
              </button>
            ))}
          </div>
          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
                style={{ opacity: propRef.vis ? 1 : 0, transition: `all 0.5s ease ${i * 100}ms` }}>
                <div className={`relative h-48 bg-gradient-to-br ${agency.hero} overflow-hidden`}>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full">
                    <span className={`text-xs font-bold ${a.text}`}>{p.tag}</span>
                  </div>
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                    <Heart size={14} className="text-white" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-neutral-400 text-xs">{p.type}</span>
                    <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs mb-3">
                    <MapPin size={10} />{p.location}
                  </div>
                  <div className={`text-2xl font-black ${a.text} mb-4`}>{p.price}</div>
                  <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
                    <span className="flex items-center gap-1"><Bed size={12} />{p.beds} Beds</span>
                    <span className="flex items-center gap-1"><Bath size={12} />{p.baths} Baths</span>
                    <span className="flex items-center gap-1"><Maximize size={12} />{p.area}</span>
                    <span className="flex items-center gap-1"><Car size={12} />{p.parking} Park</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.features.map((f, j) => (
                      <span key={j} className="text-[10px] font-bold text-neutral-500 bg-white/[0.04] px-2.5 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16">
        <div ref={svcRef.ref} className="max-w-6xl mx-auto px-4">
          <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Services</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10">How We Help</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {agency.services.map((s, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center hover:border-white/[0.1] hover:-translate-y-1 transition-all duration-500"
                style={{ opacity: svcRef.vis ? 1 : 0, transition: `all 0.5s ease ${i * 80}ms` }}>
                <Check size={16} className={`${a.text} mx-auto mb-2`} />
                <span className="text-neutral-300 text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Find Your Dream Home</h2>
          <p className="text-neutral-400 mb-8 text-lg">Let {agency.name} guide your search</p>
          <button className={`px-10 py-4 bg-gradient-to-r ${a.gradient} text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:scale-105 transition-all`}>
            Schedule a Visit
          </button>
        </div>
      </section>

      <footer className="py-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3"><Building2 size={16} className={a.text} /><span className="text-white font-bold">{agency.name}</span></div>
          <p className="text-neutral-500 text-xs">Website crafted by <span className="text-purple-400 font-bold">DCB Authority Group</span></p>
        </div>
      </footer>
    </div>
  );
};

/* ── Main Real Estate Example Page ── */
export default function ExampleRealEstate({ onBack }) {
  const [selectedAgency, setSelectedAgency] = useState(null);
  const { ref, vis } = useReveal();

  if (selectedAgency) {
    return (
      <div>
        <button onClick={() => setSelectedAgency(null)} className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all">
          <ArrowLeft size={16} /> All Agencies
        </button>
        <AgencySite agency={selectedAgency} />
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
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <Building2 size={14} className="text-purple-400" />
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Real Estate Sector</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Real Estate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">Websites</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">Full example websites we build for the real estate industry. Click any card to explore the complete site.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {agencies.map((ag, i) => {
          const a = accentClasses[ag.accent];
          return (
            <div key={ag.id} onClick={() => setSelectedAgency(ag)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-card-in"
              style={{ animationDelay: `${i * 150}ms` }}>
              <div className={`relative h-52 bg-gradient-to-br ${ag.hero} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),transparent_70%)]"></div>
                <div className="absolute top-4 left-4">
                  <div className={`w-10 h-10 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center`}>
                    <Building2 size={16} className={a.text} />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-black text-xl">{ag.name}</h3>
                  <p className={`${a.text} text-sm`}>{ag.tagline}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                  <MapPin size={10} />{ag.location}
                </div>
                <div className="flex gap-3 mb-4">
                  {ag.stats.slice(0, 2).map((s, j) => (
                    <div key={j} className="text-center">
                      <div className={`font-bold text-sm ${a.text}`}>{s.value}</div>
                      <div className="text-neutral-500 text-[10px]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{ag.description}</p>
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
          <p className="text-white font-bold text-lg">Want a website like this for your real estate business?</p>
          <button onClick={onBack} className="mt-4 px-8 py-3 bg-purple-600 text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:bg-purple-500 transition-all">
            Contact DCB Authority Group
          </button>
        </div>
      </div>
    </div>
  );
}
