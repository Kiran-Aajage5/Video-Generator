"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Platforms, Durations } from "@/lib/constants"
import { Music2, Youtube, Instagram, Mail, Calendar, Clock } from "lucide-react"

interface SeriesDetailsSelectionProps {
    seriesName: string
    onSeriesNameChange: (name: string) => void
    duration: string
    onDurationChange: (duration: string) => void
    platform: string
    onPlatformSelect: (platform: string) => void
    publishTime: string
    onPublishTimeChange: (time: string) => void
}

const platformIcons: Record<string, React.ReactNode> = {
    tiktok: <Music2 className="w-5 h-5" />,
    youtube: <Youtube className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />
}

export const SeriesDetailsSelection = ({
    seriesName,
    onSeriesNameChange,
    duration,
    onDurationChange,
    platform,
    onPlatformSelect,
    publishTime,
    onPublishTimeChange
}: SeriesDetailsSelectionProps) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-left space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Series details</h2>
                <p className="text-zinc-500 text-lg">Finalize your video series settings and schedule.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Name and Duration */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="seriesName" className="text-sm font-semibold text-zinc-700">Series Name</Label>
                        <Input
                            id="seriesName"
                            placeholder="e.g. Daily Motivational Stories"
                            value={seriesName}
                            onChange={(e) => onSeriesNameChange(e.target.value)}
                            className="h-12 border-zinc-200 focus:border-violet-500 focus:ring-violet-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration" className="text-sm font-semibold text-zinc-700">Video Duration</Label>
                        <Select value={duration} onValueChange={onDurationChange}>
                            <SelectTrigger id="duration" className="h-12 border-zinc-200 focus:border-violet-500 focus:ring-violet-500/20">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                {Durations.map((d) => (
                                    <SelectItem key={d.id} value={d.id}>
                                        {d.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="publishTime" className="text-sm font-semibold text-zinc-700">Time to Publish</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <Input
                                id="publishTime"
                                type="time"
                                value={publishTime}
                                onChange={(e) => onPublishTimeChange(e.target.value)}
                                className="h-12 border-zinc-200 pl-10 focus:border-violet-500 focus:ring-violet-500/20"
                            />
                        </div>
                        <p className="text-xs text-violet-500 font-medium flex items-center gap-1 mt-2">
                            <Clock className="w-3 h-3" />
                            Video will generate 3-6 hours before video publish
                        </p>
                    </div>
                </div>

                {/* Right Column: Platform Selection */}
                <div className="space-y-4">
                    <Label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Select Platform</Label>
                    <div className="grid grid-cols-2 gap-3">
                        {Platforms.map((p) => {
                            const isSelected = platform === p.id
                            return (
                                <Card
                                    key={p.id}
                                    className={cn(
                                        "cursor-pointer p-4 flex flex-col items-center justify-center gap-2 transition-all border-zinc-200 hover:border-violet-300",
                                        isSelected ? "border-violet-500 bg-violet-50/50 ring-1 ring-violet-500 shadow-sm" : "hover:bg-zinc-50"
                                    )}
                                    onClick={() => onPlatformSelect(p.id)}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                        isSelected ? "bg-violet-500 text-white" : "bg-zinc-100 text-zinc-500"
                                    )}>
                                        {platformIcons[p.id]}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-bold",
                                        isSelected ? "text-violet-700" : "text-zinc-600"
                                    )}>
                                        {p.label}
                                    </span>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
