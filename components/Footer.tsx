import Link from 'next/link';
import React from 'react';
import { MdAlternateEmail, MdLocalPhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-p6 w-full flex justify-center'>
      <div className="cont px-4 py-10 text-p0 space-y-8 w-full max-w-6xl">
        {/* Subscribe input box */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className="w-fit flex flex-col min-[320px]:flex-row justify-between items-center p-2 rounded-lg border-2 border-white bg-p1/10 gap-2">
            <input
              type="text"
              className="text-p0 outline-none placeholder:text-p0/75 bg-transparent"
              placeholder='Enter your email' />
            <div className="h-px w-full bg-white min-[320px]:w-px min-[320px]:h-8"></div>
            <button className='hover:bg-p1 px-2 py-1 rounded-md text-p0 hover:text-p6 cursor-pointer border border-p0 transition-all duration-300'>
              Subscribe
            </button>
          </div>

          <div className='flex flex-col items-center md:items-end text-center md:text-right'>
            <h2 className='font-semibold'>Know more:</h2>
            <span className='flex items-center gap-2'>
              <MdAlternateEmail size={20} />
              <span>contact@rosivy.com</span>
            </span>
            <span className='flex items-center gap-2'>
              <MdLocalPhone size={20} />
              <span>+92 230932 233434</span>
            </span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className='space-x-2'>
              <Link href={'/'} className='hover:text-black'>About Us</Link>
              <span>|</span>
              <Link href={'/'} className='hover:text-black'>Contact Us</Link>
            </div>
            <div className='space-x-2'>
              <Link href={'/'} className='hover:text-black'>Terms & Conditions</Link>
              <span>|</span>
              <Link href={'/'} className='hover:text-black'>Privacy Policy</Link>
              <span>|</span>
              <Link href={'/'} className='hover:text-black'>Return Policy</Link>
            </div>
          </div>
          
          <div className='flex items-center gap-2'>
            <h3>Follow us on:</h3>
            <Link href={'/'}><FaInstagram size={20} className='hover:text-black' /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
