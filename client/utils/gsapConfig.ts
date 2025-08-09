import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global GSAP configuration
export const initializeGSAP = () => {
  // Performance optimizations
  gsap.config({
    force3D: true, // Enable hardware acceleration
    nullTargetWarn: false, // Disable warnings for null targets
    trialWarn: false, // Disable trial warnings
  });

  // ScrollTrigger global settings
  ScrollTrigger.config({
    limitCallbacks: true, // Improve performance
    ignoreMobileResize: true, // Better mobile experience
  });

  // Mobile-specific optimizations
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    // Reduce animation quality on mobile for better performance
    gsap.ticker.fps(30); // Reduce frame rate on mobile
    
    // Disable some heavy animations on mobile
    ScrollTrigger.config({
      anticipatePin: 1,
      ignoreMobileResize: true,
      refreshPriority: -1
    });
  } else {
    // Full quality for desktop
    gsap.ticker.fps(60);
  }

  // Global animation defaults
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6
  });

  // Preload and warm up GSAP
  gsap.set('body', { opacity: 1 });

  console.log('🎬 GSAP initialized with optimizations');
};

// Custom easing functions
export const customEases = {
  elastic: 'elastic.out(1, 0.3)',
  bounce: 'bounce.out',
  smooth: 'power2.inOut',
  quick: 'power3.out',
  slow: 'power1.inOut'
};

// Animation presets for consistency
export const animationPresets = {
  fadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  },
  slideUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
  },
  stagger: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
  }
};

// Utility functions
export const animationUtils = {
  // Kill all animations for cleanup
  killAll: () => {
    gsap.killTweensOf('*');
    ScrollTrigger.killAll();
  },

  // Refresh ScrollTrigger (useful after content changes)
  refresh: () => {
    ScrollTrigger.refresh();
  },

  // Get device type
  getDeviceType: () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  },

  // Smooth scroll to element
  scrollTo: (target: string | Element, offset: number = 0) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        offsetY: offset
      },
      ease: 'power2.inOut'
    });
  },

  // Create responsive timeline
  createResponsiveTimeline: () => {
    const tl = gsap.timeline();
    const device = animationUtils.getDeviceType();
    
    // Return timeline with device-specific settings
    switch (device) {
      case 'mobile':
        tl.timeScale(1.5); // Faster animations on mobile
        break;
      case 'tablet':
        tl.timeScale(1.2); // Slightly faster on tablet
        break;
      default:
        tl.timeScale(1); // Normal speed on desktop
    }
    
    return tl;
  }
};

// Performance monitoring
export const performanceMonitor = {
  start: () => {
    if (typeof window !== 'undefined') {
      (window as any).gsapPerformance = {
        startTime: Date.now(),
        animations: 0
      };
    }
  },

  log: (animationName: string) => {
    if (typeof window !== 'undefined' && (window as any).gsapPerformance) {
      (window as any).gsapPerformance.animations++;
      console.log(`🎭 Animation: ${animationName} | Total: ${(window as any).gsapPerformance.animations}`);
    }
  },

  report: () => {
    if (typeof window !== 'undefined' && (window as any).gsapPerformance) {
      const perf = (window as any).gsapPerformance;
      const duration = Date.now() - perf.startTime;
      console.log(`📊 GSAP Performance Report: ${perf.animations} animations in ${duration}ms`);
    }
  }
};

export default initializeGSAP;
