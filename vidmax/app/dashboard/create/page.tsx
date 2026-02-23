"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { StepStepper } from "@/components/dashboard/create/StepStepper"
import { NicheSelection } from "@/components/dashboard/create/NicheSelection"
import { LanguageVoiceSelection } from "@/components/dashboard/create/LanguageVoiceSelection"
import { BackgroundMusicSelection } from "@/components/dashboard/create/BackgroundMusicSelection"
import { VideoStyleSelection } from "@/components/dashboard/create/VideoStyleSelection"
import { CaptionStyleSelection } from "@/components/dashboard/create/CaptionStyleSelection"
import { SeriesDetailsSelection } from "@/components/dashboard/create/SeriesDetailsSelection"
import { CreateVideoFooter } from "@/components/dashboard/create/CreateVideoFooter"
import { Loader2 } from "lucide-react"

function CreateVideoForm() {
    const { user } = useUser()
    const router = useRouter()
    const searchParams = useSearchParams()
    const editId = searchParams.get("id")

    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(!!editId)
    const [videoConfig, setVideoConfig] = useState({
        niche: "",
        customNiche: "",
        language: "",
        voice: "",
        music: [] as string[],
        videoStyle: "",
        captionStyle: "",
        seriesName: "",
        duration: "",
        platforms: [] as string[],
        publishTime: "",
    })

    useEffect(() => {
        const fetchSeriesData = async () => {
            if (!editId) return
            try {
                const response = await fetch(`/api/series/${editId}`)
                if (response.ok) {
                    const data = await response.json()
                    setVideoConfig({
                        niche: data.is_custom_niche ? "Custom" : data.niche,
                        customNiche: data.is_custom_niche ? data.niche : "",
                        language: data.language,
                        voice: data.voice,
                        music: data.background_music || [],
                        videoStyle: data.video_style,
                        captionStyle: data.caption_style,
                        seriesName: data.series_name,
                        duration: data.duration,
                        platforms: data.platforms || [],
                        publishTime: data.publish_time,
                    })
                } else {
                    toast.error("Failed to load series data")
                    router.push("/dashboard/create")
                }
            } catch (error) {
                console.error("Fetch error:", error)
                toast.error("An error occurred while loading series")
            } finally {
                setIsLoading(false)
            }
        }

        if (editId) {
            fetchSeriesData()
        }
    }, [editId, router])

    const nextStep = () => {
        if (currentStep === 6) {
            handleSchedule()
            return
        }
        setCurrentStep((prev) => Math.min(prev + 1, 6))
    }
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

    const handleNicheSelect = (nicheId: string) => {
        setVideoConfig((prev) => ({ ...prev, niche: nicheId }))
    }

    const handleLanguageSelect = (lang: string) => {
        setVideoConfig((prev) => ({ ...prev, language: lang, voice: "" }))
    }

    const handleVoiceSelect = (voiceName: string) => {
        setVideoConfig((prev) => ({ ...prev, voice: voiceName }))
    }

    const handleCustomNicheChange = (value: string) => {
        setVideoConfig((prev) => ({ ...prev, customNiche: value, niche: value ? "custom" : "" }))
    }

    const handleMusicSelect = (musicUrls: string[]) => {
        setVideoConfig((prev) => ({ ...prev, music: musicUrls }))
    }

    const handleStyleSelect = (styleId: string) => {
        setVideoConfig((prev) => ({ ...prev, videoStyle: styleId }))
    }

    const handleCaptionStyleSelect = (styleId: string) => {
        setVideoConfig((prev) => ({ ...prev, captionStyle: styleId }))
    }

    const handleSeriesNameChange = (name: string) => {
        setVideoConfig((prev) => ({ ...prev, seriesName: name }))
    }

    const handleDurationChange = (duration: string) => {
        setVideoConfig((prev) => ({ ...prev, duration: duration }))
    }

    const handlePlatformSelect = (platform: string) => {
        setVideoConfig((prev) => {
            const isSelected = prev.platforms.includes(platform)
            const newPlatforms = isSelected
                ? prev.platforms.filter((p) => p !== platform)
                : [...prev.platforms, platform]
            return { ...prev, platforms: newPlatforms }
        })
    }

    const handlePublishTimeChange = (time: string) => {
        setVideoConfig((prev) => ({ ...prev, publishTime: time }))
    }

    const handleSchedule = async () => {
        setIsSubmitting(true)
        try {
            const url = editId ? `/api/series/${editId}` : '/api/series'
            const method = editId ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seriesName: videoConfig.seriesName,
                    niche: videoConfig.niche === 'Custom' ? videoConfig.customNiche : videoConfig.niche,
                    isCustomNiche: videoConfig.niche === 'Custom',
                    language: videoConfig.language,
                    voice: videoConfig.voice,
                    music: videoConfig.music,
                    videoStyle: videoConfig.videoStyle,
                    captionStyle: videoConfig.captionStyle,
                    duration: videoConfig.duration,
                    platforms: videoConfig.platforms,
                    publishTime: videoConfig.publishTime
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success(editId ? "Video series updated successfully!" : "Video series scheduled successfully!")
                router.push("/dashboard")
            } else {
                toast.error(result.error || `Failed to ${editId ? "update" : "schedule"} video series`)
            }
        } catch (error) {
            console.error("Submit error:", error)
            toast.error("An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    const canContinue = () => {
        if (isLoading) return false
        if (currentStep === 1) return !!videoConfig.niche || !!videoConfig.customNiche
        if (currentStep === 2) return !!videoConfig.language && !!videoConfig.voice
        if (currentStep === 3) return videoConfig.music.length > 0
        if (currentStep === 4) return !!videoConfig.videoStyle
        if (currentStep === 5) return !!videoConfig.captionStyle
        if (currentStep === 6) return !!videoConfig.seriesName && !!videoConfig.duration && videoConfig.platforms.length > 0 && !!videoConfig.publishTime
        return !isSubmitting
    }

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
                <p className="text-zinc-500 font-medium">Loading series details...</p>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-10 pb-32">
            <StepStepper currentStep={currentStep} />

            <div className="mt-10">
                {currentStep === 1 && (
                    <NicheSelection
                        selectedNiche={videoConfig.niche}
                        onSelect={handleNicheSelect}
                        customNiche={videoConfig.customNiche}
                        onCustomNicheChange={handleCustomNicheChange}
                    />
                )}

                {currentStep === 2 && (
                    <LanguageVoiceSelection
                        selectedLanguage={videoConfig.language}
                        onLanguageSelect={handleLanguageSelect}
                        selectedVoice={videoConfig.voice}
                        onVoiceSelect={handleVoiceSelect}
                    />
                )}

                {currentStep === 3 && (
                    <BackgroundMusicSelection
                        selectedMusic={videoConfig.music}
                        onMusicSelect={handleMusicSelect}
                    />
                )}

                {currentStep === 4 && (
                    <VideoStyleSelection
                        selectedStyle={videoConfig.videoStyle}
                        onStyleSelect={handleStyleSelect}
                    />
                )}

                {currentStep === 5 && (
                    <CaptionStyleSelection
                        selectedStyle={videoConfig.captionStyle}
                        onStyleSelect={handleCaptionStyleSelect}
                    />
                )}

                {currentStep === 6 && (
                    <SeriesDetailsSelection
                        seriesName={videoConfig.seriesName}
                        onSeriesNameChange={handleSeriesNameChange}
                        duration={videoConfig.duration}
                        onDurationChange={handleDurationChange}
                        platforms={videoConfig.platforms}
                        onPlatformSelect={handlePlatformSelect}
                        publishTime={videoConfig.publishTime}
                        onPublishTimeChange={handlePublishTimeChange}
                    />
                )}

                {currentStep > 6 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-card">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4">
                            🚀
                        </div>
                        <h2 className="text-2xl font-bold">Step {currentStep}</h2>
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                            The implementation for this step is coming soon. Select a niche and click continue to see the progress.
                        </p>
                    </div>
                )}
            </div>

            <CreateVideoFooter
                currentStep={currentStep}
                onBack={prevStep}
                onContinue={nextStep}
                canContinue={canContinue() && !isSubmitting}
                isEditing={!!editId}
            />
        </div>
    )
}

export default function CreateVideoPage() {
    return (
        <Suspense fallback={
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
                <p className="text-zinc-500 font-medium">Loading...</p>
            </div>
        }>
            <CreateVideoForm />
        </Suspense>
    )
}
