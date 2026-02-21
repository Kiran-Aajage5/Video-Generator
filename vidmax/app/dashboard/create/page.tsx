"use client"

import React, { useState } from "react"
import { StepStepper } from "@/components/dashboard/create/StepStepper"
import { NicheSelection } from "@/components/dashboard/create/NicheSelection"
import { LanguageVoiceSelection } from "@/components/dashboard/create/LanguageVoiceSelection"
import { BackgroundMusicSelection } from "@/components/dashboard/create/BackgroundMusicSelection"
import { VideoStyleSelection } from "@/components/dashboard/create/VideoStyleSelection"
import { CaptionStyleSelection } from "@/components/dashboard/create/CaptionStyleSelection"
import { SeriesDetailsSelection } from "@/components/dashboard/create/SeriesDetailsSelection"
import { CreateVideoFooter } from "@/components/dashboard/create/CreateVideoFooter"

export default function CreateVideoPage() {
    const [currentStep, setCurrentStep] = useState(1)
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
        platform: "",
        publishTime: "",
    })

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6))
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
        setVideoConfig((prev) => ({ ...prev, platform: prev.platform === platform ? "" : platform }))
    }

    const handlePublishTimeChange = (time: string) => {
        setVideoConfig((prev) => ({ ...prev, publishTime: time }))
    }

    const canContinue = () => {
        if (currentStep === 1) return !!videoConfig.niche || !!videoConfig.customNiche
        if (currentStep === 2) return !!videoConfig.language && !!videoConfig.voice
        if (currentStep === 3) return videoConfig.music.length > 0
        if (currentStep === 4) return !!videoConfig.videoStyle
        if (currentStep === 5) return !!videoConfig.captionStyle
        if (currentStep === 6) return !!videoConfig.seriesName && !!videoConfig.duration && !!videoConfig.platform && !!videoConfig.publishTime
        return true
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
                        platform={videoConfig.platform}
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
                canContinue={canContinue()}
            />
        </div>
    )
}
