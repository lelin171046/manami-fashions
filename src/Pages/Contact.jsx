import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-14 pb-20">

      

      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Contact Us
          </h1>

          {/* Email */}
          <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
            <Mail className="text-blue-500" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">info@manamifashions.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
            <Phone className="text-green-500" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-600">+880 1XXXXXXXXX</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-4 bg-white p-6 rounded-xl shadow">
            <MapPin className="text-red-500" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-700 font-medium">
                Manami Fashions Ltd
              </p>
              <p className="text-gray-600">
                Kabirpur, Ashulia, Savar
              </p>
              <p className="text-gray-600">
                Dhaka-1349, Bangladesh
              </p>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white p-2 rounded-xl shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14578.131895116261!2d90.23798910082986!3d24.012263618715693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e68cb0691c1b%3A0xfefc5cad61b47bbb!2sMANAMI%20FASHIONS%20LTD!5e0!3m2!1sen!2sbd!4v1772897590690!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              className="rounded-lg"
              title="Manami Fashions Ltd Location"
            ></iframe>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Send Message
          </h2>

          {isSuccess ? (
            <div className="text-center py-10">
              <CheckCircle size={50} className="mx-auto text-green-500 mb-4" />
              <p className="text-lg font-medium">
                Message Sent Successfully
              </p>
            </div>
          ) : (
            <form onSubmit={sendEmail} className="space-y-5">

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <textarea
                rows="5"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {isLoading ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;