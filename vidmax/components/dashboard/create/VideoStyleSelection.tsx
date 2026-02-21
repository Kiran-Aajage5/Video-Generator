"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { VideoStyles } from "@/lib/constants"
import { Check } from "lucide-react"
import Image from "next/image"

interface VideoStyleSelectionProps {
    selectedStyle: string
    onStyleSelect: (styleId: string) => void
}

export const VideoStyleSelection = ({
    selectedStyle,
    onStyleSelect
}: VideoStyleSelectionProps) => {
    return (
        <div className="space-y-6">
            <div className="text-left space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Video style</h2>
                <p className="text-zinc-500 text-lg">Choose a visual style that fits your story.</p>
            </div>

            <ScrollArea className="w-full whitespace-nowrap rounded-xl border-none">
                <div className="flex gap-4 pb-4">
                    {VideoStyles.map((style) => {
                        const isSelected = selectedStyle === style.id

                        return (
                            <div
                                key={style.id}
                                className="inline-block w-[200px]"
                            >
                                <Card
                                    className={cn(
                                        "cursor-pointer transition-all border-zinc-200 hover:border-violet-300 group relative overflow-hidden",
                                        "aspect-[9/16] h-[350px] w-full bg-zinc-100",
                                        isSelected ? "border-violet-500 ring-2 ring-violet-500" : ""
                                    )}
                                    onClick={() => onStyleSelect(style.id)}
                                >
                                    <Image
                                        src={style.image}
                                        alt={style.label}
                                        fill
                                        className={cn(
                                            "object-cover transition-transform duration-500",
                                            "group-hover:scale-110",
                                            isSelected ? "scale-105 opacity-90" : ""
                                        )}
                                        sizes="200px"
                                    />

                                    {/* Overlay for label */}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-bold tracking-wide">{style.label}</span>
                                            {isSelected && (
                                                <div className="bg-violet-500 rounded-full p-1">
                                                    <Check className="w-4 h-4 text-white stroke-[3px]" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Selection Glow */}
                                    {isSelected && (
                                        <div className="absolute inset-0 border-4 border-violet-500 rounded-xl" />
                                    )}
                                </Card>
                            </div>
                        )
                    })}
                </div>
                <ScrollBar orientation="horizontal" className="bg-zinc-100" />
            </ScrollArea>
        </div>
    )
}
