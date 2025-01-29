import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from "../../styles/landing-page/testimonials.module.css";

const testimonials = [
    {
      id: 1,
      text: `"OptiCare has made managing my eye health so much easier. I can book appointments, check my prescriptions, and access my health records all in one place. It's truly a game-changer for busy individuals like me!"`,
      name: 'John Augustine L. Lapinig.',
      role: 'Patient',
      image: '/landing-page-iamge/lapinig.jpg'
    },
    {
      id: 2,
      text: `"As a practice manager, I can confidently say that Opticare has streamlined our workflow and improved overall efficiency. The real-time tracking and reporting features give us valuable insights into our operations, allowing us to make data-driven decisions. I highly recommend Opticare to any healthcare provider looking to enhance their practice management."`,
      name: 'HuTao.',
      role: 'Practice Manager',
      image: '/landing-page-iamge/hutao.jpg'
    },
    {
      id: 3,
      text: `"Opticare has completely transformed how we manage our patient data and appointments. The intuitive interface and seamless integration with our existing systems have saved us hours each week. Our team can now focus more on patient care and less on administrative tasks. It's a game-changer for any healthcare practice!"`,
      name: 'Yanfei.',
      role: 'Clinic Director',
      image: '/landing-page-iamge/yanfei.jpg'
    },
    {
      id: 4,
      text: `"The OptiCare platform streamlined my clinic's operations. It's easier than ever to manage appointments and communicate with patients. Highly recommend it for healthcare professionals!"`,
      name: 'Laureano Gabrillo.',
      role: 'Clinic Manager',
      image: '/landing-page-iamge/sison1.jpg'
    },
  ];
  
  const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
    const handleNext = () => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    };
  
    const handlePrev = () => {
      setCurrentTestimonial(
        (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
      );
    };
  
    const { text, name, role, image } = testimonials[currentTestimonial];
  
    return (
        <section id="testimonials" className={styles.testimonials}>
            <div className={styles['testimonials-overlay']}></div>
            <div className={styles['testimonials-header']}>
                <h2 className={styles['testimonials-title']}>Testimonials</h2>
                <p className={styles['testimonials-subtitle']}>
                Here’s what our users are saying about their experience with OptiCare!
                </p>
            </div>
            
            <div className={styles['testimonial-container']}>
                {/* Left Arrow Button */}
                <FaChevronLeft
                size={30}
                onClick={handlePrev}
                className={`${styles['nav-arrow']} ${styles['left-arrow']}`}
                />
                {/* Testimonial Card */}
                <div className={styles['testimonial-card']}>
                    <div className={styles['testimonial-content']}>
                        <div className={styles['testimonial-image']}>
                        <img src={image} alt="Testimonial User" />
                        </div>
                        <div className={styles['testimonial-text']}>
                        <p className={styles['testimonial-quote']}>{text}</p>
                        <h4 className={styles['testimonial-author']}>
                            {name}, {role}
                        </h4>
                        </div>
                    </div>
                </div>
                {/* Right Arrow Button */}
                <FaChevronRight
                size={30}
                onClick={handleNext}
                className={`${styles['nav-arrow']} ${styles['right-arrow']}`}
                />
            </div>
            </section>
      );
    };
  
  export default Testimonials;
  