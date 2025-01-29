import React, { useState } from 'react';
import styles from '../../styles/landing-page/ourteam.module.css';
import Image from 'next/image';  // Import next/image
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const teamMembers = [
    { id: 1, name: "John Laurence G. Sison", role: "Project Manager", image: '/landing-page-iamge/yanfei.jpg' },
    { id: 2, name: "Charles Luis G. Gaid", role: "Project Specialist", image: '/landing-page-iamge/yanfei.jpg' },
    { id: 3, name: "Jamel P. Hadjirasul", role: "Project Developer", image: '/landing-page-iamge/hutao.jpg' },
    { id: 4, name: "Dawson P. Alegarbes", role: "Project Developer", image: '/landing-page-iamge/yanfei.jpg' },
    { id: 5, name: "Dan Vincent Y. Adlawan", role: "Project Designer", image: '/landing-page-iamge/hutao.jpg' },
    { id: 6, name: "Daniel M. Montesclaros", role: "Project Developer", image: '/landing-page-iamge/yanfei.jpg' },
];

const OurTeam = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCards = 3;

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
        );
    };

    const getVisibleTeam = () => {
        const endIndex = (startIndex + visibleCards) % teamMembers.length;
        if (startIndex < endIndex) {
            return teamMembers.slice(startIndex, endIndex);
        } else {
            return [...teamMembers.slice(startIndex), ...teamMembers.slice(0, endIndex)];
        }
    };

    return (
        <section id="team" className={styles['ourteam-section']}>
            <div className={styles['ourteam-overlay']}></div>
            <h2 className={styles['team-heading']}>Our Team</h2>
            <p className={styles['team-subheading']}>
                Meet the passionate team behind OptiCare, dedicated to revolutionizing eye care through innovation and technology!
            </p>

            <div className={styles['team-carousel']}>
                <button className={`${styles.arrow} ${styles['left-arrow']}`} onClick={handlePrev}>
                    <FaChevronLeft />
                </button>

                <div className={styles['team-cards-container']}>
                    {getVisibleTeam().map((member) => (
                        <div className={styles['team-card']} key={member.id}>
                            <div className={styles['team-image-wrapper']}>
                                {/* Use next/image for image optimization */}
                                <Image 
                                    src={member.image}  // Image path relative to the public folder
                                    alt={member.name}
                                    className={styles['team-image']}
                                    width={280}  // Set image width (next/image requires width and height)
                                    height={240} // Set image height
                                />
                            </div>
                            <div className={styles['team-info']}>
                                <div className={styles['team-role']}>{member.role}</div>
                                <div className={styles['team-name']}>{member.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className={`${styles.arrow} ${styles['right-arrow']}`} onClick={handleNext}>
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
};

export default OurTeam;
