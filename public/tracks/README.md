# /public/tracks — DCB Audio Track Folder

Drop your audio files here. The site picks them up automatically by convention name.

## Naming Convention

| File name              | Where it plays                                   |
|------------------------|--------------------------------------------------|
| `studio-01.mp3`        | Waveform Scrubber on The Studio panel (primary)  |
| `studio-02.mp3`        | Waveform Scrubber fallback / B-side              |
| `ghost-1.mp3`          | Testimonial card #1 (Sami Ben Amor)              |
| `ghost-2.mp3`          | Testimonial card #2 (Leila Mansouri)             |
| `ghost-3.mp3`          | Testimonial card #3 (Karim Trabelsi)             |
| `ghost-4.mp3`          | Testimonial card #4 (Nour Chaabane)              |
| `ghost-5.mp3`          | Testimonial card #5 (Mohamed Fadhel)             |
| `ghost-6.mp3`          | Testimonial card #6 (Sarah Oueslati)             |

## Recommended Specs

- Format: **MP3** (best browser compatibility) or **OGG** as fallback
- Bitrate: 128 kbps is enough for voice; 192 kbps for music tracks
- Studio track: ~60–90 seconds is ideal for the scrubber experience
- Ghost clips: 5–15 seconds (client voice notes / testimonial excerpts)

## How it works

- **Waveform Scrubber** (`studio-01.mp3`): a play/pause button appears on the Studio panel.
  Click to start playback. The scroll-driven playhead becomes audio-time-driven while playing.
  If the file is absent, the cosmetic scroll-scrubber remains active — no errors.

- **Ghost Portfolio** (`ghost-{id}.mp3`): each testimonial card checks for its file.
  If found, the "Voice Note" button plays the real clip instead of the synthesised tone.
  If absent, synthesis kicks in automatically — zero breakage.
