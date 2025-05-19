import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">About Developer</h3>
            <p className="text-sm">
              Developed by Omnateeta V U, a Computer Science and Engineering student at REC Hulkoti.
              Passionate about creating innovative web solutions and user-friendly applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop/listing" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/shop/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/shop/account" className="hover:text-white transition-colors">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Connect With Me</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:omnateeta3@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5" />
                <span>omnateeta3@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/omnateeta-v-unnimath-0b815b338"
                className="flex items-center gap-2 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
                <span>Omnateeta V Unnimath</span>
              </a>
              <a
                href="https://github.com/omnateeta"
                className="flex items-center gap-2 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
                <span>omnateeta</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {new Date().getFullYear()} E-commerce Store. All rights reserved.</p>
          <p className="mt-2">
            Developed with ❤️ by Omnateeta V U | REC Hulkoti
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 