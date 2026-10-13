import { useState, useEffect } from 'react';
import './index.css';

function PageLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // 'loading' | 'flying' | 'done'

  useEffect(() => {
    // Smoother, unhurried loading animation (3.2 seconds total)
    const startTime = performance.now();
    const duration = 3200;

    let animationFrame;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Natural loading curve with steady, visible progression
      let easedProgress;
      if (rawProgress < 0.8) {
        easedProgress = Math.round((rawProgress / 0.8) * 88);
      } else {
        const remaining = (rawProgress - 0.8) / 0.2;
        easedProgress = Math.round(88 + Math.sin((remaining * Math.PI) / 2) * 12);
      }
      easedProgress = Math.min(Math.max(easedProgress, 0), 100);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for 400ms so user clearly sees completion
        setTimeout(() => {
          setStage('flying');

          // Flight animation to bottom-right chatbot takes 950ms
          setTimeout(() => {
            setStage('done');
            if (onFinish) onFinish();
          }, 950);
        }, 400);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [onFinish]);

  if (stage === 'done') return null;

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`page-loader-overlay ${stage === 'flying' ? 'is-flying' : ''}`}
      aria-live="polite"
      aria-label="Loading Ma Dental Clinic"
    >
      {/* Outer SVG progress ring: position: fixed at exactly (50vw, 50vh) */}
      <div className={`loader-ring-wrapper ${stage === 'flying' ? 'fade-out' : ''}`}>
        <svg className="loader-svg" width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2f39a9" />
              <stop offset="45%" stopColor="#5367e8" />
              <stop offset="100%" stopColor="#e50914" />
            </linearGradient>
          </defs>
          <circle
            className="loader-track"
            cx="70"
            cy="70"
            r={radius}
          />
          <circle
            className="loader-progress"
            cx="70"
            cy="70"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>
      </div>

      {/* The sticker: position: fixed at EXACT same center (50vw, 50vh), then rotates and swoops to chatbot */}
      <div className={`loader-sticker ${stage === 'flying' ? 'fly-to-chatbot' : ''}`}>
        <img
          src={`${process.env.PUBLIC_URL || ''}/Assets/chatboticon.png`}
          alt="Ma Dental Sticker"
          className="loader-sticker-img"
        />
      </div>

      {/* Info text: position: fixed at (50vw, 50vh + 88px) cleanly below the ring */}
      <div className={`loader-info ${stage === 'flying' ? 'fade-out' : ''}`}>
        <div className="loader-percentage">{progress}%</div>
        <div className="loader-brand">MA DENTAL CLINIC</div>
        <div className="loader-tagline">Care That Makes You Smile</div>
      </div>
    </div>
  );
}

export default PageLoader;
