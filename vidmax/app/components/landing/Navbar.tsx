
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Zap } from "lucide-react"
import { SignInButton, SignOutButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"


import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">VidMax</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                Log in
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
                                Get Started
                            </Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>


                {/* Mobile Nav */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-zinc-400">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-black/95 backdrop-blur-xl p-6">
                        <div className="flex flex-col gap-6 mt-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <SignedOut>
                                <hr className="border-white/10" />
                                <SignInButton mode="modal">
                                    <button className="text-lg font-medium text-zinc-400 hover:text-white transition-colors text-left" onClick={() => setIsOpen(false)}>
                                        Log in
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white" onClick={() => setIsOpen(false)}>
                                        Get Started
                                    </Button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <UserButton afterSignOutUrl="/" />
                                    <span className="text-sm">Account</span>
                                </div>
                            </SignedIn>

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
