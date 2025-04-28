import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Eye, Activity, AlertTriangle } from 'lucide-react';
import { handleAIConversation } from '@/utils/aiEngine';
import styles from '@/styles/landing-page/aiModal.module.css';

const AIModal = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([{
        id: 1,
        text: "👋 Hi! I'm Vision. Describe your eye symptoms and I'll analyze them.",
        sender: 'bot',
        type: 'welcome'
    }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const modalRef = useRef(null);

    // Center modal and handle scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                modalRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 50);
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            type: 'user'
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const aiResponse = await handleAIConversation(input, messages, setIsTyping);
            const botMessage = {
                id: Date.now() + 1,
                text: aiResponse.message,
                sender: 'bot',
                type: aiResponse.type || 'response',
                matches: aiResponse.matches || []
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Something went wrong. Please try again.",
                sender: 'bot',
                type: 'error'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderMessageContent = (message) => {
        if (message.matches && message.matches.length > 0) {
            return (
                <div>
                    <p>{message.text.split('\n')[0]}</p>
                    <div className={styles.percentageContainer}>
                        {message.matches.map((match, i) => (
                            <div key={i} className={styles.percentageBar}>
                                <div className={styles.percentageLabel}>
                                    <span>{match.name}</span>
                                    <span>{match.percentage}%</span>
                                </div>
                                <div 
                                    className={styles.percentageFill} 
                                    style={{
                                        width: `${match.percentage}%`,
                                        background: getPercentageColor(match.percentage)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {message.text.split('\n').slice(1).map((paragraph, i) => (
                        <p key={i} className={styles.messageParagraph}>{paragraph}</p>
                    ))}
                </div>
            );
        }
        return message.text.split('\n').map((paragraph, i) => (
            <p key={i} className={styles.messageParagraph}>{paragraph}</p>
        ));
    };

    const getPercentageColor = (percentage) => {
        if (percentage > 70) return 'linear-gradient(90deg, #FF4D4D, #F9CB28)';
        if (percentage > 40) return 'linear-gradient(90deg, #F9CB28, #1E90FF)';
        return 'linear-gradient(90deg, #1E90FF, #00BFFF)';
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} ref={modalRef}>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.animatedEyeIcon}>
                            <Eye size={24} />
                            <div className={styles.eyePulse} />
                        </div>
                        <h3 className={styles.headerTitle}>OptiScan AI</h3>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={24} />
                    </button>
                </div>
                
                <div className={styles.messagesContainer}>
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`${styles.message} ${
                                message.sender === 'user' 
                                    ? styles.userMessage 
                                    : styles.botMessage
                            } ${styles[message.type] || ''}`}
                        >
                            {renderMessageContent(message)}
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className={`${styles.message} ${styles.botMessage}`}>
                            <div className={styles.loadingIndicator}>
                                <Activity size={16} className={styles.loadingIcon} />
                                <span>Analyzing your symptoms...</span>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
                
                <div className={styles.inputArea}>
                    <form onSubmit={handleSubmit} className={styles.inputForm}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your eye symptoms..."
                            className={styles.inputField}
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            disabled={isTyping || !input.trim()}
                            className={styles.sendButton}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                    <p className={styles.disclaimer}>
                        <AlertTriangle size={14} className={styles.warningIcon} />
                        For informational purposes only. Not medical advice.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIModal;
