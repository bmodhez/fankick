import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Set initial state
    gsap.set(pageRef.current, {
      opacity: 0,
      y: 30
    });

    // Animate in
    gsap.to(pageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.1
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div ref={pageRef} className={className}>
      {children}
    </div>
  );
}

// Loading screen component
export function LoadingScreen() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo animation
    tl.fromTo(logoRef.current,
      {
        scale: 0,
        rotation: -180,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }
    );

    // Text animation
    tl.fromTo(textRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3'
    );

    // Loading bar animation
    tl.fromTo('.loading-bar',
      {
        scaleX: 0
      },
      {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut'
      }, '-=0.2'
    );

    // Fade out
    tl.to(loaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'power2.inOut',
      delay: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <div ref={logoRef} className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
            <span className="text-2xl font-bold text-white">FK</span>
          </div>
        </div>
        
        <div ref={textRef} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">FanKick</h2>
          <p className="text-gray-400">Loading your fan experience...</p>
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="loading-bar h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transform origin-left" />
        </div>
      </div>
    </div>
  );
}

// Smooth scroll component
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Enable smooth scrolling
    const scrollContainer = scrollRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      gsap.to(scrollContainer, {
        scrollTop: scrollContainer.scrollTop + e.deltaY * 0.8,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={scrollRef} className="h-screen overflow-auto">
      {children}
    </div>
  );
}
