import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Eye, EyeOff, Sparkles, RotateCw } from 'lucide-react';
import styles from "../../styles/landing-page/testimonials.module.css";

const testimonials = [
  {
    id: 1,
    text: `"OptiCare has made managing my eye health so much easier. I can book appointments, check my prescriptions, and access my health records all in one place. It's truly a game-changer for busy individuals like me!"`,
    name: 'John Augustine L. Lapinig',
    role: 'Patient',
    image: '/landing-page-iamge/Slapinig.svg'
  },
  {
    id: 2,
    text: `"As a practice manager, I can confidently say that Opticare has streamlined our workflow and improved overall efficiency. The real-time tracking and reporting features give us valuable insights into our operations."`,
    name: 'HuTao',
    role: 'Practice Manager',
    image: '/landing-page-iamge/shutao.svg'
  },
  {
    id: 3,
    text: `"Opticare has completely transformed how we manage our patient data and appointments. The intuitive interface and seamless integration have saved us hours each week. Our team can now focus more on patient care!"`,
    name: 'Yanfei',
    role: 'Clinic Director',
    image: '/landing-page-iamge/syanfei.svg'
  },
  {
    id: 4,
    text: `"The OptiCare platform streamlined my clinic's operations. It's easier than ever to manage appointments and communicate with patients. Highly recommend it for healthcare professionals!"`,
    name: 'Laureano Gabrillo',
    role: 'Clinic Manager',
    image: '/landing-page-iamge/sison1.jpg'
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [particles, setParticles] = useState([]);
  const [eyeParticles, setEyeParticles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize all particles
  useEffect(() => {
    // Geometric particles
    const particleTypes = ['circle', 'line', 'triangle'];
    const newParticles = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.7 + 0.3,
        delay: Math.random() * 10,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        rotation: Math.random() * 360
      });
    }
    setParticles(newParticles);

    // Eye-shaped particles
    const newEyeParticles = [];
    for (let i = 0; i < 15; i++) {
      newEyeParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        speed: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 15,
        blinkSpeed: Math.random() * 4 + 2
      });
    }
    setEyeParticles(newEyeParticles);

    // Sparkle particles
    const newSparkles = [];
    for (let i = 0; i < 12; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      });
    }
    setSparkles(newSparkles);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      triggerAnimation();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    triggerAnimation();
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    triggerAnimation();
  };

  const { text, name, role, image } = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className={styles.testimonials}>
      {/* Animated gradient background */}
      <div className={styles.animatedBackground}></div>
      
      {/* Geometric particles */}
      <div className={styles.particlesContainer}>
        {particles.map(particle => (
          <div
            key={`particle-${particle.id}`}
            className={`${styles.particle} ${styles[particle.type]}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: `rotate(${particle.rotation}deg)`,
              animation: `
                ${styles.float} ${20 / particle.speed}s infinite ${particle.delay}s ease-in-out,
                ${styles.spin} ${60 / particle.speed}s infinite linear
              `
            }}
          />
        ))}
      </div>

      {/* Floating eye particles */}
      <div className={styles.eyeParticlesContainer}>
        {eyeParticles.map(particle => (
          <div
            key={`eye-${particle.id}`}
            className={styles.eyeParticle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `
                ${styles.float} ${25 / particle.speed}s infinite ${particle.delay}s ease-in-out,
                ${styles.blink} ${particle.blinkSpeed}s infinite ease-in-out
              `
            }}
          >
            <Eye size={particle.size * 0.6} />
          </div>
        ))}
      </div>

      {/* Sparkle effects */}
      <div className={styles.sparklesContainer}>
        {sparkles.map(sparkle => (
          <div
            key={`sparkle-${sparkle.id}`}
            className={styles.sparkle}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animation: `
                ${styles.sparkleFloat} ${sparkle.duration}s infinite ${sparkle.delay}s ease-in-out,
                ${styles.sparklePulse} ${sparkle.duration * 2}s infinite ease-in-out
              `
            }}
          >
            <Sparkles size={sparkle.size} />
          </div>
        ))}
      </div>

      <div className={styles['testimonials-header']}>
        <h2 className={styles['testimonials-title']}>
          <Eye className={`${styles.eyeIcon} ${isAnimating ? styles.eyeBlink : ''}`} size={40} />
          Testimonials
          <Eye className={`${styles.eyeIcon} ${isAnimating ? styles.eyeBlink : ''}`} size={40} />
        </h2>
        <p className={styles['testimonials-subtitle']}>
          See what our patients say about their vision journey
        </p>
      </div>
      
      <div className={styles['testimonial-container']}>
        <FaChevronLeft
          size={30}
          onClick={handlePrev}
          className={`${styles['nav-arrow']} ${styles['left-arrow']}`}
        />

        <div className={`${styles['testimonial-card']} ${isAnimating ? styles.cardFlip : ''}`}>
          <div className={styles['testimonial-content']}>
            <div className={styles['testimonial-image']}>
              <img src={image} alt="Testimonial User" />
              <div className={styles['vision-circle']}></div>
              <div className={styles['image-glow']}></div>
            </div>
            <div className={styles['testimonial-text']}>
              <p className={styles['testimonial-quote']}>{text}</p>
              <div className={styles['testimonial-author']}>
                <h4>{name}</h4>
                <span>{role}</span>
              </div>
            </div>
          </div>
        </div>

        <FaChevronRight
          size={30}
          onClick={handleNext}
          className={`${styles['nav-arrow']} ${styles['right-arrow']}`}
        />
      </div>

      <div className={styles.testimonialPagination}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${currentTestimonial === index ? styles.active : ''}`}
            onClick={() => {
              setCurrentTestimonial(index);
              triggerAnimation();
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            {currentTestimonial === index ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
