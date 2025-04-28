import PatientLayout from "@/components/patient-layout";
import styles from "../../styles/patient/patient-settings.module.css";
import { useAuth } from "@/config/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, storage } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "about", label: "About" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "help", label: "Help" },
];

// Default profile SVG
const DefaultProfileSvg = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="#5fbdd4"/>
    <circle cx="60" cy="45" r="20" fill="#2d88a0"/>
    <path d="M60,75 C43,75 30,87 25,105 L95,105 C90,87 77,75 60,75z" fill="#2d88a0"/>
  </svg>
);

const PatientSettings = () => {
  // Authentication and routing hooks
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Component state management
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    birthdate: "",
    age: "",
    address1: "",
    address2: "", // Added second line for address
    email: "",
    phone: "",
    profilePicture: "" // URL to the profile picture
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [securityData, setSecurityData] = useState({
    currentPassword: "********", // This would be the encrypted password from DB
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  // Preview URL for immediate feedback
  const [imagePreview, setImagePreview] = useState(null);
  // Flag to show default profile image if needed
  const [showDefaultImage, setShowDefaultImage] = useState(false);
  // Maximum date for established date (today)
  const [maxEstablishedDate, setMaxEstablishedDate] = useState("");

  // Set the maximum date for established date picker (today's date)
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMaxEstablishedDate(`${year}-${month}-${day}`);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Get full name with middle initial
  const getFullName = () => {
    const middleInitial = formData.middleName ? `${formData.middleName.charAt(0)}. ` : "";
    return `${formData.firstName} ${middleInitial}${formData.lastName}`;
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setShowDefaultImage(false);
      
      // Create preview URL for immediate feedback
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image loading error
  const handleImageError = () => {
    setShowDefaultImage(true);
  };

  // Upload profile picture to Firebase Storage
  const uploadProfilePicture = async () => {
    if (!imageFile) return null;
    
    try {
      setImageUploading(true);
      // Create a unique file name with timestamp to avoid cache issues
      const timestamp = new Date().getTime();
      const fileName = `${user.uid}_${timestamp}_${imageFile.name}`;
      const storageRef = ref(storage, `profile_pictures/${user.uid}/${fileName}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      setImageUploading(false);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading profile picture: ", error);
      setImageUploading(false);
      return null;
    }
  };

  // ====================
  // DATABASE OPERATIONS - USER DATA FETCHING
  // ====================
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.replace("/");
      return;
    }

    if (user) {
      const fetchUserData = async () => {
        try {
          setIsLoading(true);
          // Create a reference to the user document in Firestore
          const userDocRef = doc(db, "patients", user.uid);
          // Fetch the document
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            // Extract data from the fetched document
            const userData = userDoc.data();
            // Split address into two lines if it exists
            let address1 = "", address2 = "";
            if (userData.address) {
              const addressParts = userData.address.split(',', 2);
              address1 = addressParts[0] || "";
              address2 = addressParts.length > 1 ? userData.address.substring(addressParts[0].length + 1).trim() : "";
            }
            
            // Populate the form with fetched data
            setFormData({
              firstName: userData.firstName || "",
              middleName: userData.middleName || "", // New field
              lastName: userData.lastName || "",
              sex: userData.sex || "",
              birthdate: userData.birthdate || "",
              age: calculateAge(userData.birthdate) || "",
              address1: address1,
              address2: address2,
              email: userData.email || "",
              phone: userData.phone || "",
              profilePicture: userData.profilePicture || "" // Will use SVG default if empty
            });
            
            // Set default image flag if no profile picture
            setShowDefaultImage(!userData.profilePicture);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setSaveMessage({ 
            type: "error", 
            message: "Could not load your profile data. Please try again later." 
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user, loading, router]);

  // Calculate age based on birthdate
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";
    
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  if (!user) return null;

  // ====================
  // FORM HANDLING - PROFILE TAB
  // ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // calculate age from bday
      if (name === "birthdate") {
        return { 
          ...prev, 
          [name]: value,
          age: calculateAge(value)
        };
      }
      return { ...prev, [name]: value };
    });
  };

  // ====================
  // DATABASE OPERATIONS - PROFILE UPDATE
  // ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ type: "", message: "" });

    try {
      // If there's a new profile picture, upload it first
      let profilePictureUrl = formData.profilePicture;
      if (imageFile) {
        const uploadedUrl = await uploadProfilePicture();
        if (uploadedUrl) profilePictureUrl = uploadedUrl;
      }

      // Combine address lines for storage
      const combinedAddress = formData.address1 + (formData.address2 ? `, ${formData.address2}` : "");

      // Create a reference to the user document in Firestore
      const userDocRef = doc(db, "patients", user.uid);
      // Updates the document with new profile data
      await updateDoc(userDocRef, {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        sex: formData.sex,
        birthdate: formData.birthdate,
        address: combinedAddress,
        phone: formData.phone,
        profilePicture: profilePictureUrl
        // Email and age are not updated - email is managed by auth and age is calculated
      });

      // Update local state with new profile picture if uploaded
      if (imageFile) {
        setFormData(prev => ({
          ...prev,
          profilePicture: profilePictureUrl
        }));
        setImageFile(null);
        setImagePreview(null); // Clear preview after successful upload
      }

      // Show success message
      setSaveMessage({ 
        type: "success", 
        message: "Profile updated successfully!" 
      });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ type: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error updating profile: ", error);
      setSaveMessage({ 
        type: "error", 
        message: "Could not update profile. Please try again." 
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ====================
  // FORM HANDLING - SECURITY TAB
  // ====================
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (passwordError && (name === "newPassword" || name === "confirmPassword")) {
      setPasswordError("");
    }
  };

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    // Reset fields when toggling
    if (!showChangePassword) {
      setSecurityData(prev => ({
        ...prev,
        newPassword: "",
        confirmPassword: ""
      }));
      setPasswordError("");
    }
  };

  // ====================
  // DATABASE OPERATIONS - PASSWORD UPDATE
  // ====================
  const handleSavePassword = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (securityData.newPassword !== securityData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Validate password length
    if (securityData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    // NOTE: This is just a placeholder for actual password update logic
    
    console.log("Password updated successfully");
    
    // Reset form and close dropdown
    setSecurityData(prev => ({
      ...prev,
      currentPassword: "********", // This would be the new encrypted password
      newPassword: "",
      confirmPassword: ""
    }));
    setShowChangePassword(false);
    setPasswordError("");
  };

  // ====================
  // TAB CONTENT RENDERERS
  // ====================

  const renderProfileTab = () => (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>Loading your profile data...</div>
      ) : (
        <>
          {saveMessage.message && (
            <div className={saveMessage.type === "error" ? styles.errorMessage : styles.successMessage}>
              {saveMessage.message}
            </div>
          )}
          
          {/* Profile Picture Section */}
          <div className={styles.profilePictureSection}>
            <div className={styles.profilePictureContainer}>
              {/* Conditionally render profile picture or default SVG */}
              {(formData.profilePicture || imagePreview) && !showDefaultImage ? (
                <img 
                  src={imagePreview || formData.profilePicture} 
                  alt="Profile" 
                  className={styles.profilePicture}
                  onError={handleImageError}
                />
              ) : (
                <DefaultProfileSvg />
              )}
              <div className={styles.profilePictureOverlay}>
                <label className={styles.uploadPictureLabel}>
                  Upload
                  <input 
                    type="file" 
                    accept="image/*" 
                    className={styles.uploadPictureInput} 
                    onChange={handleProfilePictureChange} 
                  />
                </label>
              </div>
            </div>
            <div className={styles.userInfoContainer}>
              <h3 className={styles.fullName}>{getFullName()}</h3>
              <p className={styles.userEmail}>{formData.email}</p>
              {imageFile && <p className={styles.uploadingIndicator}>New image selected. Save profile to update.</p>}
              {imageUploading && <p className={styles.uploadingIndicator}>Uploading image...</p>}
            </div>
          </div>
          
          {/* Names Row */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Firstname</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Middle Name</label>
              <input 
                type="text" 
                name="middleName" 
                value={formData.middleName} 
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Lastname</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          {/* Gender and Birthdate Row */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Sex</label>
              <select 
                name="sex" 
                value={formData.sex} 
                onChange={handleChange}
                required
                className={styles.selectInput}
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Birthdate</label>
              <input 
                type="date" 
                name="birthdate" 
                value={formData.birthdate} 
                onChange={handleChange}
                max={maxEstablishedDate}
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                disabled
                className={styles.disabledInput}
              />
            </div>
          </div>
          
          {/* Address Row - Updated to be side by side */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Address Line 1</label>
              <input 
                type="text" 
                name="address1" 
                value={formData.address1} 
                onChange={handleChange} 
                placeholder="Street, Building Number"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Address Line 2</label>
              <input 
                type="text" 
                name="address2" 
                value={formData.address2} 
                onChange={handleChange} 
                placeholder="City, State, ZIP Code"
              />
            </div>
          </div>
          
          {/* Contact Information Row */}
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                disabled
                className={styles.disabledInput}
                title="Please contact support to change your email address"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
        </>
      )}
    </form>
  );

  const renderSecurityTab = () => (
    <form className={styles.securityForm} onSubmit={handleSavePassword}>
      <div className={styles.securityHeader}>
        <h3>Account Security</h3>
        <p>Manage your password and account security settings</p>
      </div>
      
      <div className={styles.securitySection}>
        <div className={styles.passwordField}>
          <div className={styles.passwordHeader}>
            <div>
              <h4>Password</h4>
              <p>Your account password is encrypted for security</p>
            </div>
            <button 
              type="button" 
              className={styles.changePasswordBtn}
              onClick={toggleChangePassword}
            >
              {showChangePassword ? "Cancel" : "Change Password"}
            </button>
          </div>
          
          <div className={styles.currentPasswordDisplay}>
            <label>Current Password</label>
            <input 
              type="password" 
              value={securityData.currentPassword} 
              disabled 
              className={styles.disabledInput}
            />
          </div>
          
          {showChangePassword && (
            <div className={styles.changePasswordSection}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>New Password</label>
                  <input 
                    type="password" 
                    name="newPassword" 
                    value={securityData.newPassword} 
                    onChange={handleSecurityChange}
                    placeholder="Enter new password"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={securityData.confirmPassword} 
                    onChange={handleSecurityChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              {passwordError && (
                <div className={styles.passwordError}>
                  {passwordError}
                </div>
              )}
              
              <button type="submit" className={styles.saveButton}>Save Password</button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.securityTips}>
        <h4>Security Tips</h4>
        <ul>
          <li>Use a strong password with at least 8 characters</li>
          <li>Include numbers, uppercase letters, and special characters</li>
          <li>Avoid using the same password for multiple accounts</li>
          <li>Update your password regularly for enhanced security</li>
        </ul>
      </div>
    </form>
  );

  const renderAboutTab = () => (
    <div className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        {/* Content section with scroll */}
        <div className={styles.aboutTextContent}>
          <div className={styles.aboutScrollContent}>
            <div className={styles.aboutScrollInner}>
              <h3 className={styles.aboutTitle}>About Us – Opticare</h3>
              
              <p className={styles.aboutIntro}>Welcome to <strong>Opticare</strong> – where digital innovation meets compassionate healthcare.</p>
              
              <p>Founded with the belief that everyone deserves accessible, organized, and secure healthcare, Opticare is a digital platform designed to streamline patient-doctor interactions. Whether you're booking an appointment, reviewing your health records, or seeking expert support, we're here to help you stay connected to your health journey.</p>
              
              <h4>Our Mission:</h4>
              <p>To empower individuals and healthcare providers through seamless digital tools that enhance care, reduce friction, and prioritize user well-being.</p>
              
              <h4>Our Vision:</h4>
              <p>To become a leading name in digital healthcare by building a platform that's intuitive, secure, and inclusive – one that puts users first.</p>
              
              <h4>Our Values:</h4>
              <ul>
                <li><strong>Transparency</strong> – You control your data.</li>
                <li><strong>Security</strong> – Your health records are safe with us.</li>
                <li><strong>Efficiency</strong> – Simplifying complex processes through smart design.</li>
                <li><strong>Compassion</strong> – Supporting users with empathy and clarity.</li>
              </ul>
              
              <p className={styles.aboutClosing}>From patients seeking better access to their health data to clinics managing busy schedules and communications, Opticare was built for <strong>everyone</strong> in the healthcare ecosystem.</p>
              
              <p className={styles.aboutTagline}>Let's make health easier, together.</p>
            </div>
          </div>
        </div>
        
        {/* Image section - full height on right side - removed caption */}
        <div className={styles.aboutImageSection}>
          <div className={styles.imageContainer}>
            <div className={styles.imageOverlay}></div>
            <img 
              src="/landing-page-iamge/opthalmologist.jpg" 
              alt="Opticare Healthcare Platform" 
              className={styles.aboutImage}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className={styles.privacyPolicy}>
      {/* Title section */}
      <div className={styles.policyHeader}>
        <h3>Danledan Privacy Policy</h3>
        <p><bold>Effective Date - May 3, 2025</bold></p>
      </div>
      
      {/* Scrollable content */}
      <div className={styles.policyContent}>
        <p><bold>Danledan ("we," "us," or "our") values your trust and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our services through our web and mobile platforms.</bold></p>

        <h4>1. What Information We Collect</h4>
        <p>We collect the following categories of information:</p>
        <ul>
          <li><strong>Personal Identification Data:</strong> Name, email address, phone number, birthdate, sex, etc.</li>
          <li><strong>Health-Related Data:</strong> Basic health details relevant to scheduling and managing healthcare appointments.</li>
          <li><strong>Usage Data:</strong> Your interactions with our platform including date/time of access, IP address, browser type, and referring pages.</li>
          <li><strong>Device Information:</strong> Information about the device you use to access our services.</li>
        </ul>
        
        {/* Rest of privacy policy content remains the same */}
        <h4>2. How We Use Your Information</h4>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and manage your access to the Opticare platform</li>
          <li>Match you with relevant healthcare professionals or services</li>
          <li>Personalize your user experience</li>
          <li>Improve our services based on usage data and feedback</li>
          <li>Ensure compliance with legal obligations</li>
        </ul>

        <h4>3. Legal Basis for Processing</h4>
        <p>We process your information in accordance with:</p>
        <ul>
          <li>Republic Act No. 10173 – Data Privacy Act of 2012</li>
          <li>Republic Act No. 8792 – E-Commerce Act of 2000</li>
          <li>Republic Act No. 11223 – Universal Health Care Act</li>
          <li>Any other applicable Philippine health and data laws</li>
        </ul>

        <h4>4. How We Protect Your Information</h4>
        <ul>
          <li>Encrypted databases and secure servers</li>
          <li>Limited access to personal data</li>
          <li>Regular system monitoring for vulnerabilities</li>
        </ul>

        <h4>5. Sharing and Disclosure</h4>
        <p>We do not sell or rent your personal data. We only share your information with:</p>
        <ul>
          <li>Authorized healthcare providers for consultation or appointment purposes</li>
          <li>Regulatory bodies, when legally required</li>
          <li>Third-party services under strict confidentiality agreements</li>
        </ul>

        <h4>6. Your Rights as a Data Subject</h4>
        <p>As provided under the Data Privacy Act of 2012, you have the right to:</p>
        <ul>
          <li>Be informed about data collection and processing</li>
          <li>Access your personal data</li>
          <li>Object to or withdraw consent</li>
          <li>Request correction or deletion of inaccurate/incomplete data</li>
          <li>File complaints with the National Privacy Commission (NPC)</li>
        </ul>

        <h4>7. Retention of Data</h4>
        <p>We retain your information only for as long as necessary to fulfill its intended purpose, or as required by law. Once the data is no longer needed, it is securely deleted or anonymized.</p>

        <h4>8. Cookies and Analytics</h4>
        <p>We use cookies and similar tracking technologies to enhance user experience. You can control cookie settings via your browser.</p>

        <h4>9. Children's Privacy</h4>
        <p>Opticare does not knowingly collect data from children under 18 without verified parental consent.</p>

        <h4>10. Changes to This Privacy Policy</h4>
        <p>We reserve the right to update this Privacy Policy. You will be notified of significant changes through email or in-app alerts.</p>

        <h4>11. Contact Us</h4>
        <p>
          Data Protection Officer (DPO)<br />
          Email: <a href="mailto:privacy@opticare.ph">privacy@opticare.ph</a><br />
          Phone: +63-928-165-4304
        </p>
      </div>
    </div>
  );

  const renderHelpTab = () => {
    const faqItems = [
      {
        question: "Where and How do I upload my Electronic Health Records (EHR)?",
        answer: "You can upload your Electronic Health Records (EHR) by navigating to the EHR section in the app's Navigation Bar. Simply tap the Upload button, select the files from your device, and confirm the upload. Make sure your documents are in an accepted format (e.g. PDF). If you encounter any issues, please refer to the Help Center or contact our support team for assistance."
      },
      {
        question: "How do I book an appointment with a healthcare professional?",
        answer: "Navigate to the Appointments tab. Use the filters to search by specialization, location, or availability. Once you find a match, click Book Now and choose your preferred date and time."
      },
      {
        question: "Can I edit my profile information after signing up?",
        answer: "Yes! Go to your Profile Settings, where you can update your personal details like name, contact number, email, address, and more."
      },
      {
        question: "What if I forgot my password?",
        answer: "Click \"Forgot Password\" on the login page and enter your registered email. We'll send a password reset link to your inbox."
      },
      {
        question: "Is my personal and health information safe with Opticare?",
        answer: "Absolutely. We comply with the Data Privacy Act of 2012 (RA 10173) and use industry-standard encryption to keep your data safe and secure. You can read more in our Privacy Policy."
      },
      {
        question: "How do I contact my assigned healthcare provider or mentor?",
        answer: "Once you've booked a session, go to the Appointments tab and select the session to view contact or chat options."
      },
      {
        question: "Can I cancel or reschedule an appointment?",
        answer: "Yes, appointments can be canceled or rescheduled via the Appointments tab. Please cancel at least 24 hours in advance to avoid penalties."
      },
      {
        question: "Do I need to pay for using Opticare?",
        answer: "Creating an account is free. However, consultation fees depend on the provider's rates. These are clearly displayed before you confirm a booking."
      },
      {
        question: "Does Opticare support multiple languages?",
        answer: "Currently, Opticare is available in English and Filipino. We are working on adding more languages in future updates."
      },
      {
        question: "Can I access Opticare on mobile and desktop?",
        answer: "Yes! Opticare is accessible through any modern browser and is also available on Android/iOS through the official Opticare app."
      }
    ];

    return (
      <div className={styles.helpPage}>
        <div className={styles.helpContainer}>
          <div className={styles.helpScrollContent}>
            <h3 className={styles.helpTitle}>Opticare Help & Support</h3>
            
            <p className={styles.helpIntro}>Welcome to the <strong>Opticare Help Center</strong> — your go-to resource for guidance and assistance on using our platform. Whether you're a first-time user or a returning patient, we're here to help you navigate your healthcare journey with ease.</p>
            
            <div className={styles.contactSection}>
              <h4>📞 Contact Us</h4>
              <p>Need personalized help? Our support team is ready to assist you.</p>
              <p><strong>Customer Support Hotline:</strong> 📞 <span className={styles.contactInfo}>286-8970</span></p>
              <p><strong>Email Support:</strong> 📧 <span className={styles.contactInfo}>danledan@corporation.inc</span></p>
            </div>
            
            <div className={styles.faqSection}>
              <h4>❓ Frequently Asked Questions (FAQs)</h4>
              
              <div className={styles.faqList}>
                {faqItems.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <button 
                      className={`${styles.faqQuestion} ${openFaq === index ? styles.faqOpen : ''}`}
                      onClick={() => toggleFaq(index)}
                      type="button"
                    >
                      <span>{index + 1}. {faq.question}</span>
                      <span className={styles.faqToggle}>{openFaq === index ? '−' : '+'}</span>
                    </button>
                    
                    <div className={`${styles.faqAnswer} ${openFaq === index ? styles.faqAnswerOpen : ''}`}>
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
              
              <p className={styles.faqClosing}>If you have more questions that aren't listed here, don't hesitate to reach out through our contact options above!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.patientcontainer}>
      <PatientLayout />
      <main className={styles.patientmaincontent}>
        <div className={styles.tabWrapper}>
          <h2 className={styles.tabTitle}>Settings</h2>
          <div className={styles.tabBar}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={`${styles.tabContent} ${activeTab === "about" ? styles.aboutTabActive : ""}`}>
            {activeTab === "profile" ? renderProfileTab() 
            : activeTab === "security" ? renderSecurityTab()
            : activeTab === "privacy" ? renderPrivacyTab() 
            : activeTab === "about" ? renderAboutTab()
            : activeTab === "help" ? renderHelpTab()
            : <p>{`${tabs.find(t => t.id === activeTab)?.label} content coming soon.`}</p>
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientSettings;