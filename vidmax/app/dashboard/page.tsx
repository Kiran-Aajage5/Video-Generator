"use client"

import React, { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { deleteVideoSeries, toggleSeriesStatus } from "@/actions/video"
import { SeriesCard } from "@/components/dashboard/SeriesCard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Video, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
    const { user, isLoaded } = useUser()
    const [series, setSeries] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSeries = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/series')
            if (response.ok) {
                const data = await response.json()
                setSeries(data || [])
            } else {
                toast.error("Failed to load your series")
            }
        } catch (error) {
            console.error("Fetch error:", error)
            toast.error("An error occurred while loading series")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            fetchSeries()
        }
    }, [isLoaded, user])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this series?")) return

        const result = await deleteVideoSeries(id)
        if (result.success) {
            toast.success("Series deleted")
            setSeries(prev => prev.filter(s => s.id !== id))
        } else {
            toast.error("Failed to delete series")
        }
    }

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const result = await toggleSeriesStatus(id, currentStatus)
        if (result.success) {
            toast.success("Status updated")
            setSeries(prev => prev.map(s => {
                if (s.id === id) {
                    return { ...s, status: currentStatus === 'paused' ? 'active' : 'paused' }
                }
                return s
            }))
        } else {
            toast.error("Failed to update status")
        }
    }

    const handleTriggerGeneration = (id: string) => {
        toast.info("Video generation triggered! Check back in a few minutes.")
        // This will be connected to the generation worker later
    }

    if (!isLoaded || isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
                <p className="text-zinc-500 font-medium">Loading your video series...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">My Video Series</h1>
                    <p className="text-zinc-500">Manage and track your automated video content.</p>
                </div>
                <Link href="/dashboard/create">
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold gap-2 px-6 h-12 shadow-md hover:shadow-lg transition-all">
                        <Plus className="w-5 h-5" />
                        Create New Series
                    </Button>
                </Link>
            </div>

            {series.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 bg-zinc-50/50">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                        <Video className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">No series found</h3>
                    <p className="text-zinc-500 mt-2 mb-6 max-w-sm">
                        You haven&apos;t created any video series yet. Start by creating your first automated content.
                    </p>
                    <Link href="/dashboard/create">
                        <Button variant="outline" className="font-bold gap-2">
                            <Plus className="w-4 h-4" />
                            Start Creating
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {series.map((s, index) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <SeriesCard
                                    series={s}
                                    onDelete={handleDelete}
                                    onToggleStatus={handleToggleStatus}
                                    onTriggerGeneration={handleTriggerGeneration}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
