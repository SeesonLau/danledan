import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "../styles/signup-modal.module.css";
import {
  registerWithEmail,
  registerWithGoogle,
  updateUserInfo,
  auth,
} from "@/config/firebase";
import { reregisterInfo, setReregisterInfo } from "./login-modal";

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    licenseNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(
    reregisterInfo && reregisterInfo?.role === "clinic" ? "Clinic" : "Patient"
  );
  const router = useRouter();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name != "licenseNumber") {
      setIsSecondRole(false);
      setReregisterInfo(null);
    }
  };

  //for Google SignUp
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);
  const [infoUid, setInfo] = useState();

  //for 2nd role registration
  const [isSecondRole, setIsSecondRole] = useState(false);

  //console.log(reregisterInfo);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (reregisterInfo) {
      setIsSecondRole(true);
      //setUserType(reregisterInfo.role === "clinic" ? "Clinic" : "Patient");
      setFormData({
        firstName: reregisterInfo.userData.firstName,
        lastName: reregisterInfo.userData.lastName,
        email: reregisterInfo.userData.email,
        password: "*****************", // Masked password
      });
    }
    isInitialRender.current = true;
  }, [reregisterInfo]); // Runs only when reregisterInfo changes

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (reregisterInfo) {
      setIsSecondRole(false);
      setReregisterInfo(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  }, [userType]); // Runs only when userType changes *needs change*

  const handleSignUp = async () => {
    let result = null;
    if (isGoogleSignUp) {
      if (formData.licenseNumber) {
        result = await updateUserInfo(
          infoUid,
          userType,
          formData.licenseNumber
        );
      } else {
        alert("Please fill in all required fields");
        return;
      }
    } else {
      const requiredFields =
        userType === "Patient"
          ? ["firstName", "lastName", "email", "password"]
          : ["firstName", "lastName", "licenseNumber", "email", "password"];

      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        alert("Please fill in all required fields");
        return;
      }

      result = await registerWithEmail(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        userType,
        userType === "Clinic" ? formData.licenseNumber : undefined, // Pass licenseNumber only for clinics
        isSecondRole ? true : false,
        reregisterInfo ? reregisterInfo?.uid : null
      );
      //alert(reregisterInfo?.uid);
    }
    //alert(result.success);
    if (result.success) {
      setIsSecondRole(false);
      setReregisterInfo(null);
      //alert(userType);
      const route =
        userType === "Patient" ? "/patient-homepage" : "/clinic-homepage";
      router.push(route);
    } else {
      alert(result.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      if (isSecondRole) {
        handleSignUp();
        setIsSecondRole(false);
        setReregisterInfo(null);
        return;
      }
      const confirmation = window.confirm(
        `Creating a ${
          userType === "Patient" ? "Patient" : "Clinic"
        } user with a Google Account`
      );
      if (confirmation) {
        const result = await registerWithGoogle(userType);
        if (!result) {
          return;
        }
        if (result.success) {
          if (userType === "Clinic") {
            const user = result?.userData;
            setFormData((prev) => ({
              ...prev, // Keep existing form data
              firstName: user?.firstName || "", // Ensure safe access
              lastName: user?.lastName || "",
              email: user?.email || "",
              password: "****************", // Mask password
            }));
            setInfo(result?.uid);
            setIsGoogleSignUp(true);
            alert(
              "Finish by entering your Clinic's license number and clicking the Sign Up button afterwards."
            );
            return;
          }
          const route =
            userType === "Patient" ? "/patient-homepage" : "/clinic-homepage";
          router.push(route);
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      console.error("Google registration error:", error);
    }
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
