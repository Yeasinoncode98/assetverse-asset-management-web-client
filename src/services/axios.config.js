// 2.......................code First code  powering up the axios config ..............

// import axios from "axios";
// import { auth } from "../firebase.config";

// const baseURL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL,
//   timeout: 30000, // ✅ Increased to 30 seconds for slow networks
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Helper function to get token with retries
// const getTokenWithRetry = async (maxRetries = 3) => {
//   for (let attempt = 0; attempt < maxRetries; attempt++) {
//     try {
//       // Priority 1: Try localStorage first (fastest)
//       let token = localStorage.getItem("token");

//       if (token) {
//         return token;
//       }

//       // Priority 2: Try to get from Firebase currentUser
//       if (auth.currentUser) {
//         console.log(
//           `⏳ Getting fresh token from Firebase (attempt ${attempt + 1})...`
//         );
//         token = await auth.currentUser.getIdToken();

//         if (token) {
//           localStorage.setItem("token", token);
//           return token;
//         }
//       }

//       // If no token found, wait and retry
//       if (attempt < maxRetries - 1) {
//         console.warn(
//           `⚠️ No token found, retrying in ${(attempt + 1) * 200}ms...`
//         );
//         await new Promise((resolve) =>
//           setTimeout(resolve, (attempt + 1) * 200)
//         );
//       }
//     } catch (error) {
//       console.error(
//         `❌ Token retrieval error (attempt ${attempt + 1}):`,
//         error.message
//       );

//       if (attempt < maxRetries - 1) {
//         await new Promise((resolve) =>
//           setTimeout(resolve, (attempt + 1) * 300)
//         );
//       }
//     }
//   }

//   console.warn("⚠️ Failed to get token after retries");
//   return null;
// };

// // ✅ Helper function to check network connectivity
// const isNetworkError = (error) => {
//   return (
//     !error.response &&
//     (error.code === "ECONNABORTED" ||
//       error.code === "ERR_NETWORK" ||
//       error.message.includes("Network Error") ||
//       error.message.includes("timeout"))
//   );
// };

// // ✅ Helper function for exponential backoff delay
// const getRetryDelay = (retryCount, baseDelay = 1000) => {
//   return Math.min(baseDelay * Math.pow(2, retryCount), 10000); // Max 10 seconds
// };

