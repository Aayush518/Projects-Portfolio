import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
    loading: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState(prev => ({ ...prev, submitted: true, loading: false }));
  };

  return (
    <section id="contact" className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text"
          >
            Contact Me
          </motion.h2>
          <p className="mt-4 text-lg text-white/70">
            I'd love to hear about your project or collaboration ideas.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-white/70">
                Feel free to reach out using the contact details below.
              </p>
            </div>
            <div className="space-y-4">
              <a 
                href="mailto:aayushadhikari518@gmail.com" 
                className="flex items-center gap-4 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <FiMail className="text-primary"/>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-white/60">aayushadhikari37@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-dark-300">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <FiMapPin className="text-primary"/>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-white/60">Pokhara, Nepal</p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            className="bg-dark rounded-xl p-8 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-dark-200 rounded-md border border-dark-400 focus:border-primary outline-none"
                    placeholder="Aayush Adhikari" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-dark-200 rounded-md border border-dark-400 focus:border-primary outline-none"
                    placeholder="aayush@example.com" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm">Message</label>
                <textarea 
                  rows={5} 
                  className="w-full px-4 py-3 bg-dark-200 rounded-md border border-dark-400 focus:border-primary outline-none resize-none"
                  placeholder="Tell me about your project..." 
                  required 
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light rounded-md font-medium text-white"
              >
                {formState.loading
                  ? "Sending..."
                  : formState.submitted
                  ? "Message Sent!"
                  : <>Send Message <FiArrowRight /></>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 