import React, { useEffect, useState } from 'react';
import { Eye, RotateCw, Sparkles } from 'lucide-react';
import styles from "../../styles/landing-page/aboutus.module.css";
import Image from 'next/image';

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

        {/* About Us Image */}
        <div className={styles['about-us-image']}>
          <div className={styles['image-container']}>
            <Image 
              src="/landing-page-iamge/opticareLogo.png"
              alt="OptiCare Logo"
              width={500}
              height={500}
              className={styles['about-us-image-img']}
            />
            <div className={styles['image-glow']}></div>
            <div className={styles['vision-circle']}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
