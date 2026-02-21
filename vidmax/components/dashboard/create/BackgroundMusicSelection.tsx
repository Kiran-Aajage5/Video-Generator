"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Play, Pause, Music, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { BackgroundMusic } from "@/lib/constants"

interface BackgroundMusicSelectionProps {
    selectedMusic: string[]
    onMusicSelect: (musicUrls: string[]) => void
}

export const BackgroundMusicSelection = ({
    selectedMusic,
    onMusicSelect
}: BackgroundMusicSelectionProps) => {
    const [playingMusic, setPlayingMusic] = useState<string | null>(null)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    const handleTogglePreview = (e: React.MouseEvent, musicUrl: string) => {
        e.stopPropagation()

        if (playingMusic === musicUrl) {
            audio?.pause()
            setPlayingMusic(null)
        } else {
            audio?.pause()
            const newAudio = new Audio(musicUrl)
            newAudio.play().catch(err => console.error("Audio play failed:", err))

            newAudio.onended = () => setPlayingMusic(null)

            setAudio(newAudio)
            setPlayingMusic(musicUrl)
        }
    }

    const toggleSelection = (url: string) => {
        if (selectedMusic.includes(url)) {
            onMusicSelect(selectedMusic.filter(u => u !== url))
        } else {
            onMusicSelect([...selectedMusic, url])
        }
    }

    useEffect(() => {
        return () => {
            audio?.pause()
        }
    }, [audio])

    return (
        <div className="space-y-6">
            <div className="text-left space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Background music</h2>
                <p className="text-zinc-500 text-lg">Choose one or more tracks to set the mood of your video.</p>
            </div>

            <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3 pb-4">
                    {BackgroundMusic.map((music) => {
                        const isSelected = selectedMusic.includes(music.url)
                        const isPlaying = playingMusic === music.url

                        return (
                            <Card
                                key={music.id}
                                className={cn(
                                    "cursor-pointer transition-all border-zinc-200 hover:border-violet-300 p-4 group relative",
                                    isSelected ? "border-violet-500 bg-violet-50/30 ring-1 ring-violet-500" : ""
                                )}
                                onClick={() => toggleSelection(music.url)}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                            isSelected ? "bg-violet-500 text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-violet-100 group-hover:text-violet-500"
                                        )}>
                                            <Music className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-zinc-900">{music.label}</h3>
                                            <p className="text-xs font-medium text-zinc-400">{music.duration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                "w-10 h-10 rounded-full",
                                                isPlaying ? "text-violet-500 bg-violet-100 hover:bg-violet-200" : "text-zinc-400 hover:bg-zinc-100"
                                            )}
                                            onClick={(e) => handleTogglePreview(e, music.url)}
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-5 h-5 fill-current" />
                                            ) : (
                                                <Play className="w-5 h-5 fill-current ml-0.5" />
                                            )}
                                        </Button>

                                        <div className={cn(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                            isSelected ? "bg-violet-500 border-violet-500 text-white" : "border-zinc-200"
                                        )}>
                                            {isSelected && <Check className="w-4 h-4 stroke-[3px]" />}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
