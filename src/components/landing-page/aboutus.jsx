import React, { useEffect, useState } from 'react';
import { Eye, RotateCw, Sparkles } from 'lucide-react';
import styles from "../../styles/landing-page/aboutus.module.css";

const AboutUs = () => {
  const [particles, setParticles] = useState([]);
  const [eyeParticles, setEyeParticles] = useState([]);

  useEffect(() => {
    // Create floating particles
    const generateParticles = () => {
      const particleTypes = ['circle', 'line', 'triangle'];
      const newParticles = [];
      
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.7 + 0.3,
          delay: Math.random() * 8,
          type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
          rotation: Math.random() * 360
        });
      }
      setParticles(newParticles);
    };

    // Create eye particles
    const generateEyeParticles = () => {
      const newEyeParticles = [];
      for (let i = 0; i < 8; i++) {
        newEyeParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 0.3 + 0.1,
          delay: Math.random() * 10,
          blinkSpeed: Math.random() * 3 + 2
        });
      }
      setEyeParticles(newEyeParticles);
    };

    generateParticles();
    generateEyeParticles();
  }, []);

  return (
    <section id="about" className={styles['aboutus-section']}>
      {/* Animated Background */}
      <div className={styles.animatedBackground}></div>
      
      {/* Floating Particles */}
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

      {/* Eye Particles */}
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

      {/* Sparkle Effects */}
      <div className={styles.sparklesContainer}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={styles.sparkle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          >
            <Sparkles size={20} />
          </div>
        ))}
      </div>

      <div className={styles['aboutus-content-container']}>
        {/* About Us Text */}
        <div className={styles['aboutus-content']}>
          <h2>
            <Eye size={40} className={styles.eyeIcon} />
            About Us
            <Eye size={40} className={styles.eyeIcon} />
          </h2>
          <div className={styles['aboutus-text']}>
            <p>
              By digitizing and integrating key processes such as patient record
              management, diagnosis, and appointment scheduling, OptiCare streamlines
              the workflow for optometrists, allowing for seamless management of
              patient information, prescription tracking, and treatment planning.
            </p>
            <p>
              This system automates routine administrative tasks, reduces operational
              burdens, and ensures that optometrists can focus more on delivering
              high-quality care. Ultimately, OptiCare improves the practice's
              operational efficiency and the overall patient experience.
            </p>
          </div>
        </div>

        {/* Enhanced About Us Image with Creative SVG Logo */}
        <div className={styles['about-us-image']}>
          <div className={styles['image-container']}>
            <svg 
              className={styles['about-us-image-img']}
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient definitions */}
                <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E90FF" />
                  <stop offset="50%" stopColor="#00BFFF" />
                  <stop offset="100%" stopColor="#87CEFA" />
                </linearGradient>
                
                <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                  <stop offset="0%" stopColor="#0066CC" />
                  <stop offset="100%" stopColor="#1E90FF" />
                </radialGradient>
                
                {/* Pattern for creative background */}
                <pattern id="visionPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                  <circle cx="20" cy="20" r="2" fill="#1E90FF" opacity="0.6" />
                  <circle cx="20" cy="20" r="5" fill="none" stroke="#00BFFF" strokeWidth="1" opacity="0.4" />
                  <line x1="0" y1="20" x2="40" y2="20" stroke="#1E90FF" strokeWidth="1" opacity="0.3" />
                  <line x1="20" y1="0" x2="20" y2="40" stroke="#1E90FF" strokeWidth="1" opacity="0.3" />
                </pattern>
                
                {/* Glow effects */}
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <filter id="softGlow" height="300%" width="300%" x="-75%" y="-75%">
                  <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
                  <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
                  <feFlood floodColor="#1E90FF" result="glowColor" />
                  <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Background with vision test pattern */}
              <rect width="500" height="500" fill="url(#visionPattern)" opacity="0.15" />
              
              {/* Outer glow */}
              <circle cx="250" cy="250" r="220" fill="none" stroke="url(#eyeGradient)" strokeWidth="2" 
                strokeDasharray="5,5" filter="url(#softGlow)" opacity="0.7" />
              
              {/* Eye shape */}
              <path 
                d="M250,100 C350,100 400,250 400,250 C400,250 350,400 250,400 C150,400 100,250 100,250 C100,250 150,100 250,100 Z"
                fill="url(#eyeGradient)"
                filter="url(#glow)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              
              {/* Eye details */}
              <ellipse cx="250" cy="250" rx="120" ry="80" fill="white" stroke="#E0F2FF" strokeWidth="2" />
              <circle cx="250" cy="250" r="60" fill="url(#irisGradient)" stroke="#0066CC" strokeWidth="2" />
              <circle cx="250" cy="250" r="25" fill="white" opacity="0.9" />
              
              {/* Reflection highlights */}
              <path d="M280,220 A30,30 0 0 1 320,240" fill="none" stroke="white" strokeWidth="3" opacity="0.8" />
              <circle cx="270" cy="230" r="8" fill="white" opacity="0.6" />
              
              {/* Decorative elements */}
              <circle cx="150" cy="150" r="15" fill="none" stroke="#1E90FF" strokeWidth="2" opacity="0.5" />
              <circle cx="350" cy="350" r="15" fill="none" stroke="#00BFFF" strokeWidth="2" opacity="0.5" />
              
              {/* Text with glow */}
              <text 
                x="250" 
                y="450" 
                textAnchor="middle" 
                fill="#1E90FF" 
                fontSize="40" 
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                filter="url(#softGlow)"
              >
                OptiCare
              </text>
              
              {/* Subtle moving lines for dynamic effect */}
              <line x1="100" y1="100" x2="150" y2="150" stroke="#00BFFF" strokeWidth="1" opacity="0.4">
                <animate attributeName="x2" values="150;170;150" dur="8s" repeatCount="indefinite" />
                <animate attributeName="y2" values="150;170;150" dur="8s" repeatCount="indefinite" />
              </line>
              <line x1="400" y1="400" x2="350" y2="350" stroke="#1E90FF" strokeWidth="1" opacity="0.4">
                <animate attributeName="x2" values="350;330;350" dur="7s" repeatCount="indefinite" />
                <animate attributeName="y2" values="350;330;350" dur="7s" repeatCount="indefinite" />
              </line>
            </svg>
            <div className={styles['image-glow']}></div>
            <div className={styles['vision-circle']}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
