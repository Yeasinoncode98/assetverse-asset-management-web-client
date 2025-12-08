// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase.config";
// import {
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import axios from "../services/axios.config";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // Firebase user
//   const [appUser, setAppUser] = useState(null); // Backend user doc (role, company, etc.)
//   const [loading, setLoading] = useState(true);

//   const googleProvider = new GoogleAuthProvider();

//   // Helper to extract friendly error message
//   const extractErrorMessage = (err) => {
//     if (!err) return "Something went wrong";
//     if (err?.response?.data?.message) return err.response.data.message;
//     if (err?.code) {
//       // Firebase error codes
//       switch (err.code) {
//         case "auth/email-already-in-use":
//           return "This email is already registered";
//         case "auth/invalid-email":
//           return "Invalid email address";
//         case "auth/weak-password":
//           return "Password is too weak";
//         case "auth/user-not-found":
//           return "No user found with this email";
//         case "auth/wrong-password":
//           return "Incorrect password";
//         case "auth/invalid-credential":
//           return "Invalid email or password";
//         case "auth/too-many-requests":
//           return "Too many failed attempts. Try again later";
//         case "auth/popup-closed-by-user":
//           return "Sign-in popup was closed";
//         default:
//           return err.message;
//       }
//     }
//     if (err?.message) return err.message;
//     return String(err);
//   };

//   // Fetch current app user from backend
//   const refreshAppUser = async () => {
//     try {
//       const res = await axios.get("/auth/me");
//       setAppUser(res.data);
//       return res.data;
//     } catch (err) {
//       // If unauthorized, clear appUser
//       console.error("Failed to fetch app user:", err);
//       setAppUser(null);
//       return null;
//     }
//   };

