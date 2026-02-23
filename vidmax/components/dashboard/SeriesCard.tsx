"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import {
    MoreVertical,
    Edit,
    Play,
    Pause,
    Trash2,
    Video,
    Zap,
    ExternalLink
} from "lucide-react"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoStyles } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface SeriesCardProps {
    series: any
    onDelete: (id: string) => void
    onToggleStatus: (id: string, currentStatus: string) => void
    onTriggerGeneration: (id: string) => void
}

export const SeriesCard = ({
    series,
    onDelete,
    onToggleStatus,
    onTriggerGeneration
}: SeriesCardProps) => {
    const videoStyle = VideoStyles.find(style => style.id === series.video_style)
    const thumbnail = videoStyle?.image || "/video-style/cinematic.png"

    const isPaused = series.status === 'paused'

    return (
        <Card className="overflow-hidden border-zinc-200 group transition-all hover:shadow-lg dark:border-zinc-800">
            {/* Thumbnail Header */}
            <div className="relative aspect-[9/16] max-h-[300px] w-full overflow-hidden bg-zinc-100">
                <Image
                    src={thumbnail}
                    alt={series.series_name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <Badge className={cn(
                        "font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5",
                        isPaused ? "bg-zinc-500" : "bg-violet-600 hover:bg-violet-600"
                    )}>
                        {series.status}
                    </Badge>
                </div>

                {/* Edit Button atop Thumbnail */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                    <Link href={`/dashboard/create?id=${series.id}`}>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-lg">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* View Generated Videos Trigger (Overlay) */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[10px] group-hover:translate-y-0">
                    <Button variant="secondary" size="sm" className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-white text-xs font-bold gap-2">
                        <Video className="w-3.5 h-3.5" />
                        View Generated Videos
                    </Button>
                </div>
            </div>

            {/* Content Body */}
            <CardHeader className="p-4 space-y-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg leading-tight text-zinc-900 line-clamp-1 truncate">
                            {series.series_name}
                        </h3>
                        <p className="text-xs text-zinc-500 font-medium">
                            Created {format(new Date(series.created_at), "MMM d, yyyy")}
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/create?id=${series.id}`} className="flex items-center gap-2">
                                    <Edit className="h-4 w-4" />
                                    Edit Series
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => onToggleStatus(series.id, series.status)}
                            >
                                {isPaused ? (
                                    <>
                                        <Play className="h-4 w-4" />
                                        Resume Series
                                    </>
                                ) : (
                                    <>
                                        <Pause className="h-4 w-4" />
                                        Pause Series
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-2 text-red-600 focus:text-red-600"
                                onClick={() => onDelete(series.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Series
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px] font-bold border-zinc-200 text-zinc-600">
                        {series.niche}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] font-bold border-zinc-200 text-zinc-600">
                        {series.language}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] font-bold border-zinc-200 text-zinc-600">
                        {series.duration}s
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 border-t border-zinc-100 flex gap-2 pt-4 mt-auto">
                <Button
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold gap-2 text-xs"
                    size="sm"
                    onClick={() => onTriggerGeneration(series.id)}
                >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Generate Video
                </Button>
            </CardFooter>
        </Card>
    )
}
