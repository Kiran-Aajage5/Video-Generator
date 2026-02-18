"use client"

import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
    return (
        <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden text-zinc-600">
                    <Menu className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight hidden md:block">Dashboard</h1>
            </div>


            <div className="flex items-center gap-4">
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "w-9 h-9 border border-zinc-200"
                        }
                    }}
                />
            </div>
        </header>
    )
}