// // ✅ Request interceptor - Add Firebase token with retry logic
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     try {
//       // Add timestamp to prevent caching issues
//       config.params = {
//         ...config.params,
//         _t: Date.now(),
//       };

//       // Skip token for auth endpoints that don't need it
//       const isAuthEndpoint =
//         config.url?.includes("/auth/register") ||
//         config.url?.includes("/auth/login");

//       if (isAuthEndpoint && config.method === "post") {
//         console.log("🔓 Skipping token for auth endpoint");
//         return config;
//       }

//       // Get token with retry logic
//       const token = await getTokenWithRetry();

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         console.log("✅ Token added to request:", config.url);
//       } else {
//         console.warn("⚠️ No token available for request:", config.url);
//       }

//       // ✅ Add minimum delay simulation (optional - for smooth UX)
//       // Uncomment if you want a minimum loading time
//       // config.metadata = { startTime: Date.now() };
//     } catch (error) {
//       console.error("❌ Error in request interceptor:", error);
//     }

//     return config;
//   },
//   (error) => {
//     console.error("❌ Request interceptor error:", error);
//     return Promise.reject(error);
//   }
// );

// // ✅ Response interceptor - Handle all types of errors
// axiosInstance.interceptors.response.use(
//   async (response) => {
//     // Log successful responses in development
//     if (import.meta.env.DEV) {
//       console.log("✅ API Response:", response.config.url, response.status);
//     }
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Initialize retry counter if not exists
//     if (!originalRequest._retryCount) {
//       originalRequest._retryCount = 0;
//     }

//     // Log error details
//     console.error("❌ API Error:", {
//       url: originalRequest?.url,
//       status: error.response?.status,
//       message: error.response?.data?.message || error.message,
//       code: error.code,
//     });

//     // ✅ Handle Network Errors (timeout, connection issues)
//     if (isNetworkError(error)) {
//       console.warn("⚠️ Network error detected:", error.message);

//       if (originalRequest._retryCount < 3) {
//         originalRequest._retryCount++;
//         const delay = getRetryDelay(originalRequest._retryCount);

//         console.log(
//           `🔄 Retrying request (attempt ${originalRequest._retryCount}/3) after ${delay}ms...`
//         );

//         await new Promise((resolve) => setTimeout(resolve, delay));
//         return axiosInstance(originalRequest);
//       } else {
//         console.error("❌ Network error: Maximum retries reached");
//         return Promise.reject({
//           ...error,
//           userMessage:
//             "Network error. Please check your internet connection and try again.",
//         });
//       }
//     }

//     // ✅ Handle 503 (Service Unavailable - Database not ready)
//     if (error.response?.status === 503) {
//       console.warn("⚠️ Service unavailable (503), database may not be ready");

//       if (originalRequest._retryCount < 4) {
//         originalRequest._retryCount++;
//         const delay = getRetryDelay(originalRequest._retryCount, 2000);

//         console.log(
//           `🔄 Retrying after ${delay}ms (attempt ${originalRequest._retryCount}/4)...`
//         );

//         await new Promise((resolve) => setTimeout(resolve, delay));
//         return axiosInstance(originalRequest);
//       }
//     }

//     // ✅ Handle 502/504 (Bad Gateway / Gateway Timeout)
//     if (error.response?.status === 502 || error.response?.status === 504) {
//       console.warn("⚠️ Gateway error detected");

//       if (originalRequest._retryCount < 3) {
//         originalRequest._retryCount++;
//         const delay = getRetryDelay(originalRequest._retryCount, 1500);

//         console.log(`🔄 Retrying after ${delay}ms...`);

//         await new Promise((resolve) => setTimeout(resolve, delay));
//         return axiosInstance(originalRequest);
//       }
//     }

//     // ✅ Handle 401 (Unauthorized - Token expired or invalid)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("🔄 Token expired, refreshing...");

//         if (auth.currentUser) {
//           // Get fresh token from Firebase
//           const newToken = await auth.currentUser.getIdToken(true);
//           localStorage.setItem("token", newToken);
//           console.log("✅ Token refreshed successfully");

//           // Retry original request with new token
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return axiosInstance(originalRequest);
//         } else {
//           // No current user, redirect to login
//           console.warn("⚠️ No authenticated user, redirecting to login...");
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }
//       } catch (refreshError) {
//         // If refresh fails, logout user
//         console.error("❌ Token refresh failed:", refreshError);
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     // ✅ Handle 500 errors with single retry
//     if (error.response?.status === 500 && !originalRequest._retry500) {
//       originalRequest._retry500 = true;

//       console.warn("⚠️ Server error 500, retrying once...");

//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       return axiosInstance(originalRequest);
//     }

//     // ✅ Handle 429 (Too Many Requests - Rate Limiting)
//     if (error.response?.status === 429) {
//       console.warn("⚠️ Rate limit hit (429)");

//       if (originalRequest._retryCount < 2) {
//         originalRequest._retryCount++;
//         const retryAfter = error.response.headers["retry-after"] * 1000 || 5000;

//         console.log(`🔄 Waiting ${retryAfter}ms before retry...`);

//         await new Promise((resolve) => setTimeout(resolve, retryAfter));
//         return axiosInstance(originalRequest);
//       }
//     }

//     // ✅ Handle 403 (Forbidden)
//     if (error.response?.status === 403) {
//       console.error("❌ Access forbidden (403)");
//       return Promise.reject({
//         ...error,
//         userMessage:
//           "You don't have permission to access this resource. Please contact support.",
//       });
//     }

//     // ✅ Handle 404 (Not Found)
//     if (error.response?.status === 404) {
//       console.warn("⚠️ Resource not found (404)");
//       return Promise.reject({
//         ...error,
//         userMessage: "The requested resource was not found.",
//       });
//     }

