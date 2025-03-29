import React from 'react';
import styles from "../../styles/landing-page/aboutus.module.css";
import Image from 'next/image';

const AboutUs = () => {
    return (
      <section id="about" className={styles['aboutus-section']}>
        <div className={styles['aboutus-overlay']}></div>
        <div className={styles['aboutus-content-container']}>
          {/* About Us Text */}
          <div className={styles['aboutus-content']}>
            <h2>About Us</h2>
            <p>
              By digitizing and integrating key processes such as patient record
              management, diagnosis, and appointment scheduling, OptiCare streamlines
              the workflow for optometrists, allowing for seamless management of
              patient information, prescription tracking, and treatment planning.
              This system automates routine administrative tasks, reduces operational
              burdens, and ensures that optometrists can focus more on delivering
              high-quality care. Ultimately, OptiCare improves the practice's
              operational efficiency and the overall patient experience.
            </p>
          </div>
  
          {/* About Us Image */}
          <div className={styles['about-us-image']}>
            {/* Use next/image for image optimization */}
            <Image 
              src="/landing-page-iamge/opticareLogo.png"  // Image path relative to the public folder
              alt="OptiCare Logo"
              width={500}  // Set image width
              height={500} // Set image height
              className={styles['about-us-image-img']} // Optional: If you want to add a class for further styling
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  