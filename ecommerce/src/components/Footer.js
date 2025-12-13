import Link from 'next/link'
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-gray-800/70">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-medium text-gray-500 hover:text-black transition-all">
                        Home
                    </Link>
                    <Link href="#" className="font-medium text-gray-500 hover:text-black transition-all">
                        Products
                    </Link>
                    <Link href="/features/About" className="font-medium text-gray-500 hover:text-black transition-all">
                        About
                    </Link>
                    <Link href="/features/contact" className="font-medium text-gray-500 hover:text-black transition-all">
                        Contact
                    </Link>
                    
                </div>
                <div className="flex items-center gap-4 mt-8 text-indigo-500">
                    <Link target='_blank' href="https://www.linkedin.com/in/toko-migineishvili-a19770370/" className="hover:-translate-y-0.5 transition-all duration-300">
                        <FaLinkedin className='text-2xl'/>
                    </Link>
                    <Link target='_blank' href="https://www.facebook.com/toko.migineishvili.2025/" className="hover:-translate-y-0.5 transition-all duration-300">
                        <FaFacebook className='text-2xl'/>
                    </Link>
                    <Link target='_blank' href="https://www.instagram.com/tokomigineishvili/?next=%2F" className="hover:-translate-y-0.5 transition-all duration-300">
                        <FaInstagram className='text-2xl'/>
                    </Link>
                    <Link target='_blank' href="https://github.com/Toko122?tab=repositories" className="hover:-translate-y-0.5 transition-all duration-300">
                        <FaGithub className='text-2xl'/>
                    </Link>
                </div>
                <p className="mt-8 text-center">Copyright © 2025 <Link href="https://prebuiltui.com">PrebuiltUI</Link>. All rights reservered.</p>
            </footer>
        </>
  )
}

export default Footer