//     // ✅ Handle timeout specifically
//     if (error.code === "ECONNABORTED") {
//       console.error("❌ Request timeout");
//       return Promise.reject({
//         ...error,
//         userMessage:
//           "Request took too long. Please check your connection and try again.",
//       });
//     }

//     // ✅ Add user-friendly message for unhandled errors
//     if (!error.userMessage) {
//       error.userMessage =
//         error.response?.data?.message ||
//         "An unexpected error occurred. Please try again.";
//     }

//     return Promise.reject(error);
//   }
// );

// // ✅ Add request queue for better error handling (optional)
// let requestQueue = [];
// let isProcessingQueue = false;

// const processQueue = async () => {
//   if (isProcessingQueue || requestQueue.length === 0) return;

//   isProcessingQueue = true;

//   while (requestQueue.length > 0) {
//     const { config, resolve, reject } = requestQueue.shift();

//     try {
//       const response = await axiosInstance(config);
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }

//     // Small delay between requests to avoid overwhelming server
//     await new Promise((r) => setTimeout(r, 100));
//   }

//   isProcessingQueue = false;
// };

// export default axiosInstance;

// 3.......................Fixing error ..................delay adding ...................

import axios from "axios";
import { auth } from "../firebase.config";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Configuration for smart delays
const DELAY_CONFIG = {
  INITIAL_GRACE_PERIOD: 800, // Wait 800ms before showing any errors
  MIN_LOADING_TIME: 400, // Minimum loading time for smooth UX
  TOKEN_RETRY_DELAY: 200,
  NETWORK_RETRY_BASE: 1000,
  MAX_RETRY_DELAY: 10000,
};

// ✅ Helper function to get token with retries
const getTokenWithRetry = async (maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      let token = localStorage.getItem("token");

      if (token) {
        return token;
      }

      if (auth.currentUser) {
        console.log(
          `⏳ Getting fresh token from Firebase (attempt ${attempt + 1})...`
        );
        token = await auth.currentUser.getIdToken();

        if (token) {
          localStorage.setItem("token", token);
          return token;
        }
      }

      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_CONFIG.TOKEN_RETRY_DELAY * (attempt + 1))
        );
      }
    } catch (error) {
      console.error(
        `❌ Token retrieval error (attempt ${attempt + 1}):`,
        error.message
      );

      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 300 * (attempt + 1))
        );
      }
    }
  }

  console.warn("⚠️ Failed to get token after retries");
  return null;
};

// ✅ Helper function to check network connectivity
const isNetworkError = (error) => {
  return (
    !error.response &&
    (error.code === "ECONNABORTED" ||
      error.code === "ERR_NETWORK" ||
      error.message.includes("Network Error") ||
      error.message.includes("timeout"))
  );
};

// ✅ Helper function for exponential backoff delay
const getRetryDelay = (
  retryCount,
  baseDelay = DELAY_CONFIG.NETWORK_RETRY_BASE
) => {
  return Math.min(
    baseDelay * Math.pow(2, retryCount),
    DELAY_CONFIG.MAX_RETRY_DELAY
  );
};

// ✅ Helper to add grace period before showing errors
const waitGracePeriod = async (
  startTime,
  gracePeriod = DELAY_CONFIG.INITIAL_GRACE_PERIOD
) => {
  const elapsed = Date.now() - startTime;
  if (elapsed < gracePeriod) {
    await new Promise((resolve) => setTimeout(resolve, gracePeriod - elapsed));
  }
};

