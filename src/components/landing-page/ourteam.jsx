import React, { useState, useEffect } from 'react';
import styles from '../../styles/landing-page/ourteam.module.css';
import Image from 'next/image';
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
    const [visibleCards, setVisibleCards] = useState(3);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
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

        // Auto-rotate on desktop
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

    return (
        <section id="team" className={styles['ourteam-section']}>
            <div className={styles['ourteam-overlay']}></div>
            <div className={styles['team-content']}>
                <h2 className={styles['team-heading']}>Our <span className={styles.highlight}>Team</span></h2>
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
                                    <div className={styles['team-card']} key={member.id}>
                                        <div className={styles['team-image-wrapper']}>
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
        </section>
    );
};

export default OurTeam;
