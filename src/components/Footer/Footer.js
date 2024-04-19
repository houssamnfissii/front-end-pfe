import React from 'react';
import { FaBehance, FaClock, FaFacebookF, FaInstagram, FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 mx-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img src="/logo.svg" alt="Logo" className="mx-auto mb-4 w-24" />
            <p className="text-gray-400 text-lg leading-relaxed">
              Continually productize compelling dome packed with all elated utilize website and creating supply next-generation
            </p>
            <h5 className="font-semibold text-xl mt-6 mb-3 text-white">Follow us on</h5>
            <div className="flex justify-center space-x-4">
              <FaFacebookF size={20} />
              <FaBehance size={20} />
              <FaInstagram size={20} />
              <FaWhatsapp size={20} />
              <FaLinkedin size={20} />
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-xl mb-4  text-white">Tour Type</h5>
            <ul className="text-gray-400">
              <li className="mb-2 hover:text-primary cursor-pointer">Adventure Tours</li>
              <li className="mb-2 hover:text-primary cursor-pointer">Group Tours</li>
              <li className="mb-2 hover:text-primary cursor-pointer">Seasonal Tours</li>
              <li className="mb-2 hover:text-primary cursor-pointer">Relaxation Tours</li>
              <li className="mb-2 hover:text-primary cursor-pointer">Family Friendly Tours</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xl mb-4  text-white">Contact Info</h5>
            <ul className="text-gray-400">
              <li className="mb-2 flex items-center">
                <FaPhone size={20} className="mr-2" />
                +9999-379-938-3873, +1726-363-280
              </li>
              <li className="mb-2 flex items-center">
                <FaClock size={20} className="mr-2" />
                Mon-Fri 09:00-18:00 (except public holidays)
              </li>
              <li className="mb-2 flex items-center">
                <FaLocationPin size={20} className="mr-2" />
                25/2 Vokte Street Building, Melbourne City
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-xl mb-4  text-white">Gallery</h5>
            <div className="grid grid-cols-3 gap-2">
              <img src="/images/hotel.jpg" alt="Gallery 1" className="rounded-lg w-full" />
              <img src="/images/hotelAga.jpg" alt="Gallery 2" className="rounded-lg w-full" />
              <img src="/images/hotelHoc.jpg" alt="Gallery 3" className="rounded-lg w-full" />
              <img src="/images/hotelMar.jpg" alt="Gallery 4" className="rounded-lg w-full" />
              <img src="/images/hotelHoc.jpg" alt="Gallery 5" className="rounded-lg w-full" />
              <img src="/images/hotelAga.jpg" alt="Gallery 6" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-6 bg-gray-800">
        <p className="text-gray-400">© 2024. All Rights Reserved By VISITMOROCCO</p>
      </div>
    </footer>
  );
}
