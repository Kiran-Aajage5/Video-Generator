"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const niches = [
    {
        id: "scary-stories",
        title: "Scary Stories",
        description: "Creepy tales and urban legends that will keep you awake at night.",
        icon: "👻",
    },
    {
        id: "motivational",
        title: "Motivational",
        description: "Inspiring stories and quotes to fuel your ambition and drive.",
        icon: "💪",
    },
    {
        id: "fun-facts",
        title: "Fun Facts",
        description: "Fascinating and quirky facts about the world that you didn't know.",
        icon: "🤓",
    },
    {
        id: "health-fitness",
        title: "Health & Fitness",
        description: "Tips and stories for a healthier lifestyle and better well-being.",
        icon: "🏃‍♂️",
    },
    {
        id: "tech-news",
        title: "Tech News",
        description: "The latest updates and innovations from the world of technology.",
        icon: "💻",
    },
    {
        id: "travel-vlogs",
        title: "Travel Vlogs",
        description: "Exploring beautiful destinations and hidden gems across the globe.",
        icon: "✈️",
    },
]

interface NicheSelectionProps {
    selectedNiche: string
    onSelect: (nicheId: string) => void
    customNiche: string
    onCustomNicheChange: (value: string) => void
}

export const NicheSelection = ({
    selectedNiche,
    onSelect,
    customNiche,
    onCustomNicheChange
}: NicheSelectionProps) => {
    return (
        <div className="space-y-8">
            <div className="text-left space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Select your niche</h2>
                <p className="text-zinc-500 text-lg">Choose a niche that best fits your series or create a custom one.</p>
            </div>

            <Tabs defaultValue="available" className="w-full">
                <TabsList className="bg-zinc-100 p-1 h-12 w-fit rounded-xl mb-8">
                    <TabsTrigger
                        value="available"
                        className="rounded-lg px-8 h-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-zinc-600 data-[state=active]:text-zinc-900 transition-all font-medium"
                    >
                        Available Niche
                    </TabsTrigger>
                    <TabsTrigger
                        value="custom"
                        className="rounded-lg px-8 h-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-zinc-600 data-[state=active]:text-zinc-900 transition-all font-medium"
                    >
                        Custom Niche
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="available">
                    <ScrollArea className="h-[450px] pr-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {niches.map((niche) => (
                                <Card
                                    key={niche.id}
                                    className={cn(
                                        "cursor-pointer transition-all border-zinc-200 hover:border-violet-300 p-5 group",
                                        selectedNiche === niche.id ? "border-violet-500 bg-violet-50/30 ring-1 ring-violet-500" : ""
                                    )}
                                    onClick={() => onSelect(niche.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-colors",
                                            selectedNiche === niche.id ? "bg-violet-100" : "bg-zinc-100 group-hover:bg-violet-50"
                                        )}>
                                            {niche.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-zinc-900">{niche.title}</h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{niche.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="custom">
                    <Card className="p-8 border-zinc-200 rounded-2xl shadow-sm space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Custom Niche Name</h3>
                            <div className="space-y-3">
                                <Input
                                    placeholder="Enter your niche (e.g., Space Exploration)"
                                    className="h-14 text-lg px-5 rounded-xl border-zinc-200 focus-visible:ring-violet-500/20 focus-visible:border-violet-500 transition-all bg-white shadow-sm"
                                    value={customNiche}
                                    onChange={(e) => onCustomNicheChange(e.target.value)}
                                />
                                <p className="text-sm text-zinc-500">Provide a name for your specific niche. Our AI will adapt to your choice.</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
