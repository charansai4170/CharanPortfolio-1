import { motion } from 'framer-motion';
import { Link } from 'wouter';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Simple navigation bar for testing */}
      <div className="fixed top-4 left-4 z-50 flex space-x-4">
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/about" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          About
        </Link>
        <Link href="/contact" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
          Contact
        </Link>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-text mb-6">
            Contact
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is the contact page. The loading screen should show when navigating here from any other page.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;