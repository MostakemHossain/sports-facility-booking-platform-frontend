/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { toast } from "sonner";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import { useCreateContactMutation } from "../redux/features/contact/contact.api";

const ContactUs = () => {
  const [createContact] = useCreateContactMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await createContact(data).unwrap();

      if (res?.success) {
        toast.success(res?.message, {
          className: "custom-toast",
        });
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://pikwizard.com/pw/medium/eb395e8733382b36a485555e49d0aa23.jpg"
            alt="Contact Us"
            className="w-full object-cover"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-70 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-2xl md:text-4xl font-bold">
              Contact Us
            </h1>
            <p className="text-white text-base md:text-xl mt-2">
              Get in touch and let us know how we can help.
            </p>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">Our Facilities</h2>
            <p className="text-gray-600 mb-8">
              Whether you're looking to book a tennis court, soccer field, or
              swimming lane, our state-of-the-art facilities are here to meet
              your sports and fitness needs. Contact us to learn more about
              memberships, facility rentals, and special events.
            </p>
            <div className="space-y-6">
              {/* Our Location */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="text-gray-600">
                    123 Sports Avenue, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
              {/* Email Us */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <FaEnvelope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-gray-600">info@sportsfacility.com</p>
                  <p className="text-gray-600">support@sportsfacility.com</p>
                </div>
              </div>
              {/* Call Us */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <FaPhoneAlt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-gray-600">Phone: +880 (555) 123-4567</p>
                  <p className="text-gray-600">Fax: +880 (555) 765-4321</p>
                </div>
              </div>
              {/* Headquarters Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <FaEnvelope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Headquarters Email</h3>
                  <p className="text-gray-600">hq@sportsfacility.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send a Message Section */}
          <div>
            <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-gray-500 mb-8">
              Have questions about our facilities, membership options, or
              upcoming events? Fill out the form below, and our team will get
              back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                placeholder="Message"
                {...register("message")}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className=" mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Find Us on the Map
          </h2>
          <div className="w-full h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8488450873957!2d90.38035531543248!3d23.75127169469843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85817eae73b%3A0x2b14e7e2e8a53547!2s123%20Sports%20Ave%2C%20Dhaka%201210%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1632480317398!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, height: "600px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="mt-72">
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
