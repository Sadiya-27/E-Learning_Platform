'use client' 

import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { HamburgerMenuIcon , Cross2Icon } from '@radix-ui/react-icons'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

const Navbar = () => {
    const [ menuOpen , setMenuOpen ] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen)
    }

    console.log("hit navbar")
    return ( 
        <nav className="relative w-full h-24 shadow-xl bg-white">

            
            <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
                <Image src="/logo.png" width={200} height={300} alt="logo" className="mt-0 mb-0"/>
                <div className="hidden sm:flex">
                    <ul className="hidden sm:flex">
                        <li className="ml-10 text-l">
                            <a href="">About Us</a>
                        </li>
                        <li className="ml-10 text-l">
                            <a href={'/sign-up'}>Course</a>
                        </li>
                        <li className="ml-10 text-l">
                            <a href={'/sign-up'}>Become a Teacher</a>
                        </li>
                        <li className="mx-5">
                                
                            <Button className="bg-indigo-700 hover:bg-indigo-500 " >
                                
                                    <SignInButton/>
                                
                            </Button>
                        </li>
                        <li>
                            <Button className="bg-indigo-700 hover:bg-indigo-500 ">
                                <SignUpButton/>
                            </Button>
                        </li>
                            
                            
                    </ul>
                </div>
                <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
                    <HamburgerMenuIcon/>
                </div>
                <div className={
                        menuOpen ?
                        "fixed left-0 top-0 w-[65%] sm:hidden shadow-lg bg-slate-200 h-screen p-10 ease-in duration-500 z-50": "fixed left-[-100%] top-0 p-10 ease-in duration-500 "
                        }>
                        
                    <div className="flex w-full items-center justify-end ">
                    {menuOpen && (
                        <div onClick={handleNav} className="cursor-pointer fixed mt-0 top-10 ">
                            <Cross2Icon />
                        </div>
                        )}
                        <div className="flex-col py-4 px-4 ">
                            <ul className="flex-col py-4 px-4">
                                <li>
                                    <Image src="/logo.png" width={300} height={300} alt="logo" className="ml-2"/>
                                </li>
                                <li className="ml-10 text-l">
                                    <a href="">About Us</a>
                                </li>
                                <li className="ml-10 text-l">
                                    <a href="">Course</a>
                                </li>
                                <li className="ml-10 text-l">
                                    <a href="">Become a Teacher</a>
                                </li>
                                <li className="ml-10 text-xl">
                                    <Button className="bg-indigo-700 hover:bg-indigo-500 mt-3 items-center">
                                        <SignInButton />
                                    </Button>
                                </li>
                                <li className="ml-10 text-xl">
                                    <Button className="bg-indigo-700 hover:bg-indigo-500 mt-3 items-center ">
                                        <SignUpButton />
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar ;