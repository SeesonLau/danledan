import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Home, MessageCircle, Info, Users, Mail } from 'lucide-react';
import Testimonials from "@/components/landing-page/testimonials";
import styles from '../styles/landing-page/index.module.css';
import AboutUs from '@/components/landing-page/aboutus';
import OurTeam from '@/components/landing-page/ourteam';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginModal from '@/components/login-modal';
import RegisterModal from '@/components/signup-modal';

const HomePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const handleRegisterClick = () => {
    setIsModalOpen('register'); // please change to sign up once the modal is constructed
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
    <div className={`${styles['home-page-container']} overflow-x-hidden`}> {/* Prevent horizontal overflow */}


      <header className={styles['home-page-header']}>
        <div className={styles['logo-section']}>
        <div className={styles.logo}></div>
          <h1 className={styles['logo-title']}>Opticare</h1> {/* Apply the logo title style */}
        </div>

        <nav className={styles['nav-links']}>
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={styles.link}>
            <span className={styles.icon}><Home className={styles.iconSvg} /></span>
            <span className={styles.text}>Home</span>
          </a>
          <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className={styles.link}>
            <span className={styles.icon}><MessageCircle className={styles.iconSvg} /></span>
            <span className={styles.text}>Testimonials</span>
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={styles.link}>
            <span className={styles.icon}><Info className={styles.iconSvg} /></span>
            <span className={styles.text}>About</span>
          </a>
          <a href="#team" onClick={(e) => scrollToSection(e, 'team')} className={styles.link}>
            <span className={styles.icon}><Users className={styles.iconSvg} /></span>
            <span className={styles.text}>Our Team</span>
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={styles.link}>
            <span className={styles.icon}><Mail className={styles.iconSvg} /></span>
            <span className={styles.text}>Contact</span>
          </a>
        </nav>


        {/* Buttons for larger screens */}
        <div className={styles['auth-buttons']}>
          <button className={styles['glass-button']} onClick={handleRegisterClick}>
            Register
          </button>
        </div>

        {/* Icons for smaller screens */}
        <div 
  className={styles['auth-icons']} 
  style={{ marginLeft: '-8px' }}  // Change 10px to your preferred value
>
  <FaSignInAlt
    className="text-white"
    style={{
      fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', 
      cursor: 'pointer',
    }}
    onClick={handleLoginClick}
  />
  <FaUserPlus
    className="text-white"
    style={{
      fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', 
      cursor: 'pointer',
    }}
    onClick={handleRegisterClick}
  />
</div>


      </header>

      {/* Hero Section */}
      <section id="home" className={styles['hero-section']}>
        <div className={styles['hero-overlay']}></div> 
        <div className={styles['hero-content']}>
        <h1 className="text-[clamp(1.5rem, 6vw, 3rem)] text-center">
          Your Path to a Clearer Vision, Starts Here.
        </h1>




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
        <RegisterModal isOpen={true} title="" onClose={handleCloseModal}> {/*change this to signup later on. the login modal is just a placeholder */}
          <div>
            <p>Create an account to unlock all features.</p>
            {/* Add register form here */}
          </div>
        </RegisterModal>
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
