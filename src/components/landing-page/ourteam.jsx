import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaGithub, FaEnvelope, FaTimes } from 'react-icons/fa';
import { Eye, Sparkles } from 'lucide-react';
import styles from '../../styles/landing-page/ourteam.module.css';
import Image from 'next/image';

const teamMembers = [
    { 
      id: 1, 
      name: "John Laurence G. Sison", 
      role: "AI Developer", 
      image: '/landing-page-iamge/sison1.jpg',
      course: "BS Computer Engineering",
      contribution: "Designed and implemented the AI-powered diagnosis system, machine learning models, and key features like the landing page and appointment scheduling for both clinic and patient portals.",
      github: "https://github.com/SeesonLau",
      email: "seesonjohnlau@gmail.com"
    },
    { 
      id: 2, 
      name: "Charles Luis G. Gaid", 
      role: "Settings Developer", 
      image: '/landing-page-iamge/gaid.jpg',
      course: "BS Computer Engineering",
      contribution: "Developed the user settings and preferences system, enabling personalized and streamlined user experiences.",
      github: "https://github.com/SibuyasGaid",
      email: "charlesluisgaid@gmail.com"
    },
    { 
      id: 3, 
      name: "Jamel P. Hadjirasul", 
      role: "EHR Developer", 
      image: '/landing-page-iamge/jamel.jpg',
      course: "BS Computer Engineering",
      contribution: "Created and integrated comprehensive Electronic Health Record (EHR) functionalities for both clinic and patient platforms.",
      github: "https://github.com/catnipp9",
      email: "hadjirasuljamel80@gmail.com"
    },
    { 
      id: 4, 
      name: "Dawson P. Alegarbes", 
      role: "Database Developer", 
      image: '/landing-page-iamge/dawson.jpg',
      course: "BS Computer Engineering",
      contribution: "Established and maintained database connectivity, ensuring seamless integration of all platform features.",
      github: "https://github.com/deandoiii",
      email: "dosonshi@gmail.com"
    },
    { 
      id: 5, 
      name: "Dan Vincent Y. Adlawan", 
      role: "Login/Signup Developer", 
      image: '/landing-page-iamge/adlawan.JPG',
      course: "BS Computer Engineering",
      contribution: "Developed the authentication system, including responsive and user-friendly login and signup modals.",
      github: "https://github.com/DansoloTO",
      email: "danmc97to@gmail.com"
    },
    { 
      id: 6, 
      name: "Daniel M. Montesclaros", 
      role: "Homepage Developer", 
      image: '/landing-page-iamge/mont.jpg',
      course: "BS Computer Engineering",
      contribution: "Designed and developed the homepage for both clinic and patient platforms, as well as the sidebar navigation components.",
      github: "https://github.com/constantine2003",
      email: "montesclarosdaniel7@gmail.com"
    },
  ];  

