<!-- # 🚀 AssetVerse Frontend

**AssetVerse** is a modern Asset Management System frontend built with React.js, Firebase Authentication, and TailwindCSS. This application provides intuitive interfaces for HR managers and employees to manage company assets, track requests, and handle team workflows efficiently.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Authentication Flow](#-authentication-flow)
- [State Management](#-state-management)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎨 General Features
- **Modern UI/UX**: Clean, responsive design with TailwindCSS
- **Dark/Light Mode**: Theme toggle for user preference
- **Real-time Updates**: Instant reflection of data changes
- **Toast Notifications**: User-friendly feedback for all actions
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Protected Routes**: Role-based access control
- **Search & Filter**: Advanced filtering for assets and requests

### 👔 HR Dashboard Features
- **Asset Management**: Add, edit, delete, and track all company assets
- **Employee Management**: View, add, and remove employees from company
- **Request Management**: Approve or reject employee asset requests
- **Direct Assignment**: Assign assets directly to employees
- **Analytics Dashboard**: Visual charts for asset distribution and statistics
- **Payment Integration**: Upgrade company packages with Stripe
- **Payment History**: View all package upgrade transactions
- **Profile Management**: Update company information and logo

### 👨‍💼 Employee Dashboard Features
- **Asset Requests**: Browse and request available company assets
- **My Assets**: View all assigned assets with search functionality
- **Return Assets**: Return borrowed assets to the company
- **Company Affiliation**: View affiliated companies
- **Team View**: See all team members in the company
- **Profile Management**: Update personal information and photo
- **Request History**: Track all asset request statuses

---

## 🛠 Tech Stack

### Core Technologies
- **React.js** (v18.2+) - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **React Router DOM** (v6) - Client-side routing
- **TailwindCSS** (v3) - Utility-first CSS framework

### Authentication & Backend
- **Firebase Authentication** - User authentication and authorization
- **Axios** - HTTP client for API requests

### UI Components & Libraries
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **React Hook Form** - Form validation and handling
- **Swiper.js** - Touch slider carousel
- **Lottie React** - Animation library
- **React Helmet Async** - Document head management

### Data Visualization
- **Recharts** - Chart library for analytics dashboard

### Payment Integration
- **Stripe** (@stripe/react-stripe-js, @stripe/stripe-js) - Payment processing

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Firebase Project** - [Firebase Console](https://console.firebase.google.com/)
- **AssetVerse Backend API** - Running instance of the backend

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/assetverse-frontend.git
cd assetverse-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Required NPM Packages

```bash
npm install react react-dom react-router-dom
npm install firebase axios
npm install tailwindcss postcss autoprefixer
npm install react-icons react-hot-toast
npm install @stripe/react-stripe-js @stripe/stripe-js
npm install recharts swiper lottie-react
npm install react-helmet-async react-hook-form
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_project.firebaseapp.com
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_project.appspot.com
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000
# For production: https://your-backend.vercel.app

# Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Optional: Image Upload Service (ImgBB)
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### Getting Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Go to **Project Settings** > **General**
4. Scroll to **Your apps** section
5. Click on **Web app** (</>) icon
6. Copy the configuration values

### Getting Stripe Publishable Key

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** > **API keys**
3. Copy the **Publishable key** (starts with `pk_test_`)

**⚠️ Security Note**: Never commit `.env` file to version control.

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
assetverse-frontend/
├── public/                  # Static assets
│   └── logo.svg            # App logo
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   ├── AssetCard.jsx
│   │   ├── RequestCard.jsx
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useAxios.js
│   ├── layouts/            # Layout components
│   │   ├── MainLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── HR/
│   │   │   ├── AssetList.jsx
│   │   │   ├── AddAsset.jsx
│   │   │   ├── AllRequests.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   └── Analytics.jsx
│   │   └── Employee/
│   │       ├── MyAssets.jsx
│   │       ├── RequestAsset.jsx
│   │       ├── MyTeam.jsx
│   │       └── Profile.jsx
│   ├── routes/             # Route configurations
│   │   ├── Routes.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── HRRoute.jsx
│   ├── services/           # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── assetService.js
│   │   └── paymentService.js
│   ├── utils/              # Utility functions
│   │   ├── formatDate.js
│   │   ├── imageUpload.js
│   │   └── validators.js
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # TailwindCSS config
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

---

## 🗺️ Pages & Routes

### Public Routes
- `/` - Home page with features showcase
- `/login` - User login page
- `/register` - User registration (HR/Employee)
- `/about` - About AssetVerse
- `/contact` - Contact page

### Protected Routes (Authentication Required)
- `/profile` - User profile management
- `/dashboard` - Role-based dashboard redirect

### HR Routes (HR Role Required)
- `/hr/dashboard` - HR analytics dashboard
- `/hr/assets` - Asset list management
- `/hr/add-asset` - Add new asset
- `/hr/edit-asset/:id` - Edit existing asset
- `/hr/requests` - All asset requests
- `/hr/employees` - Employee list
- `/hr/add-employee` - Add employee to company
- `/hr/payment` - Package upgrade
- `/hr/payment-history` - Transaction history

### Employee Routes (Employee Role Required)
- `/employee/dashboard` - Employee dashboard
- `/employee/my-assets` - Assigned assets
- `/employee/request-asset` - Browse and request assets
- `/employee/my-team` - View team members
- `/employee/profile` - Update profile

---

## 🧩 Components

### Core Components

#### Navbar
```jsx
// Responsive navigation with user menu
<Navbar />
```

#### Sidebar
```jsx
// Dashboard sidebar with role-based navigation
<Sidebar role="hr" /> // or role="employee"
```

#### AssetCard
```jsx
// Display asset information
<AssetCard 
  asset={assetData}
  onRequest={handleRequest}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

#### RequestCard
```jsx
// Display request information
<RequestCard 
  request={requestData}
  onApprove={handleApprove}
  onReject={handleReject}
/>
```

#### LoadingSpinner
```jsx
// Loading indicator
<LoadingSpinner />
```

#### Modal
```jsx
// Reusable modal component
<Modal isOpen={isOpen} onClose={closeModal}>
  <ModalContent />
</Modal>
```

---

## 🔐 Authentication Flow

### Registration Process

```javascript
// Register new user
const handleRegister = async (userData) => {
  try {
    // 1. Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    // 2. Update Firebase profile
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL
    });
    
    // 3. Register in backend database
    await axios.post('/api/auth/register', {
      firebaseUid: userCredential.user.uid,
      name,
      email,
      role,
      dateOfBirth,
      photo: photoURL,
      companyName, // if HR
      companyLogo  // if HR
    });
    
    // 4. Redirect to dashboard
    navigate('/dashboard');
    toast.success('Registration successful!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Login Process

```javascript
// Login existing user
const handleLogin = async (email, password) => {
  try {
    // 1. Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    // 2. Get Firebase token
    const token = await userCredential.user.getIdToken();
    
    // 3. Verify with backend
    const response = await axios.post('/api/auth/login', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // 4. Store user data
    setUser(response.data.user);
    
    // 5. Redirect based on role
    navigate(response.data.user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard');
    toast.success('Login successful!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Protected Route Component

```jsx
// PrivateRoute.jsx
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" />;
};

// HRRoute.jsx
const HRRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'hr') {
    toast.error('Access denied. HR only.');
    return <Navigate to="/employee/dashboard" />;
  }
  
  return children;
};
```

---

## 🎯 State Management

### AuthContext

```jsx
// contexts/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Custom Hooks

#### useAuth Hook
```jsx
// hooks/useAuth.js
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### useAxios Hook
```jsx
// hooks/useAxios.js
export const useAxios = () => {
  const { user } = useAuth();
  
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    if (user) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};
```

---

## 💳 Payment Integration

### Stripe Setup

```jsx
// Payment.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
```

### Checkout Form

```jsx
// CheckoutForm.jsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create payment intent
    const { data } = await axios.post('/api/payment/create-intent', {
      packageName: selectedPackage.name,
      amount: selectedPackage.price,
      employeeLimit: selectedPackage.employeeLimit
    });

    // 2. Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    // 3. Confirm payment in backend
    await axios.post('/api/payment/confirm', {
      paymentIntentId: paymentIntent.id,
      packageName: selectedPackage.name,
      employeeLimit: selectedPackage.employeeLimit,
      amount: selectedPackage.price
    });

    toast.success('Payment successful!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};
```

---

## 📊 Analytics Dashboard

### Chart Components

```jsx
// Analytics.jsx
import { BarChart, Bar, PieChart, Pie, LineChart, Line } from 'recharts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await axios.get('/api/hr/analytics');
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Asset Types Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3>Asset Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={analytics?.assetTypes}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            fill="#8884d8"
          />
        </PieChart>
      </div>

      {/* Top Requested Assets Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3>Top Requested Assets</h3>
        <BarChart width={400} height={300} data={analytics?.topRequested}>
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};
```

---

## 🌐 API Integration

### API Service

```javascript
// services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get Firebase token
const getToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Axios instance with interceptors
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Asset Service

```javascript
// services/assetService.js
import api from './api';

export const assetService = {
  // Get all assets
  getAllAssets: (page, limit, search) => 
    api.get(`/api/hr/assets?page=${page}&limit=${limit}&search=${search}`),

  // Add asset
  addAsset: (assetData) => 
    api.post('/api/hr/assets', assetData),

  // Update asset
  updateAsset: (id, assetData) => 
    api.put(`/api/hr/assets/${id}`, assetData),

  // Delete asset
  deleteAsset: (id) => 
    api.delete(`/api/hr/assets/${id}`),

  // Get employee assets
  getMyAssets: (search, type) => 
    api.get(`/api/employee/my-assets?search=${search}&type=${type}`),

  // Request asset
  requestAsset: (assetId, note) => 
    api.post('/api/employee/request-asset', { assetId, note }),

  // Return asset
  returnAsset: (assetId) => 
    api.post(`/api/employee/return-asset/${assetId}`)
};
```

---

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
vercel
```

4. **Add Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Add all variables from `.env`

5. **Deploy to Production**
```bash
vercel --prod
```

### Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

4. **Add Environment Variables**
   - Go to Netlify Dashboard > Site Settings > Environment Variables

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
```bash
npm i -g firebase-tools
```

2. **Login**
```bash
firebase login
```

3. **Initialize**
```bash
firebase init hosting
```

4. **Build**
```bash
npm run build
```

5. **Deploy**
```bash
firebase deploy
```

---

## 🐛 Troubleshooting

### Firebase Authentication Issues

```bash
# Error: Firebase not initialized
# Solution: Check if firebase config is correct in .env

# Error: Token expired
# Solution: Implement token refresh logic
```

### API Connection Issues

```bash
# Error: Network Error
# Solution: Check if VITE_API_URL is correct
# Ensure backend is running

# Error: CORS policy blocked
# Solution: Verify backend CORS configuration includes your frontend URL
```

### Build Errors

```bash
# Error: Module not found
# Solution: npm install or check import paths

# Error: Environment variables undefined
# Solution: Restart dev server after adding .env variables
```

### Stripe Integration Issues

```bash
# Error: Invalid publishable key
# Solution: Verify VITE_STRIPE_PUBLISHABLE_KEY starts with 'pk_test_'

# Error: Card element not mounted
# Solution: Ensure Elements wrapper is present
```

---

## 🎨 Customization

### Theme Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Adding New Routes

```jsx
// routes/Routes.jsx
import NewPage from '../pages/NewPage';

const router = createBrowserRouter([
  {
    path: '/new-route',
    element: <PrivateRoute><NewPage /></PrivateRoute>
  }
]);
```

---

## 📈 Performance Optimization

### Code Splitting

```jsx
// Lazy load components
const HRDashboard = lazy(() => import('./pages/HR/Dashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <HRDashboard />
</Suspense>
```

### Image Optimization

```jsx
// Use lazy loading
<img src={imageUrl} loading="lazy" alt="Asset" />

// Optimize images before upload
const optimizeImage = async (file) => {
  // Use image compression library
  return compressedFile;
};
```

### Memoization

```jsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

---

## 🧪 Testing

### Unit Testing with Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### E2E Testing with Cypress

```bash
npm install -D cypress
```

```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use TailwindCSS utility classes consistently

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- TailwindCSS team for the utility-first CSS framework
- Firebase team for authentication services
- Stripe team for payment processing
- Open source community for excellent packages

---

## 📞 Support

For support, email devoncode98@gmail.com or open an issue in the GitHub repository.

---

## 🔗 Links

- **Backend Repository**: [AssetVerse Backend](https://github.com/Yeasinoncode98/assetverse-asset-management-web-server.git)
- **Live Demo**: [AssetVerse Demo](https://assetverse-asset-management-web-cli.vercel.app/)
- **API Documentation**: [Backend API Docs](https://github.com/Yeasinoncode98/assetverse-asset-management-web-server)

---

## 📈 Roadmap

- [ ] Add real-time notifications with WebSocket
- [ ] Implement progressive web app (PWA) features
- [ ] Add multi-language support (i18n)
- [ ] Create mobile app with React Native
- [ ] Add advanced search with filters
- [ ] Implement drag-and-drop for asset management
- [ ] Add export functionality (CSV/PDF reports)
- [ ] Create admin super dashboard
- [ ] Add email notification system
- [ ] Implement chat feature for team communication

---

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

---

## 🔒 Security

- All API requests use HTTPS in production
- Firebase tokens expire after 1 hour
- Sensitive data is never stored in localStorage
- CSRF protection enabled
- XSS protection with React's built-in escaping

---

**Made with ❤️ by Yeasin Arafat**

---

**⭐ If you find this project helpful, please give it a star on GitHub!** -->



# 🚀 AssetVerse Frontend

**AssetVerse** is a modern Asset Management System frontend built with React.js, Firebase Authentication, and TailwindCSS. This application provides intuitive interfaces for HR managers and employees to manage company assets, track requests, and handle team workflows efficiently.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Authentication Flow](#-authentication-flow)
- [State Management](#-state-management)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎨 General Features
- **Modern UI/UX**: Clean, responsive design with TailwindCSS
- **Dark/Light Mode**: Theme toggle for user preference
- **Real-time Updates**: Instant reflection of data changes
- **Toast Notifications**: User-friendly feedback for all actions
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Protected Routes**: Role-based access control
- **Search & Filter**: Advanced filtering for assets and requests

### 👔 HR Dashboard Features
- **Asset Management**: Add, edit, delete, and track all company assets
- **Employee Management**: View, add, and remove employees from company
- **Request Management**: Approve or reject employee asset requests
- **Direct Assignment**: Assign assets directly to employees
- **Analytics Dashboard**: Visual charts for asset distribution and statistics
- **Payment Integration**: Upgrade company packages with Stripe
- **Payment History**: View all package upgrade transactions
- **Profile Management**: Update company information and logo

### 👨‍💼 Employee Dashboard Features
- **Asset Requests**: Browse and request available company assets
- **My Assets**: View all assigned assets with search functionality
- **Return Assets**: Return borrowed assets to the company
- **Company Affiliation**: View affiliated companies
- **Team View**: See all team members in the company
- **Profile Management**: Update personal information and photo
- **Request History**: Track all asset request statuses

---

## 🛠 Tech Stack

### Core Technologies
- **React.js** (v18.2+) - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **React Router DOM** (v6) - Client-side routing
- **TailwindCSS** (v3) - Utility-first CSS framework

### Authentication & Backend
- **Firebase Authentication** - User authentication and authorization
- **Axios** - HTTP client for API requests

### UI Components & Libraries
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **React Hook Form** - Form validation and handling
- **Swiper.js** - Touch slider carousel
- **Lottie React** - Animation library

### Data Visualization
- **Recharts** - Chart library for analytics dashboard

### Payment Integration
- **Stripe** (@stripe/react-stripe-js, @stripe/stripe-js) - Payment processing

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Firebase Project** - [Firebase Console](https://console.firebase.google.com/)
- **AssetVerse Backend API** - Running instance of the backend

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/assetverse-frontend.git
cd assetverse-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Required NPM Packages

```bash
npm install react react-dom react-router-dom
npm install firebase axios
npm install tailwindcss postcss autoprefixer
npm install react-icons react-hot-toast
npm install @stripe/react-stripe-js @stripe/stripe-js
npm install recharts swiper lottie-react
npm install react-hook-form
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_project.firebaseapp.com
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_project.appspot.com
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000
# For production: https://your-backend.vercel.app

# Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Optional: Image Upload Service (ImgBB)
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### Getting Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Go to **Project Settings** > **General**
4. Scroll to **Your apps** section
5. Click on **Web app** (</>) icon
6. Copy the configuration values

### Getting Stripe Publishable Key

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** > **API keys**
3. Copy the **Publishable key** (starts with `pk_test_`)

**⚠️ Security Note**: Never commit `.env` file to version control.

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
assetverse-frontend/
├── public/                     # Static assets
│   ├── logo.png
│   └── readme.png
├── src/
│   ├── assets/                 # Images, logos
│   │   └── logo.png
│   ├── components/             # Reusable components
│   │   ├── common/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── HRDashboard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Sidebar.jsx
│   ├── context/                # React Context
│   │   └── AuthContext.jsx
│   ├── employeePages/          # Employee pages
│   │   ├── EmployeeDashboard.jsx
│   │   ├── MyAssets.jsx
│   │   ├── MyTeam.jsx
│   │   ├── Profile.jsx
│   │   └── RequestAsset.jsx
│   ├── hrPages/                # HR pages
│   │   ├── AddEmployee.jsx
│   │   ├── AllRequests.jsx
│   │   ├── AssetList.jsx
│   │   ├── CustomRequestList.jsx
│   │   ├── EditAssetModal.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── EmployeeList.jsx
│   │   ├── HRDashboard.jsx
│   │   ├── MyAssets.jsx
│   │   ├── PackageCard.jsx
│   │   ├── PaymentModal.jsx
│   │   ├── Profile.jsx
│   │   ├── RequestTable.jsx
│   │   └── UpgradePackage.jsx
│   ├── hooks/                  # Custom hooks
│   │   └── useAuth.js
│   ├── pages/                  # Public pages
│   │   ├── Home/
│   │   │   ├── About.jsx
│   │   │   ├── AvailableEmployees.jsx
│   │   │   ├── Banner.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   └── Packages.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── shared components/      # Shared components
│   │   ├── AllRequests.jsx
│   │   ├── AssetList.jsx
│   │   ├── AssetModal.jsx
│   │   ├── AssignAssetModal.jsx
│   │   ├── AvailableEmployees.jsx
│   │   ├── HRDashboard.jsx
│   │   ├── PackageModal.jsx
│   │   └── ProfilePage.jsx
│   ├── ui/                     # UI components
│   │   └── Modal.jsx
│   ├── services/               # API services
│   │   ├── assets.api.js
│   │   ├── auth.api.js
│   │   └── packages.api.js
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── .gitignore                  # Git ignore
├── eslint.config.js            # ESLint config
├── index.html                  # HTML template
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS config
├── tailwind.config.js          # TailwindCSS config
├── vite.config.js              # Vite config
└── README.md                   # This file
```

---

## 🗺️ Pages & Routes

### Public Routes
- `/` - Home page with features showcase
- `/login` - User login page
- `/register` - User registration (HR/Employee)
- `/about` - About AssetVerse
- `/contact` - Contact page

### Protected Routes (Authentication Required)
- `/profile` - User profile management
- `/dashboard` - Role-based dashboard redirect

### HR Routes (HR Role Required)
- `/hr/dashboard` - HR analytics dashboard
- `/hr/assets` - Asset list management
- `/hr/add-asset` - Add new asset
- `/hr/edit-asset/:id` - Edit existing asset
- `/hr/requests` - All asset requests
- `/hr/employees` - Employee list
- `/hr/add-employee` - Add employee to company
- `/hr/payment` - Package upgrade
- `/hr/payment-history` - Transaction history

### Employee Routes (Employee Role Required)
- `/employee/dashboard` - Employee dashboard
- `/employee/my-assets` - Assigned assets
- `/employee/request-asset` - Browse and request assets
- `/employee/my-team` - View team members
- `/employee/profile` - Update profile

---

## 🧩 Components

### Core Components

#### Navbar
```jsx
// Responsive navigation with user menu
<Navbar />
```

#### Sidebar
```jsx
// Dashboard sidebar with role-based navigation
<Sidebar role="hr" /> // or role="employee"
```

#### AssetCard
```jsx
// Display asset information
<AssetCard 
  asset={assetData}
  onRequest={handleRequest}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

#### RequestCard
```jsx
// Display request information
<RequestCard 
  request={requestData}
  onApprove={handleApprove}
  onReject={handleReject}
/>
```

#### LoadingSpinner
```jsx
// Loading indicator
<LoadingSpinner />
```

#### Modal
```jsx
// Reusable modal component
<Modal isOpen={isOpen} onClose={closeModal}>
  <ModalContent />
</Modal>
```

---

## 🔐 Authentication Flow

### Registration Process

```javascript
// Register new user
const handleRegister = async (userData) => {
  try {
    // 1. Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    // 2. Update Firebase profile
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL
    });
    
    // 3. Register in backend database
    await axios.post('/api/auth/register', {
      firebaseUid: userCredential.user.uid,
      name,
      email,
      role,
      dateOfBirth,
      photo: photoURL,
      companyName, // if HR
      companyLogo  // if HR
    });
    
    // 4. Redirect to dashboard
    navigate('/dashboard');
    toast.success('Registration successful!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Login Process

```javascript
// Login existing user
const handleLogin = async (email, password) => {
  try {
    // 1. Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    // 2. Get Firebase token
    const token = await userCredential.user.getIdToken();
    
    // 3. Verify with backend
    const response = await axios.post('/api/auth/login', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // 4. Store user data
    setUser(response.data.user);
    
    // 5. Redirect based on role
    navigate(response.data.user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard');
    toast.success('Login successful!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Protected Route Component

```jsx
// PrivateRoute.jsx
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" />;
};

// HRRoute.jsx
const HRRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'hr') {
    toast.error('Access denied. HR only.');
    return <Navigate to="/employee/dashboard" />;
  }
  
  return children;
};
```

---

## 🎯 State Management

### AuthContext

```jsx
// contexts/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Custom Hooks

#### useAuth Hook
```jsx
// hooks/useAuth.js
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### useAxios Hook
```jsx
// hooks/useAxios.js
export const useAxios = () => {
  const { user } = useAuth();
  
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    if (user) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};
```

---

## 💳 Payment Integration

### Stripe Setup

```jsx
// Payment.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
```

### Checkout Form

```jsx
// CheckoutForm.jsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create payment intent
    const { data } = await axios.post('/api/payment/create-intent', {
      packageName: selectedPackage.name,
      amount: selectedPackage.price,
      employeeLimit: selectedPackage.employeeLimit
    });

    // 2. Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    // 3. Confirm payment in backend
    await axios.post('/api/payment/confirm', {
      paymentIntentId: paymentIntent.id,
      packageName: selectedPackage.name,
      employeeLimit: selectedPackage.employeeLimit,
      amount: selectedPackage.price
    });

    toast.success('Payment successful!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};
```

---

## 📊 Analytics Dashboard

### Chart Components

```jsx
// Analytics.jsx
import { BarChart, Bar, PieChart, Pie, LineChart, Line } from 'recharts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await axios.get('/api/hr/analytics');
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Asset Types Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3>Asset Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={analytics?.assetTypes}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            fill="#8884d8"
          />
        </PieChart>
      </div>

      {/* Top Requested Assets Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3>Top Requested Assets</h3>
        <BarChart width={400} height={300} data={analytics?.topRequested}>
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};
```

---

## 🌐 API Integration

### API Service

```javascript
// services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get Firebase token
const getToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Axios instance with interceptors
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Asset Service

```javascript
// services/assetService.js
import api from './api';

export const assetService = {
  // Get all assets
  getAllAssets: (page, limit, search) => 
    api.get(`/api/hr/assets?page=${page}&limit=${limit}&search=${search}`),

  // Add asset
  addAsset: (assetData) => 
    api.post('/api/hr/assets', assetData),

  // Update asset
  updateAsset: (id, assetData) => 
    api.put(`/api/hr/assets/${id}`, assetData),

  // Delete asset
  deleteAsset: (id) => 
    api.delete(`/api/hr/assets/${id}`),

  // Get employee assets
  getMyAssets: (search, type) => 
    api.get(`/api/employee/my-assets?search=${search}&type=${type}`),

  // Request asset
  requestAsset: (assetId, note) => 
    api.post('/api/employee/request-asset', { assetId, note }),

  // Return asset
  returnAsset: (assetId) => 
    api.post(`/api/employee/return-asset/${assetId}`)
};
```

---

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
vercel
```

4. **Add Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Add all variables from `.env`

5. **Deploy to Production**
```bash
vercel --prod
```

### Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

4. **Add Environment Variables**
   - Go to Netlify Dashboard > Site Settings > Environment Variables

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
```bash
npm i -g firebase-tools
```

2. **Login**
```bash
firebase login
```

3. **Initialize**
```bash
firebase init hosting
```

4. **Build**
```bash
npm run build
```

5. **Deploy**
```bash
firebase deploy
```

---

## 🐛 Troubleshooting

### Firebase Authentication Issues

```bash
# Error: Firebase not initialized
# Solution: Check if firebase config is correct in .env

# Error: Token expired
# Solution: Implement token refresh logic
```

### API Connection Issues

```bash
# Error: Network Error
# Solution: Check if VITE_API_URL is correct
# Ensure backend is running

# Error: CORS policy blocked
# Solution: Verify backend CORS configuration includes your frontend URL
```

### Build Errors

```bash
# Error: Module not found
# Solution: npm install or check import paths

# Error: Environment variables undefined
# Solution: Restart dev server after adding .env variables
```

### Stripe Integration Issues

```bash
# Error: Invalid publishable key
# Solution: Verify VITE_STRIPE_PUBLISHABLE_KEY starts with 'pk_test_'

# Error: Card element not mounted
# Solution: Ensure Elements wrapper is present
```

---

## 🎨 Customization

### Theme Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Adding New Routes

```jsx
// routes/Routes.jsx
import NewPage from '../pages/NewPage';

const router = createBrowserRouter([
  {
    path: '/new-route',
    element: <PrivateRoute><NewPage /></PrivateRoute>
  }
]);
```

---

## 📈 Performance Optimization

### Code Splitting

```jsx
// Lazy load components
const HRDashboard = lazy(() => import('./pages/HR/Dashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <HRDashboard />
</Suspense>
```

### Image Optimization

```jsx
// Use lazy loading
<img src={imageUrl} loading="lazy" alt="Asset" />

// Optimize images before upload
const optimizeImage = async (file) => {
  // Use image compression library
  return compressedFile;
};
```

### Memoization

```jsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

---

## 🧪 Testing

### Unit Testing with Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### E2E Testing with Cypress

```bash
npm install -D cypress
```

```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use TailwindCSS utility classes consistently

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Yeasin Arafat** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- TailwindCSS team for the utility-first CSS framework
- Firebase team for authentication services
- Stripe team for payment processing
- Open source community for excellent packages

---

## 📞 Support

For support, email devoncode98@gmail.com or open an issue in the GitHub repository.

---

## 🔗 Links

- **Backend Repository**: [AssetVerse Backend](https://github.com/Yeasinoncode98/assetverse-asset-management-web-server.git)
- **Live Demo**: [AssetVerse Demo](https://assetverse-asset-management-web-cli.vercel.app/)
- **API Documentation**: [Backend API Docs](https://github.com/Yeasinoncode98/assetverse-asset-management-web-server)

---

## 📈 Roadmap

- [ ] Add real-time notifications with WebSocket
- [ ] Implement progressive web app (PWA) features
- [ ] Add multi-language support (i18n)
- [ ] Create mobile app with React Native
- [ ] Add advanced search with filters
- [ ] Implement drag-and-drop for asset management
- [ ] Add export functionality (CSV/PDF reports)
- [ ] Create admin super dashboard
- [ ] Add email notification system
- [ ] Implement chat feature for team communication

---

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

---

## 🔒 Security

- All API requests use HTTPS in production
- Firebase tokens expire after 1 hour
- Sensitive data is never stored in localStorage
- CSRF protection enabled
- XSS protection with React's built-in escaping

---

**Made with ❤️ by Yeasin Arafat**

---

**⭐ If you find this project helpful, please give it a star on GitHub!**