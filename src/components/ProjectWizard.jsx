import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import PRICING_DATA from '../data/pricing';
import { useAudio } from '../context/SoundContext';
import useReveal from '../hooks/useReveal';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSckb4PZBDy-TVAV9_I48kjIZUaatVKvx_IJfwOaiA7OBbg_tg/formResponse';
const FIELD_IDS = {
  name:    'entry.1253088086',
  email:   'entry.2105363255',
  phone:   'entry.940423864',
  service: 'entry.843420390',
  pack:    'entry.17735681',
  details: 'entry.1254506406',
};

const normalizeServiceKey = (value) => {
  const v = String(value || '').toLowerCase();
  if (!v) return '';
  if (['studio', 'audio', 'music'].some((k) => v.includes(k))) return 'studio';
  if (['visuals', 'visual', 'video'].some((k) => v.includes(k))) return 'visuals';
  if (['agency', 'digital', 'web'].some((k) => v.includes(k))) return 'agency';
  return '';
};

const ProjectWizard = ({ prefill, lang }) => {
  const [step,         setStep]         = useState(1);
  const [formData,     setFormData]     = useState({ service: '', pack: '', packPrice: '', name: '', email: '', phone: '', details: '' });
  const [errors,       setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  const { playHover, playClick, playTap, playBack, playInterface2 } = useAudio();
  const t = TRANSLATIONS[lang].wizard;
  const { ref, vis } = useReveal();

  useEffect(() => {
    if (!prefill) return;
    const incoming = typeof prefill === 'string' ? { service: prefill } : prefill;
    const serviceKey = normalizeServiceKey(incoming.service);
    if (!serviceKey) return;
    if (incoming.pack) {
      setFormData(prev => ({ ...prev, service: serviceKey, pack: incoming.pack, packPrice: incoming.price || incoming.packPrice || '' }));
      setStep(incoming.step || 3);
      return;
    }
    setFormData(prev => ({ ...prev, service: serviceKey, pack: '', packPrice: '' }));
    setStep(incoming.step || 2);
  }, [prefill]);

  const selectService = (s) => { playTap(); setFormData({ ...formData, service: s, pack: '', packPrice: '' }); setStep(2); };
  const selectPack    = (name, price) => { playTap(); setFormData({ ...formData, pack: name, packPrice: price || '' }); setStep(3); };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };
  const onPhone = (e) => {
    const v = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: v });
    if (errors.phone) setErrors({ ...errors, phone: '' });
  };

  const submit = async () => {
    const errs = {};
    if (!formData.name.trim())  errs.name  = t.errors.name;
    if (!formData.email.trim()) errs.email = t.errors.email;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = t.errors.emailInvalid;
    if (!formData.phone.trim()) errs.phone = t.errors.phone;
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const fd = new FormData();
      fd.append(FIELD_IDS.name,    formData.name);
      fd.append(FIELD_IDS.email,   formData.email);
      fd.append(FIELD_IDS.phone,   formData.phone);
      fd.append(FIELD_IDS.service, formData.service);
      fd.append(FIELD_IDS.pack,    formData.pack);
      fd.append(FIELD_IDS.details, formData.details);
      await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: fd });
      setSubmitStatus('success');
      setFormData({ service: '', pack: '', packPrice: '', name: '', email: '', phone: '', details: '' });
      setStep(1);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inp = (field) =>
    `w-full appearance-none bg-transparent border-0 border-b ${errors[field] ? 'border-red-500' : 'border-white/10'} px-0 py-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-0 focus:border-cyan-400 transition-colors duration-300 rounded-none`;

  return (
    <section id="wizard" className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[200px] pointer-events-none" />

      <div
        ref={ref}
        className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 transition-all duration-700"
        style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(40px)' }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-3">{t.title}</h2>
          <p className="text-neutral-400 text-lg">{t.subtitle}</p>
        </div>

        <motion.div
          className="relative p-[1px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(138,43,226,0.1)]"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#8b5cf6_100%)] opacity-40" />
          <div className="relative bg-[#050508]/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/[0.05] z-10">

            <AnimatePresence mode="wait">

              {/* ── Success state ── */}
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.12 }}
                    className="flex items-center justify-center mx-auto mb-6 rounded-full bg-lime-400/10 border border-lime-400/25"
                    style={{ width: 72, height: 72 }}
                  >
                    <CheckCircle2 size={30} className="text-lime-400" />
                  </motion.div>

                  <p className="text-[10px] font-mono text-lime-400/60 uppercase tracking-[0.35em] mb-3">
                    {lang === 'ar' ? 'تم الإرسال' : lang === 'fr' ? 'Envoyé' : 'Confirmed'}
                  </p>
                  <h3 className="text-lg font-bold text-white max-w-sm mx-auto leading-snug mb-8">
                    {t.alertSuccess}
                  </h3>

                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors duration-300"
                  >
                    <ArrowLeft size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
                    {lang === 'ar' ? 'مشروع جديد' : lang === 'fr' ? 'Nouveau projet' : 'New project'}
                  </button>
                </motion.div>

              ) : (

                /* ── Form content ── */
                <motion.div
                  key="form"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {/* Progress bar */}
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-gradient-to-r from-purple-600 to-purple-400' : 'bg-white/[0.06]'}`}
                      />
                    ))}
                  </div>

                  {/* Step 1 — Choose service */}
                  {step === 1 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">{t.step1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[['studio', t.step1Opts.studio, 'purple'], ['visuals', t.step1Opts.visuals, 'lime'], ['agency', t.step1Opts.agency, 'white']].map(([k, label, c]) => (
                          <button
                            key={k}
                            onMouseEnter={playInterface2}
                            onClick={() => selectService(k)}
                            className={`p-6 text-left rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 group hover:-translate-y-1 ${
                              c === 'purple' ? 'hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]'
                              : c === 'lime'   ? 'hover:border-lime-400/40 hover:shadow-[0_0_30px_rgba(163,230,53,0.08)]'
                              : 'hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white">{label}</span>
                              <ArrowRight
                                className={`text-neutral-600 transition-colors ${
                                  c === 'purple' ? 'group-hover:text-purple-400'
                                  : c === 'lime' ? 'group-hover:text-lime-400'
                                  : 'group-hover:text-white'
                                } ${lang === 'ar' ? 'rotate-180' : ''}`}
                                size={18}
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Choose pack */}
                  {step === 2 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">
                        {t.step2} <span className="text-purple-400 capitalize">{formData.service}</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {PRICING_DATA[lang][formData.service].map((pack, i) => (
                          <button
                            key={i}
                            onMouseEnter={playInterface2}
                            onClick={() => selectPack(pack.title, pack.price)}
                            className="p-5 text-left rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/40 transition-all duration-500 group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-white">{pack.title}</span>
                              <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded">{pack.price}</span>
                            </div>
                            <p className="text-xs text-neutral-400">{pack.description}</p>
                          </button>
                        ))}
                        <button
                          onMouseEnter={playInterface2}
                          onClick={() => selectPack('Custom / Other Vision', '')}
                          className="p-5 text-left rounded-xl bg-white/[0.02] border border-dashed border-white/[0.1] hover:border-white/30 transition-all duration-500 group"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-neutral-300 group-hover:text-white">{t.customOpt}</span>
                            <ArrowRight className={`text-neutral-600 group-hover:text-white ${lang === 'ar' ? 'rotate-180' : ''}`} size={16} />
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">{t.customDesc}</p>
                        </button>
                      </div>
                      <button
                        onMouseEnter={playInterface2}
                        onClick={() => { playBack(); setStep(1); }}
                        className="text-sm text-neutral-500 hover:text-white mt-6 flex items-center gap-2 transition-colors"
                      >
                        <ArrowLeft size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
                        {t.backCat}
                      </button>
                    </div>
                  )}

                  {/* Step 3 — Contact details */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t.step3}</h3>
                        {formData.pack && (
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-neutral-400 text-sm">{t.selected}</span>
                            <span className="bg-purple-500/20 text-purple-300 text-sm font-bold px-3 py-1 rounded-lg">{formData.pack}</span>
                            {formData.packPrice && (
                              <span className="bg-lime-400/10 text-lime-400 text-sm font-bold px-3 py-1 rounded-lg">{formData.packPrice}</span>
                            )}
                            <span className="text-neutral-500 text-xs capitalize">({formData.service})</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <input type="text" name="name" value={formData.name} onChange={onChange} placeholder={t.placeholders.name} className={inp('name')} />
                          {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                        </div>
                        <div>
                          <input type="email" name="email" value={formData.email} onChange={onChange} placeholder={t.placeholders.email} className={inp('email')} />
                          {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                        </div>
                        <div>
                          <input type="text" name="phone" value={formData.phone} onChange={onPhone} placeholder={t.placeholders.phone} className={inp('phone')} />
                          {errors.phone && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                        </div>
                        <textarea
                          name="details"
                          value={formData.details}
                          onChange={onChange}
                          placeholder={formData.pack?.includes('Custom') ? t.placeholders.customDetails : t.placeholders.details}
                          className="w-full appearance-none bg-transparent border-0 border-b border-white/10 px-0 py-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-0 focus:border-cyan-400 transition-colors duration-300 rounded-none resize-none h-28"
                        />
                      </div>

                      <button
                        onMouseEnter={playHover}
                        onClick={() => { playClick(); submit(); }}
                        disabled={isSubmitting}
                        className={`relative w-full py-5 mt-8 rounded-sm overflow-hidden group bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#8b5cf6] bg-[length:200%_auto] transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.6),0_0_60px_rgba(6,182,212,0.4)] hover:bg-right hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin relative z-10 text-white" />
                            <span className="text-white font-black uppercase tracking-[0.25em] text-sm relative z-10">{t.sending}</span>
                          </>
                        ) : (
                          <span className="text-white font-black uppercase tracking-[0.25em] text-sm relative z-10">{t.submit}</span>
                        )}
                      </button>

                      {/* ── Error banner ── */}
                      <AnimatePresence>
                        {submitStatus === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                          >
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <span className="flex-1 leading-relaxed">{t.alertError}</span>
                            <button
                              onClick={() => setSubmitStatus(null)}
                              aria-label="Dismiss"
                              className="text-red-400/50 hover:text-red-400 transition-colors text-base leading-none shrink-0 mt-0.5"
                            >
                              ✕
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onMouseEnter={playInterface2}
                        onClick={() => { playBack(); setStep(formData.service ? 2 : 1); }}
                        className="text-sm text-neutral-500 hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <ArrowLeft size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
                        {t.backPack}
                      </button>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectWizard;
