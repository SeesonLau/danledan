import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/login-modal.module.css";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  loginWithEmail,
  loginWithGoogle,
  logout,
} from "../config/firebase";

export let reregisterInfo = null;

export const setReregisterInfo = (value) => {
  reregisterInfo = value;
};

const Modal = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("Patient");
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const validatedRole = await loginWithEmail(email, password, userType);
      const route =
        userType === "Patient" ? "/patient-homepage" : "/clinic-homepage";
      router.push(route);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    // Handle Google login logic here
    try {
      const confirmation = window.confirm(
        `Logging in as ${userType} using Google`
      );
      const validatedRole = await loginWithGoogle(userType);
      if (!validatedRole) {
        return null;
      }
      if (!validatedRole.success) {
        const confirmation = window.confirm(
          `You do not have a "${userType}" profile. Do you want to create one?`
        );
        if (confirmation) {
          onSwitch();
          console.log(`1 ${validatedRole.userData}`);
          setReregisterInfo(validatedRole);
          console.log(`2 ${reregisterInfo.role}`);
        } else {
          alert(`Please select the correct role.`);
          await logout();
        }
      } else {
        const route =
          userType === "Patient" ? "/patient-homepage" : "/clinic-homepage";
        router.push(route);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
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

        <div className={styles["input-container"]}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles["input-field"]}
          />
        </div>

        <div className={styles["password-container"]}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles["input-field"]}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className={styles["toggle-password"]}
          >
          </button>
        </div>

        <button className={styles["login-button"]} onClick={handleLogin}>
          Login
        </button>

        <div className={styles["divider"]}>
          <div className={styles["divider-line"]} />
          <span className={styles["divider-text"]}>or</span>
          <div className={styles["divider-line"]} />
        </div>

        <button className={styles["google-button"]} onClick={handleGoogleLogin}>
          <img
            src="/landing-page-iamge/google-icon.png"
            alt="Google"
            className={styles["google-icon"]}
          />
          Continue with Google
        </button>

        <div className={styles["register-text"]}>
          if you don't have an account,{" "}
          <span
            className={styles["register-link"]}
            isOpen={false}
            onClick={onSwitch}
          >
            Register Here!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
