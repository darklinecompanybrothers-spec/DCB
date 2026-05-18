import { createContext, useContext, useState } from 'react';
import useSound from 'use-sound';
import useDeviceTier from '../hooks/useDeviceTier';

const SoundContext = createContext();
const noop = () => {};
const silentAudio = {
  playHover: noop,
  playClick: noop,
  playStartup: noop,
  playSwipe: noop,
  playHover2: noop,
  playClick2: noop,
  playHoverCard: noop,
  playClickCard: noop,
  playInterface: noop,
  playTap: noop,
  playBack: noop,
  playInterface2: noop,
  playClicky: noop,
  playHov: noop,
  playSoundOn: noop,
  playSoundOff: noop,
  playClickPartner: noop,
  playHoverPartner: noop,
  playClickStudioAgency: noop,
  playHoverSelectPlan: noop,
  playSelectPlan: noop,
  playPaymentMethod: noop,
  isMuted: true,
  toggleMute: noop,
};

export const useAudio = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const { isLowEnd, isMediumTier } = useDeviceTier();

  if (isLowEnd || isMediumTier) {
    return (
      <SoundContext.Provider value={silentAudio}>
        {children}
      </SoundContext.Provider>
    );
  }

  const mutedOptions = { soundEnabled: !isMuted, preload: false };
  const uiOptions = { preload: false };

  /* ── Volume scale (consistent across the site) ──────────────────────────
     Hover  (light)   : 0.14 – 0.16
     Hover  (buttons) : 0.17 – 0.18
     Click  (actions) : 0.26 – 0.28
     Special          : startup 0.40, sound-toggle 0.40
  ─────────────────────────────────────────────────────────────────────── */
  const [playHover]            = useSound('sounds/hover.mp3',             { volume: 0.15, ...mutedOptions });
  const [playClick]            = useSound('sounds/click.mp3',             { volume: 0.27, ...mutedOptions });
  const [playStartup]          = useSound('sounds/startup.mp3',           { volume: 0.40, ...mutedOptions });
  const [playSwipe]            = useSound('sounds/swipe.mp3',             { volume: 0.22, ...mutedOptions });
  const [playHover2]           = useSound('sounds/hover2.mp3',            { volume: 0.15, ...mutedOptions });
  const [playClick2]           = useSound('sounds/click2.mp3',            { volume: 0.27, ...mutedOptions });
  const [playHoverCard]        = useSound('sounds/hovercard.mp3',         { volume: 0.15, ...mutedOptions });
  const [playClickCard]        = useSound('sounds/clickcard.mp3',         { volume: 0.27, ...mutedOptions });
  const [playInterface]        = useSound('sounds/interface.mp3',         { volume: 0.17, ...mutedOptions });
  const [playTap]              = useSound('sounds/Tap.mp3',               { volume: 0.27, ...mutedOptions });
  const [playBack]             = useSound('sounds/back.mp3',              { volume: 0.27, ...mutedOptions });
  const [playInterface2]       = useSound('sounds/interface2.mp3',        { volume: 0.17, ...mutedOptions });
  const [playClicky]           = useSound('sounds/clicky.mp3',            { volume: 0.27, ...mutedOptions });
  const [playHov]              = useSound('sounds/hov.mp3',               { volume: 0.15, ...mutedOptions });
  const [playSoundOn]          = useSound('sounds/sound-on.mp3',          { volume: 0.40, ...uiOptions });
  const [playSoundOff]         = useSound('sounds/sound-off.mp3',         { volume: 0.40, ...uiOptions });
  const [playClickPartner]     = useSound('sounds/clickpartner.mp3',      { volume: 0.27, ...mutedOptions });
  const [playHoverPartner]     = useSound('sounds/hoverpartner.mp3',      { volume: 0.15, ...mutedOptions });
  const [playClickStudioAgency]= useSound('sounds/clickstudioagency.mp3', { volume: 0.27, ...mutedOptions });
  const [playHoverSelectPlan]  = useSound('sounds/hoverselectplan.mp3',   { volume: 0.15, ...mutedOptions });
  const [playSelectPlan]       = useSound('sounds/selectplan.mp3',        { volume: 0.27, ...mutedOptions });
  const [playPaymentMethod]    = useSound('sounds/payementmethod.mp3',    { volume: 0.27, ...mutedOptions });

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <SoundContext.Provider value={{
      playHover,
      playClick,
      playStartup,
      playSwipe,
      playHover2,
      playClick2,
      playHoverCard,
      playClickCard,
      playInterface,
      playTap,
      playBack,
      playInterface2,
      playClicky,
      playHov,
      playSoundOn,
      playSoundOff,
      playClickPartner,
      playHoverPartner,
      playClickStudioAgency,
      playHoverSelectPlan,
      playSelectPlan,
      playPaymentMethod,
      isMuted,
      toggleMute,
    }}>
      {children}
    </SoundContext.Provider>
  );
};
