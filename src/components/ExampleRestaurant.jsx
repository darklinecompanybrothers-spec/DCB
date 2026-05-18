import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Star, UtensilsCrossed, ChevronRight, Instagram, Facebook, Mail, Globe, ChevronDown, Wifi, Music, Wine, Flame, Coffee, Leaf } from 'lucide-react';

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

/* ── Restaurant Data ── */
const restaurants = [
  {
    id: 'terrasse',
    name: "La Terrasse d'Or",
    tagline: "Mediterranean Fine Dining",
    location: "Sidi Bou Said, Tunisia",
    hours: "18:00 – 23:00",
    phone: "+216 71 740 000",
    rating: 4.9,
    reviews: 328,
    hero: "from-amber-950 via-orange-950/80 to-neutral-950",
    accent: "amber",
    accentColor: "#f59e0b",
    description: "An exquisite rooftop dining experience overlooking the Mediterranean Sea. Fresh seafood, locally-sourced ingredients, and a curated wine selection.",
    menu: [
      { cat: "Starters", items: [{ name: "Mediterranean Mezze", desc: "Hummus, baba ganoush, tabbouleh, warm pita", price: "28 DT" }, { name: "Grilled Octopus", desc: "Charred tentacles, cherry tomatoes, olive oil", price: "42 DT" }, { name: "Truffle Burrata", desc: "Fresh burrata, truffle oil, arugula, balsamic", price: "38 DT" }] },
      { cat: "Mains", items: [{ name: "Grilled Sea Bass", desc: "Whole fish, lemon butter, capers, roasted vegetables", price: "65 DT" }, { name: "Lamb Rack", desc: "Herb-crusted, rosemary jus, pommes purée", price: "78 DT" }, { name: "Lobster Risotto", desc: "Arborio rice, saffron, fresh Maine lobster", price: "85 DT" }] },
      { cat: "Desserts", items: [{ name: "House Tiramisu", desc: "Classic Italian, mascarpone, espresso soak", price: "22 DT" }, { name: "Crème Brûlée", desc: "Tahitian vanilla, torched sugar crust", price: "20 DT" }] }
    ],
    features: ["Rooftop Terrace", "Sea View", "Live Music Fridays", "Private Dining Room", "Wine Cellar"],
    gallery: ["Candlelit terrace with sea view", "Chef preparing signature dish", "Elegant bar area", "Private dining room"]
  },
  {
    id: 'nour',
    name: "Dar Nour",
    tagline: "Traditional Tunisian Cuisine",
    location: "La Marsa, Tunisia",
    hours: "12:00 – 22:30",
    phone: "+216 71 888 200",
    rating: 4.7,
    reviews: 215,
    hero: "from-rose-950 via-red-950/80 to-neutral-950",
    accent: "rose",
    accentColor: "#f43f5e",
    description: "A journey through authentic Tunisian flavors in a beautifully restored 18th-century mansion. Family recipes passed down through generations.",
    menu: [
      { cat: "Starters", items: [{ name: "Brik à l'Oeuf", desc: "Crispy pastry, egg, tuna, capers, harissa", price: "15 DT" }, { name: "Slata Mechouia", desc: "Roasted peppers & tomatoes, olive oil, tuna", price: "12 DT" }, { name: "Lablabi", desc: "Spiced chickpea soup, crusty bread, harissa", price: "10 DT" }] },
      { cat: "Mains", items: [{ name: "Couscous Royal", desc: "Lamb, merguez, chickpeas, seasonal vegetables", price: "35 DT" }, { name: "Tajine Malsouka", desc: "Layered pastry, chicken, egg, parsley", price: "28 DT" }, { name: "Grilled Lamb Chops", desc: "Marinated, charcoal-grilled, cumin spice", price: "45 DT" }] },
      { cat: "Desserts", items: [{ name: "Makroudh", desc: "Date-filled semolina pastry, orange blossom", price: "8 DT" }, { name: "Assida Zgougou", desc: "Pine nut cream, decorated with nuts & cream", price: "12 DT" }] }
    ],
    features: ["Historic Mansion", "Garden Courtyard", "Live Oud Music", "Cooking Classes", "Group Bookings"],
    gallery: ["Courtyard dining under stars", "Traditional clay oven", "Ornate interior details", "Chef's table experience"]
  },
  {
    id: 'azur',
    name: "Azur Lounge",
    tagline: "Modern Fusion & Cocktails",
    location: "Gammarth, Tunisia",
    hours: "17:00 – 01:00",
    phone: "+216 71 910 500",
    rating: 4.8,
    reviews: 189,
    hero: "from-blue-950 via-indigo-950/80 to-neutral-950",
    accent: "blue",
    accentColor: "#3b82f6",
    description: "Where global flavors meet Tunisian soul. Craft cocktails, sushi bar, and a DJ every weekend in a sleek waterfront setting.",
    menu: [
      { cat: "Small Plates", items: [{ name: "Tuna Tartare", desc: "Soy-sesame, avocado mousse, wonton crisps", price: "38 DT" }, { name: "Wagyu Sliders", desc: "Truffle aioli, pickled onion, brioche", price: "42 DT" }, { name: "Tempura Prawns", desc: "Sweet chili glaze, micro greens", price: "35 DT" }] },
      { cat: "Sushi & Rolls", items: [{ name: "Dragon Roll", desc: "Shrimp tempura, avocado, eel sauce", price: "48 DT" }, { name: "Sashimi Platter", desc: "Tuna, salmon, hamachi, 12 pieces", price: "72 DT" }] },
      { cat: "Cocktails", items: [{ name: "Azur Sunset", desc: "Vodka, passion fruit, blue curaçao, champagne", price: "32 DT" }, { name: "Tunisian Mojito", desc: "White rum, fresh mint, citrus, boukha", price: "28 DT" }] }
    ],
    features: ["Waterfront Deck", "Live DJ Weekends", "Sushi Bar", "VIP Cabanas", "Happy Hour 17-19h"],
    gallery: ["Sunset cocktails on deck", "Sushi chef at work", "DJ booth setup", "VIP cabana area"]
  }
];

