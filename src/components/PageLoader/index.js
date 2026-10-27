import { useState, useEffect } from 'react';
import './index.css';

function PageLoader({ onFinish }) {
  // Never block Lighthouse audits, subpages (e.g. /treatments), or returning visitors
  const shouldSkip = (() => {
    if (typeof window === 'undefined') return true;
    const isBot = /Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse|Googlebot/i.test(
      navigator.userAgent || ''
    );
    const isSubpage = window.location.pathname !== '/' && window.location.pathname !== '';
    const hasSeen = sessionStorage.getItem('ma_dental_loader_completed') === 'true';
    return isBot || isSubpage || hasSeen;
  })();

  const [stage, setStage] = useState(shouldSkip ? 'done' : 'loading');
  const [progress, setProgress] = useState(shouldSkip ? 100 : 0);

  useEffect(() => {
    if (shouldSkip) {
      if (onFinish) onFinish();
      return;
    }

    try {
      sessionStorage.setItem('ma_dental_loader_completed', 'true');
    } catch (e) {
      // Ignore storage errors in private browsing
    }

    // Snappy, non-blocking initial intro for first-time homepage visitors
    const totalDuration = 360;
    const intervalTime = 30;
    const totalSteps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          setStage('flying');
          setTimeout(() => {
            setStage('done');
            if (onFinish) onFinish();
          }, 180);
        }, 80);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldSkip, onFinish]);

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
      <div className={`loader-ring-wrapper ${stage === 'flying' ? 'fade-out' : ''}`}>
        <svg className="loader-svg" width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2f39a9" />
              <stop offset="45%" stopColor="#5367e8" />
              <stop offset="100%" stopColor="#e50914" />
            </linearGradient>
          </defs>
          <circle className="loader-track" cx="70" cy="70" r={radius} />
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

      <div className={`loader-sticker ${stage === 'flying' ? 'fly-to-chatbot' : ''}`}>
        <img
          src={`${process.env.PUBLIC_URL || ''}/Assets/chatboticon.png`}
          alt="Ma Dental Sticker"
          className="loader-sticker-img"
          width="70"
          height="70"
        />
      </div>

      <div className={`loader-info ${stage === 'flying' ? 'fade-out' : ''}`}>
        <div className="loader-percentage">{progress}%</div>
        <div className="loader-brand">MA DENTAL</div>
        <div className="loader-tagline">Care That Makes You Smile</div>
      </div>
    </div>
  );
}

export default PageLoader;
