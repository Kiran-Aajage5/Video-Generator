"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
    LayoutDashboard,
    Video,
    BookOpen,
    CreditCard,
    Settings,
    PlusCircle,
    Zap,
    UserCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarOptions = [
    { name: "Series", href: "/dashboard", icon: LayoutDashboard },
    { name: "Videos", href: "/dashboard/videos", icon: Video },
    { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const footerOptions = [
    { name: "Upgrade", href: "/dashboard/upgrade", icon: Zap },
    { name: "Profile Setting", href: "/dashboard/profile", icon: UserCircle },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 h-screen border-r border-zinc-200 bg-white flex flex-col sticky top-0">
            {/* Header */}
            <div className="p-6 flex items-center gap-3">
                <Image
                    src="/logo.png"
                    alt="VidMax Logo"
                    width={32}
                    height={32}
                    className="rounded-lg shadow-sm"
                />
                <span className="font-bold text-xl tracking-tight text-zinc-900">VidMax</span>
            </div>

            {/* Action Button */}
            <div className="px-4 mb-6">
                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white gap-2 h-11 text-base font-medium transition-all shadow-md shadow-violet-200">
                    <PlusCircle className="w-5 h-5" />
                    Create New Series
                </Button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {sidebarOptions.map((option) => {
                    const isActive = pathname === option.href
                    return (
                        <Link
                            key={option.name}
                            href={option.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[15px]",
                                isActive
                                    ? "bg-violet-50 text-violet-600 shadow-sm"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                            )}
                        >
                            <option.icon className={cn("w-5 h-5", isActive ? "text-violet-600" : "text-zinc-400")} />
                            {option.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer Navigation */}
            <div className="p-4 mt-auto border-t border-zinc-100 space-y-1">
                {footerOptions.map((option) => (
                    <Link
                        key={option.name}
                        href={option.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-[15px] text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                        <option.icon className="w-5 h-5 text-zinc-400" />
                        {option.name}
                    </Link>
                ))}
            </div>
        </aside>
    )
}
