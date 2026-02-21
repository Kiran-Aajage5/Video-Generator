"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react"

interface CreateVideoFooterProps {
    currentStep: number
    onBack: () => void
    onContinue: () => void
    canContinue: boolean
}

export const CreateVideoFooter = ({
    currentStep,
    onBack,
    onContinue,
    canContinue,
}: CreateVideoFooterProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md p-4 flex justify-between items-center z-50">
            <div className="container max-w-4xl mx-auto flex justify-between items-center">
                <div>
                    {currentStep > 1 && (
                        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </Button>
                    )}
                </div>
                <Button
                    onClick={onContinue}
                    disabled={!canContinue}
                    className="flex items-center gap-2"
                >
                    {currentStep === 6 ? "Schedule" : "Continue"}
                    {currentStep === 6 ? (
                        <Calendar className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </Button>
            </div>
        </div>
    )
}
