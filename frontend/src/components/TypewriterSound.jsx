import { useEffect } from 'react';

export default function TypewriterSound() {
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const context = new AudioContext();
    let dingBuffer = null;

    // Load the user's custom ding.mp3 file for the Enter key
    fetch('/ding.wav')
      .then(res => res.arrayBuffer())
      .then(data => context.decodeAudioData(data))
      .then(buffer => { dingBuffer = buffer; })
      .catch(() => console.log("Missing ding.wav"));

    const playDing = () => {
      if (!dingBuffer) return;
      if (context.state === 'suspended') context.resume();

      const source = context.createBufferSource();
      source.buffer = dingBuffer;

      const gainNode = context.createGain();
      gainNode.gain.value = 0.8; // Adjust volume if needed

      source.connect(gainNode);
      gainNode.connect(context.destination);
      source.start(0);
    };

    // Procedurally generate an "Old Computer Terminal" / CRT interface blip
    // We keep this for the normal typing keys to maintain absolute zero latency
    const playTerminalBlip = () => {
      if (context.state === 'suspended') {
        context.resume();
      }

      const time = context.currentTime;
      
      const osc = context.createOscillator();
      const gainNode = context.createGain();
      
      // A hollow, electronic square wave fits the retro CRT aesthetic perfectly
      osc.type = 'square';
      
      // A very short, muted, slightly crunchy data-entry 'blip'
      // Slight randomization in pitch makes it feel like an analog terminal
      const baseFreq = 200 + (Math.random() * 20);
      osc.frequency.setValueAtTime(baseFreq, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 50, time + 0.02);
      
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.08, time + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
      
      osc.start(time);
      osc.stop(time + 0.03);

      // Add a tiny bit of highpass noise to simulate analog static/hardware crunch
      const bufferSize = context.sampleRate * 0.03;
      const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
      }
      
      const noise = context.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const bandpass = context.createBiquadFilter();
      bandpass.type = 'highpass';
      bandpass.frequency.value = 4000;
      
      const noiseGain = context.createGain();
      noiseGain.gain.setValueAtTime(0, time);
      noiseGain.gain.linearRampToValueAtTime(0.02, time + 0.002);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
      
      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(context.destination);
      noise.start(time);
      
      osc.connect(gainNode);
      gainNode.connect(context.destination);
    };

    const playMouseClick = () => {
      if (context.state === 'suspended') {
        context.resume();
      }

      const time = context.currentTime;
      
      const osc = context.createOscillator();
      const osc2 = context.createOscillator();
      const gainNode = context.createGain();
      
      // High-pitched, hollow metallic "tink" for menu navigation (Resident Evil select sound)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, time);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1800, time);
      
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.1, time + 0.002); // Very sharp attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.08); // Very fast decay
      
      osc.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(context.destination);
      
      osc.start(time);
      osc.stop(time + 0.08);
      osc2.start(time);
      osc2.stop(time + 0.08);
    };

    const handleKeyDown = (e) => {
      // Ignore silent modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) return;

      if (e.key === 'Enter') {
        playDing();
      } else {
        playTerminalBlip();
      }
    };

    const handleMouseDown = (e) => {
      // Only play the click sound if they are actually clicking an interactive element
      const isInteractive = e.target.closest('button, a, input, textarea, select');
      if (isInteractive) {
        playMouseClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      context.close();
    };
  }, []);

  return null;
}
