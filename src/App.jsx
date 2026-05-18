import React, { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import useDeviceTier from './hooks/useDeviceTier';

/* ── Layout / Always-present ─────────────────────────────────────────────── */
import GlobalBackground    from './components/GlobalBackground';
import CustomCursor        from './components/CustomCursor';
import PageTransition      from './components/PageTransition';
import Navigation          from './components/Navigation';
import HeroSection         from './components/HeroSection';
import IntroScreen         from './components/IntroScreen';
import MarqueeBanner       from './components/MarqueeBanner';
import Footer              from './components/Footer';
import SectionLoader       from './components/SectionLoader';
import GrainOverlay        from './components/GrainOverlay';
import ScrollProgressBar   from './components/ScrollProgressBar';
import CinematicCurtain    from './components/CinematicCurtain';
import VignetteOverlay     from './components/VignetteOverlay';
import SectionCounter      from './components/SectionCounter';
import SocialProofBar      from './components/SocialProofBar';

/* ── Lazy sections ───────────────────────────────────────────────────────── */
const Services         = lazy(() => import('./components/Services'));
const WhatWeBuild      = lazy(() => import('./components/WhatWeBuild'));
const PricingSection   = lazy(() => import('./components/PricingSection'));
const TrustedPartners  = lazy(() => import('./components/TrustedPartners'));
const ProjectWizard    = lazy(() => import('./components/ProjectWizard'));
const FullPortfolioPage = lazy(() => import('./components/FullPortfolio'));
const SectorSolutions  = lazy(() => import('./components/SectorSolutions'));
const ProcessSection   = lazy(() => import('./components/ProcessSection'));
const TeamSection      = lazy(() => import('./components/TeamSection'));
const StatsSection      = lazy(() => import('./components/StatsSection'));
const ManifestoSection  = lazy(() => import('./components/ManifestoSection'));
const PreFooterCTA      = lazy(() => import('./components/PreFooterCTA'));
const ContactSection    = lazy(() => import('./components/ContactSection'));
const TheTrinityReel       = lazy(() => import('./components/TheTrinityReel'));
const CaseStudiesSection   = lazy(() => import('./components/CaseStudiesSection'));
const ShowreelSection      = lazy(() => import('./components/ShowreelSection'));
const TestimonialsSection  = lazy(() => import('./components/TestimonialsSection'));
const AboutPage            = lazy(() => import('./components/AboutPage'));

/* ── Cinematic site wrapper ──────────────────────────────────────────────── */
const MainSite = ({ children }) => (
  <motion.div
    key="site"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    style={{ position: 'relative', zIndex: 1 }}
  >
    {children}
  </motion.div>
);

/* ── Root app ────────────────────────────────────────────────────────────── */
export default function App() {
  const { isLowEnd, isMediumTier } = useDeviceTier();
  const [hasEntered,    setHasEntered]    = useState(false);
  const [currentPage,   setCurrentPage]   = useState('home');
  const [wizardPrefill, setWizardPrefill] = useState(null);
  const [lang,          setLang]          = useState('en');
  const [currentSection,  setCurrentSection]  = useState('hero');
  const [scrollVelocity,  setScrollVelocity]  = useState(0);
  const [curtainActive,   setCurtainActive]   = useState(false);
  const lastScrollY   = useRef(0);
  const velRafId      = useRef(null);
  const velResetTimer = useRef(null);
  const historyPageRef = useRef('home');

  useEffect(() => {
    const enabled = isLowEnd || isMediumTier;
    document.documentElement.classList.toggle('performance-mode', enabled);
    return () => document.documentElement.classList.remove('performance-mode');
  }, [isLowEnd, isMediumTier]);

  /* ── Section detection (drives GlobalBackground auras) ── */
  useEffect(() => {
    if (!hasEntered) return;
    const SECTIONS = [
      { id: 'hero',         key: 'hero'         },
      { id: 'trinity',      key: 'services'     }, /* TheTrinityReel uses div not section */
      { id: 'showreel',     key: 'showreel'     },
      { id: 'services',     key: 'services'     },
      { id: 'manifesto',    key: 'manifesto'    },
      { id: 'showcase',     key: 'showcase'     },
      { id: 'case-studies', key: 'case-studies' },
      { id: 'testimonials', key: 'testimonials' },
      { id: 'team',         key: 'team'         },
      { id: 'pricing',      key: 'pricing'      },
      { id: 'contact',      key: 'contact'      },
      { id: 'partners',     key: 'portfolio'    }, /* TrustedPartners on home page */
    ];
    const observers = [];
    SECTIONS.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const ob = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(key); },
        { threshold: 0.20, rootMargin: '-5% 0px -5% 0px' }
      );
      ob.observe(el);
      observers.push(ob);
    });
    return () => observers.forEach(ob => ob.disconnect());
  }, [hasEntered]);

  /* ── Scroll velocity (drives star-field speed) ── */
  useEffect(() => {
    if (!hasEntered) return;
    const onScroll = () => {
      if (velRafId.current) return;
      velRafId.current = requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = Math.abs(current - lastScrollY.current);
        lastScrollY.current = current;
        setScrollVelocity(delta);
        clearTimeout(velResetTimer.current);
        velResetTimer.current = setTimeout(() => setScrollVelocity(0), 200);
        velRafId.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (velRafId.current) cancelAnimationFrame(velRafId.current);
      clearTimeout(velResetTimer.current);
    };
  }, [hasEntered]);

  /* ── Scroll lock during intro ── */
  useEffect(() => {
    document.body.style.overflow = hasEntered ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [hasEntered]);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    if (!hasEntered) return;
    if (isLowEnd || isMediumTier) return;
    const lenis = new Lenis({ lerp: 0.1, smoothTouch: false });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, [hasEntered, isLowEnd, isMediumTier]);

  /* ── Wizard prefill normalizer ── */
  const normalizeWizardPrefill = (prefillData) => {
    if (!prefillData) return null;
    const normalizeKey = (value) => {
      const v = String(value || '').toLowerCase();
      if (!v) return '';
      if (['studio', 'audio', 'music'].some(k => v.includes(k)))  return 'studio';
      if (['visuals', 'visual', 'video'].some(k => v.includes(k))) return 'visuals';
      if (['agency', 'digital', 'web'].some(k => v.includes(k)))  return 'agency';
      return '';
    };
    if (typeof prefillData === 'string') {
      const service = normalizeKey(prefillData);
      return service ? { service, step: 2 } : null;
    }
    if (typeof prefillData === 'object') {
      const service = normalizeKey(prefillData.service || prefillData.category || prefillData.type);
      if (!service) return null;
      const pack = prefillData.pack || '';
      return { service, pack, price: prefillData.price || '', step: prefillData.step || (pack ? 3 : 2) };
    }
    return null;
  };

  useEffect(() => {
    if (!hasEntered) return;

    const initialState = window.history.state;
    if (!initialState || !initialState.dcbPage) {
      window.history.replaceState({ ...initialState, dcbPage: 'home' }, '', window.location.href);
    }

    const handlePopState = (event) => {
      const page = event.state?.dcbPage || 'home';
      if (!['home', 'portfolio', 'about'].includes(page)) return;

      historyPageRef.current = page;
      setCurtainActive(true);
      setTimeout(() => setCurtainActive(false), 950);
      setCurrentPage(page);
      window.scrollTo(0, 0);
      if (page === 'home') setCurrentSection('hero');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [hasEntered]);

  /* ── Navigation ── */
  const navigateTo = useCallback((target, prefillData = null, options = {}) => {
    setWizardPrefill(prev => normalizeWizardPrefill(prefillData));
    if (target === 'home' || target === 'portfolio' || target === 'about') {
      if (options.history === 'back' && window.history.length > 1) {
        window.history.back();
        return;
      }

      /* Fire curtain only on actual page switches */
      setCurtainActive(true);
      setTimeout(() => setCurtainActive(false), 950);
      setCurrentPage(target);
      window.scrollTo(0, 0);
      /* Reset section to hero so the logo shows the default PNG immediately */
      if (target === 'home') setCurrentSection('hero');

      if (options.history === 'replace') {
        window.history.replaceState({ dcbPage: target }, '', window.location.href);
      } else if (historyPageRef.current !== target) {
        window.history.pushState({ dcbPage: target }, '', window.location.href);
      }
      historyPageRef.current = target;
    } else {
      /* If navigating away from the portfolio page, the PageTransition exit
         animation takes ~450 ms. Give the home page time to mount before
         scrolling, otherwise getElementById returns null. */
      setCurrentPage(prev => {
        const delay = prev === 'portfolio' ? 700 : 100;
        if (prev !== 'home') {
          window.history.pushState({ dcbPage: 'home' }, '', window.location.href);
          historyPageRef.current = 'home';
        }
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, delay);
        return 'home';
      });
    }
  }, []); // stable — uses functional setState updates to avoid stale closure

  const handlePlanSelect = useCallback((service, pack, price) =>
    navigateTo('contact', { service, pack, price, step: 3 }), [navigateTo]);

  /* ── Render ── */
  return (
    <MotionConfig reducedMotion="user">
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {!isLowEnd && !isMediumTier && <GrainOverlay />}
      <CustomCursor currentSection={currentSection} />
      <GlobalBackground currentSection={currentSection} scrollVelocity={scrollVelocity} />
      {hasEntered && <ScrollProgressBar />}
      {hasEntered && !isLowEnd && !isMediumTier && <VignetteOverlay currentSection={currentSection} />}
      {hasEntered && <SectionCounter currentSection={currentSection} />}
      <CinematicCurtain isActive={curtainActive} />

      {/* Navigation — rendered at root level so z-index is not trapped inside
          MainSite's stacking context (which VignetteOverlay sits above) */}
      {hasEntered && (
        <Navigation
          onNavigate={navigateTo}
          currentPage={currentPage}
          currentSection={currentSection}
          lang={lang}
          setLang={setLang}
        />
      )}


      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <IntroScreen key="intro" lang={lang} setLang={setLang} onEnter={() => setHasEntered(true)} />
        ) : (
          <MainSite key="site">
            <div
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="site-root min-h-screen selection:bg-purple-500/30 selection:text-white antialiased"
              style={{ position: 'relative', zIndex: 1 }}
            >
              <AnimatePresence mode="wait">
                {currentPage === 'home' ? (
                  <PageTransition key="home">
                    <HeroSection onNavigate={navigateTo} lang={lang} />
                    <SocialProofBar />
                    {/* Manifesto — signature de l'agence, avant la présentation des services */}
                    <Suspense fallback={<SectionLoader />}>
                      <ManifestoSection lang={lang} />
                    </Suspense>
                    <Suspense fallback={null}>
                      <TheTrinityReel />
                    </Suspense>
                    <MarqueeBanner />
                    {/* Showreel — right after the trinity reel */}
                    <Suspense fallback={null}>
                      <ShowreelSection />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <Services lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <StatsSection lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <ProcessSection lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <WhatWeBuild onNavigate={navigateTo} lang={lang} />
                    </Suspense>
                    {/* Case Studies — after WhatWeBuild, easier to find */}
                    <Suspense fallback={<SectionLoader />}>
                      <CaseStudiesSection lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <SectorSolutions onNavigate={navigateTo} lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <PricingSection onSelectPlan={handlePlanSelect} lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <TrustedPartners onNavigate={navigateTo} lang={lang} />
                    </Suspense>
                    {/* Testimonials — social proof after partners */}
                    <Suspense fallback={<SectionLoader />}>
                      <TestimonialsSection lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <TeamSection lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <ContactSection onNavigate={navigateTo} lang={lang} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <ProjectWizard prefill={wizardPrefill} lang={lang} />
                    </Suspense>
                  </PageTransition>
                ) : currentPage === 'portfolio' ? (
                  <PageTransition key="portfolio">
                    <Suspense fallback={<SectionLoader />}>
                      <FullPortfolioPage onNavigate={navigateTo} lang={lang} />
                    </Suspense>
                  </PageTransition>
                ) : (
                  <PageTransition key="about">
                    <Suspense fallback={<SectionLoader />}>
                      <AboutPage onNavigate={navigateTo} lang={lang} />
                    </Suspense>
                  </PageTransition>
                )}
              </AnimatePresence>

              <Suspense fallback={null}>
                <PreFooterCTA onNavigate={navigateTo} lang={lang} />
              </Suspense>
              <Footer lang={lang} onNavigate={navigateTo} />
            </div>
          </MainSite>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
