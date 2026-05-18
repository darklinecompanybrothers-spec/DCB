const TRANSLATIONS = {
  en: {
    nav: { services: "Services", pricing: "Pricing", portfolio: "Portfolio", showcase: "Showcase", team: "Team", about: "About", start: "Start Project" },
    intro: {
      overline: "Sound. Vision. Code.",
      title1: "THE FUTURE",
      title2: "OF YOUR IMAGE",
      desc: "We merge artistic direction, premium production and technology to transform your brand into an iconic experience.",
      cta: "Explore The Agency",
      footerLabel: "Visual Production · Audio Studio · Web Dev",
    },
    hero: {
      status: "Accepting New Clients",
      title1: "AMPLIFY",
      title2: "YOUR REALITY",
      desc: "One ecosystem. Three disciplines. Infinite impact. We don't just produce — we build the legacies that define industries.",
      cta1: "Start Your Project",
      cta2: "See What We Build"
    },
    services: {
      title: "THE TRINITY",
      subtitle: "Three disciplines. Each one built to dominate its domain. Together, they give your brand an unfair advantage.",
      studio: { title: "The Studio", desc: "Industry standard recording, mixing, and mastering environments." },
      visuals: { title: "The Visuals", desc: "Cinematic video production and high-fidelity photography." },
      agency: { title: "The Agency", desc: "Web development and digital marketing strategies that convert." }
    },
    process: {
      overline: "How We Work",
      title: "FROM BRIEF",
      titleOutline: "TO LAUNCH.",
      subtitle: "A clear, battle-tested process — from first contact to final delivery. No surprises, no ambiguity.",
      steps: [
        { number: '01', name: 'Discovery',          tagline: 'We listen before we create',    description: 'Deep-dive session to understand your brand, market, competitors and goals. We map the territory before we draw the map.',                                                       duration: '1–2 days',  tags: ['Brand Audit', 'Competitor Analysis', 'Goals Definition'] },
        { number: '02', name: 'Strategy & Brief',   tagline: 'The blueprint for everything',  description: 'Creative direction, technical specs and timeline locked in one document. What we agreed here is what gets built — nothing more, nothing less.',                                duration: '2–3 days',  tags: ['Creative Brief', 'Tech Specs', 'Project Timeline'] },
        { number: '03', name: 'Production',         tagline: 'Vision becomes reality',        description: 'Studio sessions, video shoots or code sprints — our specialists execute at the highest level. Weekly check-ins keep you in the loop, always.',                                   duration: '1–6 weeks', tags: ['Studio / Shoot / Dev', 'Weekly Updates', 'Quality Control'] },
        { number: '04', name: 'Delivery & Launch',  tagline: 'Shipped. Polished. Impactful.', description: 'Assets delivered in every format you need. For digital products, we handle deployment, SEO optimisation and launch strategy so you hit the ground running.',                    duration: '2–5 days',  tags: ['Final Handoff', 'Deployment', 'Launch Strategy'] },
        { number: '05', name: 'Post-Launch Support',tagline: 'Partners, not vendors',         description: '30-day support window included on every project. Revisions, optimisations and ongoing strategy — we stay in your corner long after the launch.',                              duration: '30+ days',  tags: ['Revisions', 'Optimization', 'Ongoing Strategy'] },
      ],
    },
    sectors: {
      title: "SECTOR SOLUTIONS",
      subtitle: "We build digital ecosystems for Tunisia's most ambitious brands. Every pixel, every interaction — engineered to convert visitors into clients.",
      cta: "Discuss Your Project",
      realEstate: {
        label: "Immobilier",
        headline: "Premium Digital Presence for Tunisia's Finest Properties",
        description: "Your properties deserve more than a listing. We create immersive digital experiences that make buyers feel the marble floors and sea views before they ever step inside. From Les Berges du Lac to Hammamet's coastline — we position your brand where the high-net-worth clients are looking.",
        features: [
          "Cinematic property galleries with 360° virtual tours",
          "Lead generation landing pages with 40%+ conversion optimization",
          "SEO dominance for 'immobilier Tunisie', 'villa de luxe', local keywords",
          "CRM-integrated contact funnels — every lead tracked, no client lost",
          "Multi-listing platforms with advanced filtering & map integration",
          "Multilingual sites (FR/AR/EN) for international investors"
        ],
        stat: "3x",
        statLabel: "Average lead increase for real estate clients"
      },
      restaurants: {
        label: "Restaurants",
        headline: "Elevate Every Reservation, From First Click to First Bite",
        description: "In a market where every restaurant has an Instagram page, only the elite have a digital ecosystem. We build the kind of online presence that fills tables on Tuesday nights — not just weekends. From La Marsa's seafront to Sidi Bou Saïd's terraces, your restaurant deserves to be discovered, not just found.",
        features: [
          "QR-powered interactive menus with stunning food photography",
          "Online reservation systems integrated with your workflow",
          "Social media content strategy — reels, stories & ad campaigns that fill seats",
          "Google Business & TripAdvisor optimization for local discovery",
          "Branded mobile-first websites that load in under 2 seconds",
          "Loyalty program platforms & email marketing automation"
        ],
        stat: "85%",
        statLabel: "Of diners check menus online before choosing"
      },
      aesthetics: {
        label: "Esthétique",
        headline: "Clinical Precision Meets Luxury Digital Design",
        description: "Your clients expect perfection in every detail — your digital presence should reflect the same standard. We create 'clinical-luxury' digital experiences for beauty clinics, spas, and aesthetic centers across Tunisia. Clean lines, calming palettes, and booking flows so smooth your clients are confirmed before they second-guess.",
        features: [
          "Elegant appointment booking systems with automated reminders",
          "Before/after treatment galleries with privacy-first design",
          "Treatment showcase pages with pricing transparency",
          "Instagram-first branding — cohesive grids, highlight covers, bio links",
          "Google Reviews integration & reputation management dashboards",
          "E-commerce for skincare product lines & gift voucher systems"
        ],
        stat: "70%",
        statLabel: "Of beauty clients book online — are you capturing them?"
      }
    },
    showcase: {
      overline: "WHAT WE BUILD",
      mainTitle: "Experiences we craft",
      startProjectBtn: "Start this project",
      realEstate: {
        title: "Prestige Real Estate",
        description: "We craft digital experiences that elevate luxury property sales. Every detail, from immersive galleries to qualification funnels, is designed to convert your most demanding prospects."
      },
      fineDining: {
        title: "Michelin-Star Dining",
        description: "From table reservations to full experience design, we translate luxury into the digital world."
      },
      wellness: {
        title: "Beauty & Spa Clinics",
        description: "We design medical-aesthetic interfaces that reassure and convert. From AI diagnostics to appointment workflows, your clinic becomes a premium digital experience end to end."
      },
      edtech: {
        title: "University of the Future",
        description: "We build next-generation learning platforms with AI tutoring, adaptive video delivery, and gamification to boost student engagement and academic outcomes."
      },
      fintech: {
        title: "Finance & Blockchain",
        description: "Trading and digital-asset interfaces that inspire trust. We combine regulation-grade compliance, AES-256 security, and real-time UX for demanding financial products."
      },
      ecommerce: {
        title: "Digital Haute Couture",
        description: "Luxury retail excellence, translated online. 3D configurators, ultra-fluid purchasing flows, and minimalist design that presents each product like a work of art."
      }
    },
    caseStudies: {
      overline: "Our Work",
      title: "CASE",
      titleOutline: "STUDIES",
      subtitle: "Real projects. Real impact. Every slot below will be unveiled as our productions go live.",
      comingSoon: "Coming Soon",
      inProduction: "In Production",
      globalBadge: "Content Being Produced",
      footerNote: "Case studies will be published as productions are finalised — check back soon.",
      categories: { studio: "Studio", visuals: "Visuals", agency: "Agency" },
    },
    pricing: {
      title: "INVEST IN",
      titleHighlight: "AUTHORITY",
      subtitle: "Transparent pricing for clear results. Choose your domain and level up.",
      tabs: { studio: "The Studio", visuals: "The Visuals", agency: "The Agency" },
      popular: "Most Popular",
      select: "Select Plan"
    },
    portfolio: {
      title: "TRUSTED PARTNERS",
      viewAll: "View All Collaborations",
      back: "Back to Home",
      pageTitle: "OUR LEGACY",
      pageDesc: "A collection of visionaries who trusted us to amplify their voice.",
      filters: { all: "All", studio: "Studio", visuals: "Visuals", agency: "Agency" },
      ctaTitle: "Ready to join the elite?",
      ctaBtn: "Become a Partner",
      livePortfolio: "See our live portfolio"
    },
    team: {
      overline: "The Minds Behind The Work",
      title: "MEET THE TEAM",
      subtitle: "Six minds. Three disciplines. One relentless standard.",
      members: [
        {
          name: "Daboussi Iheb",
          role: "CEO & Founder",
          division: "DCB Authority Group",
          bio: "Founder and creative visionary of DCB Authority Group. Sets the artistic and business direction across all three divisions, ensuring the group always operates at the frontier of culture and innovation.",
        },
        {
          name: "Daboussi Yassine",
          role: "COO & Co-Founder",
          division: "DCB Authority Group",
          bio: "Co-founder and chief operator. Architects the digital infrastructure — from pixel-perfect frontends to enterprise-grade systems — and ensures every project is delivered with uncompromising technical standards.",
        },
        {
          name: "Marwen Daboussi",
          role: "Co-Founder",
          division: "DCB Authority Group",
          bio: "The strategic architect of DCB's expansion. Bridges creative vision with business development — identifying key markets, forging high-value partnerships, and ensuring the group's authority is felt across every industry it enters.",
        },
        {
          name: "Khaled Boulila",
          role: "Sound Engineer",
          division: "The Studio",
          bio: "Shapes the sonic identity of every project. From the first take to the final master, every decibel is crafted with the precision of an engineer and the instinct of an artist.",
        },
        {
          name: "Ahmed Kalboussi",
          role: "Growth Architect",
          division: "The Agency",
          bio: "The engine behind client growth and market strategy. Connects DCB's creative power with the right opportunities — designing the partnerships and campaigns that turn visibility into revenue.",
        },
        {
          name: "Omar Guitouni",
          nickname: "OG VISUALS",
          role: "Visual Architect & Director",
          division: "The Visuals",
          bio: "The visual mind behind DCB's most striking productions. Directs music videos and brand campaigns with a cinematic instinct that defines the agency's aesthetic signature across every frame.",
        },
      ],
    },
    wizard: {
      title: "START YOUR PROJECT",
      subtitle: "Tell us what you need. We'll handle the rest.",
      step1: "What are we building?",
      step1Opts: { studio: "Audio / Studio", visuals: "Visual Production", agency: "Digital / Web" },
      step2: "Select your package for",
      customOpt: "Other / Custom Vision",
      customDesc: "For unique needs not listed above.",
      backCat: "Back to Categories",
      step3: "Final Details",
      selected: "You selected:",
      placeholders: {
        name: "Your Name / Business Name *",
        email: "Email Address *",
        phone: "Phone Number (Digits Only) *",
        details: "Any specific requests or timeline?",
        customDetails: "Tell us about your custom vision..."
      },
      errors: { name: "Name is required", email: "Email is required", emailInvalid: "Please enter a valid email address", phone: "Phone number is required" },
      submit: "LAUNCH PROJECT REQUEST",
      sending: "SENDING...",
      backPack: "Back to Packs",
      alertSuccess: "PROJECT REQUEST RECEIVED! We will contact you shortly.",
      alertError: "There was an error sending your request. Please try again or email us directly."
    },
    manifesto: {
      overline: 'Our Philosophy',
      lines: [
        { text: "We don't make content.",        accent: false },
        { text: 'We engineer legacies.',          accent: true  },
        { text: 'Sound. Vision. Code.',           accent: false },
        { text: 'Three disciplines.',             accent: false },
        { text: 'Zero compromises.',              accent: false },
        { text: 'Built in Tunisia.',              accent: false },
        { text: 'Built for the world.',           accent: true  },
      ],
    },
    stats: {
      overline: 'By The Numbers',
      title: 'IMPACT AT A GLANCE',
      subtitle: 'Real results, real clients, real impact.',
      items: [
        { number: 150, suffix: '+', label: 'Projects Delivered', sub: 'Across all 3 divisions' },
        { number: 50,  suffix: '+', label: 'Clients Worldwide',  sub: 'And growing every month' },
        { number: 3,   suffix: '',  label: 'Years of Excellence', sub: 'Established 2022' },
        { number: 10,  suffix: '+', label: 'Countries Reached',   sub: 'Global digital presence' },
      ]
    },
    footer: {
      tagline: 'Where creativity meets engineering.',
      navTitle: 'Navigate',
      contactTitle: 'Contact',
      links: {
        about: 'About Us',
        services: 'Services',
        process: 'Our Process',
        pricing: 'Pricing',
        team: 'The Team',
        contact: 'Start a Project',
      },
      copyright: '© 2025 DCB Authority Group. All rights reserved.',
      madeIn: 'Crafted in Tunisia',
      legal: 'Legal Notice',
      privacy: 'Privacy Policy',
    },
    prefooterCta: {
      overline: 'Next Chapter',
      title: 'READY TO BUILD',
      subtitle: 'SOMETHING UNDENIABLE?',
      cta: 'Start Your Project',
    },
    contactSection: {
      overline: 'Get In Touch',
      title: "LET'S",
      titleAccent: 'TALK.',
      subtitle: "Most agencies talk. We deliver. Every brief becomes an obsession — let's build yours.",
      cta: 'Start the Wizard',
    },
    testimonials: {
      overline: 'Client Voices',
      title: 'WHAT THEY',
      titleOutline: 'SAY',
      subtitle: 'From Tunis to the world — real feedback from the brands and artists who trust us.',
      reviewCount: 'Verified Reviews',
      recommended: 'Would Recommend',
    },
    about: {
      backBtn: "Back to Home",
      hero: {
        overline: "Our Story",
        title: "WHO",
        titleOutline: "WE ARE",
        desc1: "DCB Authority Group is Tunisia's most ambitious creative ecosystem — built at the intersection of sound, vision, and technology. We are not an agency. We are not a studio. We are a movement.",
        desc2: "Founded in 2022 by the Daboussi family, DCB operates across three disciplines — The Studio, The Visuals, and The Agency — delivering world-class creative production to brands and artists across North Africa, Europe, and the USA.",
        location: "Headquartered in Tunis, Tunisia — reaching the world",
      },
      stats: [
        { number: "150+", label: "Projects Delivered" },
        { number: "50+",  label: "Clients Worldwide"  },
        { number: "3",    label: "Years of Excellence" },
        { number: "10+",  label: "Countries Reached"  },
      ],
      trinity: {
        overline: "The Trinity",
        title: "THREE PILLARS.",
        titleOutline: "ONE VISION.",
        pillars: [
          { name: "The Studio",  tagline: "Where Sound Becomes Legend",          desc: "Industry-standard recording, mixing and mastering. We don't just hit record — we craft the sound that defines your legacy." },
          { name: "The Visuals", tagline: "Cinema-Grade Storytelling",           desc: "Music videos, brand films, photography. Every frame intentional — built to resonate on screen and across every platform." },
          { name: "The Agency",  tagline: "Digital Transformation, Engineered", desc: "Custom web platforms, enterprise software, digital strategies. We are digitalizing entire sectors of the Tunisian economy." },
        ],
      },
      timeline: {
        overline: "Our Journey",
        title: "THE",
        titleOutline: "TIMELINE",
        events: [
          { year: "2022", title: "The Beginning",        desc: "DCB Authority Group is born in Tunis with a single mission: build the most ambitious creative ecosystem in North Africa." },
          { year: "2023", title: "The Studio Opens",     desc: "DCB Studio launches with industry-standard recording, mixing and mastering facilities. First major artists signed." },
          { year: "2023", title: "The Visuals Division", desc: "Cinematic productions begin. First brand films and music videos produced for Tunisian market leaders." },
          { year: "2024", title: "Digital Expansion",    desc: "The Agency division scales — 50+ brands digitalized across real estate, restaurants and wellness sectors." },
          { year: "2025", title: "International Reach",  desc: "Clients across USA, France and Europe. The Trinity model proven — one group, three disciplines, zero compromises." },
        ],
      },
      values: {
        overline: "What Drives Us",
        title: "OUR",
        titleOutline: "VALUES",
        items: [
          { title: "Obsession with Quality", desc: "We hold ourselves to international standards, not local ones. Every frame, every note, every line of code must be exceptional." },
          { title: "Authentic Storytelling", desc: "We tell real stories. North African identity, ambition and creativity deserve world-class representation." },
          { title: "Built for Scale",        desc: "Every project we take on is designed to travel beyond borders — from Tunis to the world." },
          { title: "Relentless Innovation",  desc: "We constantly push creative and technical boundaries. Standing still is never an option." },
        ],
      },
      team: {
        overline: "The People",
        title: "THE",
        titleOutline: "TEAM",
      },
      location: {
        label: "Headquartered In",
        city: "TUNIS, TUNISIA",
        desc: "Operating globally — with offices, clients and productions across Tunisia, France, and the United States.",
        offices: [
          { flag: "🇹🇳", label: "Tunis HQ", tel: "+216 93 647 542" },
          { flag: "🇺🇸", label: "USA",      tel: "+1 (805) 509 9510" },
          { flag: "🇫🇷", label: "France",   tel: "+33 6 23 77 98 35" },
        ],
      },
    },
  },
  fr: {
    nav: { services: "Services", pricing: "Tarifs", portfolio: "Portfolio", showcase: "Vitrine", team: "Équipe", about: "À Propos", start: "Lancer Projet" },
    intro: {
      overline: "Son. Vision. Code.",
      title1: "LE FUTUR",
      title2: "DE VOTRE IMAGE",
      desc: "Nous fusionnons direction artistique, production premium et technologie pour transformer votre marque en expérience iconique.",
      cta: "Explorer l'Agence",
      footerLabel: "Production Visuelle · Studio Audio · Dev Web",
    },
    hero: {
      status: "Nouveaux Clients Acceptés",
      title1: "AMPLIFIEZ",
      title2: "VOTRE RÉALITÉ",
      desc: "L'écosystème créatif tout-en-un. Des sessions d'enregistrement haut de gamme à la production vidéo cinématographique et au marketing numérique full-stack.",
      cta1: "Démarrer mon Projet",
      cta2: "Découvrir Nos Créations"
    },
    services: {
      title: "LA TRINITÉ",
      subtitle: "Trois disciplines. Chacune conçue pour dominer son domaine. Ensemble, elles donnent à votre marque un avantage décisif.",
      studio: { title: "Le Studio", desc: "Environnements d'enregistrement, de mixage et de mastering aux normes de l'industrie." },
      visuals: { title: "Les Visuels", desc: "Production vidéo cinématographique et photographie haute fidélité." },
      agency: { title: "L'Agence", desc: "Développement web et stratégies de marketing numérique qui convertissent." }
    },
    process: {
      overline: "Notre Méthode",
      title: "DU BRIEF",
      titleOutline: "AU LANCEMENT.",
      subtitle: "Un processus clair et éprouvé — du premier contact à la livraison finale. Aucune surprise, aucune ambiguïté.",
      steps: [
        { number: '01', name: 'Découverte',             tagline: 'On écoute avant de créer',       description: 'Session approfondie pour comprendre votre marque, votre marché, vos concurrents et vos objectifs. On cartographie le territoire avant de dessiner la carte.',                                 duration: '1–2 jours',     tags: ['Audit de Marque', 'Analyse Concurrentielle', 'Définition des Objectifs'] },
        { number: '02', name: 'Stratégie & Brief',      tagline: 'Le plan de tout',                description: 'Direction créative, spécifications techniques et calendrier dans un seul document. Ce qu\'on valide ici, c\'est ce qui sera produit — rien de plus, rien de moins.',                          duration: '2–3 jours',     tags: ['Brief Créatif', 'Specs Techniques', 'Planning Projet'] },
        { number: '03', name: 'Production',             tagline: 'La vision devient réalité',      description: 'Sessions studio, tournages ou sprints de développement — nos spécialistes exécutent au plus haut niveau. Points hebdomadaires pour vous tenir informé, toujours.',                             duration: '1–6 semaines',  tags: ['Studio / Tournage / Dev', 'Points Hebdos', 'Contrôle Qualité'] },
        { number: '04', name: 'Livraison & Lancement',  tagline: 'Livré. Peaufiné. Impactant.',   description: 'Assets livrés dans tous les formats nécessaires. Pour les produits digitaux, on gère le déploiement, l\'optimisation SEO et la stratégie de lancement.',                                        duration: '2–5 jours',     tags: ['Remise Finale', 'Déploiement', 'Stratégie de Lancement'] },
        { number: '05', name: 'Support Post-Lancement', tagline: 'Partenaires, pas prestataires', description: 'Fenêtre de support de 30 jours incluse sur chaque projet. Révisions, optimisations et stratégie continue — on reste dans votre camp bien après le lancement.',                             duration: '30+ jours',     tags: ['Révisions', 'Optimisation', 'Stratégie Continue'] },
      ],
    },
    sectors: {
      title: "SOLUTIONS SECTORIELLES",
      subtitle: "Nous bâtissons des écosystèmes digitaux pour les marques les plus ambitieuses de Tunisie. Chaque pixel, chaque interaction — conçu pour convertir les visiteurs en clients.",
      cta: "Discuter de Votre Projet",
      realEstate: {
        label: "Immobilier",
        headline: "Présence Digitale Premium pour les Plus Beaux Biens de Tunisie",
        description: "Vos propriétés méritent plus qu'une simple annonce. Nous créons des expériences digitales immersives qui font ressentir les sols en marbre et les vues sur mer avant même la visite. Des Berges du Lac à la côte de Hammamet — nous positionnons votre marque là où les clients fortunés recherchent.",
        features: [
          "Galeries immobilières cinématiques avec visites virtuelles 360°",
          "Pages de capture de leads avec optimisation de conversion 40%+",
          "Domination SEO pour 'immobilier Tunisie', 'villa de luxe', mots-clés locaux",
          "Funnels de contact intégrés CRM — chaque lead suivi, aucun client perdu",
          "Plateformes multi-annonces avec filtrage avancé et intégration carte",
          "Sites multilingues (FR/AR/EN) pour investisseurs internationaux"
        ],
        stat: "3x",
        statLabel: "Augmentation moyenne des leads pour les clients immobiliers"
      },
      restaurants: {
        label: "Restaurants",
        headline: "Sublimez Chaque Réservation, Du Premier Clic à la Première Bouchée",
        description: "Sur un marché où chaque restaurant a une page Instagram, seule l'élite possède un écosystème digital. Nous construisons le type de présence en ligne qui remplit les tables les mardis soirs — pas seulement les weekends. De la front de mer de La Marsa aux terrasses de Sidi Bou Saïd, votre restaurant mérite d'être découvert, pas simplement trouvé.",
        features: [
          "Menus interactifs avec QR code et photographie culinaire époustouflante",
          "Systèmes de réservation en ligne intégrés à votre flux de travail",
          "Stratégie réseaux sociaux — reels, stories et campagnes publicitaires qui remplissent les tables",
          "Optimisation Google Business & TripAdvisor pour la découverte locale",
          "Sites web mobile-first qui chargent en moins de 2 secondes",
          "Plateformes de fidélisation et automatisation email marketing"
        ],
        stat: "85%",
        statLabel: "Des clients consultent le menu en ligne avant de choisir"
      },
      aesthetics: {
        label: "Esthétique",
        headline: "Précision Clinique Rencontre le Design Digital de Luxe",
        description: "Vos clients attendent la perfection dans chaque détail — votre présence digitale doit refléter le même standard. Nous créons des expériences digitales 'luxe-clinique' pour les centres de beauté, spas et centres esthétiques à travers la Tunisie. Lignes épurées, palettes apaisantes, et un parcours de réservation si fluide que vos clients sont confirmés avant même d'hésiter.",
        features: [
          "Systèmes de réservation élégants avec rappels automatiques",
          "Galeries avant/après avec design respectueux de la vie privée",
          "Pages vitrines de soins avec transparence des tarifs",
          "Branding Instagram-first — grilles cohérentes, couvertures de highlights, liens bio",
          "Intégration Google Reviews et tableaux de bord de gestion de réputation",
          "E-commerce pour gammes de soins et systèmes de chèques-cadeaux"
        ],
        stat: "70%",
        statLabel: "Des clients beauté réservent en ligne — les captez-vous ?"
      }
    },
    showcase: {
      overline: "CE QUE NOUS CRÉONS",
      mainTitle: "Expériences sur mesure",
      startProjectBtn: "Démarrer ce projet",
      realEstate: {
        title: "Immobilier Prestige",
        description: "Nous concevons des expériences digitales qui transforment la vente immobilière de luxe. Chaque détail — de la galerie immersive aux formulaires de qualification — est pensé pour convertir vos prospects les plus exigeants."
      },
      fineDining: {
        title: "Gastronomie Étoilée",
        description: "De la réservation de table au design de l'expérience, nous transposons le luxe dans le monde digital."
      },
      wellness: {
        title: "Beauté & Cliniques Spa",
        description: "Nous créons des interfaces médicales-esthétiques qui rassurent et convertissent. Du diagnostic IA à la gestion des rendez-vous, votre clinique devient une expérience digitale premium de bout en bout."
      },
      edtech: {
        title: "Université du Futur",
        description: "Nous bâtissons des plateformes d'apprentissage de nouvelle génération — IA Tutor, vidéo CDN adaptatif, gamification — qui transforment l'engagement étudiant et propulsent les résultats académiques."
      },
      fintech: {
        title: "Finance & Blockchain",
        description: "Des interfaces de trading et de gestion d'actifs numériques qui inspirent confiance. Nous maîtrisons la réglementation, la sécurité AES-256 et l'UX temps-réel pour les produits financiers les plus exigeants."
      },
      ecommerce: {
        title: "Haute Couture Digitale",
        description: "L'excellence du retail de luxe transposée en ligne. Configurateur 3D, expérience d'achat ultra-fluide, et design minimaliste qui mettent en valeur chaque produit comme une œuvre d'art."
      }
    },
    caseStudies: {
      overline: "Nos Réalisations",
      title: "ÉTUDES DE",
      titleOutline: "CAS",
      subtitle: "De vrais projets. Un vrai impact. Chaque emplacement sera dévoilé à la finalisation de la production.",
      comingSoon: "Bientôt Disponible",
      inProduction: "En Production",
      globalBadge: "Contenu en cours de production",
      footerNote: "Les études de cas seront publiées au fur et à mesure de la finalisation des productions.",
      categories: { studio: "Studio", visuals: "Visuels", agency: "Agence" },
    },
    pricing: {
      title: "INVESTISSEZ DANS",
      titleHighlight: "L'AUTORITÉ",
      subtitle: "Tarification transparente pour des résultats clairs. Choisissez votre domaine.",
      tabs: { studio: "Le Studio", visuals: "Les Visuels", agency: "L'Agence" },
      popular: "Le Plus Populaire",
      select: "Choisir ce Plan"
    },
    portfolio: {
      title: "PARTENAIRES DE CONFIANCE",
      viewAll: "Voir Toutes les Collabs",
      back: "Retour à l'Accueil",
      pageTitle: "NOTRE HÉRITAGE",
      pageDesc: "Une collection de visionnaires qui nous ont fait confiance pour amplifier leur voix.",
      filters: { all: "Tout", studio: "Studio", visuals: "Visuels", agency: "Agence" },
      ctaTitle: "Prêt à rejoindre l'élite ?",
      ctaBtn: "Devenir Partenaire",
      livePortfolio: "Voir notre portfolio en direct"
    },
    team: {
      overline: "Les Esprits Derrière Le Travail",
      title: "L'ÉQUIPE",
      subtitle: "Six esprits. Trois disciplines. Un seul standard, implacable.",
      members: [
        {
          name: "Daboussi Iheb",
          role: "PDG & Fondateur",
          division: "DCB Authority Group",
          bio: "Fondateur et visionnaire créatif de DCB Authority Group. Définit la direction artistique et business à travers les trois divisions, garantissant que le groupe opère toujours à la frontière de la culture et de l'innovation.",
        },
        {
          name: "Daboussi Yassine",
          role: "COO & Co-Fondateur",
          division: "DCB Authority Group",
          bio: "Co-fondateur et directeur opérationnel. Architecture l'infrastructure digitale — du frontend pixel-perfect aux systèmes enterprise — et garantit que chaque projet soit livré avec des standards techniques sans compromis.",
        },
        {
          name: "Marwen Daboussi",
          role: "Co-Fondateur",
          division: "DCB Authority Group",
          bio: "L'architecte stratégique de l'expansion de DCB. Fait le pont entre vision créative et développement commercial — identifiant les marchés clés, forgeant des partenariats à haute valeur, et assurant que l'autorité du groupe se fait sentir dans chaque secteur qu'il intègre.",
        },
        {
          name: "Khaled Boulila",
          role: "Ingénieur Son",
          division: "Le Studio",
          bio: "Forge l'identité sonore de chaque projet. Du premier take au master final, chaque décibel est travaillé avec la précision d'un ingénieur et l'instinct d'un artiste.",
        },
        {
          name: "Ahmed Kalboussi",
          role: "Architecte Croissance",
          division: "L'Agence",
          bio: "Le moteur de la croissance et de la stratégie client. Connecte la puissance créative de DCB aux bonnes opportunités — en concevant les partenariats et campagnes qui transforment la visibilité en revenus.",
        },
        {
          name: "Omar Guitouni",
          nickname: "OG VISUALS",
          role: "Architecte Visuel & Directeur",
          division: "Les Visuels",
          bio: "L'esprit visuel derrière les productions les plus marquantes de DCB. Dirige clips et campagnes de marque avec un instinct cinématographique qui définit la signature esthétique de l'agence dans chaque plan.",
        },
      ],
    },
    wizard: {
      title: "LANCEZ VOTRE PROJET",
      subtitle: "Dites-nous ce dont vous avez besoin. On s'occupe du reste.",
      step1: "Que construisons-nous ?",
      step1Opts: { studio: "Audio / Studio", visuals: "Production Visuelle", agency: "Digital / Web" },
      step2: "Sélectionnez votre forfait pour",
      customOpt: "Autre / Vision Personnalisée",
      customDesc: "Pour des besoins uniques non listés ci-dessus.",
      backCat: "Retour aux Catégories",
      step3: "Derniers Détails",
      selected: "Vous avez sélectionné :",
      placeholders: {
        name: "Votre Nom / Nom d'Entreprise *",
        email: "Adresse Email *",
        phone: "Numéro de Téléphone (Chiffres Uniquement) *",
        details: "Demandes spécifiques ou délais ?",
        customDetails: "Parlez-nous de votre vision personnalisée..."
      },
      errors: { name: "Le nom est requis", email: "L'email est requis", emailInvalid: "Veuillez entrer une adresse email valide", phone: "Le numéro de téléphone est requis" },
      submit: "ENVOYER DEMANDE DE PROJET",
      sending: "ENVOI EN COURS...",
      backPack: "Retour aux Forfaits",
      alertSuccess: "DEMANDE DE PROJET REÇUE ! Nous vous contacterons sous peu.",
      alertError: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous envoyer un email directement."
    },
    manifesto: {
      overline: 'Notre Philosophie',
      lines: [
        { text: 'NOUS NE FAISONS PAS DU CONTENU.',   accent: false },
        { text: 'NOUS FORGEONS DES LÉGENDES.',        accent: true  },
        { text: 'Trois disciplines.',                 accent: false },
        { text: 'Un seul standard : l\'excellence.', accent: false },
      ],
    },
    stats: {
      overline: 'En Chiffres',
      title: 'L\'IMPACT EN UN COUP D\'ŒIL',
      subtitle: 'Des résultats concrets, des clients réels.',
      items: [
        { number: 150, suffix: '+', label: 'Projets Livrés',      sub: 'Sur les 3 divisions' },
        { number: 50,  suffix: '+', label: 'Clients Worldwide',    sub: 'En constante croissance' },
        { number: 3,   suffix: '',  label: 'Années d\'Excellence', sub: 'Depuis 2022' },
        { number: 10,  suffix: '+', label: 'Pays Atteints',        sub: 'Présence digitale globale' },
      ]
    },
    footer: {
      tagline: 'Là où la créativité rencontre l\'ingénierie.',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      links: {
        about: 'À Propos',
        services: 'Services',
        process: 'Notre Processus',
        pricing: 'Tarifs',
        team: 'L\'Équipe',
        contact: 'Démarrer un Projet',
      },
      copyright: '© 2025 DCB Authority Group. Tous droits réservés.',
      madeIn: 'Conçu en Tunisie',
      legal: 'Mentions Légales',
      privacy: 'Politique de Confidentialité',
    },
    prefooterCta: {
      overline: 'Prochain Chapitre',
      title: 'PRÊT À CRÉER',
      subtitle: "QUELQUE CHOSE D'INOUBLIABLE\u00A0?",
      cta: 'Démarrer le Projet',
    },
    contactSection: {
      overline: 'Contactez-Nous',
      title: 'PARLONS',
      titleAccent: 'MAINTENANT.',
      subtitle: "Les autres agences promettent. Nous livrons. Chaque brief devient une obsession — construisons le vôtre.",
      cta: "Lancer l'Assistant",
    },
    manifesto: {
      overline: 'Notre Philosophie',
      lines: [
        { text: 'Nous ne faisons pas du contenu.',     accent: false },
        { text: 'Nous forgeons des légendes.',          accent: true  },
        { text: 'Son. Vision. Code.',                   accent: false },
        { text: 'Trois disciplines.',                   accent: false },
        { text: 'Zéro compromis.',                      accent: false },
        { text: 'Forgé en Tunisie.',                    accent: false },
        { text: 'Bâti pour le monde.',                  accent: true  },
      ],
    },
    testimonials: {
      overline: 'Ils Parlent',
      title: 'CE QU\'ILS',
      titleOutline: 'DISENT',
      subtitle: 'De Tunis au monde — témoignages authentiques des marques et artistes qui nous font confiance.',
      reviewCount: 'Avis Vérifiés',
      recommended: 'Nous Recommandent',
    },
    about: {
      backBtn: "Retour à l'accueil",
      hero: {
        overline: "Notre Histoire",
        title: "QUI",
        titleOutline: "SOMMES-NOUS",
        desc1: "DCB Authority Group est l'écosystème créatif le plus ambitieux de Tunisie — bâti à l'intersection du son, de l'image et de la technologie. Nous ne sommes pas une agence. Nous ne sommes pas un studio. Nous sommes un mouvement.",
        desc2: "Fondé en 2022 par la famille Daboussi, DCB opère à travers trois disciplines — Le Studio, Les Visuels et L'Agence — livrant une production créative de classe mondiale à des marques et artistes à travers l'Afrique du Nord, l'Europe et les États-Unis.",
        location: "Siège à Tunis, Tunisie — portée mondiale",
      },
      stats: [
        { number: "150+", label: "Projets Livrés" },
        { number: "50+",  label: "Clients dans le Monde" },
        { number: "3",    label: "Années d'Excellence" },
        { number: "10+",  label: "Pays Atteints" },
      ],
      trinity: {
        overline: "La Trinité",
        title: "TROIS PILIERS.",
        titleOutline: "UNE VISION.",
        pillars: [
          { name: "Le Studio",   tagline: "Là où le Son Devient Légende",           desc: "Enregistrement, mixage et mastering aux standards internationaux. Nous ne faisons pas que lancer l'enregistrement — nous façonnons le son qui définit votre héritage." },
          { name: "Les Visuels", tagline: "Chaque Image Raconte Votre Histoire",     desc: "Clips musicaux, films de marque, photographie. Chaque plan est intentionnel — conçu pour résonner à l'écran et sur toutes les plateformes." },
          { name: "L'Agence",   tagline: "Transformation Numérique, Ingéniérisée",  desc: "Plateformes web sur-mesure, logiciels enterprise, stratégies numériques. Nous digitalisons des secteurs entiers de l'économie tunisienne." },
        ],
      },
      timeline: {
        overline: "Notre Parcours",
        title: "LA",
        titleOutline: "CHRONOLOGIE",
        events: [
          { year: "2022", title: "Les Débuts",                desc: "DCB Authority Group naît à Tunis avec une seule mission : construire l'écosystème créatif le plus ambitieux d'Afrique du Nord." },
          { year: "2023", title: "Le Studio Ouvre",           desc: "DCB Studio lance ses installations d'enregistrement, mixage et mastering aux standards professionnels. Premiers artistes signés." },
          { year: "2023", title: "La Division Visuels",       desc: "Les productions cinématographiques débutent. Premiers films de marque et clips musicaux pour les leaders du marché tunisien." },
          { year: "2024", title: "Expansion Numérique",       desc: "La division Agence monte en puissance — plus de 50 marques digitalisées dans l'immobilier, la restauration et le bien-être." },
          { year: "2025", title: "Rayonnement International", desc: "Clients aux USA, en France et en Europe. Le modèle Trinity prouvé — un groupe, trois disciplines, zéro compromis." },
        ],
      },
      values: {
        overline: "Ce Qui Nous Anime",
        title: "NOS",
        titleOutline: "VALEURS",
        items: [
          { title: "Obsession de la Qualité",  desc: "Nous nous tenons à des standards internationaux, pas locaux. Chaque plan, chaque note, chaque ligne de code doit être exceptionnel." },
          { title: "Récit Authentique",         desc: "Nous racontons de vraies histoires. L'identité nord-africaine, l'ambition et la créativité méritent une représentation de classe mondiale." },
          { title: "Conçu pour l'Échelle",      desc: "Chaque projet que nous prenons en charge est conçu pour voyager au-delà des frontières — de Tunis vers le monde entier." },
          { title: "Innovation Sans Relâche",   desc: "Nous repoussons constamment les limites créatives et techniques. Rester immobile n'est jamais une option." },
        ],
      },
      team: {
        overline: "Les Personnes",
        title: "L'",
        titleOutline: "ÉQUIPE",
      },
      location: {
        label: "Siège Social",
        city: "TUNIS, TUNISIE",
        desc: "Opérations mondiales — avec des bureaux, clients et productions en Tunisie, France et aux États-Unis.",
        offices: [
          { flag: "🇹🇳", label: "Siège Tunis", tel: "+216 93 647 542" },
          { flag: "🇺🇸", label: "États-Unis",  tel: "+1 (805) 509 9510" },
          { flag: "🇫🇷", label: "France",      tel: "+33 6 23 77 98 35" },
        ],
      },
    },
  },
  ar: {
    nav: { services: "الخدمات", pricing: "الأسعار", portfolio: "أعمالنا", showcase: "معرض", team: "الفريق", about: "من نحن", start: "ابدأ مشروعك" },
    intro: {
      overline: "صوت. رؤية. كود.",
      title1: "مستقبل",
      title2: "صورتك",
      desc: "ندمج التوجيه الفني والإنتاج الفاخر والتكنولوجيا لتحويل علامتك التجارية إلى تجربة أيقونية.",
      cta: "استكشف الوكالة",
      footerLabel: "إنتاج مرئي · استوديو صوتي · تطوير ويب",
    },
    hero: {
      status: "نقبل عملاء جدد",
      title1: "ضخّم",
      title2: "واقعك",
      desc: "النظام البيئي الإبداعي الشامل. من جلسات التسجيل الراقية والإنتاج الفيديو السينمائي إلى التسويق الرقمي المتكامل.",
      cta1: "ابدأ مشروعك",
      cta2: "اكتشف ما نبنيه"
    },
    services: {
      title: "الركائز الثلاث",
      subtitle: "نحن لا ننفذ الخدمات فحسب. نحن نصمم تجارب عبر ثلاث ركائز متميزة.",
      studio: { title: "الاستوديو", desc: "بيئات تسجيل وميكساج وماسترينغ بمعايير صناعية." },
      visuals: { title: "المرئيات", desc: "إنتاج فيديو سينمائي وتصوير فوتوغرافي عالي الدقة." },
      agency: { title: "الوكالة", desc: "تطوير ويب واستراتيجيات تسويق رقمي تحقق نتائج." }
    },
    process: {
      overline: "كيف نعمل",
      title: "من البريف",
      titleOutline: "إلى الإطلاق.",
      subtitle: "منهجية واضحة ومُجرَّبة — من أول تواصل حتى التسليم النهائي. بلا مفاجآت، بلا غموض.",
      steps: [
        { number: '01', name: 'الاكتشاف',             tagline: 'نُنصت قبل أن نبتكر',         description: 'جلسة معمّقة لفهم علامتك التجارية، سوقك، منافسيك وأهدافك. نرسم الخريطة قبل أن نبدأ الرحلة.',                                         duration: '1–2 أيام',      tags: ['تدقيق العلامة', 'تحليل المنافسين', 'تحديد الأهداف'] },
        { number: '02', name: 'الاستراتيجية والبريف', tagline: 'المخطط لكل شيء',              description: 'التوجيه الإبداعي والمواصفات التقنية والجدول الزمني في وثيقة واحدة. ما يُتفق عليه هنا هو ما يُنتَج — لا أكثر ولا أقل.',              duration: '2–3 أيام',      tags: ['البريف الإبداعي', 'المواصفات التقنية', 'خطة المشروع'] },
        { number: '03', name: 'الإنتاج',               tagline: 'الرؤية تصبح واقعاً',          description: 'جلسات استوديو، تصوير أو سبرينت برمجي — متخصصونا ينفّذون بأعلى مستوى. نقاط متابعة أسبوعية لإبقائك على اطلاع دائم.',                 duration: '1–6 أسابيع',    tags: ['استوديو / تصوير / تطوير', 'متابعات أسبوعية', 'ضبط الجودة'] },
        { number: '04', name: 'التسليم والإطلاق',      tagline: 'مُسلَّم. مُصقَّل. مؤثّر.',    description: 'الملفات بكل الصيغ المطلوبة. للمنتجات الرقمية، نتولى النشر وتحسين SEO واستراتيجية الإطلاق لتنطلق بقوة.',                            duration: '2–5 أيام',      tags: ['التسليم النهائي', 'النشر', 'استراتيجية الإطلاق'] },
        { number: '05', name: 'الدعم بعد الإطلاق',    tagline: 'شركاء، لا مجرد موردين',       description: 'نافذة دعم 30 يوماً مشمولة في كل مشروع. مراجعات وتحسينات واستراتيجية مستمرة — نبقى في صفّك طويلاً بعد الإطلاق.',                    duration: '+30 يوماً',     tags: ['المراجعات', 'التحسين', 'الاستراتيجية المستمرة'] },
      ],
    },
    sectors: {
      title: "حلول القطاعات",
      subtitle: "نبني أنظمة رقمية لأكثر العلامات التجارية طموحاً في تونس. كل بكسل، كل تفاعل — مصمم لتحويل الزوار إلى عملاء.",
      cta: "ناقش مشروعك",
      realEstate: {
        label: "العقارات",
        headline: "حضور رقمي فاخر لأرقى العقارات في تونس",
        description: "عقاراتك تستحق أكثر من مجرد إعلان. نحن نصنع تجارب رقمية غامرة تجعل المشترين يشعرون بأرضيات الرخام وإطلالات البحر قبل حتى أن يطأوا العتبة. من ضفاف البحيرة إلى ساحل الحمامات — نضع علامتك التجارية حيث يبحث العملاء ذوو الثروات العالية.",
        features: [
          "معارض عقارية سينمائية مع جولات افتراضية 360°",
          "صفحات توليد العملاء المحتملين بتحسين تحويل +40%",
          "هيمنة SEO لـ 'عقارات تونس'، 'فيلا فاخرة'، الكلمات المفتاحية المحلية",
          "قنوات اتصال متكاملة مع CRM — كل عميل محتمل يُتابع، لا عميل يضيع",
          "منصات متعددة القوائم مع تصفية متقدمة وتكامل الخرائط",
          "مواقع متعددة اللغات (FR/AR/EN) للمستثمرين الدوليين"
        ],
        stat: "3x",
        statLabel: "متوسط زيادة العملاء المحتملين لعملاء العقارات"
      },
      restaurants: {
        label: "المطاعم",
        headline: "ارتقِ بكل حجز، من النقرة الأولى إلى اللقمة الأولى",
        description: "في سوق كل مطعم فيه صفحة إنستغرام، النخبة فقط تملك نظاماً رقمياً متكاملاً. نبني نوع الحضور الرقمي الذي يملأ الطاولات ليالي الثلاثاء — ليس فقط عطلة نهاية الأسبوع. من واجهة لا مارسا البحرية إلى تراسات سيدي بو سعيد، مطعمك يستحق أن يُكتشف، لا أن يُوجد فحسب.",
        features: [
          "قوائم تفاعلية بتقنية QR مع تصوير طعام مذهل",
          "أنظمة حجز إلكترونية متكاملة مع سير عملك",
          "استراتيجية محتوى وسائل التواصل — ريلز وستوريز وحملات إعلانية تملأ المقاعد",
          "تحسين Google Business و TripAdvisor للاكتشاف المحلي",
          "مواقع ويب متوافقة مع الجوال أولاً تُحمل في أقل من ثانيتين",
          "منصات برامج الولاء وأتمتة التسويق عبر البريد الإلكتروني"
        ],
        stat: "85%",
        statLabel: "من رواد المطاعم يتحققون من القائمة عبر الإنترنت قبل الاختيار"
      },
      aesthetics: {
        label: "التجميل",
        headline: "دقة طبية تلتقي بتصميم رقمي فاخر",
        description: "عملاؤك يتوقعون الكمال في كل تفصيلة — حضورك الرقمي يجب أن يعكس نفس المعيار. نصنع تجارب رقمية 'فخامة طبية' لعيادات التجميل والسبا ومراكز الجمال عبر تونس. خطوط نظيفة، ألوان مهدئة، وتدفق حجز سلس جداً حتى يُؤكد العملاء قبل أن يترددوا.",
        features: [
          "أنظمة حجز مواعيد أنيقة مع تذكيرات تلقائية",
          "معارض قبل/بعد العلاج بتصميم يحترم الخصوصية أولاً",
          "صفحات عرض العلاجات بشفافية الأسعار",
          "علامة تجارية إنستغرام أولاً — شبكات متناسقة وأغلفة هايلايت وروابط البايو",
          "تكامل تقييمات Google ولوحات إدارة السمعة",
          "تجارة إلكترونية لخطوط منتجات العناية بالبشرة وأنظمة قسائم الهدايا"
        ],
        stat: "70%",
        statLabel: "من عملاء التجميل يحجزون عبر الإنترنت — هل تستقطبهم؟"
      }
    },
    showcase: {
      overline: "ما الذي نبنيه",
      mainTitle: "تجارب نصنعها",
      startProjectBtn: "ابدأ هذا المشروع",
      realEstate: {
        title: "العقارات الفاخرة",
        description: "نصمم تجارب رقمية ترتقي بمبيعات العقارات الفاخرة. كل تفصيل، من المعارض الغامرة إلى مسارات التأهيل، مصمم لتحويل العملاء الأكثر تطلباً."
      },
      fineDining: {
        title: "مطاعم ميشلان الراقية",
        description: "من حجز الطاولات إلى تصميم التجربة الكاملة، ننقل الفخامة إلى العالم الرقمي."
      },
      wellness: {
        title: "الجمال وعيادات السبا",
        description: "ننشئ واجهات طبية جمالية تبعث الثقة وتزيد التحويل. من التشخيص الذكي إلى إدارة المواعيد، تتحول عيادتك إلى تجربة رقمية فاخرة متكاملة."
      },
      edtech: {
        title: "جامعة المستقبل",
        description: "نبني منصات تعليمية من الجيل الجديد تعتمد على المعلم الذكي، الفيديو التكيفي، وعناصر التلعيب لرفع تفاعل الطلاب والنتائج الأكاديمية."
      },
      fintech: {
        title: "التمويل والبلوك تشين",
        description: "واجهات تداول وإدارة أصول رقمية تبعث الثقة. نجمع بين الامتثال التنظيمي، أمان AES-256، وتجربة استخدام لحظية للمنتجات المالية المتقدمة."
      },
      ecommerce: {
        title: "الأزياء الرقمية الراقية",
        description: "تميّز تجارة التجزئة الفاخرة كما يجب أن يظهر على الإنترنت. أدوات تهيئة ثلاثية الأبعاد، تجربة شراء فائقة السلاسة، وتصميم بسيط يقدّم كل منتج كقطعة فنية."
      }
    },
    caseStudies: {
      overline: "أعمالنا",
      title: "دراسات",
      titleOutline: "الحالات",
      subtitle: "مشاريع حقيقية. تأثير حقيقي. كل ملف سيُكشف عنه عند اكتمال الإنتاج.",
      comingSoon: "قريباً",
      inProduction: "قيد الإنتاج",
      globalBadge: "المحتوى قيد الإنتاج",
      footerNote: "ستُنشر دراسات الحالة تباعاً مع إنهاء كل إنتاج — تابعنا.",
      categories: { studio: "الاستوديو", visuals: "المرئيات", agency: "الوكالة" },
    },
    pricing: {
      title: "استثمر في",
      titleHighlight: "السلطة",
      subtitle: "أسعار شفافة لنتائج واضحة. اختر مجالك وارتقِ بمستواك.",
      tabs: { studio: "الاستوديو", visuals: "المرئيات", agency: "الوكالة" },
      popular: "الأكثر طلباً",
      select: "اختر الخطة"
    },
    portfolio: {
      title: "شركاء النجاح",
      viewAll: "عرض كل الشراكات",
      back: "العودة للرئيسية",
      pageTitle: "إرثنا",
      pageDesc: "مجموعة من أصحاب الرؤى الذين وثقوا بنا لتضخيم أصواتهم.",
      filters: { all: "الكل", studio: "استوديو", visuals: "مرئيات", agency: "وكالة" },
      ctaTitle: "هل أنت مستعد للانضمام للنخبة؟",
      ctaBtn: "كن شريكاً",
      livePortfolio: "شاهد معرض أعمالنا المباشر"
    },
    team: {
      overline: "العقول وراء العمل",
      title: "فريقنا",
      subtitle: "ستة عقول. ثلاثة تخصصات. معيار واحد لا يتهاون.",
      members: [
        {
          name: "Daboussi Iheb",
          role: "الرئيس التنفيذي والمؤسس",
          division: "DCB Authority Group",
          bio: "مؤسس ورائد إبداعي في DCB Authority Group. يحدد التوجه الفني والتجاري عبر الأقسام الثلاثة، ويضمن أن يعمل الجروب دائماً في طليعة الثقافة والابتكار.",
        },
        {
          name: "Daboussi Yassine",
          role: "المدير التشغيلي والمؤسس المشارك",
          division: "DCB Authority Group",
          bio: "المؤسس المشارك والمدير التشغيلي. يُهندس البنية التحتية الرقمية — من الواجهات الأمامية المتقنة إلى أنظمة المؤسسات — ويضمن تسليم كل مشروع وفق معايير تقنية لا تهاون فيها.",
        },
        {
          name: "Marwen Daboussi",
          role: "المؤسس المشارك",
          division: "DCB Authority Group",
          bio: "المهندس الاستراتيجي لتوسع DCB. يجسر الهوة بين الرؤية الإبداعية والتطوير التجاري — محدداً الأسواق المستهدفة، وبانياً الشراكات عالية القيمة، وضامناً أن يُحسّ بحضور الجروب في كل قطاع يدخله.",
        },
        {
          name: "Khaled Boulila",
          role: "مهندس الصوت",
          division: "الاستوديو",
          bio: "يصيغ الهوية الصوتية لكل مشروع. من اللقطة الأولى حتى الماستر النهائي، كل ديسيبل مصنوع بدقة مهندس وحدس فنان.",
        },
        {
          name: "Ahmed Kalboussi",
          role: "مهندس النمو",
          division: "الوكالة",
          bio: "المحرك وراء نمو العملاء واستراتيجية السوق. يربط القوة الإبداعية لـDCB بالفرص المناسبة — مصمماً الشراكات والحملات التي تحول الظهور إلى إيرادات.",
        },
        {
          name: "Omar Guitouni",
          nickname: "OG VISUALS",
          role: "المهندس البصري والمخرج",
          division: "المرئيات",
          bio: "العقل البصري وراء أبرز إنتاجات DCB. يخرج كليبات موسيقية وحملات العلامات التجارية بحس سينمائي يحدد البصمة الجمالية للوكالة في كل لقطة.",
        },
      ],
    },
    wizard: {
      title: "ابدأ مشروعك",
      subtitle: "أخبرنا بما تحتاجه. سنتولى الباقي.",
      step1: "ماذا سنبني؟",
      step1Opts: { studio: "صوت / استوديو", visuals: "إنتاج مرئي", agency: "رقمي / ويب" },
      step2: "اختر باقتك لـ",
      customOpt: "أخرى / رؤية خاصة",
      customDesc: "للاحتياجات الفريدة غير المدرجة أعلاه.",
      backCat: "العودة للفئات",
      step3: "التفاصيل النهائية",
      selected: "لقد اخترت:",
      placeholders: {
        name: "اسمك / اسم الشركة *",
        email: "البريد الإلكتروني *",
        phone: "رقم الهاتف (أرقام فقط) *",
        details: "أي طلبات محددة أو جدول زمن؟",
        customDetails: "أخبرنا عن رؤيتك الخاصة..."
      },
      errors: { name: "الاسم مطلوب", email: "البريد الإلكتروني مطلوب", emailInvalid: "الرجاء إدخال بريد إلكتروني صحيح", phone: "رقم الهاتف مطلوب" },
      submit: "إرسال طلب المشروع",
      sending: "جاري الإرسال...",
      backPack: "العودة للباقات",
      alertSuccess: "تم استلام طلب المشروع! سنتصل بك قريباً.",
      alertError: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى أو مراسلتنا عبر البريد الإلكتروني."
    },
    manifesto: {
      overline: 'فلسفتنا',
      lines: [
        { text: 'نحن لا نصنع المحتوى.',           accent: false },
        { text: 'نحن نصنع الإرث.',                 accent: true  },
        { text: 'ثلاثة تخصصات.',                   accent: false },
        { text: 'معيار واحد لا يتهاون.',           accent: false },
      ],
    },
    stats: {
      overline: 'بالأرقام',
      title: 'أثرنا دفعة واحدة',
      subtitle: 'نتائج حقيقية، عملاء حقيقيون، تأثير حقيقي.',
      items: [
        { number: 150, suffix: '+', label: 'مشروع مُنجز',        sub: 'عبر الأقسام الثلاثة' },
        { number: 50,  suffix: '+', label: 'عميل حول العالم',     sub: 'في نمو مستمر' },
        { number: 3,   suffix: '',  label: 'سنوات من التميز',     sub: 'منذ 2022' },
        { number: 10,  suffix: '+', label: 'دولة وصلنا إليها',    sub: 'حضور رقمي عالمي' },
      ]
    },
    footer: {
      tagline: 'حيث تلتقي الإبداعية بالهندسة.',
      navTitle: 'التنقل',
      contactTitle: 'التواصل',
      links: {
        about: 'من نحن',
        services: 'الخدمات',
        process: 'منهجيتنا',
        pricing: 'الأسعار',
        team: 'الفريق',
        contact: 'ابدأ مشروعك',
      },
      copyright: '© 2025 DCB Authority Group. جميع الحقوق محفوظة.',
      madeIn: 'صُنع في تونس',
      legal: 'إشعار قانوني',
      privacy: 'سياسة الخصوصية',
    },
    prefooterCta: {
      overline: 'الفصل التالي',
      title: 'مستعد لبناء',
      subtitle: 'شيء لا يُنسى؟',
      cta: 'ابدأ مشروعك',
    },
    contactSection: {
      overline: 'تواصل معنا',
      title: 'لنبنِ',
      titleAccent: 'معاً.',
      subtitle: 'الآخرون يعدون. نحن ننجز. كل ملف يصبح هاجساً — دعنا نبني لك ما يستحق.',
      cta: 'ابدأ المساعد',
    },
    testimonials: {
      overline: 'أصوات العملاء',
      title: 'ماذا',
      titleOutline: 'يقولون',
      subtitle: 'من تونس إلى العالم — تقييمات حقيقية من العلامات والفنانين الذين يثقون بنا.',
      reviewCount: 'تقييم موثوق',
      recommended: 'يوصون بنا',
    },
    about: {
      backBtn: "العودة إلى الرئيسية",
      hero: {
        overline: "قصتنا",
        title: "من",
        titleOutline: "نحن",
        desc1: "مجموعة DCB Authority هي أكثر النظم الإبداعية طموحاً في تونس — مبنية عند تقاطع الصوت والصورة والتكنولوجيا. لسنا مجرد وكالة. لسنا مجرد استوديو. نحن حركة.",
        desc2: "تأسست عام 2022 على يد عائلة دبوسي، تعمل DCB عبر ثلاثة تخصصات — الاستوديو والمرئيات والوكالة — لتقديم إنتاج إبداعي عالمي المستوى للعلامات التجارية والفنانين في شمال أفريقيا وأوروبا والولايات المتحدة.",
        location: "المقر في تونس العاصمة — حضور عالمي",
      },
      stats: [
        { number: "150+", label: "مشروع منجز" },
        { number: "50+",  label: "عميل حول العالم" },
        { number: "3",    label: "سنوات من التميز" },
        { number: "10+",  label: "دولة نصل إليها" },
      ],
      trinity: {
        overline: "الثالوث",
        title: "ثلاثة ركائز.",
        titleOutline: "رؤية واحدة.",
        pillars: [
          { name: "الاستوديو", tagline: "حيث يتحول الصوت إلى أسطورة", desc: "تسجيل ومزج وإتقان بمعايير المهنيين. لا نضغط على زر التسجيل فحسب — بل نصنع الصوت الذي يُعرِّف إرثك." },
          { name: "المرئيات",  tagline: "كل إطار يحكي قصتك",           desc: "مقاطع موسيقية، أفلام علامات تجارية، تصوير. كل لقطة مدروسة — مصممة لتتردد صداها على الشاشة وعبر كل المنصات." },
          { name: "الوكالة",   tagline: "تحول رقمي مُهندَس",           desc: "منصات ويب مخصصة، برامج متكاملة، استراتيجيات رقمية مصممة للنمو. نُرقمن قطاعات بأكملها من الاقتصاد التونسي." },
        ],
      },
      timeline: {
        overline: "مسيرتنا",
        title: "الخط",
        titleOutline: "الزمني",
        events: [
          { year: "2022", title: "البداية",           desc: "تأسست مجموعة DCB Authority في تونس بمهمة واحدة: بناء أكثر النظم الإبداعية طموحاً في شمال أفريقيا." },
          { year: "2023", title: "افتتاح الاستوديو", desc: "انطلق DCB Studio بمرافق تسجيل ومزج وإتقان بمعايير المهنيين. أُبرمت أولى العقود مع الفنانين." },
          { year: "2023", title: "قسم المرئيات",     desc: "بدأت الإنتاجات السينمائية. أُنجزت أولى أفلام العلامات التجارية والمقاطع الموسيقية لكبرى شركات السوق التونسية." },
          { year: "2024", title: "التوسع الرقمي",    desc: "توسّع قسم الوكالة — رُقِّنت أكثر من 50 علامة تجارية في قطاعات العقارات والمطاعم والعافية." },
          { year: "2025", title: "الانتشار الدولي",  desc: "عملاء في الولايات المتحدة وفرنسا وأوروبا. نموذج الثالوث مُثبَت — مجموعة واحدة، ثلاثة تخصصات، لا تنازلات." },
        ],
      },
      values: {
        overline: "ما يحرّكنا",
        title: "قيمنا",
        titleOutline: "",
        items: [
          { title: "هوس بالجودة",      desc: "نلتزم بالمعايير الدولية لا المحلية. كل إطار، كل نغمة، كل سطر كود يجب أن يكون استثنائياً." },
          { title: "سرد أصيل",         desc: "نحكي قصصاً حقيقية. الهوية الشمال أفريقية والطموح والإبداع تستحق تمثيلاً عالمي المستوى." },
          { title: "مبني للتوسع",      desc: "كل مشروع نتولاه مصمم للسفر عبر الحدود — من تونس إلى العالم." },
          { title: "ابتكار لا ينقطع", desc: "ندفع باستمرار الحدود الإبداعية والتقنية. التوقف لم يكن يوماً خياراً." },
        ],
      },
      team: {
        overline: "الأشخاص",
        title: "فريقنا",
        titleOutline: "",
      },
      location: {
        label: "المقر الرئيسي",
        city: "تونس، تونس",
        desc: "نعمل عالمياً — بمكاتب وعملاء وإنتاجات في تونس وفرنسا والولايات المتحدة.",
        offices: [
          { flag: "🇹🇳", label: "مقر تونس",         tel: "+216 93 647 542" },
          { flag: "🇺🇸", label: "الولايات المتحدة", tel: "+1 (805) 509 9510" },
          { flag: "🇫🇷", label: "فرنسا",            tel: "+33 6 23 77 98 35" },
        ],
      },
    },
  }
};

export default TRANSLATIONS;
