"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { Language, DeepgramVoices, FonadalabVoices } from "@/lib/constants"

interface LanguageVoiceSelectionProps {
    selectedLanguage: string
    onLanguageSelect: (lang: string) => void
    selectedVoice: string
    onVoiceSelect: (voice: string) => void
}

export const LanguageVoiceSelection = ({
    selectedLanguage,
    onLanguageSelect,
    selectedVoice,
    onVoiceSelect
}: LanguageVoiceSelectionProps) => {
    const [playingVoice, setPlayingVoice] = useState<string | null>(null)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    // Load voices and ensure they are ready
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices()
            if (availableVoices.length > 0) {
                setVoices(availableVoices)
            }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices

        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, [])

    // Get current language object
    const currentLangObj = Language.find(l => l.language === selectedLanguage)

    // Determine which voices to show based on the model of the selected language
    const availableVoices = currentLangObj?.modelName === "deepgram"
        ? DeepgramVoices
        : currentLangObj?.modelName === "fonadalab"
            ? FonadalabVoices
            : []

    const handleTogglePreview = (e: React.MouseEvent, voiceName: string, previewUrl: string, gender: string) => {
        e.stopPropagation() // Prevent selecting the card when clicking preview

        if (playingVoice === voiceName) {
            audio?.pause()
            window.speechSynthesis.cancel()
            setPlayingVoice(null)
        } else {
            // Stop current audio and TTS
            audio?.pause()
            window.speechSynthesis.cancel()

            // Try to play the file first
            const newAudio = new Audio(previewUrl)

            const testPhrases: Record<string, string> = {
                "English": "Hello, this is a preview of the voice you selected.",
                "Spanish": "Hola, esta es una vista previa de la voz que seleccionaste.",
                "German": "Hallo, dies ist eine Vorschau der von Ihnen ausgewählten Stimme.",
                "Hindi": "नमस्ते, यह आपके द्वारा चुनी गई आवाज़ का पूर्वावलोकन है।",
                "French": "Bonjour, voici un aperçu de la voix que vous avez sélectionnée.",
                "Dutch": "Hallo, dit is een voorbeeld van de stem die je hebt geselecteerd.",
                "Italian": "Ciao, questa è un'anteprima della voce che hai selezionato.",
                "Japanese": "こんにちは、これはあなたが選択した声のプレビューです。"
            }

            newAudio.play().then(() => {
                newAudio.onended = () => setPlayingVoice(null)
                setAudio(newAudio)
                setPlayingVoice(voiceName)
            }).catch(err => {
                console.warn("Audio file play failed (likely empty placeholder), falling back to Browser TTS:", err)

                // Fallback to Browser Speech Synthesis
                const selectedLangObj = Language.find(l => l.language === selectedLanguage)
                const langCode = selectedLangObj?.modelLangCode || 'en-US'
                const langPart = langCode.split('-')[0].toLowerCase()

                // Filter voices for this language from our state
                const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPart))

                if (langVoices.length === 0) {
                    alert(`The browser's native voice for "${selectedLanguage}" is not installed on your system. \n\nTo hear this voice, please either: \n1. Install the "${selectedLanguage}" language pack in your OS settings.\n2. Replace the placeholder file at "public/voice/${previewUrl.split('/').pop()}" with a real recording.`)
                    setPlayingVoice(null)
                    return
                }

                const utterance = new SpeechSynthesisUtterance(testPhrases[selectedLanguage] || "Hello, this is a voice preview.")

                // Find one with matching gender keywords or just any lang-matching voice
                const femaleKeywords = ['female', 'woman', 'girl', 'zira', 'samantha', 'victoria', 'helena', 'hazel']
                const maleKeywords = ['male', 'man', 'boy', 'david', 'mark', 'alex', 'pavel', 'james']

                const targetKeywords = gender.toLowerCase() === 'female' ? femaleKeywords : maleKeywords

                const matchingVoice = langVoices.find(v =>
                    targetKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
                ) || langVoices[0]

                if (matchingVoice) utterance.voice = matchingVoice
                utterance.lang = langCode

                // Adjust pitch for better gender differentiation
                // Male: lower pitch (0.8), Female: higher pitch (1.2)
                utterance.pitch = gender.toLowerCase() === 'female' ? 1.2 : 0.8
                utterance.rate = 0.9

                utterance.onend = () => setPlayingVoice(null)
                utterance.onerror = () => setPlayingVoice(null)

                window.speechSynthesis.speak(utterance)
                setPlayingVoice(voiceName)
            })
        }
    }

    // Clean up audio on unmount
    useEffect(() => {
        return () => {
            audio?.pause()
        }
    }, [audio])

    return (
        <div className="space-y-10">
            {/* Language Selection */}
            <div className="space-y-6">
                <div className="text-left space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Select language</h2>
                    <p className="text-zinc-500 text-lg">Choose the language for your video narration.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {Language.map((lang) => (
                        <Card
                            key={lang.language}
                            className={cn(
                                "cursor-pointer transition-all border-zinc-200 hover:border-violet-300 p-4 flex flex-col items-center gap-2 group",
                                selectedLanguage === lang.language ? "border-violet-500 bg-violet-50/30 ring-1 ring-violet-500" : ""
                            )}
                            onClick={() => onLanguageSelect(lang.language)}
                        >
                            <span className="text-3xl">{lang.countryFlag}</span>
                            <span className="font-medium text-sm text-zinc-900">{lang.language}</span>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Voice Selection */}
            {selectedLanguage && (
                <div className="space-y-6">
                    <div className="text-left space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Pick a voice</h2>
                        <p className="text-zinc-500 text-lg">Choose a voice that matches your content's tone.</p>
                    </div>

                    <ScrollArea className="h-[400px] pr-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4">
                            {availableVoices.map((voice) => (
                                <Card
                                    key={voice.modelName}
                                    className={cn(
                                        "cursor-pointer transition-all border-zinc-200 hover:border-violet-300 p-5 group relative",
                                        selectedVoice === voice.modelName ? "border-violet-500 bg-violet-50/30 ring-1 ring-violet-500" : ""
                                    )}
                                    onClick={() => onVoiceSelect(voice.modelName)}
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-zinc-900">{voice.modelName}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 uppercase">
                                                        {voice.model}
                                                    </span>
                                                    <span className="text-xs font-medium text-zinc-400 capitalize">
                                                        {voice.gender}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className={cn(
                                                    "w-10 h-10 rounded-full border-zinc-200 shrink-0",
                                                    playingVoice === voice.modelName ? "bg-violet-500 text-white border-violet-500 hover:bg-violet-600 hover:text-white" : ""
                                                )}
                                                onClick={(e) => handleTogglePreview(e, voice.modelName, voice.preview, voice.gender)}
                                            >
                                                {playingVoice === voice.modelName ? (
                                                    <Pause className="w-5 h-5 fill-current" />
                                                ) : (
                                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    )
}
