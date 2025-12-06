// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth, googleProvider } from "../firebase.config";
// import {
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
//   getIdToken,
// } from "firebase/auth";
// import axios from "../services/axios.config";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // firebase user
//   const [appUser, setAppUser] = useState(null); // backend user doc (role, company, etc.)
//   const [loading, setLoading] = useState(true);

//   // helper to extract friendly error message
//   const extractErrorMessage = (err) => {
//     if (!err) return "Something went wrong";
//     if (err?.response?.data?.message) return err.response.data.message;
//     if (err?.message) return err.message;
//     return String(err);
//   };

//   // fetch current app user from backend
//   const refreshAppUser = async () => {
//     try {
//       const res = await axios.get("/auth/me");
//       setAppUser(res.data);
//       return res.data;
//     } catch (err) {
//       // if unauthorized, clear appUser
//       setAppUser(null);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (fbUser) => {
//       setLoading(true);
//       setUser(fbUser);
//       if (fbUser) {
//         try {
//           // get firebase idToken (safer than sending email only)
//           const idToken = await fbUser.getIdToken(/* forceRefresh */ true);
//           // exchange with backend to get app JWT
//           const tokenResp = await axios.post("/auth/firebase-login", {
//             token: idToken,
//             email: fbUser.email,
//           });
//           const token = tokenResp?.data?.token;
//           if (token) {
//             localStorage.setItem("assetverse_token", token);
//           } else {
//             // ensure no stale token
//             localStorage.removeItem("assetverse_token");
//           }
//           // fetch user doc from backend
//           await refreshAppUser();
//         } catch (err) {
//           console.error("Auth exchange error:", err);
//           // clear on failure
//           localStorage.removeItem("assetverse_token");
//           setAppUser(null);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         // logged out
//         localStorage.removeItem("assetverse_token");
//         setAppUser(null);
//         setLoading(false);
//       }
//     });

//     return () => unsub();
//   }, []);

//   // Register: create firebase user, update profile, then create backend user doc
//   const register = async ({
//     name,
//     email,
//     password,
//     role = "employee",
//     ...rest
//   }) => {
//     setLoading(true);
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       // update display name
//       await updateProfile(res.user, { displayName: name });
//       // create backend user doc
//       const payload = { name, email, role, ...rest };
//       await axios.post("/auth/register", payload);
//       // backend may create user; onAuthStateChanged will handle token exchange
//       return res.user;
//     } catch (err) {
//       const msg = extractErrorMessage(err);
//       // rethrow so calling component can show toast
//       throw new Error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login with email/password
//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const res = await signInWithEmailAndPassword(auth, email, password);
//       // onAuthStateChanged will exchange token & set appUser
//       return res.user;
//     } catch (err) {
//       const msg = extractErrorMessage(err);
//       throw new Error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login with Google
//   const loginWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const res = await signInWithPopup(auth, googleProvider);
//       // If you want: create backend user doc on first-time sign-in
//       // onAuthStateChanged will take care of exchange
//       return res.user;
//     } catch (err) {
//       const msg = extractErrorMessage(err);
//       throw new Error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout
//   const logout = async () => {
//     setLoading(true);
//     try {
//       await signOut(auth);
//       localStorage.removeItem("assetverse_token");
//       setAppUser(null);
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed:", err);
//       // don't throw; logout errors are rare; still clear local state
//       localStorage.removeItem("assetverse_token");
//       setAppUser(null);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         appUser,
//         loading,
//         register,
//         login,
//         loginWithGoogle,
//         logout,
//         setAppUser,
//         refreshAppUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// 2..........

// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "../services/axios.config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Firebase user
  const [appUser, setAppUser] = useState(null); // Backend user doc (role, company, etc.)
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Helper to extract friendly error message
  const extractErrorMessage = (err) => {
    if (!err) return "Something went wrong";
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.code) {
      // Firebase error codes
      switch (err.code) {
        case "auth/email-already-in-use":
          return "This email is already registered";
        case "auth/invalid-email":
          return "Invalid email address";
        case "auth/weak-password":
          return "Password is too weak";
        case "auth/user-not-found":
          return "No user found with this email";
        case "auth/wrong-password":
          return "Incorrect password";
        case "auth/invalid-credential":
          return "Invalid email or password";
        case "auth/too-many-requests":
          return "Too many failed attempts. Try again later";
        case "auth/popup-closed-by-user":
          return "Sign-in popup was closed";
        default:
          return err.message;
      }
    }
    if (err?.message) return err.message;
    return String(err);
  };

  // Fetch current app user from backend
  const refreshAppUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setAppUser(res.data);
      return res.data;
    } catch (err) {
      // If unauthorized, clear appUser
      console.error("Failed to fetch app user:", err);
      setAppUser(null);
      return null;
    }
  };

  // Monitor Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setUser(fbUser);

      if (fbUser) {
        try {
          // Get Firebase ID token
          const idToken = await fbUser.getIdToken(true);
          localStorage.setItem("token", idToken);

          // Sync with backend and get user data
          await axios.post(
            "/auth/login",
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          // Fetch full user data from backend
          await refreshAppUser();
        } catch (err) {
          console.error("Auth sync error:", err);
          // If 404, user not registered in backend yet
          if (err.response?.status === 404) {
            console.log("User not registered in backend yet");
          }
          localStorage.removeItem("token");
          setAppUser(null);
        }
      } else {
        // Logged out
        localStorage.removeItem("token");
        setAppUser(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Register: create Firebase user, then create backend user doc
  const register = async (email, password, additionalData) => {
    setLoading(true);
    try {
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fbUser = userCredential.user;

      // 2. Update Firebase profile
      if (additionalData.name) {
        await updateProfile(fbUser, {
          displayName: additionalData.name,
          photoURL: additionalData.photo || null,
        });
      }

      // 3. Get Firebase ID token
      const idToken = await fbUser.getIdToken();
      localStorage.setItem("token", idToken);

      // 4. Register in backend
      const payload = {
        firebaseUid: fbUser.uid,
        email: fbUser.email,
        name: additionalData.name,
        role: additionalData.role || "employee",
        dateOfBirth: additionalData.dateOfBirth,
        photo: additionalData.photo,
        companyName: additionalData.companyName,
        companyLogo: additionalData.companyLogo,
      };

      const response = await axios.post("/auth/register", payload);
      setAppUser(response.data.user);

      return { success: true, user: response.data.user };
    } catch (err) {
      const msg = extractErrorMessage(err);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fbUser = userCredential.user;

      // 2. Get Firebase ID token
      const idToken = await fbUser.getIdToken();
      localStorage.setItem("token", idToken);

      // 3. Sync with backend
      const response = await axios.post(
        "/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      setAppUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (err) {
      const msg = extractErrorMessage(err);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async (role = "employee", additionalData = {}) => {
    setLoading(true);
    try {
      // 1. Sign in with Google popup
      const userCredential = await signInWithPopup(auth, googleProvider);
      const fbUser = userCredential.user;

      // 2. Get Firebase ID token
      const idToken = await fbUser.getIdToken();
      localStorage.setItem("token", idToken);

      // 3. Try to login (check if user exists in backend)
      try {
        const response = await axios.post(
          "/auth/login",
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        setAppUser(response.data.user);
        return { success: true, user: response.data.user };
      } catch (loginErr) {
        // If user doesn't exist (404), register them
        if (loginErr.response?.status === 404) {
          const payload = {
            firebaseUid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName,
            role: role,
            dateOfBirth: additionalData.dateOfBirth || new Date(),
            photo: fbUser.photoURL,
            companyName: additionalData.companyName,
            companyLogo: additionalData.companyLogo,
          };

          const registerResponse = await axios.post("/auth/register", payload);
          setAppUser(registerResponse.data.user);
          return { success: true, user: registerResponse.data.user };
        }
        throw loginErr;
      }
    } catch (err) {
      const msg = extractErrorMessage(err);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setAppUser(null);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
      // Still clear local state even if Firebase logout fails
      localStorage.removeItem("token");
      setAppUser(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user, // Firebase user object
    appUser, // Backend user data (with role, company, etc.)
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    setAppUser,
    refreshAppUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
