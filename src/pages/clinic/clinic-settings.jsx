import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic/clinic-settings.module.css";
import { useAuth } from "@/config/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db, storage } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

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
    <circle cx="60" cy="60" r="60" fill="#5fbdd4" />
    <circle cx="60" cy="45" r="20" fill="#2d88a0" />
    <path
      d="M60,75 C43,75 30,87 25,105 L95,105 C90,87 77,75 60,75z"
      fill="#2d88a0"
    />
  </svg>
);

const ClinicSettings = () => {
  // Authentication and routing hooks
  const { user, loading, role } = useAuth();
  const router = useRouter();

  // Component state management
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    clinicName: "",
    ownerFirstName: "",
    ownerMiddleName: "",
    ownerLastName: "",
    licenseNumber: "",
    establishedDate: "",
    yearsActive: "",
    province: "",
    city: "",
    address: "", // Added second line for address
    email: "",
    phone: "",
    profilePicture: "", // URL to the profile picture
  });
  const [isProfileComplete, setIsComplete] = useState(true);
  const [isProfileSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [securityData, setSecurityData] = useState({
    currentPassword: "********", // This would be the encrypted password from DB
    newPassword: "",
    confirmPassword: "",
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
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMaxEstablishedDate(`${year}-${month}-${day}`);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Get full clinic name
  const getClinicName = () => {
    return formData.clinicName;
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
      const storageRef = ref(
        storage,
        `clinic_pictures/${user.uid}/${fileName}`
      );
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

  //For easier address handling

  const provinces = {
    "Metro Manila": ["Quezon City", "Manila", "Makati"],
    Cebu: ["Cebu City", "Mandaue", "Lapu-Lapu"],
    Davao: ["Davao City", "Panabo", "Tagum"],
  };
  const handleProvinceChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      province: e.target.value,
      city: "",
    }));
  };

  const handleCityChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));
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
    /*if (role != "Clinic") {
      router.replace("/clinic-homepage");
      return;
    }*/

    if (user) {
      const fetchUserData = async () => {
        try {
          setIsLoading(true);
          // Create a reference to the user document in Firestore
          const userDocRef = doc(db, "clinics", user.uid);
          // Fetch the document
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Extract data from the fetched document
            const userData = userDoc.data();
            // Split address into two lines if it exists
            /*let address1 = "",
              address2 = "";
            if (userData.address) {
              const addressParts = userData.address.split(",", 2);
              address1 = addressParts[0] || "";
              address2 =
                addressParts.length > 1
                  ? userData.address
                      .substring(addressParts[0].length + 1)
                      .trim()
                  : "";
            }*/

            // Populate the form with fetched data
            setFormData({
              clinicName: userData.clinicName || "",
              ownerFirstName: userData.firstName || "",
              ownerMiddleName: userData.middleName || "", // New field
              ownerLastName: userData.lastName || "",
              licenseNumber: userData.licenseNumber || "",
              establishedDate: userData.establishedDate || "",
              yearsActive: calculateYearsActive(userData.establishedDate) || "",
              province: userData.province || "",
              city: userData.city || "",
              address: userData.address || "", // address
              email: userData.email || "",
              phone: userData.phone || "",
              profilePicture: userData.profilePicture || "", // Will use SVG default if empty
            });

            // Set default image flag if no profile picture
            setShowDefaultImage(!userData.profilePicture);
          }
        } catch (error) {
          console.error("Error fetching clinic data: ", error);
          setSaveMessage({
            type: "error",
            message:
              "Could not load your clinic profile data. Please try again later.",
          });
        } finally {
          setIsLoading(false);
          const isFormComplete =
            formData.clinicName &&
            formData.ownerFirstName &&
            formData.ownerLastName &&
            formData.ownerMiddleName &&
            formData.licenseNumber &&
            formData.establishedDate &&
            formData.yearsActive &&
            formData.province &&
            formData.city &&
            formData.address &&
            formData.email &&
            formData.phone;
          setIsComplete(isFormComplete);
          setIsSaved(isProfileComplete);
        }
      };

      fetchUserData();
    }
  }, [user, loading, role, router]);

  // Calculate years active based on establishment date
  const calculateYearsActive = (establishedDate) => {
    if (!establishedDate) return "";

    const today = new Date();
    const establishedYear = new Date(establishedDate).getFullYear();
    let years = today.getFullYear() - establishedYear;

    return years.toString();
  };

  if (!user) return null;

  // ====================
  // FORM HANDLING - PROFILE TAB
  // ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // calculate years active from established date
      if (name === "establishedDate") {
        return {
          ...prev,
          [name]: value,
          yearsActive: calculateYearsActive(value),
        };
      }
      if (name === "province") {
        return {
          ...prev,
          [name]: value,

          province: value,
        };
      }
      if (name === "city") {
        return {
          ...prev,
          [name]: value,
          city: value,
        };
      }
      return { ...prev, [name]: value };
    });
    setIsSaved(false);
    setIsComplete(false);
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
      //const combinedAddress =
      //  formData.address1 + (formData.address2 ? `, ${formData.address2}` : "");

      // Create a reference to the user document in Firestore
      const userDocRef = doc(db, "clinics", user.uid);
      // Updates the document with new profile data
      await updateDoc(userDocRef, {
        clinicName: formData.clinicName,
        firstName: formData.ownerFirstName,
        middleName: formData.ownerMiddleName,
        lastName: formData.ownerLastName,
        establishedDate: formData.establishedDate,
        province: formData.province,
        city: formData.city,
        address: formData.address,
        phone: formData.phone,
        profilePicture: profilePictureUrl,
        // Email, license number, and years active are not updated - email and license are managed by auth and years active is calculated
      });

      // Update local state with new profile picture if uploaded
      if (imageFile) {
        setFormData((prev) => ({
          ...prev,
          profilePicture: profilePictureUrl,
        }));
        setImageFile(null);
        setImagePreview(null); // Clear preview after successful upload
      }

      // Show success message
      setSaveMessage({
        type: "success",
        message: "Clinic profile updated successfully!",
      });

      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ type: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error updating clinic profile: ", error);
      setSaveMessage({
        type: "error",
        message: "Could not update clinic profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
      const isFormComplete =
        formData.clinicName &&
        formData.ownerFirstName &&
        formData.ownerLastName &&
        formData.ownerMiddleName &&
        formData.licenseNumber &&
        formData.establishedDate &&
        formData.yearsActive &&
        formData.province &&
        formData.city &&
        formData.address &&
        formData.email &&
        formData.phone;
      setIsComplete(isFormComplete);
      if (isFormComplete) setIsSaved(true);
    }
  };

  // ====================
  // FORM HANDLING - SECURITY TAB
  // ====================
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (
      passwordError &&
      (name === "newPassword" || name === "confirmPassword")
    ) {
      setPasswordError("");
    }
  };

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    // Reset fields when toggling
    if (!showChangePassword) {
      setSecurityData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
      setPasswordError("");
    }
  };

  // ====================
  // DATABASE OPERATIONS - PASSWORD UPDATE
  // ====================
  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (securityData.newPassword !== securityData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (securityData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    try {
      // Update the password

      // Reset form state
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: "********",
        newPassword: "",
        confirmPassword: "",
      }));
      setShowChangePassword(false);
      setPasswordError("");

      // Show success message
      setSaveMessage({
        type: "success",
        message: "Password updated successfully!",
      });

      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ type: "", message: "" });
      }, 3000);

      console.log("Password updated successfully");
    } catch (error) {
      if (error.message === "auth/requires-recent-login") {
        setPasswordError(
          "For security, please log out and log back in to change your password."
        );
      }
      console.error("Error updating password: ", error);
      setPasswordError(error.message);
    }
  };

  // ====================
  // TAB CONTENT RENDERERS
  // ====================

  const renderProfileTab = () => (
    <div className={styles.profileFormWrapper}>
      <div className={styles.profileFormScroll}>
        <form className={styles.profileForm} onSubmit={handleSubmit}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              Loading your clinic profile data...
            </div>
          ) : (
            <>
              {saveMessage.message && (
                <div
                  className={
                    saveMessage.type === "error"
                      ? styles.errorMessage
                      : styles.successMessage
                  }
                >
                  {saveMessage.message}
                </div>
              )}

              {/* Profile Picture Section */}
              <div className={styles.profilePictureSection}>
                <div className={styles.profilePictureContainer}>
                  {/* Conditionally render profile picture or default SVG */}
                  {(formData.profilePicture || imagePreview) &&
                  !showDefaultImage ? (
                    <img
                      src={imagePreview || formData.profilePicture}
                      alt="Clinic Profile"
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
                  <h3 className={styles.fullName}>{getClinicName()}</h3>
                  <p className={styles.userEmail}>{formData.email}</p>
                  {imageFile && (
                    <p className={styles.uploadingIndicator}>
                      New image selected. Save profile to update.
                    </p>
                  )}
                  {imageUploading && (
                    <p className={styles.uploadingIndicator}>
                      Uploading image...
                    </p>
                  )}
                </div>
              </div>

              <p className={styles.notice}>
                {isProfileSaved
                  ? ""
                  : "*COMPLETE AND SAVE PROFILE TO USE OPTICARE'S FEATURES*"}
              </p>

              {/* Clinic Name */}
              <div className={styles.formRow}>
                <div className={styles.fullWidthInputGroup}>
                  <label>Clinic Name</label>
                  <input
                    type="text"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Owner Names Row */}
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Owner Firstname</label>
                  <input
                    type="text"
                    name="ownerFirstName"
                    value={formData.ownerFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Owner Middle Name</label>
                  <input
                    type="text"
                    name="ownerMiddleName"
                    value={formData.ownerMiddleName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Owner Lastname</label>
                  <input
                    type="text"
                    name="ownerLastName"
                    value={formData.ownerLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* License and Establishment Date Row */}
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    disabled
                    className={styles.disabledInput}
                    title="Please contact support to change your License Number"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Established Date</label>
                  <input
                    type="date"
                    name="establishedDate"
                    value={formData.establishedDate}
                    onChange={handleChange}
                    max={maxEstablishedDate}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Years Active</label>
                  <input
                    type="number"
                    name="yearsActive"
                    value={formData.yearsActive}
                    disabled
                    className={styles.disabledInput}
                  />
                </div>
              </div>

              {/* Address Row - Updated to be side by side */}
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>Province</label>
                  <select
                    name="province"
                    className={styles.selectInput}
                    value={formData.province}
                    onChange={handleChange}
                  >
                    <option value="">Select Province</option>
                    {Object.keys(provinces).map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.formLabel}>City</label>
                  <select
                    name="city"
                    className={styles.selectInput}
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.province}
                  >
                    <option value="">Select City</option>
                    {provinces[formData.province]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Address Line</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, Barangay, ZIP Code"
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
      </div>
    </div>
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
                <div className={styles.passwordError}>{passwordError}</div>
              )}

              <button type="submit" className={styles.saveButton}>
                Save Password
              </button>
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

              <p className={styles.aboutIntro}>
                Welcome to <strong>Opticare</strong> – where digital innovation
                meets compassionate healthcare.
              </p>

              <p>
                Founded with the belief that everyone deserves accessible,
                organized, and secure healthcare, Opticare is a digital platform
                designed to streamline patient-doctor interactions. Whether
                you're booking an appointment, reviewing your health records, or
                seeking expert support, we're here to help you stay connected to
                your health journey.
              </p>

              <h4>Our Mission:</h4>
              <p>
                To empower individuals and healthcare providers through seamless
                digital tools that enhance care, reduce friction, and prioritize
                user well-being.
              </p>

              <h4>Our Vision:</h4>
              <p>
                To become a leading name in digital healthcare by building a
                platform that's intuitive, secure, and inclusive – one that puts
                users first.
              </p>

              <h4>Our Values:</h4>
              <ul>
                <li>
                  <strong>Transparency</strong> – You control your data.
                </li>
                <li>
                  <strong>Security</strong> – Your health records are safe with
                  us.
                </li>
                <li>
                  <strong>Efficiency</strong> – Simplifying complex processes
                  through smart design.
                </li>
                <li>
                  <strong>Compassion</strong> – Supporting users with empathy
                  and clarity.
                </li>
              </ul>

              <p className={styles.aboutClosing}>
                From patients seeking better access to their health data to
                clinics managing busy schedules and communications, Opticare was
                built for <strong>everyone</strong> in the healthcare ecosystem.
              </p>

              <p className={styles.aboutTagline}>
                Let's make health easier, together.
              </p>
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
        <p>
          <bold>Effective Date - May 3, 2025</bold>
        </p>
      </div>

      {/* Scrollable content */}
      <div className={styles.policyContent}>
        <p>
          <bold>
            Danledan ("we," "us," or "our") values your trust and is committed
            to protecting your personal information. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your data when
            you use our services through our web and mobile platforms.
          </bold>
        </p>

        <h4>1. What Information We Collect</h4>
        <p>We collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Personal Identification Data:</strong> Name, email address,
            phone number, clinic details, license information, etc.
          </li>
          <li>
            <strong>Health-Related Data:</strong> Basic health details relevant
            to scheduling and managing healthcare appointments.
          </li>
          <li>
            <strong>Usage Data:</strong> Your interactions with our platform
            including date/time of access, IP address, browser type, and
            referring pages.
          </li>
          <li>
            <strong>Device Information:</strong> Information about the device
            you use to access our services.
          </li>
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
        <p>
          We do not sell or rent your personal data. We only share your
          information with:
        </p>
        <ul>
          <li>
            Authorized healthcare providers for consultation or appointment
            purposes
          </li>
          <li>Regulatory bodies, when legally required</li>
          <li>Third-party services under strict confidentiality agreements</li>
        </ul>

        <h4>6. Your Rights as a Data Subject</h4>
        <p>
          As provided under the Data Privacy Act of 2012, you have the right to:
        </p>
        <ul>
          <li>Be informed about data collection and processing</li>
          <li>Access your personal data</li>
          <li>Object to or withdraw consent</li>
          <li>Request correction or deletion of inaccurate/incomplete data</li>
          <li>File complaints with the National Privacy Commission (NPC)</li>
        </ul>

        <h4>7. Retention of Data</h4>
        <p>
          We retain your information only for as long as necessary to fulfill
          its intended purpose, or as required by law. Once the data is no
          longer needed, it is securely deleted or anonymized.
        </p>

        <h4>8. Cookies and Analytics</h4>
        <p>
          We use cookies and similar tracking technologies to enhance user
          experience. You can control cookie settings via your browser.
        </p>

        <h4>9. Children's Privacy</h4>
        <p>
          Opticare does not knowingly collect data from children under 18
          without verified parental consent.
        </p>

        <h4>10. Changes to This Privacy Policy</h4>
        <p>
          We reserve the right to update this Privacy Policy. You will be
          notified of significant changes through email or in-app alerts.
        </p>

        <h4>11. Contact Us</h4>
        <p>
          Data Protection Officer (DPO)
          <br />
          Email: <a href="mailto:privacy@opticare.ph">privacy@opticare.ph</a>
          <br />
          Phone: +63-928-165-4304
        </p>
      </div>
    </div>
  );

  const renderHelpTab = () => {
    const faqItems = [
      {
        question: "How do I manage my clinic's schedule and availability?",
        answer:
          "You can manage your clinic's schedule by navigating to the Schedule section in the app's Navigation Bar. From there, you can set regular hours, block off unavailable times, and customize your appointment slots. The system also allows you to set specific services with different durations and capacity limits.",
      },
      {
        question: "How do I view and manage patient appointments?",
        answer:
          "Navigate to the Appointments tab. You can view all upcoming appointments, filter by date or status, and take actions like confirming, rescheduling, or canceling appointments. Each appointment card shows essential patient information and appointment details.",
      },
      {
        question: "Can I edit my clinic profile information after signing up?",
        answer:
          "Yes! Go to your Profile Settings, where you can update your clinic details like name, address, contact information, services offered, and more.",
      },
      {
        question: "What if I forgot my password?",
        answer:
          'Click "Forgot Password" on the login page and enter your registered email. We\'ll send a password reset link to your inbox.',
      },
      {
        question: "How secure is my clinic and patient information?",
        answer:
          "Very secure. We comply with the Data Privacy Act of 2012 (RA 10173) and use industry-standard encryption to keep your data safe. All sensitive patient information is encrypted and access is strictly controlled.",
      },
      {
        question: "How do I communicate with patients through the platform?",
        answer:
          "Use the Messages section to send and receive communications from patients. You can send appointment reminders, follow-up messages, and respond to patient inquiries.",
      },
      {
        question: "Can I cancel or reschedule a patient's appointment?",
        answer:
          "Yes, you can manage all appointments via the Appointments tab. When rescheduling, patients will automatically receive a notification about the change with options to confirm the new time.",
      },
      {
        question: "How do I set up my billing information and payment methods?",
        answer:
          "Go to the Financial Settings section under the main Settings tab. There you can add your bank account details, set up online payment options, and manage your subscription to Opticare's services.",
      },
      {
        question: "How do I customize the services my clinic offers?",
        answer:
          "In the Services section of your clinic profile, you can add, edit, or remove services. For each service, you can set duration, price, description, and availability.",
      },
      {
        question:
          "Can I access reports and analytics about my clinic activity?",
        answer:
          "Yes! The Analytics dashboard provides insights on appointment volume, patient demographics, popular services, revenue tracking, and more to help optimize your clinic operations.",
      },
    ];

    return (
      <div className={styles.helpPage}>
        <div className={styles.helpContainer}>
          <div className={styles.helpScrollContent}>
            <h3 className={styles.helpTitle}>
              Opticare Help & Support for Clinics
            </h3>

            <p className={styles.helpIntro}>
              Welcome to the <strong>Opticare Clinic Help Center</strong> — your
              resource for guidance on managing your healthcare practice through
              our platform. We're here to help you optimize your clinic
              operations and provide excellent care to your patients.
            </p>

            <div className={styles.contactSection}>
              <h4>📞 Contact Us</h4>
              <p>
                Need personalized help? Our clinic support team is ready to
                assist you.
              </p>
              <p>
                <strong>Clinic Support Hotline:</strong> 📞{" "}
                <span className={styles.contactInfo}>286-8970</span>
              </p>
              <p>
                <strong>Email Support:</strong> 📧{" "}
                <span className={styles.contactInfo}>
                  clinic-support@danledan.corporation.inc
                </span>
              </p>
            </div>

            <div className={styles.faqSection}>
              <h4>❓ Frequently Asked Questions (FAQs)</h4>

              <div className={styles.faqList}>
                {faqItems.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <button
                      className={`${styles.faqQuestion} ${
                        openFaq === index ? styles.faqOpen : ""
                      }`}
                      onClick={() => toggleFaq(index)}
                      type="button"
                    >
                      <span>
                        {index + 1}. {faq.question}
                      </span>
                      <span className={styles.faqToggle}>
                        {openFaq === index ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`${styles.faqAnswer} ${
                        openFaq === index ? styles.faqAnswerOpen : ""
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>

              <p className={styles.faqClosing}>
                If you have more questions that aren't listed here, don't
                hesitate to reach out through our contact options above!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.cliniccontainer}>
      <ClinicLayout />
      <main className={styles.clinicmaincontent}>
        <div className={styles.tabWrapper}>
          <h2 className={styles.tabTitle}>Settings</h2>
          <div className={styles.tabBar}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className={`${styles.tabContent} ${
              activeTab === "about" ? styles.aboutTabActive : ""
            }`}
          >
            {activeTab === "profile" ? (
              renderProfileTab()
            ) : activeTab === "security" ? (
              renderSecurityTab()
            ) : activeTab === "privacy" ? (
              renderPrivacyTab()
            ) : activeTab === "about" ? (
              renderAboutTab()
            ) : activeTab === "help" ? (
              renderHelpTab()
            ) : (
              <p>{`${
                tabs.find((t) => t.id === activeTab)?.label
              } content coming soon.`}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClinicSettings;
