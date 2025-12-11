// export default function Footer() {
//   return (
//     <footer className="bg-base-200 mt-8">
//       <div className="container mx-auto px-4 py-6 text-center">
//         <p>© {new Date().getFullYear()} AssetVerse — All rights reserved.</p>
//         <p className="text-sm">Contact: devoncode98@gmail.com</p>
//       </div>
//     </footer>
//   );
// }
// // comment passed here for pushing

2; /////////

import { useState, useEffect } from "react";
import {
  Twitter,
  Facebook,
  Linkedin,
  Zap,
  Github,
  Globe,
  Phone,
  Mail,
  MapPin,
  Heart,
  ArrowUp,
} from "lucide-react";

// The original social links array
const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1BYMyWDbeb/?mibextid=wwXIfr",
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/yeasin-arafat-2b73a4392/",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: Github,
    href: "https://github.com/Yeasinoncode98",
    label: "GitHub",
    color: "hover:text-purple-400",
  },
];

// Replaced the simple Footer with the complex AnimatedFooter
export default function AnimatedFooter() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  // Control the visibility of the scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Effect to handle scroll-to-top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if scrolled down more than 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Tailwind CSS + Custom Animation Styles
        In a real Next.js/React project with Tailwind, you should place 
        these custom CSS keyframes and class definitions in your global CSS file 
        (e.g., globals.css) instead of using the <style> tag with dangerouslySetInnerHTML.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes footer-glow-pulse {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.1); }
            }
            @keyframes footer-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes footer-gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes footer-ripple {
              0% { transform: scale(0.8); opacity: 1; }
              100% { transform: scale(2.5); opacity: 0; }
            }
            .footer-glow-orb {
              animation: footer-glow-pulse 4s ease-in-out infinite;
            }
            .footer-float {
              animation: footer-float 3s ease-in-out infinite;
            }
            .footer-gradient-bg {
              background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
              background-size: 400% 400%;
              animation: footer-gradient-shift 15s ease infinite;
            }
            .footer-social-ripple::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 0;
              pointer-events: none;
            }
            .footer-social-ripple:hover::before {
              animation: footer-ripple 0.6s ease-out;
            }
            .footer-link-glow {
              position: relative;
              transition: all 0.3s ease;
            }
            .footer-link-glow::after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 0;
              height: 2px;
              background: linear-gradient(90deg, #3b82f6, #8b5cf6);
              transition: width 0.3s ease;
            }
            .footer-link-glow:hover::after {
              width: 100%;
            }
            .footer-card-glow {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
              transition: all 0.3s ease;
            }
            .footer-card-glow:hover {
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2);
              transform: translateY(-5px);
            }
          `,
        }}
      />

      {/* Main Footer Container */}
      <footer className="relative footer-gradient-bg text-white pt-12 pb-6 overflow-hidden mt-8">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none mt-[100px]">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl footer-glow-orb"></div>
          <div
            className="absolute top-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl footer-glow-orb"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl footer-glow-orb"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl footer-glow-orb"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-[50px]">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Company Info */}
            <div className="space-y-3 footer-float lg:col-span-1">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AssetVerse
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Your ultimate platform for discovering and managing amazing
                events. Join thousands of event enthusiasts today!
              </p>
              <div className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer group">
                <MapPin className="w-3 h-3 group-hover:animate-bounce" />
                <span className="text-xs">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/events"
                    className="footer-link-glow text-gray-400 hover:text-blue-400 transition-colors inline-block text-xs"
                  >
                    Browse Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link-glow text-gray-400 hover:text-green-400 transition-colors inline-block text-xs"
                  >
                    Hire Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/8801627800198"
                    className="footer-link-glow text-gray-400 hover:text-pink-400 transition-colors inline-block text-xs"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="footer-link-glow text-gray-400 hover:text-indigo-400 transition-colors inline-block text-xs"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="tel:01627800198"
                    className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-all duration-300 group footer-card-glow p-3 rounded-lg bg-white/5"
                  >
                    <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <Phone className="w-4 h-4 text-green-400 group-hover:animate-pulse" />
                    </div>
                    <span className="text-sm">01627800198</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:devoncode98@gmail.com"
                    className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-all duration-300 group footer-card-glow p-3 rounded-lg bg-white/5"
                  >
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Mail className="w-4 h-4 text-blue-400 group-hover:animate-pulse" />
                    </div>
                    <span className="text-sm">devoncode98@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://yeasin-arafat-portfolio-a85d.vercel.app/"
                    className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-all duration-300 group footer-card-glow p-3 rounded-lg bg-white/5"
                  >
                    <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                      <Globe className="w-4 h-4 text-yellow-400 group-hover:animate-spin" />
                    </div>
                    <span className="text-sm">Yeasin-Arafat.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white relative inline-block">
                Stay Connected
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
              </h4>
              <p className="text-gray-400 text-xs italic">
                Follow us on social media for updates and exciting content!
              </p>

              {/* Social Icons */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-700/50 text-gray-400 transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${link.color} hover:border-current shadow-lg hover:shadow-2xl footer-social-ripple`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <link.icon className="w-5 h-5" />
                    {hoveredSocial === index && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded-lg shadow-xl whitespace-nowrap z-20">
                        {link.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider with Glow */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700/50"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-6 bg-gradient-to-r from-transparent via-gray-900 to-transparent">
                <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-center md:text-left space-y-1">
              <p className="text-green-400 text-xs font-medium">
                © {new Date().getFullYear()} AssetVerse Management System. All
                Rights Reserved.
              </p>
              <p className="text-pink-400 text-xs font-medium flex items-center justify-center md:justify-start space-x-1">
                <span>Developed with</span>
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span>by Yeasin Arafat</span>
              </p>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="group relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
              </button>
            )}
          </div>

          {/* Legal Links */}
          <div className="mt-4 pt-3 border-t border-gray-800/50 flex flex-wrap justify-center gap-3 text-xs">
            <a
              href="/privacy"
              className="text-gray-500 hover:text-blue-400 transition-colors footer-link-glow"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="/terms"
              className="text-gray-500 hover:text-purple-400 transition-colors footer-link-glow"
            >
              Terms of Service
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="/cookies"
              className="text-gray-500 hover:text-pink-400 transition-colors footer-link-glow"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
