'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import CategoryBtn from './CategoryBtn';

const Navbar = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [shake, setShake] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const shakeAnimation = {
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.6 }
    };

    const handleSearchClick = () => {
        setSearchOpen(prev => !prev);
        setShake(true);

        const sound = new Audio('/sounds/shake.mp3');
        sound.volume = 0.6;
        sound.play();

        setTimeout(() => setShake(false), 600);
    };

    const handleDropdownClick = () => {
        const sound = new Audio('/sounds/mouse-click.wav');
        sound.volume = 0.6;
        sound.play();

        setDropdownOpen(prev => !prev)
    }

    return (
        <div className="w-full fixed flex justify-center  bg-p0 text-p6 shadow-lg shadow-p6/10 transition-all duration-300">
            <nav className='cont flex justify-between px-0 lg:p-3'>
                {/* Right Part */}
                <div className="flex items-center gap-4 lg:gap-6 m-2 lg:m-0">
                    {/* logo  */}
                    <Link href={'/'} className='flex gap-1 items-center'>
                        <Image
                            src={'/images/logo.svg'}
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <span className="text-4xl font-semibold">Rosivy</span>
                    </Link>
                    {/* vr line  */}
                    <div className="h-6 w-0.5 bg-p6 rounded hidden md:block"></div>
                    {/* other links  */}
                    <CategoryBtn className='hidden md:flex' />
                    <button className='nav-link'>About Me</button>
                    <button className='nav-link'>Contact Me</button>
                </div>

                {/* Hamburger Button */}
                <motion.button
                    onClick={handleDropdownClick}
                    whileTap={{ scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mx-2 hover:cursor-pointer">
                    {dropdownOpen ? <IoClose size={36} className='md:hidden' /> : <IoMenu size={32} className='md:hidden' />}
                </motion.button>

                {/* Left Part */}
                <div className="hidden md:flex gap-4 items-center">
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={searchOpen ? { width: 200, opacity: 1 } : { width: 0, opacity: 0 }}
                    >
                        <Input
                            placeholder='Search...'
                            className='rounded-full border px-3'
                        />
                    </motion.div>

                    {/* Search Icon with Shake Effect */}
                    <div
                        onClick={handleSearchClick}
                        className="cursor-pointer  transition-all duration-300 w-7 h-7 flex items-center justify-center border-2 rounded-md hover:bg-p4/30"
                    >
                        <motion.div animate={shake ? shakeAnimation : {}}>
                            <FaSearch size={16} />
                        </motion.div>
                    </div>

                    <Image
                        src={'/images/cart.svg'}
                        alt='cart'
                        width={32}
                        height={32}
                    />
                    {false ? (
                        <Image
                            src={'/images/user.svg'}
                            alt='user'
                            width={28}
                            height={28}
                        />) : (
                        <Link href={'/auth/login'} className="nav-btn">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Dropdown Menu with Animation */}
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`${dropdownOpen ? "flex md:hidden " : "hidden"} absolute top-16 left-2 right-2 items-center flex-col gap-3 bg-p0 p-4 rounded-lg`}>
                        <Input
                            placeholder='Search...'
                            className='rounded-full border-2 px-3'
                        />
                        <span className='w-full h-px bg-p6/25'></span>
                        <CategoryBtn className='' />
                        <span className='w-full h-px bg-p6/25'></span>
                        <motion.button whileTap={{ scale: 0.95 }} className='nav-btn'>Cart</motion.button>
                        <span className='w-full h-px bg-p6/25 '></span>
                        {false ? (
                            <motion.button whileTap={{ scale: 0.95 }} className='nav-btn'>Profile</motion.button>) : (
                            <Link href={'/auth/login'} className="nav-btn">
                                Login
                            </Link>
                        )}
                    </motion.div>
                </AnimatePresence>
            </nav>
        </div>
    );
}

export default Navbar;
