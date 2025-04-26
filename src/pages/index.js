import dynamic from "next/dynamic";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Home, MessageCircle, Info, Users, Mail, Eye, Glasses, EyeOff } from "lucide-react";
import styles from "../styles/landing-page/index.module.css";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { auth } from "@/config/firebase";

const Testimonials = dynamic(() => import('@/components/landing-page/testimonials'));
const AboutUs = dynamic(() => import('@/components/landing-page/aboutus'));
const OurTeam = dynamic(() => import('@/components/landing-page/ourteam'));
const LoginModal = dynamic(() => import('@/components/login-modal'));
const RegisterModal = dynamic(() => import('@/components/signup-modal'));

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [eyes, setEyes] = useState([]);
  const router = useRouter();

  // Create floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Create floating eye elements
  useEffect(() => {
    const generateEyes = () => {
      const newEyes = [];
      for (let i = 0; i < 8; i++) {
        newEyes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 0.3 + 0.1,
          delay: Math.random() * 10,
          rotation: Math.random() * 360
        });
      }
      setEyes(newEyes);
    };

    generateEyes();
  }, []);

  const handleRegisterClick = () => {
    setIsModalOpen("register");
  };

  const handleLoginClick = () => {
    setIsModalOpen("login");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Animated gradient background
  const AnimatedBackground = () => {
    const [gradientPosition, setGradientPosition] = useState(0);

    useEffect(() => {
      const animate = () => {
        setGradientPosition(prev => (prev + 0.2) % 360);
        requestAnimationFrame(animate);
      };
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }, []);

    return (
      <div 
        className={styles.animatedBackground}
        style={{
          background: `linear-gradient(${gradientPosition}deg, 
            rgba(100, 149, 237, 0.8) 0%, 
            rgba(65, 105, 225, 0.8) 20%, 
            rgba(30, 144, 255, 0.8) 40%, 
            rgba(0, 191, 255, 0.8) 60%, 
            rgba(135, 206, 250, 0.8) 80%)`
        }}
      />
    );
  };

  return (
    <div className={`${styles["home-page-container"]} overflow-x-hidden`}>
      {/* Animated background elements */}
      <AnimatedBackground />
      
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `${styles.float} ${10 / particle.speed}s infinite ${particle.delay}s alternate ease-in-out`
            }}
          />
        ))}
      </div>
      
      {/* Floating eye elements */}
      <div className={styles.eyesContainer}>
        {eyes.map(eye => (
          <div
            key={eye.id}
            className={styles.eyeElement}
            style={{
              left: `${eye.x}%`,
              top: `${eye.y}%`,
              width: `${eye.size}px`,
              height: `${eye.size}px`,
              animation: `${styles.float} ${15 / eye.speed}s infinite ${eye.delay}s alternate ease-in-out`,
              transform: `rotate(${eye.rotation}deg)`
            }}
          >
            <Eye size={eye.size * 0.6} color="#ffffff" opacity={0.7} />
          </div>
        ))}
      </div>

      <header className={styles["home-page-header"]}>
        <div className={styles["logo-section"]}>
          <div className={styles.logo}>
            <Eye size={40} color="#ffffff" />
          </div>
          <h1 className={styles["logo-title"]}>Opticare</h1>
        </div>

        <nav className={styles["nav-links"]}>
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className={styles.link}
          >
            <span className={styles.icon}>
              <Home className={styles.iconSvg} />
            </span>
            <span className={styles.text}>Home</span>
          </a>
          <a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, "testimonials")}
            className={styles.link}
          >
            <span className={styles.icon}>
              <MessageCircle className={styles.iconSvg} />
            </span>
            <span className={styles.text}>Testimonials</span>
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            className={styles.link}
          >
            <span className={styles.icon}>
              <Info className={styles.iconSvg} />
            </span>
            <span className={styles.text}>About</span>
          </a>
          <a
            href="#team"
            onClick={(e) => scrollToSection(e, "team")}
            className={styles.link}
          >
            <span className={styles.icon}>
              <Users className={styles.iconSvg} />
            </span>
            <span className={styles.text}>Our Team</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className={styles.link}
          >
            <span className={styles.icon}>
              <Mail className={styles.iconSvg} />
            </span>
            <span className={styles.text}>Contact</span>
          </a>
        </nav>

        <div className={styles["auth-buttons"]}>
          <button
            className={styles["glass-button"]}
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>

        <div className={styles["auth-icons"]}>
          <FaSignInAlt
            className="text-white"
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)",
              cursor: "pointer",
            }}
            onClick={handleLoginClick}
          />
          <FaUserPlus
            className="text-white"
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)",
              cursor: "pointer",
            }}
            onClick={handleRegisterClick}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <h1 className={styles["hero-title"]}>
            <span className={styles["title-highlight"]}>Your Path to a</span>
            <br />
            <span className={styles["title-focus"]}>Clearer Vision</span>
            <br />
            <span className={styles["title-sub"]}>Starts Here.</span>
          </h1>

          <div className={styles["vision-test-animation"]}>
            <div className={styles["eye-chart"]}>
              <div className={styles["chart-line"]}>E</div>
              <div className={styles["chart-line"]}>F P</div>
              <div className={styles["chart-line"]}>T O Z</div>
              <div className={styles["chart-line"]}>L P E D</div>
              <div className={styles["chart-line"]}>P E C F D</div>
            </div>
            <div className={styles["focus-circle"]}></div>
          </div>

          <button className={styles["hero-button"]} onClick={handleLoginClick}>
            <Eye size={20} style={{ marginRight: '10px' }} />
            Log In
          </button>
        </div>
      </section>

      {/* Other sections remain the same */}
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="team">
        <OurTeam />
      </section>
      <section id="contact" className={styles["contact-section"]}>
        <div className={styles["contact-container"]}>
          <div className={styles["contact-left"]}>
            <div className={styles.cogo}>
              <Glasses size={80} color="#0077b6" />
            </div>
            <h3 className={styles["contact-phrase"]}>
              Your Path to a Clearer Vision, Starts Here.
            </h3>
          </div>
          <div className={styles["contact-right"]}>
            <h2>Contact Us</h2>
            <p>We are here to help! Reach out through any of these channels:</p>
            <ul>
              <li>
                <strong>Email:</strong> seeson@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +63 998 468 6969
              </li>
              <li>
                <strong>Address:</strong> Cebu City, Philippines
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modals */}
      {isModalOpen === "register" && (
        <RegisterModal
          isOpen={true}
          title=""
          onClose={handleCloseModal}
          onSwitch={handleLoginClick}
        />
      )}
      {isModalOpen === "login" && (
        <LoginModal
          isOpen={true}
          title="Login"
          onClose={handleCloseModal}
          onSwitch={handleRegisterClick}
        />
      )}
    </div>
  );
};
export default HomePage;
