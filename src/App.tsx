import React, { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useTransform, useMotionValue } from 'motion/react';
import { Mail, Github, Globe, MapPin, Phone, ExternalLink, ArrowRight, Check, ArrowUp, Clock, Sun, Moon, Download, Menu, X, Keyboard } from 'lucide-react';
import { cvData } from './data';
import { SkillItem } from './types';
import ContactModal from './components/ContactModal';
import ShortcutsModal from './components/ShortcutsModal';

const getWordCount = (obj: unknown): number => {
  let count = 0;
  if (typeof obj === 'string') {
    count += obj.trim().split(/\s+/).length;
  } else if (Array.isArray(obj)) {
    obj.forEach(item => {
      count += getWordCount(item);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.values(obj).forEach(val => {
      count += getWordCount(val);
    });
  }
  return count;
};

const wordCount = getWordCount(cvData);
const readingTime = Math.max(1, Math.ceil(wordCount / 200));

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
      mass: 0.8,
    },
  },
};

const heroSocialGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const heroSocialItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      mass: 1,
    },
  },
};


interface ProjectItemParallaxProps {
  children: React.ReactNode;
  index?: number;
}

const ProjectItemParallax: React.FC<ProjectItemParallaxProps> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Parallax transform: moves slightly faster than background scroll, producing floating depth
  const yTransform = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const smoothY = useSpring(yTransform, {
    stiffness: 120,
    damping: 24,
    mass: 0.7,
  });

  return (
    <motion.div 
      ref={ref} 
      style={{ y: smoothY }} 
      className="relative z-10 will-change-transform"
    >
      {children}
    </motion.div>
  );
};


function CursorTrail() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const s0x = useSpring(cursorX, { damping: 20, stiffness: 400, mass: 0.5 });
  const s0y = useSpring(cursorY, { damping: 20, stiffness: 400, mass: 0.5 });
  
  const s1x = useSpring(cursorX, { damping: 25, stiffness: 350, mass: 0.5 });
  const s1y = useSpring(cursorY, { damping: 25, stiffness: 350, mass: 0.5 });
  
  const s2x = useSpring(cursorX, { damping: 30, stiffness: 300, mass: 0.5 });
  const s2y = useSpring(cursorY, { damping: 30, stiffness: 300, mass: 0.5 });
  
  const s3x = useSpring(cursorX, { damping: 35, stiffness: 250, mass: 0.5 });
  const s3y = useSpring(cursorY, { damping: 35, stiffness: 250, mass: 0.5 });
  
  const s4x = useSpring(cursorX, { damping: 40, stiffness: 200, mass: 0.5 });
  const s4y = useSpring(cursorY, { damping: 40, stiffness: 200, mass: 0.5 });

  const springs = [
    { x: s0x, y: s0y },
    { x: s1x, y: s1y },
    { x: s2x, y: s2y },
    { x: s3x, y: s3y },
    { x: s4x, y: s4y },
  ];

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block">
      {springs.map((spring, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 h-3 w-3 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.5)] mix-blend-multiply dark:mix-blend-screen"
          style={{
            x: spring.x,
            y: spring.y,
            translateX: "-50%",
            translateY: "-50%",
            scale: 1 - i * 0.15,
            opacity: 1 - i * 0.15,
          }}
        />
      ))}
    </div>
  );
}


