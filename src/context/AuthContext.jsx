// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase.config";
// import {
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import axios from "../services/axios.config";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [appUser, setAppUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Helper: Get Firebase token with retries
//   const getFirebaseToken = async (forceRefresh = false, retries = 3) => {
//     for (let attempt = 0; attempt < retries; attempt++) {
//       try {
//         if (!auth.currentUser) {
//           console.warn(
//             `⚠️ No currentUser, waiting... (${attempt + 1}/${retries})`
//           );
//           await new Promise((resolve) => setTimeout(resolve, 500));
//           continue;
//         }

//         const token = await auth.currentUser.getIdToken(forceRefresh);

//         if (!token) {
//           console.warn(`⚠️ Empty token (${attempt + 1}/${retries})`);
//           await new Promise((resolve) => setTimeout(resolve, 500));
//           continue;
//         }

//         console.log("✅ Firebase token retrieved");
//         return token;
//       } catch (error) {
//         console.error(
//           `❌ Token error (${attempt + 1}/${retries}):`,
//           error.message
//         );
//         if (attempt < retries - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 500));
//         }
//       }
//     }

//     throw new Error("Failed to get Firebase token");
//   };

//   // ✅ Fetch user from backend with retries AND exponential backoff
//   const refreshAppUser = async (token = null, retries = 3) => {
//     for (let attempt = 0; attempt < retries; attempt++) {
//       try {
//         console.log(`📡 Fetching user data (${attempt + 1}/${retries})...`);

//         // ✅ FIX: Pass token explicitly in headers if provided
//         const config = token
//           ? {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           : {};

//         const res = await axios.get("/auth/me", config);
//         setAppUser(res.data);
//         console.log("✅ User data loaded:", res.data.email);
//         return res.data;
//       } catch (err) {
//         console.error(
//           `❌ Fetch user error (${attempt + 1}/${retries}):`,
//           err.response?.status || err.message
//         );

//         // ✅ FIX: Exponential backoff (500ms, 1s, 2s)
//         if (attempt < retries - 1) {
//           const delay = Math.pow(2, attempt) * 500;
//           console.log(`⏳ Retrying in ${delay}ms...`);
//           await new Promise((resolve) => setTimeout(resolve, delay));
//         } else {
//           console.error("❌ All retry attempts failed");
//           setAppUser(null);
//           return null;
//         }
//       }
//     }
//   };

//   // ✅ Listen to Firebase auth state changes
//   useEffect(() => {
//     console.log("🔐 Setting up auth listener...");

//     const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
//       console.log("🔄 Auth state changed:", fbUser?.email || "logged out");
//       setLoading(true);
//       setUser(fbUser);

//       if (fbUser) {
//         try {
//           // Get Firebase token
//           console.log("⏳ Getting Firebase token...");
//           const token = await getFirebaseToken(true);

//           if (token) {
//             localStorage.setItem("token", token);
//             console.log("✅ Token saved to localStorage");

//             // ✅ FIX: Pass token explicitly and add small delay
//             await new Promise((resolve) => setTimeout(resolve, 300));

//             // Fetch user data from backend
//             await refreshAppUser(token);
//           } else {
//             console.error("❌ No token received");
//             localStorage.removeItem("token");
//             setAppUser(null);
//           }
//         } catch (err) {
//           console.error("❌ Auth initialization error:", err);
//           localStorage.removeItem("token");
//           setAppUser(null);
//         }
//       } else {
//         // User logged out
//         console.log("👋 User logged out");
//         localStorage.removeItem("token");
//         setAppUser(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // ✅ REGISTER
//   const register = async ({
//     name,
//     email,
//     password,
//     role = "employee",
//     dateOfBirth,
//     companyName,
//     companyLogo,
//   }) => {
//     setLoading(true);
//     console.log("📝 Starting registration for:", email);

//     try {
//       // Create Firebase user
//       console.log("🔥 Creating Firebase user...");
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // Update display name
//       console.log("👤 Updating profile...");
//       await updateProfile(userCredential.user, { displayName: name });

//       // Get token
//       console.log("🎫 Getting token...");
//       const token = await getFirebaseToken(true);
//       localStorage.setItem("token", token);

//       // ✅ FIX: Add small delay before backend call
//       await new Promise((resolve) => setTimeout(resolve, 300));

//       // Create backend user
//       console.log("💾 Creating backend user...");
//       const payload = {
//         firebaseUid: userCredential.user.uid,
//         name,
//         email,
//         role,
//         dateOfBirth,
//         photo: userCredential.user.photoURL || null,
//       };

//       if (role === "hr") {
//         payload.companyName = companyName;
//         payload.companyLogo = companyLogo || "";
//       }

//       await axios.post("/auth/register", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("✅ Registration complete!");

//       return userCredential.user;
//     } catch (err) {
//       console.error("❌ Registration error:", err);

//       let errorMessage = "Registration failed";

//       if (err.code === "auth/email-already-in-use") {
//         errorMessage = "This email is already registered";
//       } else if (err.code === "auth/weak-password") {
//         errorMessage = "Password should be at least 6 characters";
//       } else if (err.code === "auth/invalid-email") {
//         errorMessage = "Invalid email address";
//       } else if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       } else if (err.message) {
//         errorMessage = err.message;
//       }

//       throw new Error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ LOGIN - FIXED TO PREVENT 500 ERROR ON FIRST ATTEMPT
//   const login = async (email, password) => {
//     setLoading(true);
//     console.log("🔐 Starting login for:", email);

//     try {
//       // Step 1: Sign in with Firebase
//       console.log("🔥 Authenticating with Firebase...");
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       console.log("✅ Firebase authentication successful");

//       // Step 2: Get Firebase token (CRITICAL - WAIT FOR IT)
//       console.log("⏳ Waiting for Firebase token...");
//       const token = await getFirebaseToken(true);

//       if (!token) {
//         throw new Error("Failed to get authentication token");
//       }

//       // Step 3: Store token IMMEDIATELY
//       localStorage.setItem("token", token);
//       console.log("✅ Token stored in localStorage");

//       // ✅ FIX: Add delay to ensure token is properly set
//       console.log("⏳ Waiting for token to sync...");
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       // Step 4: Verify with backend (pass token explicitly)
//       console.log("📡 Verifying with backend...");
//       const backendUser = await refreshAppUser(token, 5); // ✅ Increased retries to 5

//       if (!backendUser) {
//         throw new Error("Failed to fetch user data from backend");
//       }

//       console.log("✅ Login complete!");
//       return userCredential.user;
//     } catch (err) {
//       console.error("❌ Login error:", err);

//       let errorMessage = "Login failed";

//       // Firebase errors
//       if (
//         err.code === "auth/invalid-credential" ||
//         err.code === "auth/wrong-password"
//       ) {
//         errorMessage = "Invalid email or password";
//       } else if (err.code === "auth/user-not-found") {
//         errorMessage = "No account found with this email";
//       } else if (err.code === "auth/too-many-requests") {
//         errorMessage = "Too many failed attempts. Please try again later";
//       } else if (err.code === "auth/user-disabled") {
//         errorMessage = "This account has been disabled";
//       } else if (err.code === "auth/invalid-email") {
//         errorMessage = "Invalid email format";
//       }
//       // Backend errors
//       else if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       }
//       // Generic errors
//       else if (err.message && !err.message.includes("Firebase")) {
//         errorMessage = err.message;
//       }

//       // Clear token on error
//       localStorage.removeItem("token");

//       throw new Error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ LOGOUT
//   const logout = async () => {
//     setLoading(true);
//     console.log("👋 Logging out...");

//     try {
//       await signOut(auth);
//       localStorage.removeItem("token");
//       setAppUser(null);
//       setUser(null);
//       console.log("✅ Logout complete");
//     } catch (err) {
//       console.error("❌ Logout error:", err);
//       localStorage.removeItem("token");
//       setAppUser(null);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     user,
//     appUser,
//     loading,
//     register,
//     login,
//     logout,
//     setAppUser,
//     refreshAppUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// ...............2................

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
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

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

  // ✅ Fetch user from backend with retries AND exponential backoff
  const refreshAppUser = async (token = null, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        console.log(`📡 Fetching user data (${attempt + 1}/${retries})...`);

        // ✅ FIX: Pass token explicitly in headers if provided
        const config = token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {};

        const res = await axios.get("/auth/me", config);
        setAppUser(res.data);
        console.log("✅ User data loaded:", res.data.email);
        return res.data;
      } catch (err) {
        console.error(
          `❌ Fetch user error (${attempt + 1}/${retries}):`,
          err.response?.status || err.message
        );

        // ✅ FIX: Exponential backoff (500ms, 1s, 2s)
        if (attempt < retries - 1) {
          const delay = Math.pow(2, attempt) * 500;
          console.log(`⏳ Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.error("❌ All retry attempts failed");
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

            // ✅ FIX: Pass token explicitly and add small delay
            await new Promise((resolve) => setTimeout(resolve, 300));

            // Fetch user data from backend
            await refreshAppUser(token);
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

      // ✅ FIX: Add small delay before backend call
      await new Promise((resolve) => setTimeout(resolve, 300));

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

      await axios.post("/auth/register", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  // ✅ LOGIN - FIXED TO PREVENT 500 ERROR ON FIRST ATTEMPT
  const login = async (email, password) => {
    setLoading(true);
    setIsLoginInProgress(true); // Prevent auth state listener from duplicating fetch
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

      // Step 3: Store token IMMEDIATELY
      localStorage.setItem("token", token);
      console.log("✅ Token stored in localStorage");

      // ✅ FIX: Add delay to ensure token is properly set
      console.log("⏳ Waiting for token to sync...");
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Step 4: Verify with backend (pass token explicitly)
      console.log("📡 Verifying with backend...");
      const backendUser = await refreshAppUser(token, 5); // ✅ Increased retries to 5

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
      setIsLoginInProgress(false); // Reset flag
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
