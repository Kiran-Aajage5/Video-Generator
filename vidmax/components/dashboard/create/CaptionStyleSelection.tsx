"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CaptionStyles } from "@/lib/constants"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CaptionStyleSelectionProps {
    selectedStyle: string
    onStyleSelect: (styleId: string) => void
}

const PREVIEW_TEXT = "Viral Short Videos"

// Predefined animated components for each style
const CaptionPreview = ({ styleId }: { styleId: string }) => {
    const [key, setKey] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prev => prev + 1)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const words = PREVIEW_TEXT.split(" ")

    switch (styleId) {
        case "classic":
            return (
                <div className="flex items-center justify-center h-full bg-zinc-900 rounded-lg overflow-hidden">
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-white font-black text-2xl uppercase italic tracking-tighter"
                        style={{ WebkitTextStroke: "1px black", textShadow: "2px 2px 0px #000" }}
                    >
                        {PREVIEW_TEXT}
                    </motion.div>
                </div>
            )
        case "highlight":
            return (
                <div className="flex items-center justify-center h-full bg-zinc-900 rounded-lg overflow-hidden gap-2">
                    {words.map((word, i) => (
                        <motion.span
                            key={`${key}-${i}`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.2, type: "spring", stiffness: 300 }}
                            className="text-yellow-400 font-black text-2xl uppercase"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            )
        case "neon":
            return (
                <div className="flex items-center justify-center h-full bg-black rounded-lg overflow-hidden">
                    <motion.div
                        key={key}
                        animate={{
                            textShadow: [
                                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa",
                                "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0fa, 0 0 40px #0fa",
                                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa"
                            ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white font-bold text-2xl"
                    >
                        {PREVIEW_TEXT}
                    </motion.div>
                </div>
            )
        case "minimal":
            return (
                <div className="flex items-center justify-center h-full bg-white rounded-lg overflow-hidden">
                    <motion.div
                        key={key}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-zinc-900 font-light tracking-widest text-xl"
                    >
                        {PREVIEW_TEXT}
                    </motion.div>
                </div>
            )
        case "elegant":
            return (
                <div className="flex items-center justify-center h-full bg-zinc-50 rounded-lg overflow-hidden">
                    <motion.div key={key} className="flex overflow-hidden">
                        {PREVIEW_TEXT.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="text-zinc-800 font-serif italic text-2xl"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            )
        case "dynamic":
            return (
                <div className="flex items-center justify-center h-full bg-zinc-900 rounded-lg overflow-hidden gap-1">
                    {words.map((word, i) => (
                        <motion.span
                            key={`${key}-${i}`}
                            animate={{
                                y: [0, -10, 0],
                                color: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
                            }}
                            transition={{
                                y: { duration: 0.5, repeat: Infinity, repeatDelay: i * 0.1 },
                                color: { duration: 2, repeat: Infinity }
                            }}
                            className="font-black text-2xl"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            )
        default:
            return null
    }
}

export const CaptionStyleSelection = ({
    selectedStyle,
    onStyleSelect
}: CaptionStyleSelectionProps) => {
    return (
        <div className="space-y-6">
            <div className="text-left space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Caption style</h2>
                <p className="text-zinc-500 text-lg">Select how your subtitles will appear on screen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CaptionStyles.map((style) => {
                    const isSelected = selectedStyle === style.id

                    return (
                        <Card
                            key={style.id}
                            className={cn(
                                "cursor-pointer transition-all border-zinc-200 hover:border-violet-300 p-1 group relative flex flex-col h-[280px]",
                                isSelected ? "border-violet-500 ring-2 ring-violet-500" : ""
                            )}
                            onClick={() => onStyleSelect(style.id)}
                        >
                            <div className="flex-1 p-2">
                                <CaptionPreview styleId={style.id} />
                            </div>

                            <div className="p-4 bg-white border-t border-zinc-100 rounded-b-xl flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h3 className="font-bold text-zinc-900">{style.label}</h3>
                                    <p className="text-xs text-zinc-500 line-clamp-1">{style.description}</p>
                                </div>
                                {isSelected && (
                                    <div className="bg-violet-500 rounded-full p-1 shrink-0">
                                        <Check className="w-4 h-4 text-white stroke-[3px]" />
                                    </div>
                                )}
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