const OurTeam = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [particles, setParticles] = useState([]);
  const [eyeParticles, setEyeParticles] = useState([]);
  const [modalBgElements, setModalBgElements] = useState([]);

  useEffect(() => {
    // Initialize particles
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

    const generateModalBackground = () => {
      const elements = [];
      // Circles
      for (let i = 0; i < 5; i++) {
        elements.push({
          id: `circle-${i}`,
          type: 'circle',
          size: Math.random() * 300 + 100,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.1 + 0.05
        });
      }
      // Lines
      for (let i = 0; i < 3; i++) {
        elements.push({
          id: `line-${i}`,
          type: 'line',
          width: Math.random() * 200 + 100,
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.1 + 0.05
        });
      }
      setModalBgElements(elements);
    };

    generateParticles();
    generateEyeParticles();
    generateModalBackground();

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setVisibleCards(1);
        setIsMobile(true);
      } else if (width <= 768) {
        setVisibleCards(2);
        setIsMobile(true);
      } else {
        setVisibleCards(3);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    if (!isMobile) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, startIndex]);

  const handleNext = () => {
    setStartIndex((prevIndex) => 
      (prevIndex + 1) % (teamMembers.length - visibleCards + 1)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - visibleCards : prevIndex - 1
    );
  };

  const getVisibleTeam = () => {
    return teamMembers.slice(startIndex, startIndex + visibleCards);
  };

  const openModal = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="team" className={styles['ourteam-section']}>
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

      <div className={styles['team-content']}>
        <h2 className={styles['team-heading']}>
          <Eye size={40} className={styles.eyeIcon} />
          Our <span className={styles.highlight}>Team</span>
          <Eye size={40} className={styles.eyeIcon} />
        </h2>
        <p className={styles['team-subheading']}>
          Meet the passionate team behind OptiCare, dedicated to revolutionizing eye care through innovation and technology!
        </p>

        <div className={styles['team-carousel-container']}>
          <div className={styles['team-carousel']}>
            {!isMobile && (
              <button 
                className={`${styles.arrow} ${styles['left-arrow']}`} 
                onClick={handlePrev}
                aria-label="Previous team member"
              >
                <FaChevronLeft />
              </button>
            )}

            <div className={styles['team-cards-wrapper']}>
              <div className={styles['team-cards']}>
                {getVisibleTeam().map((member) => (
                  <div 
                    className={styles['team-card']} 
                    key={member.id}
                    onClick={() => openModal(member)}
                  >
                    <div className={styles['team-image-wrapper']}>
                      <div className={styles['image-glow']}></div>
                      <div className={styles['vision-circle']}></div>
                      <Image 
                        src={member.image}
                        alt={`Portrait of ${member.name}, ${member.role}`}
                        width={280}
                        height={240}
                        className={styles['team-image']}
                        priority={member.id <= 3}
                      />
                    </div>
                    <div className={styles['team-info']}>
                      <div className={styles['team-role']}>{member.role}</div>
                      <div className={styles['team-name']}>{member.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isMobile && (
              <button 
                className={`${styles.arrow} ${styles['right-arrow']}`} 
                onClick={handleNext}
                aria-label="Next team member"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>

        {isMobile && (
          <div className={styles['mobile-indicators']}>
            {teamMembers.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.indicator} ${idx >= startIndex && idx < startIndex + visibleCards ? styles.active : ''}`}
                onClick={() => setStartIndex(Math.min(idx, teamMembers.length - visibleCards))}
                aria-label={`View team member ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className={styles['team-modal']}>
          <div className={styles['modal-overlay']} onClick={closeModal}></div>
          
          {/* Background Design Elements */}
          <div className={styles['modal-background-design']}>
            {modalBgElements.map(element => (
              element.type === 'circle' ? (
                <div
                  key={element.id}
                  className={styles['modal-bg-circle']}
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    width: `${element.size}px`,
                    height: `${element.size}px`,
                    opacity: element.opacity
                  }}
                />
              ) : (
                <div
                  key={element.id}
                  className={styles['modal-bg-line']}
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    width: `${element.width}px`,
                    transform: `rotate(${element.rotation}deg)`,
                    opacity: element.opacity
                  }}
                />
              )
            ))}
          </div>
          
          {/* Floating particles for modal */}
          <div className={styles['modal-particles']}>
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className={styles['modal-particle']}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 10 + 5}s`
                }}
              />
            ))}
          </div>

          <div className={styles['modal-content']}>
            <button className={styles['modal-close']} onClick={closeModal}>
              <FaTimes />
            </button>
            
            {/* Decorative corner elements */}
            <div className={`${styles['modal-corner']} ${styles['top-left']}`}></div>
            <div className={`${styles['modal-corner']} ${styles['top-right']}`}></div>
            <div className={`${styles['modal-corner']} ${styles['bottom-left']}`}></div>
            <div className={`${styles['modal-corner']} ${styles['bottom-right']}`}></div>
            
            {/* Centered Image with Frame */}
            <div className={styles['modal-image-frame']}>
              <div className={styles['modal-image-wrapper']}>
                <Image 
                  src={selectedMember.image}
                  alt={`Portrait of ${selectedMember.name}`}
                  width={250}
                  height={250}
                  className={styles['modal-image']}
                  objectFit="contain"
                />
              </div>
            </div>
            
            {/* Profile Information */}
            <div className={styles['modal-info']}>
              <div className={styles['info-section']}>
                <span className={styles['info-label']}>Name</span>
                <span className={styles['info-value']}>{selectedMember.name}</span>
              </div>
              
              <div className={styles['info-section']}>
                <span className={styles['info-label']}>Role</span>
                <span className={styles['info-value']}>{selectedMember.role}</span>
              </div>
              
              <div className={styles['info-section']}>
                <span className={styles['info-label']}>Course</span>
                <span className={styles['info-value']}>{selectedMember.course}</span>
              </div>
              
              <div className={styles['info-section']}>
                <span className={styles['info-label']}>Project Contribution</span>
                <p className={styles['info-paragraph']}>{selectedMember.contribution}</p>
              </div>
              
              {/* Social Links with Icons */}
              <div className={styles['social-links']}>
                <a 
                  href={selectedMember.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles['social-link']}
                >
                  <FaGithub className={styles['social-icon']} />
                  <span>GitHub Profile</span>
                </a>
                <a 
                  href={`mailto:${selectedMember.email}`}
                  className={styles['social-link']}
                >
                  <FaEnvelope className={styles['social-icon']} />
                  <span>Contact via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurTeam;
