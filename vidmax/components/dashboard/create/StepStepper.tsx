"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"

interface StepStepperProps {
    currentStep: number
}

export const StepStepper = ({ currentStep }: StepStepperProps) => {
    const steps = [1, 2, 3, 4, 5, 6]

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-violet-600">
                    Step {currentStep} of {steps.length}
                </span>
            </div>
            <div className="flex gap-2 w-full">
                {steps.map((step) => {
                    return (
                        <div key={step} className="flex-1">
                            <Progress
                                value={step <= currentStep ? 100 : 0}
                                className={`h-1.5 ${step > currentStep ? "bg-muted" : ""}`}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
