import React, { useState } from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "../styles/signup-modal.module.css";
import { registerWithEmail } from "@/config/firebase";

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    licenseNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("Patient");
  const router = useRouter();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const requiredFields =
      userType === "Patient"
        ? ["firstName", "lastName", "email", "password"]
        : ["firstName", "lastName", "licenseNumber", "email", "password"];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      alert("Please fill in all required fields");
      return;
    }

    const result = await registerWithEmail(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
      userType,
      userType === "Clinic" ? formData.licenseNumber : undefined // Pass licenseNumber only for clinics
    );

    if (result.success) {
      const route =
        userType === "Patient" ? "/patient-homepage" : "/clinic-homepage";
      router.push(route);
    } else {
      alert(result.message);
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={`${styles["modal-content"]} ${
          userType === "Clinic" ? styles.clinic : ""
        }`}
      >
        <button className={styles["close-button"]} onClick={onClose}>
          <CloseIcon />
        </button>

        <div className={styles["logo-container"]}>
          <img
            src="/landing-page-iamge/opticare-logo2.png"
            alt="Opticare Logo"
            className={styles["logo-image"]}
          />
        </div>

        <div className={styles["user-type-container"]}>
          <button
            className={`${styles["user-type-button"]} ${
              userType === "Patient" ? styles.active : ""
            }`}
            onClick={() => setUserType("Patient")}
          >
            Patient
          </button>
          <button
            className={`${styles["user-type-button"]} ${
              userType === "Clinic" ? styles.active : ""
            }`}
            onClick={() => setUserType("Clinic")}
          >
            Clinic
          </button>
        </div>

        <div className={styles["name-container"]}>
          <div className={styles["input-container-half"]}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Firstname"
              className={styles["input-field"]}
            />
          </div>
          <div className={styles["input-container-half"]}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Lastname"
              className={styles["input-field"]}
            />
          </div>
        </div>

        {userType === "Clinic" && (
          <div className={styles["input-container"]}>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder="License Number"
              className={styles["input-field"]}
            />
          </div>
        )}

        <div className={styles["input-container"]}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={styles["input-field"]}
          />
        </div>

        <div className={styles["password-container"]}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={styles["input-field"]}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className={styles["toggle-password"]}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        <button className={styles["SignUp-button"]} onClick={handleSignUp}>
          Sign Up
        </button>

        <div className={styles["divider"]}>
          <div className={styles["divider-line"]} />
          <span className={styles["divider-text"]}>or</span>
          <div className={styles["divider-line"]} />
        </div>

        <button
          className={styles["google-button"]}
          onClick={handleGoogleSignUp}
        >
          <img
            src="/landing-page-iamge/google-icon.png"
            alt="Google"
            className={styles["google-icon"]}
          />
          Continue with Google
        </button>

        <div className={styles["register-text"]}>
          if you have an account,{" "}
          <span className={styles["register-link"]} onClick={onSwitch}>
            Login Here!
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
