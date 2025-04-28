"use client"
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, CreditCard, Layers, Gift, Lock, ChevronRight, Check, ArrowUpRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import BlockchainModel from '@/components/ui/3d';

export default function LandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(prev => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting
        }));
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden">
      {/* Header with animation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 bg-white shadow-sm z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <CreditCard className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CredereX</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['features', 'pricing', 'testimonials', 'contact'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="hidden md:block px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Log in
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign up
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar} 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile sidebar with animation */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl"
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600">Menu</span>
                  <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                <motion.ul 
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {['features', 'pricing', 'testimonials', 'contact'].map((item) => (
                    <motion.li variants={fadeIn} key={item}>
                      <a 
                        href={`#${item}`} 
                        className="block py-2 px-4 hover:bg-gray-100 rounded-lg"
                        onClick={toggleSidebar}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li variants={fadeIn} className="pt-4 border-t">
                    <a href="#login" className="block py-2 px-4 text-center text-indigo-600 font-medium rounded-lg border border-indigo-600">Log in</a>
                  </motion.li>
                  <motion.li variants={fadeIn} className="pt-2">
                    <a href="#signup" className="block py-2 px-4 text-center bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Sign up</a>
                  </motion.li>
                </motion.ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero section with animation */}
      {/* <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                Introducing CredereX
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Web3 Payments Made <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Simple</span>
              </h1>
              <p className="text-lg text-gray-600">
                Accept crypto payments, process transactions on the blockchain, and scale your business globally with our secure, low-fee payment infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  View Demo
                </motion.button>
              </div>
              <div className="pt-4">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-gray-500 flex items-center"
                >
                  <Lock className="h-4 w-4 mr-2" /> Enterprise-grade security and compliance
                </motion.p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-2xl shadow-xl"
              >
                <div className="bg-white rounded-xl p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src="/api/placeholder/640/360" alt="Dashboard preview" className="rounded-lg" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Hero section with 3D blockchain model */}
<section className="py-20 px-4">
  <div className="container mx-auto max-w-6xl">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 space-y-6"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
        >
          Introducing CredereX
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Web3 Payments Made <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Simple</span>
        </h1>
        <p className="text-lg text-gray-600">
          Accept crypto payments, process transactions on the blockchain, and scale your business globally with our secure, low-fee payment infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3  bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            View Demo
          </motion.button>
        </div>
        <div className="pt-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-500 flex items-center"
          >
            <Lock className="h-4 w-4 mr-2" /> Enterprise-grade security and compliance
          </motion.p>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2"
      >
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className=" p-1 rounded-2xl shadow-xl"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 bg-white rounded-xl p-4">
            {/* Replace static image with interactive 3D blockchain model */}
            <div className="aspect-video rounded-lg">
              <BlockchainModel />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
      
      {/* Stats section with counter animation */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "$1B+", label: "Transaction Volume" },
              { value: "10,000+", label: "Businesses" },
              { value: "150+", label: "Countries" },
              { value: "0.5%", label: "Transaction Fee" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="space-y-2"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-3xl font-bold text-indigo-600"
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Features section with hover effects */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose CredereX?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our web3 payment infrastructure gives you the tools to accept payments globally with lower fees, faster settlements, and enhanced security.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <CreditCard className="h-6 w-6 text-indigo-600" />, 
                title: "Global Payments", 
                desc: "Accept payments in 50+ cryptocurrencies and settle in your preferred stablecoin or fiat currency." 
              },
              { 
                icon: <Layers className="h-6 w-6 text-indigo-600" />, 
                title: "Low Fees", 
                desc: "Save up to 70% on transaction fees compared to traditional payment processors." 
              },
              { 
                icon: <Lock className="h-6 w-6 text-indigo-600" />, 
                title: "Enhanced Security", 
                desc: "Leverage blockchain technology for tamper-proof transactions and reduced fraud risks." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Simple Integration</h3>
                <p className="text-gray-600 mb-6">
                  Get up and running in minutes with our developer-friendly SDKs and comprehensive API documentation.
                </p>
                <motion.ul 
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {['One-click checkout', 'Customizable payment flows', 'Webhooks for events', 'Pre-built UI components'].map((item, i) => (
                    <motion.li key={i} variants={fadeIn} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="mt-8 self-start flex items-center text-indigo-600 font-medium"
                >
                  Read the docs <ChevronRight className="ml-1 h-4 w-4" />
                </motion.button>
              </div>
              <div className="bg-gray-100 p-6 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-100 rounded-md w-3/4"></div>
                    <div className="h-24 bg-gray-100 rounded-md"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-gray-100 rounded-md"></div>
                      <div className="h-10 bg-indigo-100 rounded-md"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing section with hover animations */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Transparent, Simple Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprises. Just straightforward pricing that scales with your business.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                desc: "For small businesses",
                price: "0.8%",
                features: [
                  'Up to $50k monthly volume',
                  'Accept 10+ cryptocurrencies',
                  'Basic analytics',
                  'Email support'
                ],
                popular: false
              },
              {
                name: "Business",
                desc: "For growing companies",
                price: "0.5%",
                features: [
                  'Up to $500k monthly volume',
                  'Accept 30+ cryptocurrencies',
                  'Advanced analytics',
                  'Priority support',
                  'Custom payment pages'
                ],
                popular: true
              },
              {
                name: "Enterprise",
                desc: "For large organizations",
                price: "Custom",
                features: [
                  'Unlimited monthly volume',
                  'All cryptocurrencies supported',
                  'Custom integration support',
                  'Dedicated account manager',
                  'Custom contracts and SLAs',
                  'Advanced security features'
                ],
                popular: false
              }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className={`bg-white p-8 rounded-xl ${plan.popular ? 'border-2 border-indigo-600 relative shadow-lg' : 'border border-gray-100 shadow-sm'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                    Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-gray-500 mt-1">{plan.desc}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-500 ml-2">per transaction</span>}
                  </div>
                </div>
                <motion.ul 
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 mb-8"
                >
                  {plan.features.map((item, j) => (
                    <motion.li key={j} variants={fadeIn} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 font-medium rounded-lg transition-colors ${
                    plan.popular 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials section with carousel */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Trusted by Innovative Companies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about transforming their payment infrastructure with CredereX.
            </p>
          </motion.div>
          
          <div className="relative overflow-hidden">
            <motion.div 
              animate={{ x: `${-100 * activeTestimonial}%` }}
              transition={{ type: "spring", damping: 20 }}
              className="flex"
            >
              {[
                {
                  name: "Sarah Johnson",
                  title: "CTO, TechNova",
                  content: "Integrating CredereX into our platform reduced our payment processing costs by 65% while improving transaction speed. Our customers love the seamless experience."
                },
                {
                  name: "Marcus Chen",
                  title: "Founder, DeFi Marketplace",
                  content: "CredereX allowed us to expand globally overnight. We now process payments from 42 countries with instant settlements and minimal fraud issues."
                },
                {
                  name: "Elena Rodriguez",
                  title: "CFO, Global Commerce",
                  content: "The analytics dashboard gives us unprecedented insights into our payment flows. Implementation was smooth, and their support team has been exceptional."
                }
              ].map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto"
                  >
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      "{testimonial.content}"
                    </p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full ${activeTestimonial === i ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  whileHover={{ scale: 1.5 }}
                  animate={{ scale: activeTestimonial === i ? 1.2 : 1 }}
                />
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <Alert>
              <AlertTitle className="text-xl font-semibold mb-2">Ready to transform your payments?</AlertTitle>
              <AlertDescription className="text-gray-600">
                Join thousands of businesses already using CredereX to power their payment infrastructure.
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Get Started Today
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Schedule a Demo
                  </motion.button>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>
      
      {/* Logos section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-gray-500 mb-8">TRUSTED BY LEADING COMPANIES</p>
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-6 gap-8"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                className="h-12 bg-gray-200 rounded flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm">LOGO</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA section */}
      <section id="contact" className="py-20 px-4 bg-indigo-600">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-indigo-100 mb-8">
                Join thousands of businesses already using CredereX to power their payment infrastructure. It takes just minutes to set up your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                  Create Account
                </button>
                <button className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Get a personalized demo</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Company Inc." />
                </div>
                <button className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Request Demo
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* FAQ Section with accordion */}
<section className="py-20 px-4 bg-white">
  <div className="container mx-auto max-w-6xl">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Get answers to common questions about CredereX's features, integration, and security.
      </p>
    </motion.div>
    
    <div className="max-w-3xl mx-auto">
      {[
        {
          question: "How does CredereX ensure transaction security?",
          answer: "CredereX uses industry-leading security practices including end-to-end encryption, multi-signature wallets, and real-time fraud monitoring. All transactions are recorded on the blockchain for transparency and immutability, while our compliance team ensures adherence to global regulations."
        },
        {
          question: "Which cryptocurrencies does CredereX support?",
          answer: "CredereX supports all major cryptocurrencies including Bitcoin, Ethereum, Solana, Polygon, and over 50 others. Our platform also supports stablecoins like USDC, USDT, and DAI for businesses that prefer stable value transactions."
        },
        {
          question: "How long does integration take?",
          answer: "Most businesses can integrate CredereX in less than a day using our SDK and API. Our no-code solution can be implemented in minutes, while custom integrations typically take 2-3 days with support from our integration team."
        },
        {
          question: "How are transaction fees calculated?",
          answer: "Our transaction fees are transparent and straightforward, starting at 0.8% for the Starter plan and decreasing to 0.5% for the Business plan. Enterprise clients receive custom pricing based on volume. There are no hidden fees, monthly minimums, or setup charges."
        },
        {
          question: "Can I settle transactions in my local currency?",
          answer: "Yes, CredereX supports settlement in over 20 fiat currencies including USD, EUR, GBP, JPY, and more. You can choose to receive payments directly in your bank account or keep them in cryptocurrency."
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="mb-4"
        >
          <motion.div 
            className="border border-gray-200 rounded-lg overflow-hidden"
            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
          >
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium">{item.question}</h3>
                <span className="ml-4 flex-shrink-0">
                  <ChevronRight className="h-5 w-5 text-gray-500 group-open:rotate-90 transition-transform" />
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            </details>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Web3 Technology & Blockchain Section */}
<section className="py-20 px-4 bg-gray-50">
  <div className="container mx-auto max-w-6xl">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
        Web3 Native
      </div>
      <h2 className="text-3xl font-bold mb-4">Built on Blockchain Technology</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        CredereX leverages the power of decentralized networks to enable secure, transparent, and low-cost payment transfers globally.
      </p>
    </motion.div>
    
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-6">Supported Blockchains</h3>
        <motion.div 
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            "Ethereum", "Solana", "Polygon", 
            "Binance Smart Chain", "Avalanche", "Arbitrum",
            "Optimism", "Base"
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-lg mr-3"></div>
                <span className="font-medium">{item}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Web3 Advantages</h3>
          <div className="space-y-6">
            {[
              {
                title: "Decentralized Infrastructure",
                items: ["No single point of failure", "Censorship resistant", "24/7 availability", "Trustless transactions"]
              },
              {
                title: "Crypto-Native Features",
                items: ["Multi-token support", "Cross-chain bridging", "Smart contract automation", "Gas optimization"]
              },
              {
                title: "DeFi Integration",
                items: ["Earn yield on reserves", "Instant liquidity", "Token swaps", "Stablecoin settlement"]
              }
            ].map((group, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-medium text-indigo-600">{group.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <div key={j} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
    
    {/* Additional web3 payment features */}
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Instant Settlements",
            description: "Receive funds in minutes instead of days with blockchain-based transfers that never sleep."
          },
          {
            title: "Global Accessibility",
            description: "Send and receive payments anywhere in the world without intermediaries or banking restrictions."
          },
          {
            title: "Full Transparency",
            description: "Track every transaction on the blockchain with complete visibility and immutable records."
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-indigo-100">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>

{/* Footer section with social links and sitemap */}
<section className="py-16 px-4 bg-gray-900 text-gray-300">
  <div className="container mx-auto max-w-6xl">
    <div className="grid md:grid-cols-4 gap-8">
      {/* Company info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8 text-indigo-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CredereX</span>
        </div>
        <p className="text-sm text-gray-400">
          The future of web3 payments, making blockchain transactions simple, secure, and accessible for businesses of all sizes.
        </p>
        <div className="flex space-x-4 pt-2">
          {/* Social media icons */}
          {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social, i) => (
            <motion.a 
              key={i} 
              href="#" 
              whileHover={{ y: -5, color: '#818cf8' }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">{social}</span>
              <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      
      {/* Product links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Product</h3>
        <motion.ul 
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {['Features', 'Pricing', 'Integrations', 'Documentation', 'API Reference', 'Status'].map((item, i) => (
            <motion.li key={i} variants={fadeIn}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      
      {/* Company links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Company</h3>
        <motion.ul 
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {['About Us', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'].map((item, i) => (
            <motion.li key={i} variants={fadeIn}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      
      {/* Resources links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Resources</h3>
        <motion.ul 
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {['Help Center', 'Community', 'Security', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
            <motion.li key={i} variants={fadeIn}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
    
    <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-gray-500 mb-4 md:mb-0">
        © {new Date().getFullYear()} CredereX, Inc. All rights reserved.
      </p>
      <div className="flex space-x-6">
        <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
          Terms of Service
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
          Cookie Policy
        </a>
      </div>
    </div>
  </div>
</section>
</div> 
)}                            
 