export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('experience');
  const [toastVisible, setToastVisible] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: mainScrollY } = useScroll({
    target: mainRef,
    offset: ["start center", "end end"]
  });
    const smoothMainScrollY = useSpring(mainScrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const dotY = useTransform(smoothMainScrollY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(cvData.personal.email);
    setToastVisible(true);
    setEmailCopied(true);
    setTimeout(() => setToastVisible(false), 3000);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcut keys when typing in input, textarea, or contentEditable elements
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === 'Escape') {
        setIsShortcutsModalOpen(false);
        setIsContactModalOpen(false);
        setIsMobileMenuOpen(false);
        return;
      }

      if (isTyping) return;

      // '?' or '/' with Shift to toggle shortcuts modal
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
        return;
      }

      // '1'-'5' to jump to specific sections
      if (e.key === '1') {
        e.preventDefault();
        scrollToSection('experience');
      } else if (e.key === '2') {
        e.preventDefault();
        scrollToSection('projects');
      } else if (e.key === '3') {
        e.preventDefault();
        scrollToSection('expertise');
      } else if (e.key === '4') {
        e.preventDefault();
        scrollToSection('education');
      } else if (e.key === '5') {
        e.preventDefault();
        scrollToSection('publications');
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsDarkMode((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsContactModalOpen(true);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        scrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToSection, scrollToTop]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track mouse position for the interactive radial gradient background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track active section for sidebar navigation highlighting and scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const sections = ['experience', 'projects', 'expertise', 'education', 'publications'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'education', label: 'Education' },
    { id: 'publications', label: 'Publications' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/25 selection:text-indigo-900 dark:selection:text-indigo-200">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 origin-left z-50 shadow-sm"
        style={{ scaleX }}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white dark:bg-slate-900 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-5 py-3 rounded-full shadow-2xl font-medium text-sm"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Check className="h-4 w-4" />
            </div>
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Background Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${isDarkMode ? "rgba(99, 102, 241, 0.12)" : "rgba(79, 70, 229, 0.06)"}, transparent 80%)`,
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* Left Sidebar (Sticky on Desktop) with Staggered Hero Animation */}
          <motion.header 
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24"
          >
            {/* Mobile Hamburger Button */}
            <div className="fixed top-6 right-6 z-[60] lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg lg:hidden"
                >
                  <nav className="flex flex-col items-center gap-8 text-lg font-semibold tracking-wider uppercase">
                    {navItems.map((item, i) => (
                      <motion.a
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        href={"#" + item.id}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                        }}
                        className={`transition-colors py-2 px-4 rounded-lg ${activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-bold' : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={heroContainerVariants}>
              <motion.h1 
                variants={heroFadeUp}
                className="text-4xl font-bold text-slate-900 dark:text-slate-50 sm:text-5xl font-serif tracking-tight"
              >
                {cvData.personal.name.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.025 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.h2 
                variants={heroFadeUp}
                className="mt-3 text-lg font-semibold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-xl font-sans"
              >
                {cvData.personal.title}
              </motion.h2>
              
              <motion.p 
                variants={heroFadeUp}
                className="mt-4 max-w-[45ch] text-base leading-relaxed text-slate-700 dark:text-slate-300 font-normal"
              >
                {cvData.personal.summary}
              </motion.p>

              <motion.div
                variants={heroFadeUp}
                className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400"
              >
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>{readingTime} min read</span>
              </motion.div>

              {/* Navigation */}
              <motion.nav variants={heroFadeUp} className="nav hidden lg:block mt-16">
                <motion.ul variants={heroSocialGroupVariants} className="mt-8 w-max">
                  {navItems.map((item) => (
                    <motion.li key={item.id} variants={heroSocialItemVariants}>
                      <a 
                        href={`#${item.id}`} 
                        className={`group flex items-center py-3 focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400 outline-none ${activeSection === item.id ? 'text-slate-950 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                      >
                        <span className={`nav-indicator mr-4 h-px transition-all duration-300 ease-in-out motion-reduce:transition-none ${activeSection === item.id ? 'w-16 bg-indigo-600 dark:bg-indigo-400 h-[2px]' : 'w-8 bg-slate-400 dark:bg-slate-600 group-hover:w-16 group-hover:bg-slate-800 dark:group-hover:bg-slate-300'}`}></span>
                        <span className="nav-text text-xs font-bold uppercase tracking-widest transition-colors">
                          {item.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.nav>
            </motion.div>

            {/* Socials & Contact */}
            <motion.div 
              variants={heroFadeUp}
              className="mt-8 flex flex-col gap-6 lg:mt-0"
            >
              <motion.ul variants={heroSocialGroupVariants} className="flex flex-col gap-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                <motion.li variants={heroSocialItemVariants} className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{cvData.personal.location}</span>
                </motion.li>
                
                <motion.li variants={heroSocialGroupVariants} className="flex flex-wrap gap-4 mt-2">
                  <motion.a 
                    variants={heroSocialItemVariants}
                    whileHover={{ scale: 1.12, y: -2 }} 
                    whileTap={{ scale: 0.95 }} 
                    href={cvData.personal.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                    title="View GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                  
                  <motion.a 
                    variants={heroSocialItemVariants}
                    whileHover={{ scale: 1.12, y: -2 }} 
                    whileTap={{ scale: 0.95 }} 
                    href={cvData.personal.portfolio} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                    title="Visit Portfolio"
                    aria-label="Portfolio Website"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="sr-only">Portfolio</span>
                  </motion.a>
                  
                  <motion.a 
                    variants={heroSocialItemVariants}
                    whileHover={{ scale: 1.12, y: -2 }} 
                    whileTap={{ scale: 0.95 }} 
                    href={`mailto:${cvData.personal.email}`} 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                    title={emailCopied ? "Email copied!" : "Copy email address"}
                    aria-label="Email Address"
                  >
                    {emailCopied ? <Check className="w-5 h-5 text-emerald-500" /> : <Mail className="w-5 h-5" />}
                    <span className="sr-only">Email</span>
                  </motion.a>
                  
                  <motion.a 
                    variants={heroSocialItemVariants}
                    whileHover={{ scale: 1.12, y: -2 }} 
                    whileTap={{ scale: 0.95 }} 
                    href={`tel:${cvData.personal.phone}`} 
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                    title="Call Phone Number"
                    aria-label="Phone Number"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="sr-only">Phone</span>
                  </motion.a>
                </motion.li>
              </motion.ul>
              
              <motion.div variants={heroSocialGroupVariants} className="pt-2 flex flex-wrap items-center gap-4">
                <motion.a 
                  variants={heroSocialItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/resume.pdf"
                  download="resume.pdf"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-20"></span>
                  <span className="relative flex items-center gap-2">
                    Download Resume
                    <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  </span>
                </motion.a>

                <motion.button 
                  variants={heroSocialItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-6 py-3 text-sm font-semibold text-indigo-700 dark:text-indigo-300 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/60 hover:text-indigo-800 dark:hover:text-indigo-200 hover:shadow-md border border-indigo-200 dark:border-indigo-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  Let's collaborate
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                
                <motion.button
                  variants={heroSocialItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Toggle theme"
                  title={`Toggle theme (M)`}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>

                <motion.button
                  variants={heroSocialItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsShortcutsModalOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="View keyboard shortcuts"
                  title="Keyboard shortcuts (?)"
                >
                  <Keyboard className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.header>

          {/* Right Content Area */}
          <main ref={mainRef} className="relative pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-16">
            {/* Global Timeline background track (desktop only) */}
            <div className="absolute lg:left-[-2rem] xl:left-[-3rem] top-24 bottom-24 w-px bg-slate-200 dark:bg-slate-800 hidden lg:block"></div>
            
            {/* Tablet Timeline background track (visible on sm, hidden on lg) */}
            <div className="absolute left-[25%] top-24 bottom-24 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block lg:hidden"></div>
            
            {/* Tablet Timeline active track */}
            <motion.div 
              className="absolute left-[25%] top-24 bottom-24 w-[2px] bg-purple-500/80 dark:bg-purple-400/80 hidden sm:block lg:hidden z-10"
              style={{ scaleY: smoothMainScrollY, transformOrigin: 'top', boxShadow: '0 0 15px 1px rgba(168,85,247,0.5)' }}
            ></motion.div>
            
            {/* Tablet Glowing scroll head */}
            <div
              className="absolute left-[25%] w-[2px] hidden sm:block lg:hidden z-20 pointer-events-none"
              style={{ top: "6rem", bottom: "6rem" }}
            >
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-purple-400/50 blur-[4px]"
                style={{ top: dotY }}
              ></motion.div>
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 rounded-full bg-purple-300 blur-[2px]"
                style={{ top: dotY }}
              ></motion.div>
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1),_0_0_20px_rgba(168,85,247,0.8)]"
                style={{ top: dotY }}
              ></motion.div>
            </div>
            
            {/* Global Timeline active track */}
            <motion.div 
              className="absolute lg:left-[-2rem] xl:left-[-3rem] top-24 bottom-24 w-[2px] bg-purple-500/80 dark:bg-purple-400/80 hidden lg:block z-10"
              style={{ scaleY: smoothMainScrollY, transformOrigin: 'top', boxShadow: '0 0 15px 1px rgba(168,85,247,0.5)' }}
            ></motion.div>
            
            {/* Glowing scroll head */}
            <div
              className="absolute lg:left-[-2rem] xl:left-[-3rem] w-[2px] hidden lg:block z-20 pointer-events-none"
              style={{ top: "6rem", bottom: "6rem" }}
            >
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-purple-400/50 blur-[4px]"
                style={{ top: dotY }}
              ></motion.div>
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 rounded-full bg-purple-300 blur-[2px]"
                style={{ top: dotY }}
              ></motion.div>
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1),_0_0_20px_rgba(168,85,247,0.8)]"
                style={{ top: dotY }}
              ></motion.div>
            </div>
            
            {/* Experience */}
            <section id="experience" className="scroll-mt-16 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 dark:bg-slate-950/90 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 font-sans lg:sr-only">Experience</h2>
              </div>
              
              <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-12 relative"
              >
                {cvData.experience.map((job, index) => (
                  <motion.div 
                    variants={itemVariants}
                    key={index}
                    className="group relative flex flex-col pb-1 transition-all sm:flex-row"
                  >
                    {/* Hover indicator block (desktop only) */}
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white dark:lg:group-hover:bg-slate-900/60 lg:group-hover:shadow-lg lg:group-hover:border lg:group-hover:border-slate-200/80 dark:lg:group-hover:border-slate-800/80"></div>
                    {/* Timeline dot */}
                    <div className="absolute left-[calc(25%-5.5px)] lg:left-[calc(-2rem-5px)] xl:left-[calc(-3rem-5px)] top-1.5 h-3 w-3 rounded-full border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hidden sm:block transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-slate-800 z-20"></div>
                    
                    <header className="z-10 mb-2 mt-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:w-1/4 sm:shrink-0 sm:pr-6 sm:text-right">
                      {job.period}
                    </header>
                    
                    <div className="z-10 sm:w-3/4 sm:pl-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        <div>
                          <span className="inline-flex items-baseline gap-2 text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400">
                            {job.role}
                            <ArrowRight className="inline-block h-4 w-4 shrink-0 translate-y-0.5 transform transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                          </span>
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-slate-700 dark:text-slate-300">{job.company}</div>
                      </h3>
                      
                      <ul className="mt-4 space-y-2.5 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex gap-2.5 items-start">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Projects */}
            
            {/* Divider */}
            <motion.div 
              animate={{ 
                scaleX: activeSection === 'projects' ? 1 : 0.3,
                opacity: activeSection === 'projects' ? 1 : 0.4
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-indigo-500/40 dark:via-indigo-500/60 to-transparent my-10 lg:my-16"
            ></motion.div>
            <section id="projects" className="scroll-mt-16 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 dark:bg-slate-950/90 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 font-sans lg:sr-only">Projects</h2>
              </div>
              
              <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-12"
              >
                {cvData.projects.map((project, index) => (
                  <ProjectItemParallax key={index}>
                  <motion.div 
                    variants={itemVariants}
                    className="group relative flex flex-col pb-1 transition-all sm:flex-row"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white dark:lg:group-hover:bg-slate-900/60 lg:group-hover:shadow-lg lg:group-hover:border lg:group-hover:border-slate-200/80 dark:lg:group-hover:border-slate-800/80"></div>
                    {/* Timeline dot */}
                    <div className="absolute left-[calc(25%-5.5px)] lg:left-[calc(-2rem-5px)] xl:left-[calc(-3rem-5px)] top-1.5 h-3 w-3 rounded-full border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hidden sm:block transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-slate-800 z-20"></div>
                    
                    <header className="z-10 mb-2 mt-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:w-1/4 sm:shrink-0 sm:pr-6 sm:text-right">
                    </header>
                    
                    <div className="z-10 sm:w-3/4 sm:pl-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-col sm:block">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="group/link inline-flex items-baseline font-semibold leading-tight text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400 text-base"
                        >
                          <span className="relative pb-0.5">
                            {project.name}
                            <span className="absolute bottom-0 left-0 h-px w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover/link:w-full"></span>
                          </span>
                          <ExternalLink className="inline-block h-4 w-4 shrink-0 ml-1.5 translate-y-px transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                        </a>
                        <span className="mt-1 block sm:inline sm:ml-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {project.role}
                        </span>
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                        {project.description}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <li key={tech}>
                            <div className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/60">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  </ProjectItemParallax>
                ))}
              </motion.div>
            </section>

            {/* Expertise / Skills */}
            
            {/* Divider */}
            <motion.div 
              animate={{ 
                scaleX: activeSection === 'expertise' ? 1 : 0.3,
                opacity: activeSection === 'expertise' ? 1 : 0.4
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-indigo-500/40 dark:via-indigo-500/60 to-transparent my-10 lg:my-16"
            ></motion.div>
            <section id="expertise" className="scroll-mt-16 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 dark:bg-slate-950/90 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 font-sans lg:sr-only">Expertise</h2>
              </div>
              
              <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Object.entries(cvData.skills).map(([category, skills]) => (
                  <motion.div 
                    variants={fadeUpVariants}
                    key={category} 
                    className="z-10 rounded-2xl bg-white dark:bg-slate-900/70 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-4">{category}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {skills.map((skill: SkillItem) => (
                        <motion.li 
                          key={skill.name}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="group/skill relative flex"
                        >
                          <div 
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all border border-indigo-200/70 dark:border-indigo-800/60 bg-indigo-50/90 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 shadow-xs cursor-default"
                          >
                            <span>{skill.name}</span>
                          </div>
                          
                          {/* Tooltip */}
                          <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-slate-900 dark:bg-slate-800 text-slate-50 text-xs font-medium px-3 py-1.5 rounded-lg shadow-2xl border border-slate-700 z-50 flex items-center gap-2">
                            <span>{skill.tooltip}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                            <span className="text-indigo-300 font-mono text-[11px] font-bold">{skill.proficiency}%</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Education */}
            
            {/* Divider */}
            <motion.div 
              animate={{ 
                scaleX: activeSection === 'education' ? 1 : 0.3,
                opacity: activeSection === 'education' ? 1 : 0.4
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-indigo-500/40 dark:via-indigo-500/60 to-transparent my-10 lg:my-16"
            ></motion.div>
            <section id="education" className="scroll-mt-16 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 dark:bg-slate-950/90 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 font-sans lg:sr-only">Education</h2>
              </div>
              
              <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-12"
              >
                {cvData.education.map((edu, index) => (
                  <motion.div 
                    variants={itemVariants}
                    key={index}
                    className="group relative flex flex-col pb-1 transition-all sm:flex-row"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white dark:lg:group-hover:bg-slate-900/60 lg:group-hover:shadow-lg lg:group-hover:border lg:group-hover:border-slate-200/80 dark:lg:group-hover:border-slate-800/80"></div>
                    {/* Timeline dot */}
                    <div className="absolute left-[calc(25%-5.5px)] lg:left-[calc(-2rem-5px)] xl:left-[calc(-3rem-5px)] top-1.5 h-3 w-3 rounded-full border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hidden sm:block transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-slate-800 z-20"></div>
                    
                    <header className="z-10 mb-2 mt-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:w-1/4 sm:shrink-0 sm:pr-6 sm:text-right">
                      {edu.period}
                    </header>
                    
                    <div className="z-10 sm:w-3/4 sm:pl-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        <span className="block text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {edu.degree}
                        </span>
                        <span className="block mt-0.5 text-sm font-semibold text-slate-700 dark:text-slate-300">{edu.institution}</span>
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">{edu.details}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Publications */}
            
            {/* Divider */}
            <motion.div 
              animate={{ 
                scaleX: activeSection === 'publications' ? 1 : 0.3,
                opacity: activeSection === 'publications' ? 1 : 0.4
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-indigo-500/40 dark:via-indigo-500/60 to-transparent my-10 lg:my-16"
            ></motion.div>
            <section id="publications" className="scroll-mt-16 lg:scroll-mt-24 pb-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 dark:bg-slate-950/90 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 font-sans lg:sr-only">Publications</h2>
              </div>
              
              <motion.ul 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-12"
              >
                {cvData.publications.map((pub, index) => (
                  <motion.li 
                    variants={itemVariants}
                    key={index} 
                    className="group relative flex flex-col pb-1 transition-all sm:flex-row"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white dark:lg:group-hover:bg-slate-900/60 lg:group-hover:shadow-lg lg:group-hover:border lg:group-hover:border-slate-200/80 dark:lg:group-hover:border-slate-800/80"></div>
                    {/* Timeline dot */}
                    <div className="absolute left-[calc(25%-5.5px)] lg:left-[calc(-2rem-5px)] xl:left-[calc(-3rem-5px)] top-1.5 h-3 w-3 rounded-full border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hidden sm:block transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-slate-800 z-20"></div>
                    
                    <header className="z-10 mb-2 mt-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:w-1/4 sm:shrink-0 sm:pr-6 sm:text-right">
                      {pub.year}
                    </header>
                    
                    <div className="z-10 sm:w-3/4 sm:pl-6">
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="group/link inline-flex items-baseline font-semibold leading-tight text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 focus-visible:text-indigo-600 dark:focus-visible:text-indigo-400 text-base"
                      >
                        <span className="relative pb-0.5">
                          {pub.title}
                          <span className="absolute bottom-0 left-0 h-px w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover/link:w-full"></span>
                        </span>
                        <ExternalLink className="inline-block h-4 w-4 shrink-0 ml-1.5 translate-y-px transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                      </a>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">{pub.venue}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </section>

          </main>
        </div>
      </div>

      {/* Floating Keyboard Shortcuts Trigger (Desktop / Tablet) */}
      <div className="fixed bottom-8 left-8 z-40 hidden md:block">
        <motion.button
          id="keyboard-shortcuts-pill"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsShortcutsModalOpen(true)}
          className="group flex items-center gap-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-indigo-500/10 transition-all"
          aria-label="View keyboard shortcuts"
        >
          <Keyboard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>Shortcuts</span>
          <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-300 dark:group-hover:border-indigo-800">
            ?
          </kbd>
        </motion.button>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top-button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
        onNavigate={scrollToSection}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onScrollToTop={scrollToTop}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

