import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('MESSAGE_SENT.SUCCESS');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 bg-[#FFD700] pixel-corner mb-4">
            <span className="pixel-text text-[#000000] text-sm">CONTACT.EXE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#FFD700] pixel-text">GET_IN_TOUCH</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="border-4 border-[#FFD700] pixel-corner p-6">
              <h3 className="text-2xl text-[#FFD700] pixel-text mb-6">CONTACT_INFO</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#000000]" size={20} />
                  </div>
                  <div>
                    <p className="pixel-text text-[#00FFFF] text-sm mb-1">EMAIL</p>
                    <p className="pixel-text text-[#FFFFFF] text-sm">developer@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#000000]" size={20} />
                  </div>
                  <div>
                    <p className="pixel-text text-[#00FFFF] text-sm mb-1">PHONE</p>
                    <p className="pixel-text text-[#FFFFFF] text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#000000]" size={20} />
                  </div>
                  <div>
                    <p className="pixel-text text-[#00FFFF] text-sm mb-1">LOCATION</p>
                    <p className="pixel-text text-[#FFFFFF] text-sm">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Box */}
            <div className="border-4 border-[#00FFFF] pixel-corner p-6 bg-[#0a0a0a]">
              <p className="pixel-text text-[#FFD700] text-sm leading-relaxed">
                Available for freelance opportunities and full-time positions.
                Let's build something amazing together!
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="border-4 border-[#FFD700] pixel-corner p-6">
              <div className="space-y-4">
                <div>
                  <label className="block pixel-text text-[#FFD700] text-sm mb-2">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border-2 border-[#FFD700] px-4 py-3 text-[#FFFFFF] pixel-text text-sm focus:outline-none focus:border-[#00FFFF] transition-colors"
                    placeholder="ENTER_NAME"
                  />
                </div>

                <div>
                  <label className="block pixel-text text-[#FFD700] text-sm mb-2">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border-2 border-[#FFD700] px-4 py-3 text-[#FFFFFF] pixel-text text-sm focus:outline-none focus:border-[#00FFFF] transition-colors"
                    placeholder="ENTER_EMAIL"
                  />
                </div>

                <div>
                  <label className="block pixel-text text-[#FFD700] text-sm mb-2">MESSAGE</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#0a0a0a] border-2 border-[#FFD700] px-4 py-3 text-[#FFFFFF] pixel-text text-sm focus:outline-none focus:border-[#00FFFF] transition-colors resize-none"
                    placeholder="ENTER_MESSAGE"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFD700] pixel-corner px-6 py-4 hover:bg-[#00FFFF] transition-colors group flex items-center justify-center gap-2"
                >
                  <span className="pixel-text text-[#000000]">SEND_MESSAGE</span>
                  <Send className="text-[#000000]" size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
