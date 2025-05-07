import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure you have your Firebase config and initialization here
import { useRouter } from "next/router";
import "./firebase"; // Ensure Firebase is initialized

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  const fetchUserDoc = async () => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));

      /*setRole(
        Array.isArray(userDoc.data().role)
          ? userDoc.data().role
          : [userDoc.data().role]
      );*/
    }
  };

  useEffect(() => {
    fetchUserDoc();
  }, [user]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/"); // Redirect to landing page after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