//   // Monitor Firebase auth state
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (fbUser) => {
//       setLoading(true);
//       setUser(fbUser);

//       if (fbUser) {
//         try {
//           // Get Firebase ID token
//           const idToken = await fbUser.getIdToken(true);
//           localStorage.setItem("token", idToken);

//           // Sync with backend and get user data
//           await axios.post(
//             "/auth/login",
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${idToken}`,
//               },
//             }
//           );

//           // Fetch full user data from backend
//           await refreshAppUser();
//         } catch (err) {
//           console.error("Auth sync error:", err);
//           // If 404, user not registered in backend yet
//           if (err.response?.status === 404) {
//             console.log("User not registered in backend yet");
//           }
//           localStorage.removeItem("token");
//           setAppUser(null);
//         }
//       } else {
//         // Logged out
//         localStorage.removeItem("token");
//         setAppUser(null);
//       }

//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   // Register: create Firebase user, then create backend user doc
//   const register = async (email, password, additionalData) => {
//     setLoading(true);
//     try {
//       // 1. Create Firebase user
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const fbUser = userCredential.user;

//       // 2. Update Firebase profile
//       if (additionalData.name) {
//         await updateProfile(fbUser, {
//           displayName: additionalData.name,
//           photoURL: additionalData.photo || null,
//         });
//       }

//       // 3. Get Firebase ID token
//       const idToken = await fbUser.getIdToken();
//       localStorage.setItem("token", idToken);

//       // 4. Register in backend
//       const payload = {
//         firebaseUid: fbUser.uid,
//         email: fbUser.email,
//         name: additionalData.name,
//         role: additionalData.role || "employee",
//         dateOfBirth: additionalData.dateOfBirth,
//         photo: additionalData.photo,
//         companyName: additionalData.companyName,
//         companyLogo: additionalData.companyLogo,
//       };

//       const response = await axios.post("/auth/register", payload);
//       setAppUser(response.data.user);

//       return { success: true, user: response.data.user };
//     } catch (err) {
//       const msg = extractErrorMessage(err);
//       throw new Error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login with email/password
//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       // 1. Sign in with Firebase
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const fbUser = userCredential.user;

//       // 2. Get Firebase ID token
//       const idToken = await fbUser.getIdToken();
//       localStorage.setItem("token", idToken);

//       // 3. Sync with backend
//       const response = await axios.post(
//         "/auth/login",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${idToken}`,
//           },
//         }
//       );

//       setAppUser(response.data.user);
//       return { success: true, user: response.data.user };
//     } catch (err) {
//       const msg = extractErrorMessage(err);
//       throw new Error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login with Google
//   const loginWithGoogle = async (role = "employee", additionalData = {}) => {
//     setLoading(true);
//     try {
//       // 1. Sign in with Google popup
//       const userCredential = await signInWithPopup(auth, googleProvider);
//       const fbUser = userCredential.user;

//       // 2. Get Firebase ID token
//       const idToken = await fbUser.getIdToken();
//       localStorage.setItem("token", idToken);

//       // 3. Try to login (check if user exists in backend)
//       try {
//         const response = await axios.post(
//           "/auth/login",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           }
//         );

//         setAppUser(response.data.user);
//         return { success: true, user: response.data.user };
//       } catch (loginErr) {
//         // If user doesn't exist (404), register them
//         if (loginErr.response?.status === 404) {
//           const payload = {
//             firebaseUid: fbUser.uid,
//             email: fbUser.email,
//             name: fbUser.displayName,
//             role: role,
//             dateOfBirth: additionalData.dateOfBirth || new Date(),
//             photo: fbUser.photoURL,
//             companyName: additionalData.companyName,
//             companyLogo: additionalData.companyLogo,
//           };

//           const registerResponse = await axios.post("/auth/register", payload);
//           setAppUser(registerResponse.data.user);
//           return { success: true, user: registerResponse.data.user };
//         }
//         throw loginErr;
//       }
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
//       localStorage.removeItem("token");
//       setAppUser(null);
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed:", err);
//       // Still clear local state even if Firebase logout fails
//       localStorage.removeItem("token");
//       setAppUser(null);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     user, // Firebase user object
//     appUser, // Backend user data (with role, company, etc.)
//     loading,
//     register,
//     login,
//     loginWithGoogle,
//     logout,
//     setAppUser,
//     refreshAppUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// 2..................................

// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "../services/axios.config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [appUser, setAppUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Helper: Get Firebase token with retries
  const getFirebaseToken = async (forceRefresh = false, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        if (!auth.currentUser) {
          console.warn(
            `⚠️ No currentUser, waiting... (${attempt + 1}/${retries})`
          );
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }

        const token = await auth.currentUser.getIdToken(forceRefresh);

        if (!token) {
          console.warn(`⚠️ Empty token (${attempt + 1}/${retries})`);
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }

        console.log("✅ Firebase token retrieved");
        return token;
      } catch (error) {
        console.error(
          `❌ Token error (${attempt + 1}/${retries}):`,
          error.message
        );
        if (attempt < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    throw new Error("Failed to get Firebase token");
  };

  // ✅ Fetch user from backend with retries
  const refreshAppUser = async (retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        console.log(`📡 Fetching user data (${attempt + 1}/${retries})...`);
        const res = await axios.get("/auth/me");
        setAppUser(res.data);
        console.log("✅ User data loaded:", res.data.email);
        return res.data;
      } catch (err) {
        console.error(
          `❌ Fetch user error (${attempt + 1}/${retries}):`,
          err.message
        );

        if (attempt < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          setAppUser(null);
          return null;
        }
      }
    }
  };

  // ✅ Listen to Firebase auth state changes
  useEffect(() => {
    console.log("🔐 Setting up auth listener...");

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      console.log("🔄 Auth state changed:", fbUser?.email || "logged out");
      setLoading(true);
      setUser(fbUser);

      if (fbUser) {
        try {
          // Get Firebase token
          console.log("⏳ Getting Firebase token...");
          const token = await getFirebaseToken(true);

          if (token) {
            localStorage.setItem("token", token);
            console.log("✅ Token saved to localStorage");

            // Fetch user data from backend
            await refreshAppUser();
          } else {
            console.error("❌ No token received");
            localStorage.removeItem("token");
            setAppUser(null);
          }
        } catch (err) {
          console.error("❌ Auth initialization error:", err);
          localStorage.removeItem("token");
          setAppUser(null);
        }
      } else {
        // User logged out
        console.log("👋 User logged out");
        localStorage.removeItem("token");
        setAppUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ REGISTER
  const register = async ({
    name,
    email,
    password,
    role = "employee",
    dateOfBirth,
    companyName,
    companyLogo,
  }) => {
    setLoading(true);
    console.log("📝 Starting registration for:", email);

    try {
      // Create Firebase user
      console.log("🔥 Creating Firebase user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      console.log("👤 Updating profile...");
      await updateProfile(userCredential.user, { displayName: name });

      // Get token
      console.log("🎫 Getting token...");
      const token = await getFirebaseToken(true);
      localStorage.setItem("token", token);

      // Create backend user
      console.log("💾 Creating backend user...");
      const payload = {
        firebaseUid: userCredential.user.uid,
        name,
        email,
        role,
        dateOfBirth,
        photo: userCredential.user.photoURL || null,
      };

      if (role === "hr") {
        payload.companyName = companyName;
        payload.companyLogo = companyLogo || "";
      }

      await axios.post("/auth/register", payload);
      console.log("✅ Registration complete!");

      return userCredential.user;
    } catch (err) {
      console.error("❌ Registration error:", err);

      let errorMessage = "Registration failed";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN - THIS IS THE KEY FUNCTION THAT FIXES YOUR ISSUE
  const login = async (email, password) => {
    setLoading(true);
    console.log("🔐 Starting login for:", email);

    try {
      // Step 1: Sign in with Firebase
      console.log("🔥 Authenticating with Firebase...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("✅ Firebase authentication successful");

      // Step 2: Get Firebase token (CRITICAL - WAIT FOR IT)
      console.log("⏳ Waiting for Firebase token...");
      const token = await getFirebaseToken(true);

      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      // Step 3: Store token
      localStorage.setItem("token", token);
      console.log("✅ Token stored in localStorage");

      // Step 4: Verify with backend
      console.log("📡 Verifying with backend...");
      const backendUser = await refreshAppUser();

      if (!backendUser) {
        throw new Error("Failed to fetch user data from backend");
      }

      console.log("✅ Login complete!");
      return userCredential.user;
    } catch (err) {
      console.error("❌ Login error:", err);

      let errorMessage = "Login failed";

      // Firebase errors
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format";
      }
      // Backend errors
      else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      // Generic errors
      else if (err.message && !err.message.includes("Firebase")) {
        errorMessage = err.message;
      }

      // Clear token on error
      localStorage.removeItem("token");

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    setLoading(true);
    console.log("👋 Logging out...");

    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setAppUser(null);
      setUser(null);
      console.log("✅ Logout complete");
    } catch (err) {
      console.error("❌ Logout error:", err);
      localStorage.removeItem("token");
      setAppUser(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    appUser,
    loading,
    register,
    login,
    logout,
    setAppUser,
    refreshAppUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