const accentClasses = {
  amber: { text: 'text-amber-400', bg: 'bg-amber-500', bgSoft: 'bg-amber-500/10', border: 'border-amber-500/30', ring: 'ring-amber-500/20', gradient: 'from-amber-500 to-orange-600' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500', bgSoft: 'bg-rose-500/10', border: 'border-rose-500/30', ring: 'ring-rose-500/20', gradient: 'from-rose-500 to-red-600' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500', bgSoft: 'bg-blue-500/10', border: 'border-blue-500/30', ring: 'ring-blue-500/20', gradient: 'from-blue-500 to-indigo-600' }
};

/* ── Single Restaurant Page ── */
const RestaurantSite = ({ r, onBack }) => {
  const [menuCat, setMenuCat] = useState(0);
  const a = accentClasses[r.accent];
  const heroRef = useRef(null);
  const menuRef = useReveal();
  const featRef = useReveal();
  const galRef = useReveal();

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center`}>
              <UtensilsCrossed size={14} className={a.text} />
            </div>
            <span className="text-white font-bold text-sm">{r.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <a href="#menu" className="hover:text-white transition-colors">Menu</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <button className={`px-4 py-2 ${a.bg} text-white rounded-lg text-xs font-bold`}>Reserve</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className={`relative min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-b ${r.hero}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white/10 animate-float-medium"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white/15 animate-float-fast"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 pt-32 w-full">
          <div className="animate-slide-up">
            <div className={`inline-flex items-center gap-2 ${a.bgSoft} ${a.border} border rounded-full px-4 py-1.5 mb-6`}>
              <Star size={12} className={`${a.text} fill-current`} />
              <span className={`text-xs font-bold ${a.text}`}>{r.rating} · {r.reviews} reviews</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight">{r.name}</h1>
            <p className="text-xl md:text-2xl text-neutral-300 italic mb-6">{r.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-2"><MapPin size={14} className={a.text} />{r.location}</span>
              <span className="flex items-center gap-2"><Clock size={14} className={a.text} />{r.hours}</span>
              <span className="flex items-center gap-2"><Phone size={14} className={a.text} />{r.phone}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-3 animate-slide-up-delay">
            <button className={`px-8 py-3.5 bg-gradient-to-r ${a.gradient} text-white font-bold rounded-lg uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              Reserve a Table
            </button>
            <button className="px-8 py-3.5 bg-white/[0.05] backdrop-blur-md border border-white/10 text-white font-bold rounded-lg uppercase tracking-wider text-sm hover:bg-white/[0.1] transition-all">
              View Menu
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950 to-transparent"></div>
      </section>

      {/* Description */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl animate-fade-in">{r.description}</p>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div ref={menuRef.ref} className="max-w-6xl mx-auto px-4">
          <div className="mb-10 transition-all duration-700" style={{ opacity: menuRef.vis ? 1 : 0, transform: menuRef.vis ? 'none' : 'translateY(30px)' }}>
            <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Our Menu</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">Curated for You</h2>
          </div>
          {/* Category tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {r.menu.map((cat, i) => (
              <button key={i} onClick={() => setMenuCat(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${menuCat === i ? `${a.bg} text-white shadow-lg` : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08] hover:text-white'}`}>
                {cat.cat}
              </button>
            ))}
          </div>
          {/* Menu items */}
          <div className="space-y-4">
            {r.menu[menuCat].items.map((item, i) => (
              <div key={i} className="group flex justify-between items-start p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500"
                style={{ opacity: menuRef.vis ? 1 : 0, transform: menuRef.vis ? 'none' : 'translateX(-20px)', transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms` }}>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg group-hover:text-white/90 transition-colors">{item.name}</h3>
                  <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>
                </div>
                <span className={`${a.text} font-bold text-lg ml-4 flex-shrink-0`}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-16 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div ref={featRef.ref} className="max-w-6xl mx-auto px-4">
          <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Experience</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {r.features.map((f, i) => (
              <div key={i} className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center hover:border-white/[0.1] hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-500"
                style={{ opacity: featRef.vis ? 1 : 0, transform: featRef.vis ? 'none' : 'translateY(20px)', transition: `all 0.5s ease ${i * 80}ms` }}>
                <span className="text-neutral-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section id="gallery" className="py-16 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div ref={galRef.ref} className="max-w-6xl mx-auto px-4">
          <span className={`text-xs font-bold ${a.text} uppercase tracking-[0.3em] mb-3 block`}>Gallery</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10">The Atmosphere</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {r.gallery.map((caption, i) => (
              <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${r.hero} border border-white/[0.06] flex items-end p-4 overflow-hidden group hover:scale-[1.02] transition-all duration-500`}
                style={{ opacity: galRef.vis ? 1 : 0, transition: `all 0.6s ease ${i * 120}ms` }}>
                <span className="text-neutral-400 text-xs font-medium group-hover:text-white transition-colors">{caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Dine?</h2>
          <p className="text-neutral-400 mb-8 text-lg">Reserve your table and experience {r.name}</p>
          <button className={`px-10 py-4 bg-gradient-to-r ${a.gradient} text-white font-bold rounded-lg uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <UtensilsCrossed size={16} className={a.text} />
            <span className="text-white font-bold">{r.name}</span>
          </div>
          <p className="text-neutral-500 text-xs">Website crafted by <span className="text-purple-400 font-bold">DCB Authority Group</span></p>
        </div>
      </footer>
    </div>
  );
};

/* ── Main Restaurant Example Page ── */
export default function ExampleRestaurant({ onBack }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { ref, vis } = useReveal();

  if (selectedRestaurant) {
    return (
      <div>
        <button onClick={() => setSelectedRestaurant(null)} className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all">
          <ArrowLeft size={16} /> All Restaurants
        </button>
        <RestaurantSite r={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen pt-24 pb-20">
      {/* Back button */}
      <button onClick={onBack} className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to DCB
      </button>

      {/* Header */}
      <div ref={ref} className="max-w-6xl mx-auto px-4 mb-16">
        <div className="transition-all duration-700" style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)' }}>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <UtensilsCrossed size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Restaurant Sector</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Restaurant <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Websites</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">Full example websites we build for the restaurant industry. Click any card to explore the complete site.</p>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map((r, i) => {
          const a = accentClasses[r.accent];
          return (
            <div key={r.id} onClick={() => setSelectedRestaurant(r)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-card-in"
              style={{ animationDelay: `${i * 150}ms` }}>
              {/* Card hero */}
              <div className={`relative h-52 bg-gradient-to-br ${r.hero} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),transparent_70%)]"></div>
                <div className="absolute top-4 left-4">
                  <div className={`w-10 h-10 rounded-full ${a.bgSoft} ${a.border} border flex items-center justify-center`}>
                    <UtensilsCrossed size={16} className={a.text} />
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-3 py-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs font-bold">{r.rating}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-black text-xl">{r.name}</h3>
                  <p className={`${a.text} text-sm italic`}>{r.tagline}</p>
                </div>
              </div>
              {/* Card body */}
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={10} />{r.location}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{r.hours}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{r.description}</p>
                <div className={`flex items-center gap-2 ${a.text} text-sm font-bold group-hover:gap-3 transition-all`}>
                  View Full Site <ChevronRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DCB Branding */}
      <div className="max-w-6xl mx-auto px-4 mt-20 text-center">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <p className="text-neutral-500 text-sm mb-2">These example sites showcase our capabilities</p>
          <p className="text-white font-bold text-lg">Want a website like this for your restaurant?</p>
          <button onClick={onBack} className="mt-4 px-8 py-3 bg-amber-500 text-black font-bold rounded-lg uppercase tracking-wider text-sm hover:bg-amber-400 transition-all">
            Contact DCB Authority Group
          </button>
        </div>
      </div>
    </div>
  );
}
