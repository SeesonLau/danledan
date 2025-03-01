import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Testimonials from "@/components/landing-page/testimonials";
import styles from '../styles/landing-page/index.module.css';
import AboutUs from '@/components/landing-page/aboutus';
import OurTeam from '@/components/landing-page/ourteam';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginModal from '@/components/login-modal';

const HomePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const handleRegisterClick = () => {
    setIsModalOpen('login'); // please change to sign up once the modal is constructed
  };

  const handleLoginClick = () => {
    setIsModalOpen('login');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // scrolling effect
  const scrollToSection = (e, sectionId) => {
    e.preventDefault(); 
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles['home-page-container']}> {/* Apply styles from the CSS module */}

      <header className={styles['home-page-header']}>
        <div className={styles['logo-section']}>
        <div className={styles.logo}></div>
          <h1 className={styles['logo-title']}>Opticare</h1> {/* Apply the logo title style */}
        </div>

        <nav className={styles['nav-links']}>
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
            Home
          </a>
          <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>
            Testimonials
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>
            About
          </a>
          <a href="#team" onClick={(e) => scrollToSection(e, 'team')}>
            Our Team
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
            Contact
          </a>
        </nav>

        {/* Buttons for larger screens */}
        <div className={styles['auth-buttons']}>
          <button className={styles['glass-button']} onClick={handleRegisterClick}>
            Register
          </button>
        </div>

        {/* Icons for smaller screens */}
        <div className={styles['auth-icons']}>
          <FaSignInAlt
            size={24}
            color="white"
            onClick={handleLoginClick} // Login icon
            style={{ cursor: 'pointer' }}
          />
          <FaUserPlus
            size={24}
            color="white"
            onClick={handleRegisterClick} // Register icon
            style={{ cursor: 'pointer' }}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles['hero-section']}>
        <div className={styles['hero-overlay']}></div> {/* Apply the hero overlay style */}
        <div className={styles['hero-content']}>
          <h1>Your Path to a Clearer Vision, Starts Here.</h1>

          <button className={styles['hero-button']} onClick={handleLoginClick}>
            Log In
          </button>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutUs />
      </section>

      {/* Our Team Section */}
      <section id="team">
        <OurTeam />
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles['contact-section']}>
        <div className={styles['contact-container']}>
          {/* Left Side: Logo and Phrase */}
          <div className={styles['contact-left']}>
          <div className={styles.cogo}></div>
            <h3 className={styles['contact-phrase']}>Your Path to a Clearer Vision, Starts Here.</h3>
          </div>

          {/* Right Side: Contact Information */}
          <div className={styles['contact-right']}>
            <h2>Contact Us</h2>
            <p>We’re here to help! Reach out through any of these channels:</p>
            <ul>
              <li><strong>Email:</strong> seeson@gmail.com</li>
              <li><strong>Phone:</strong> +63 998 468 6969</li>
              <li><strong>Address:</strong> Cebu City, Philippines</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modals */}
      {isModalOpen === 'register' && (
        <LoginModal isOpen={true} title="" onClose={handleCloseModal}> {/*change this to signup later on. the login modal is just a placeholder */}
          <div>
            <p>Create an account to unlock all features.</p>
            {/* Add register form here */}
          </div>
        </LoginModal>
      )}
      {isModalOpen === 'login' && (
        <LoginModal isOpen={true} title="Login" onClose={handleCloseModal}>
          <div>
            <p>Log in to manage your appointments and consult with clinics.</p>
            {/* Add login form here */}
          </div>
        </LoginModal>
      )}
      
    </div>
  );
};
export default HomePage;
