const PRICING_DATA = {
  en: {
    studio: [
      { title: "The Session", price: "60 DT", unit: "/ hour", description: "Perfect for quick vocal tracking or beat production.", features: ["Engineer Included", "Vocal Booth Access", "Standard Mixing", "Same-day Rough Export"], highlight: false },
      { title: "The Polish", price: "100 DT", unit: "/ track", description: "Professional mixing and mastering for release-ready audio.", features: ["Pro Mixing & Mastering", "Analog Processing", "Vocal Tuning", "3 Revision Rounds", "Streaming Optimized", "B-roll (Behind the Scenes)"], highlight: true },
      { title: "The Lockout", price: "500 DT", unit: "/ 10 hour block", description: "Full day access. Create without watching the clock.", features: ["Private Studio Access", "Senior Engineer", "Mixing & Mastering Discount", "Lounge Access", "Refreshments", "B-roll (Behind the Scenes)", "Access to DCB Beat Lab"], highlight: false }
    ],
    visuals: [
      { title: "Social Content", price: "350 DT", unit: "/ pack", description: "High-energy short form content for Reels/TikTok.", features: ["3 Short Form Videos", "Vertical Format", "Trend Editing", "Motion Graphics", "24hr Turnaround"], highlight: false },
      { title: "The Visual Cast", price: "200 DT", unit: "starting at", description: "Premium video podcast environment with customizable aesthetics.", features: ["Custom Color Backdrops", "Furniture Selection", "4K Multi-Cam Setup", "Pro Lighting Design", "Audio & Video Sync"], highlight: true },
      { title: "Music Video", price: "650 DT", unit: "starting at", description: "Cinematic visuals to amplify your track.", features: ["4K Cinema Camera", "6 Hour Shoot", "Director & Editor", "Color Grading", "VFX Basics"], highlight: false },
      { title: "Brand Commercial", price: "2,500 DT", unit: "starting at", description: "High-end storytelling for businesses.", features: ["Concept Development", "Full Crew", "Professional Lighting", "Sound Design", "Licensing Rights"], highlight: false }
    ],
    agency: [
      { title: "Landing Page", price: "500 DT", unit: "fixed", description: "High-conversion single page site for campaigns.", features: ["Custom Design", "React/Next.js", "SEO Optimized", "Mobile Responsive", "Analytics Setup"], highlight: false },
      { title: "Growth Retainer", price: "650 DT", unit: "starting at / month", description: "Ongoing digital dominance. Final price depends on post volume and features discussed.", features: ["Social Media Management", "Content Creation", "Weekly Ads Mgmt", "Monthly Reporting", "Custom Strategy"], highlight: true },
      { title: "The Platform", price: "2,200 DT", unit: "starting at", description: "Full-scale web application or e-commerce store.", features: ["CMS Integration", "Payment Processing", "User Authentication", "Admin Dashboard", "1 Month Support"], highlight: false }
    ]
  },
  fr: {
    studio: [
      { title: "La Session", price: "60 DT", unit: "/ heure", description: "Parfait pour l'enregistrement rapide de voix ou la production de beats.", features: ["Ingénieur Inclus", "Accès Cabine Vocale", "Mixage Standard", "Export Brut le Jour Même"], highlight: false },
      { title: "Le Polish", price: "150 DT", unit: "/ piste", description: "Mixage et mastering professionnel pour un son prêt à être diffusé.", features: ["Mixage & Mastering Pro", "Traitement Analogique", "Correction Vocale", "3 Retouches", "Optimisé Streaming", "B-roll (Coulisses)"], highlight: true },
      { title: "Le Lockout", price: "500 DT", unit: "/ bloc 10h", description: "Accès toute la journée. Créez sans regarder l'horloge.", features: ["Accès Studio Privé", "Ingénieur Senior", "Réduction Mix & Master", "Accès Lounge", "Rafraîchissements", "B-roll (Coulisses)", "Accès DCB Beat Lab"], highlight: false }
    ],
    visuals: [
      { title: "Contenu Social", price: "350 DT", unit: "/ pack", description: "Contenu court et dynamique pour Reels/TikTok.", features: ["3 Vidéos Courtes", "Format Vertical", "Montage Tendance", "Motion Graphics", "Livraison 24h"], highlight: false },
      { title: "Le Visual Cast", price: "200 DT", unit: "à partir de", description: "Environnement de podcast vidéo premium avec esthétique personnalisable.", features: ["Fonds de Couleur Personnalisés", "Sélection de Mobilier", "Config Multi-Cam 4K", "Éclairage Pro", "Synchro Audio & Vidéo"], highlight: true },
      { title: "Clip Musical", price: "650 DT", unit: "à partir de", description: "Visuels cinématographiques pour amplifier votre morceau.", features: ["Caméra Cinéma 4K", "Tournage 6 Heures", "Réalisateur & Monteur", "Étalonnage Couleur", "VFX de Base"], highlight: false },
      { title: "Pub de Marque", price: "3,500 DT", unit: "à partir de", description: "Storytelling haut de gamme pour les entreprises.", features: ["Développement Concept", "Équipe Complète", "Éclairage Pro", "Design Sonore", "Droits de Licence"], highlight: false }
    ],
    agency: [
      { title: "Landing Page", price: "500 DT", unit: "fixe", description: "Site d'une page à haute conversion pour campagnes.", features: ["Design Personnalisé", "React/Next.js", "Optimisé SEO", "Responsive Mobile", "Config Analytics"], highlight: false },
      { title: "Retainer Croissance", price: "700 DT", unit: "à partir de / mois", description: "Dominance numérique continue. Le prix final dépend du volume.", features: ["Gestion Réseaux Sociaux", "Création Contenu", "Gestion Ads Hebdo", "Rapport Mensuel", "Stratégie Personnalisée"], highlight: true },
      { title: "La Plateforme", price: "3,200 DT", unit: "à partir de", description: "Application web complète ou boutique e-commerce.", features: ["Intégration CMS", "Paiement en Ligne", "Auth Utilisateur", "Tableau de Bord Admin", "1 Mois de Support"], highlight: false }
    ]
  },
  ar: {
    studio: [
      { title: "الجلسة", price: "60 د.ت", unit: "/ ساعة", description: "مثالية لتسجيل الصوت السريع أو إنتاج الإيقاعات.", features: ["مهندس صوت مشمول", "دخول كابينة الصوت", "ميكساج قياسي", "تصدير أولي في نفس اليوم"], highlight: false },
      { title: "التلميع (The Polish)", price: "150 د.ت", unit: "/ تراك", description: "ميكساج وماسترينغ احترافي لصوت جاهز للنشر.", features: ["ميكساج وماسترينغ احترافي", "معالجة أنالوج", "توصيح صوتي (Auto-tune)", "3 جولات تعديل", "محسن للمنصات", "تصوير كواليس (B-roll)"], highlight: true },
      { title: "الحجز الكامل", price: "500 د.ت", unit: "/ 10 ساعات", description: "وصول ليوم كامل. أبدع دون النظر للساعة.", features: ["استوديو خاص", "مهندس خبير", "خصم الميكساج والماسترينغ", "دخول الاستراحة", "مشروبات", "تصوير كواليس (B-roll)", "دخول مختبر DCB Beat"], highlight: false }
    ],
    visuals: [
      { title: "محتوى التواصل", price: "350 د.ت", unit: "/ باقة", description: "محتوى قصير عالي الطاقة للريلز وتيك توك.", features: ["3 فيديوهات قصيرة", "تنسيق عمودي", "مونتاج ترند", "موشن جرافيك", "تسليم خلال 24 ساعة"], highlight: false },
      { title: "البودكاست المرئي", price: "200 د.ت", unit: "يبدأ من", description: "بيئة بودكاست فيديو متميزة مع جماليات قابلة للتخصيص.", features: ["خلفيات ألوان مخصصة", "اختيار الأثاث", "إعداد كاميرات 4K متعددة", "تصميم إضاءة احترافي", "مزامنة الصوت والفيديو"], highlight: true },
      { title: "فيديو كليب", price: "650 د.ت", unit: "يبدأ من", description: "مرئيات سينمائية لتضخيم مسارك الموسيقي.", features: ["كاميرا سينما 4K", "تصوير 6 ساعات", "مخرج ومونتير", "تلوين سينمائي", "مؤثرات بصرية أساسية"], highlight: false },
      { title: "إعلان تجاري", price: "3,500 د.ت", unit: "يبدأ من", description: "سرد قصصي راقٍ للشركات.", features: ["تطوير المفهوم", "طاقم كامل", "إضاءة احترافية", "تصميم صوتي", "حقوق الترخيص"], highlight: false }
    ],
    agency: [
      { title: "صفحة الهبوط", price: "500 د.ت", unit: "ثابت", description: "موقع صفحة واحدة عالي التحويل للحملات.", features: ["تصميم مخصص", "React/Next.js", "تحسين محركات البحث", "متجاوب مع الجوال", "إعداد التحليلات"], highlight: false },
      { title: "باقة النمو", price: "700 د.ت", unit: "يبدأ من / شهر", description: "هيمنة رقمية مستمرة. السعر النهائي يعتمد على الحجم.", features: ["إدارة وسائل التواصل", "صناعة المحتوى", "إدارة إعلانات أسبوعية", "تقارير شهرية", "استراتيجية مخصصة"], highlight: true },
      { title: "المنصة", price: "3,200 د.ت", unit: "يبدأ من", description: "تطبيق ويب كامل أو متجر إلكتروني.", features: ["تكامل CMS", "بوابة دفع", "تسجيل مستخدمين", "لوحة تحكم", "دعم فني لمدة شهر"], highlight: false }
    ]
  }
};

export default PRICING_DATA;