// ✅ Request interceptor with timing metadata
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // 🎯 Store request start time for grace period calculation
      config.metadata = {
        startTime: Date.now(),
        hasGracePeriod: true,
      };

      config.params = {
        ...config.params,
        _t: Date.now(),
      };

      const isAuthEndpoint =
        config.url?.includes("/auth/register") ||
        config.url?.includes("/auth/login");

      if (isAuthEndpoint && config.method === "post") {
        console.log("🔓 Skipping token for auth endpoint");
        return config;
      }

      const token = await getTokenWithRetry();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ Token added to request:", config.url);
      } else {
        console.warn("⚠️ No token available for request:", config.url);
      }
    } catch (error) {
      console.error("❌ Error in request interceptor:", error);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor with smart delay handling
axiosInstance.interceptors.response.use(
  async (response) => {
    // 🎯 Ensure minimum loading time for smooth UX
    if (response.config.metadata?.startTime) {
      const elapsed = Date.now() - response.config.metadata.startTime;

      if (elapsed < DELAY_CONFIG.MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_CONFIG.MIN_LOADING_TIME - elapsed)
        );
      }
    }

    if (import.meta.env.DEV) {
      console.log("✅ API Response:", response.config.url, response.status);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const startTime = originalRequest?.metadata?.startTime || Date.now();

    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    console.error("❌ API Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      code: error.code,
    });

    // 🎯 GRACE PERIOD: Wait before processing errors on first attempt
    if (
      originalRequest._retryCount === 0 &&
      originalRequest?.metadata?.hasGracePeriod
    ) {
      await waitGracePeriod(startTime);
      originalRequest.metadata.hasGracePeriod = false; // Only apply once
    }

    // ✅ Handle Network Errors with extended initial delay
    if (isNetworkError(error)) {
      console.warn("⚠️ Network error detected:", error.message);

      if (originalRequest._retryCount < 3) {
        originalRequest._retryCount++;

        // 🎯 Longer delay on first retry to give backend time
        const baseDelay =
          originalRequest._retryCount === 1
            ? 1500
            : DELAY_CONFIG.NETWORK_RETRY_BASE;
        const delay = getRetryDelay(originalRequest._retryCount - 1, baseDelay);

        console.log(
          `🔄 Retrying request (attempt ${originalRequest._retryCount}/3) after ${delay}ms...`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        return axiosInstance(originalRequest);
      } else {
        console.error("❌ Network error: Maximum retries reached");
        return Promise.reject({
          ...error,
          userMessage:
            "Network error. Please check your internet connection and try again.",
        });
      }
    }

    // ✅ Handle 503 with longer delays (database warming up)
    if (error.response?.status === 503) {
      console.warn("⚠️ Service unavailable (503), database may not be ready");

      if (originalRequest._retryCount < 4) {
        originalRequest._retryCount++;

        // 🎯 Progressive delays: 2s, 4s, 6s, 8s
        const delay = Math.min(2000 * originalRequest._retryCount, 8000);

        console.log(
          `🔄 Retrying after ${delay}ms (attempt ${originalRequest._retryCount}/4)...`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        return axiosInstance(originalRequest);
      }
    }

    // ✅ Handle 502/504 with intelligent delays
    if (error.response?.status === 502 || error.response?.status === 504) {
      console.warn("⚠️ Gateway error detected");

      if (originalRequest._retryCount < 3) {
        originalRequest._retryCount++;
        const delay = getRetryDelay(originalRequest._retryCount, 1500);

        console.log(`🔄 Retrying after ${delay}ms...`);

        await new Promise((resolve) => setTimeout(resolve, delay));
        return axiosInstance(originalRequest);
      }
    }

    // ✅ Handle 401 (Token refresh)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Token expired, refreshing...");

        if (auth.currentUser) {
          const newToken = await auth.currentUser.getIdToken(true);
          localStorage.setItem("token", newToken);
          console.log("✅ Token refreshed successfully");

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // 🎯 Small delay after token refresh
          await new Promise((resolve) => setTimeout(resolve, 300));
          return axiosInstance(originalRequest);
        } else {
          console.warn("⚠️ No authenticated user, redirecting to login...");
          localStorage.removeItem("token");

          // 🎯 Delay before redirect for smooth transition
          await new Promise((resolve) => setTimeout(resolve, 500));
          window.location.href = "/login";
        }
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);
        localStorage.removeItem("token");

        await new Promise((resolve) => setTimeout(resolve, 500));
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // ✅ Handle 500 errors with extended delay
    if (error.response?.status === 500 && !originalRequest._retry500) {
      originalRequest._retry500 = true;

      console.warn("⚠️ Server error 500, retrying once...");

      // 🎯 Longer delay for server errors
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return axiosInstance(originalRequest);
    }

    // ✅ Handle 429 (Rate Limiting)
    if (error.response?.status === 429) {
      console.warn("⚠️ Rate limit hit (429)");

      if (originalRequest._retryCount < 2) {
        originalRequest._retryCount++;
        const retryAfter = error.response.headers["retry-after"] * 1000 || 5000;

        console.log(`🔄 Waiting ${retryAfter}ms before retry...`);

        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        return axiosInstance(originalRequest);
      }
    }

    // ✅ Handle 403 (Forbidden)
    if (error.response?.status === 403) {
      console.error("❌ Access forbidden (403)");
      return Promise.reject({
        ...error,
        userMessage:
          "You don't have permission to access this resource. Please contact support.",
      });
    }

    // ✅ Handle 404 (Not Found)
    if (error.response?.status === 404) {
      console.warn("⚠️ Resource not found (404)");
      return Promise.reject({
        ...error,
        userMessage: "The requested resource was not found.",
      });
    }

    // ✅ Handle timeout
    if (error.code === "ECONNABORTED") {
      console.error("❌ Request timeout");
      return Promise.reject({
        ...error,
        userMessage:
          "Request took too long. Please check your connection and try again.",
      });
    }

    if (!error.userMessage) {
      error.userMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// 4.......................Fixing error ..................delay adding and no error msg ...................
// import axios from "axios";
// import { auth } from "../firebase.config";

// const baseURL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL,
//   timeout: 30000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ In-memory token cache (replaces localStorage for token)
// let tokenCache = {
//   token: null,
//   timestamp: null,
// };

// // ✅ Configuration for smart delays
// const DELAY_CONFIG = {
//   INITIAL_GRACE_PERIOD: 800, // Wait 800ms before showing any errors
//   MIN_LOADING_TIME: 400, // Minimum loading time for smooth UX
//   TOKEN_RETRY_DELAY: 200,
//   NETWORK_RETRY_BASE: 1000,
//   MAX_RETRY_DELAY: 10000,
// };

// // ✅ Helper function to get token with retries
// const getTokenWithRetry = async (maxRetries = 3) => {
//   for (let attempt = 0; attempt < maxRetries; attempt++) {
//     try {
//       // Check in-memory cache first
//       if (tokenCache.token && tokenCache.timestamp) {
//         const age = Date.now() - tokenCache.timestamp;
//         // Use cached token if less than 50 minutes old
//         if (age < 50 * 60 * 1000) {
//           return tokenCache.token;
//         }
//       }

//       // Get fresh token from Firebase
//       if (auth.currentUser) {
//         console.log(
//           `⏳ Getting fresh token from Firebase (attempt ${attempt + 1})...`
//         );
//         const token = await auth.currentUser.getIdToken();

//         if (token) {
//           // Store in memory cache
//           tokenCache = {
//             token: token,
//             timestamp: Date.now(),
//           };
//           return token;
//         }
//       }

//       if (attempt < maxRetries - 1) {
//         await new Promise((resolve) =>
//           setTimeout(resolve, DELAY_CONFIG.TOKEN_RETRY_DELAY * (attempt + 1))
//         );
//       }
//     } catch (error) {
//       console.error(
//         `❌ Token retrieval error (attempt ${attempt + 1}):`,
//         error.message
//       );

//       if (attempt < maxRetries - 1) {
//         await new Promise((resolve) =>
//           setTimeout(resolve, 300 * (attempt + 1))
//         );
//       }
//     }
//   }

//   console.warn("⚠️ Failed to get token after retries");
//   return null;
// };

// // ✅ Helper function to check network connectivity
// const isNetworkError = (error) => {
//   return (
//     !error.response &&
//     (error.code === "ECONNABORTED" ||
//       error.code === "ERR_NETWORK" ||
//       error.message.includes("Network Error") ||
//       error.message.includes("timeout"))
//   );
// };

// // ✅ Helper function for exponential backoff delay
// const getRetryDelay = (
//   retryCount,
//   baseDelay = DELAY_CONFIG.NETWORK_RETRY_BASE
// ) => {
//   return Math.min(
//     baseDelay * Math.pow(2, retryCount),
//     DELAY_CONFIG.MAX_RETRY_DELAY
//   );
// };

// // ✅ Helper to add grace period before showing errors
// const waitGracePeriod = async (
//   startTime,
//   gracePeriod = DELAY_CONFIG.INITIAL_GRACE_PERIOD
// ) => {
//   const elapsed = Date.now() - startTime;
//   if (elapsed < gracePeriod) {
//     await new Promise((resolve) => setTimeout(resolve, gracePeriod - elapsed));
//   }
// };

// // ✅ Request interceptor with timing metadata
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     try {
//       // 🎯 Store request start time for grace period calculation
//       config.metadata = {
//         startTime: Date.now(),
//         hasGracePeriod: true,
//       };

//       config.params = {
//         ...config.params,
//         _t: Date.now(),
//       };

//       const isAuthEndpoint =
//         config.url?.includes("/auth/register") ||
//         config.url?.includes("/auth/login");

//       if (isAuthEndpoint && config.method === "post") {
//         console.log("🔓 Skipping token for auth endpoint");
//         return config;
//       }

//       const token = await getTokenWithRetry();

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         console.log("✅ Token added to request:", config.url);
//       } else {
//         console.warn("⚠️ No token available for request:", config.url);
//       }
//     } catch (error) {
//       console.error("❌ Error in request interceptor:", error);
//     }

//     return config;
//   },
//   (error) => {
//     console.error("❌ Request interceptor error:", error);
//     return Promise.reject(error);
//   }
// );

// // ✅ Response interceptor with smart delay handling
// axiosInstance.interceptors.response.use(
//   async (response) => {
//     // 🎯 Ensure minimum loading time for smooth UX
//     if (response.config.metadata?.startTime) {
//       const elapsed = Date.now() - response.config.metadata.startTime;

//       if (elapsed < DELAY_CONFIG.MIN_LOADING_TIME) {
//         await new Promise((resolve) =>
//           setTimeout(resolve, DELAY_CONFIG.MIN_LOADING_TIME - elapsed)
//         );
//       }
//     }

//     if (import.meta.env.DEV) {
//       console.log("✅ API Response:", response.config.url, response.status);
//     }

//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const startTime = originalRequest?.metadata?.startTime || Date.now();

//     if (!originalRequest._retryCount) {
//       originalRequest._retryCount = 0;
//     }

//     console.error("❌ API Error:", {
//       url: originalRequest?.url,
//       status: error.response?.status,
//       message: error.response?.data?.message || error.message,
//       code: error.code,
//     });

//     // 🎯 GRACE PERIOD: Wait before processing errors on first attempt
//     if (
//       originalRequest._retryCount === 0 &&
//       originalRequest?.metadata?.hasGracePeriod
//     ) {
//       await waitGracePeriod(startTime);
//       originalRequest.metadata.hasGracePeriod = false; // Only apply once
//     }

//     // ✅ Handle Network Errors with extended initial delay
//     if (isNetworkError(error)) {
//       console.warn("⚠️ Network error detected:", error.message);

//       if (originalRequest._retryCount < 3) {
//         originalRequest._retryCount++;

//         // 🎯 Longer delay on first retry to give backend time
//         const baseDelay =
//           originalRequest._retryCount === 1
//             ? 1500
//             : DELAY_CONFIG.NETWORK_RETRY_BASE;
//         const delay = getRetryDelay(originalRequest._retryCount - 1, baseDelay);

//         console.log(
//           `🔄 Retrying request (attempt ${originalRequest._retryCount}/3) after ${delay}ms...`
//         );

//         await new Promise((resolve) => setTimeout(resolve, delay));
//         return axiosInstance(originalRequest);
//       } else {
//         console.error("❌ Network error: Maximum retries reached");
//         return Promise.reject({
//           ...error,
//           userMessage:
//             "Network error. Please check your internet connection and try again.",
//         });
//       }
//     }

//     // ✅ Handle 503 with longer delays (database warming up)
//     if (error.response?.status === 503) {
//       console.warn("⚠️ Service unavailable (503), database may not be ready");

//       if (originalRequest._retryCount < 4) {
//         originalRequest._retryCount++;

//         // 🎯 Progressive delays: 2s, 4s, 6s, 8s
//         const delay = Math.min(2000 * originalRequest._retryCount, 8000);

//         console.log(
//           `🔄 Retrying after ${delay}ms (attempt ${originalRequest._retryCount}/4)...`
//         );

//         await new Promise((resolve) => setTimeout(resolve, delay));
//         return axiosInstance(originalRequest);
//       }
//     }

//     // ✅ Handle 502/504 with intelligent delays
//     if (error.response?.status === 502 || error.response?.status === 504) {
//       console.warn("⚠️ Gateway error detected");

//       if (originalRequest._retryCount < 3) {
//         originalRequest._retryCount++;
//         const delay = getRetryDelay(originalRequest._retryCount, 1500);

//         console.log(`🔄 Retrying after ${delay}ms...`);

//         await new Promise((resolve) => setTimeout(resolve, delay));
//         return axiosInstance(originalRequest);
//       }
//     }

//     // ✅ Handle 401 (Token refresh)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("🔄 Token expired, refreshing...");

//         if (auth.currentUser) {
//           const newToken = await auth.currentUser.getIdToken(true);

//           // Update memory cache
//           tokenCache = {
//             token: newToken,
//             timestamp: Date.now(),
//           };

//           console.log("✅ Token refreshed successfully");

//           originalRequest.headers.Authorization = `Bearer ${newToken}`;

//           // 🎯 Small delay after token refresh
//           await new Promise((resolve) => setTimeout(resolve, 300));
//           return axiosInstance(originalRequest);
//         } else {
//           console.warn("⚠️ No authenticated user, redirecting to login...");
//           tokenCache = { token: null, timestamp: null };

//           // 🎯 Delay before redirect for smooth transition
//           await new Promise((resolve) => setTimeout(resolve, 500));
//           window.location.href = "/login";
//         }
//       } catch (refreshError) {
//         console.error("❌ Token refresh failed:", refreshError);
//         tokenCache = { token: null, timestamp: null };

//         await new Promise((resolve) => setTimeout(resolve, 500));
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     // ✅ Handle 500 errors with extended delay
//     if (error.response?.status === 500 && !originalRequest._retry500) {
//       originalRequest._retry500 = true;

//       console.warn("⚠️ Server error 500, retrying once...");

//       // 🎯 Longer delay for server errors
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       return axiosInstance(originalRequest);
//     }

//     // ✅ Handle 429 (Rate Limiting)
//     if (error.response?.status === 429) {
//       console.warn("⚠️ Rate limit hit (429)");

//       if (originalRequest._retryCount < 2) {
//         originalRequest._retryCount++;
//         const retryAfter = error.response.headers["retry-after"] * 1000 || 5000;

//         console.log(`🔄 Waiting ${retryAfter}ms before retry...`);

//         await new Promise((resolve) => setTimeout(resolve, retryAfter));
//         return axiosInstance(originalRequest);
//       }
//     }

//     // ✅ Handle 403 (Forbidden)
//     if (error.response?.status === 403) {
//       console.error("❌ Access forbidden (403)");
//       return Promise.reject({
//         ...error,
//         userMessage:
//           "You don't have permission to access this resource. Please contact support.",
//       });
//     }

//     // ✅ Handle 404 (Not Found)
//     if (error.response?.status === 404) {
//       console.warn("⚠️ Resource not found (404)");
//       return Promise.reject({
//         ...error,
//         userMessage: "The requested resource was not found.",
//       });
//     }

//     // ✅ Handle timeout
//     if (error.code === "ECONNABORTED") {
//       console.error("❌ Request timeout");
//       return Promise.reject({
//         ...error,
//         userMessage:
//           "Request took too long. Please check your connection and try again.",
//       });
//     }

//     if (!error.userMessage) {
//       error.userMessage =
//         error.response?.data?.message ||
//         "An unexpected error occurred. Please try again.";
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
