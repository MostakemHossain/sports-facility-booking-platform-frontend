import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#071224] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-3xl font-bold">
              Sport <span className="text-orange-600">Ease</span>
            </h2>
            <p className="mt-4 text-gray-400">
              At SportEase, we provide top-notch sports facilities tailored to
              meet the needs of athletes and enthusiasts alike. Our mission is
              to offer a comprehensive and enjoyable experience for everyone who
              walks through our doors.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" className="text-blue-600 hover:text-gray-400">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">Company</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-gray-200">
                  About us
                </Link>
              </li>
              <li>
                <Link to="facilities" className="hover:text-gray-200">
                  Facility
                </Link>
              </li>
              <li>
                <Link to="contact" className="hover:text-gray-200">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Article & News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Legal Notice
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-xl font-bold">Services</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-200">
                  Academy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Group Lesson
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Private Lesson
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Badminton for Kids
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Badminton for Adult
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Court Rent
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-bold">Support</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Ticket Support
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gray-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-white">Sport</span>{" "}
            <span className="text-orange-500">Ease</span>, All rights reserved.
            Powered by Mostakem.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400">
              <span className="inline-block w-2 h-2 bg-blue-600 mr-2 rounded-square"></span>
              Terms of Use
            </a>
            <a href="#" className="hover:text-yellow-400">
              <span className="inline-block w-2 h-2 bg-blue-600 mr-2 rounded-square"></span>
              Privacy Policy
            </a>
            <a href="#" className="hover:text-yellow-400">
              <span className="inline-block w-2 h-2 bg-blue-600 mr-2 rounded-square"></span>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
