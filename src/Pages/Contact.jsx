import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // EmailJS sendEmail function (same as before)
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // SIMULATED SUCCESS (replace with EmailJS)
    setTimeout(() => {
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="px-4 mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1" />
          <span className="text-sm font-medium uppercase tracking-wider">Home</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? Send us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info + Map */}
          <div className="lg:row-span-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                Contact Info
              </h2>
              <p className="text-white/60 leading-relaxed">Have questions? We're here to help.</p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              <a href="mailto:info@manami.com" className="group flex items-start space-x-4 p-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl transition-all duration-400 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-2 shadow-xl">
                <div className="w-14 h-14 backdrop-blur-sm bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:bg-white/30 transition-all">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Email Us</h4>
                  <p className="text-white/70 group-hover:text-white transition-colors">info@manami.com</p>
                </div>
              </a>

              <a href="tel:+880123456789" className="group flex items-start space-x-4 p-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl transition-all duration-400 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-2 shadow-xl">
                <div className="w-14 h-14 backdrop-blur-sm bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:bg-white/30 transition-all">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Call Us</h4>
                  <p className="text-white/70 group-hover:text-white transition-colors">+880 1234 56789</p>
                </div>
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="relative">
              <div className="backdrop-blur-sm bg-white/5 border border-white/20 rounded-3xl p-2 shadow-2xl mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.801248997614!2d90.39409961495938!3d23.74504948454962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQ0JzQyLjQiTiA5MMKwMjMnMzguNSJF!5e0!3m2!1sen!2sbd!4v1730789012345!5m2!1sen!2sbd"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Manami Garments Location"
                  className="w-full h-[400px] md:h-[500px] rounded-2xl shadow-2xl"
                />
              </div>
              <div className="text-center pt-4">
                <MapPin size={24} className="mx-auto mb-3 text-emerald-400" />
                <p className="text-lg font-bold text-white">House #12, Road #5</p>
                <p className="text-white/70">Dhanmondi, Dhaka-1205</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-8 backdrop-blur-sm bg-white/5 border border-white/20 rounded-3xl shadow-xl">
              <h4 className="font-bold text-xl mb-4 flex items-center space-x-3">
                <span>🕒</span>
                <span>Working Hours</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Sunday-Thursday</span><span>9AM - 7PM</span></div>
                <div className="flex justify-between"><span>Friday</span><span>Closed</span></div>
                <div className="flex justify-between font-bold text-emerald-400"><span>Saturday</span><span>10AM - 5PM</span></div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                Send Message
              </h2>
              <p className="text-white/60">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            {isSuccess ? (
              <div className="p-12 backdrop-blur-xl bg-emerald-500/20 border-2 border-emerald-400/50 rounded-4xl text-center shadow-2xl shadow-emerald-500/25">
                <CheckCircle size={64} className="mx-auto mb-6 text-emerald-400 shadow-lg" />
                <h3 className="text-3xl font-black mb-4 text-white">Message Sent!</h3>
                <p className="text-xl text-white/90 mb-8">Thank you for contacting us. We'll respond within 24 hours.</p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-10 py-4 backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/30 rounded-3xl font-bold uppercase tracking-wider text-lg transition-all duration-400 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-white/80 mb-3 uppercase tracking-wider">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 backdrop-blur-sm bg-white/5 hover:bg-white/10 border rounded-3xl text-white placeholder-white/50 font-medium text-lg transition-all duration-400 shadow-xl focus:outline-none focus:shadow-white/20 focus:border-white/40 ${errors.name ? 'border-rose-500/50 shadow-rose-500/20' : 'border-white/20'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-rose-400 text-sm mt-2 ml-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-lg font-bold text-white/80 mb-3 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 backdrop-blur-sm bg-white/5 hover:bg-white/10 border rounded-3xl text-white placeholder-white/50 font-medium text-lg transition-all duration-400 shadow-xl focus:outline-none focus:shadow-white/20 focus:border-white/40 ${errors.email ? 'border-rose-500/50 shadow-rose-500/20' : 'border-white/20'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-rose-400 text-sm mt-2 ml-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-lg font-bold text-white/80 mb-3 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 backdrop-blur-sm bg-white/5 hover:bg-white/10 border rounded-3xl text-white placeholder-white/50 font-medium text-lg transition-all duration-400 shadow-xl focus:outline-none focus:shadow-white/20 focus:border-white/40 ${errors.subject ? 'border-rose-500/50 shadow-rose-500/20' : 'border-white/20'}`}
                    placeholder="Order inquiry, bulk order, etc."
                  />
                  {errors.subject && <p className="text-rose-400 text-sm mt-2 ml-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-lg font-bold text-white/80 mb-3 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 backdrop-blur-sm bg-white/5 hover:bg-white/10 border rounded-3xl text-white placeholder-white/50 font-medium text-lg resize-vertical transition-all duration-400 shadow-xl focus:outline-none focus:shadow-white/20 focus:border-white/40 ${errors.message ? 'border-rose-500/50 shadow-rose-500/20' : 'border-white/20'}`}
                    placeholder="Tell us about your project requirements..."
                  />
                  {errors.message && <p className="text-rose-400 text-sm mt-2 ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-8 backdrop-blur-2xl bg-gradient-to-r from-white/20 via-white/10 to-transparent border-2 border-white/30 rounded-4xl font-black text-2xl uppercase tracking-widest flex items-center justify-center space-x-4 transition-all duration-500 hover:shadow-2xl hover:shadow-white/40 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Send size={28} className={`transition-transform group-hover:scale-110 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
