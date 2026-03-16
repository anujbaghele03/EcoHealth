"use client"

import React, { useState } from "react"
import {
    Sun,
    Wind,
    Dumbbell,
    GlassWater,
    Moon,
    Heart,
    ChevronDown,
    Sparkles,
    TrendingUp,
    TrendingDown,
    Check,
    Umbrella,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface EnvironmentData {
    uvIndex: number
    temperature: number
    humidity: number
    windSpeed: number
    rainChance: number
    pressure: number
    airQuality: number
}

interface HealthTip {
    id: string
    category: string
    icon: React.ReactNode
    iconBg: string
    title: string
    description: string
    status: "good" | "moderate" | "caution"
    score: number
    basedOn: { label: string; value: string; trend?: "up" | "down" }[]
    recommendations: string[]
}

const currentEnvData: EnvironmentData = {
    uvIndex: 2.3,
    temperature: 20,
    humidity: 65,
    windSpeed: 12,
    rainChance: 24,
    pressure: 720,
    airQuality: 42,
}

function generateHealthTips(env: EnvironmentData): HealthTip[] {
    return [
        {
            id: "uv",
            category: "UV Protection",
            icon: <Sun className="h-5 w-5" />,
            iconBg: "bg-amber-100 text-amber-600",
            title:
                env.uvIndex <= 2
                    ? "Low UV - Safe Outdoors"
                    : env.uvIndex <= 5
                        ? "Moderate UV - Protection Needed"
                        : "High UV - Stay Protected",
            description: `Current UV index is ${env.uvIndex}. ${env.uvIndex <= 2
                    ? "Minimal sun protection required for normal activity."
                    : "Apply sunscreen and wear protective clothing."
                }`,
            status: env.uvIndex <= 2 ? "good" : env.uvIndex <= 5 ? "moderate" : "caution",
            score: env.uvIndex <= 2 ? 95 : env.uvIndex <= 5 ? 70 : 40,
            basedOn: [{ label: "UV Index", value: env.uvIndex.toString(), trend: "down" }],
            recommendations: [
                "Light SPF 15 sunscreen for extended exposure",
                "Safe for outdoor activities without special gear",
                "Sunglasses optional but recommended",
            ],
        },
        {
            id: "hydration",
            category: "Hydration",
            icon: <GlassWater className="h-5 w-5" />,
            iconBg: "bg-blue-100 text-blue-600",
            title: env.temperature > 25 ? "Increase Water Intake" : "Normal Hydration Needed",
            description: `With ${env.humidity}% humidity and ${env.temperature}°C, ${env.temperature > 25
                    ? "drink extra water to stay hydrated."
                    : "maintain regular water intake."
                }`,
            status: env.temperature > 30 ? "caution" : env.temperature > 25 ? "moderate" : "good",
            score: env.temperature > 30 ? 50 : env.temperature > 25 ? 75 : 90,
            basedOn: [
                { label: "Temperature", value: `${env.temperature}°C` },
                { label: "Humidity", value: `${env.humidity}%`, trend: "up" },
            ],
            recommendations: [
                "Drink 8-10 glasses of water today",
                "Include hydrating fruits like watermelon",
                "Limit caffeine and alcohol intake",
            ],
        },
        {
            id: "exercise",
            category: "Outdoor Exercise",
            icon: <Dumbbell className="h-5 w-5" />,
            iconBg: "bg-green-100 text-green-600",
            title:
                env.temperature >= 15 && env.temperature <= 25
                    ? "Excellent Exercise Weather"
                    : "Moderate Exercise Conditions",
            description: `${env.temperature}°C with ${env.windSpeed}km/h wind - ${env.temperature >= 15 && env.temperature <= 25
                    ? "ideal for outdoor activities."
                    : "adjust intensity accordingly."
                }`,
            status: env.temperature >= 15 && env.temperature <= 25 ? "good" : "moderate",
            score: env.temperature >= 15 && env.temperature <= 25 ? 95 : 70,
            basedOn: [
                { label: "Temperature", value: `${env.temperature}°C` },
                { label: "Wind Speed", value: `${env.windSpeed}km/h`, trend: "down" },
            ],
            recommendations: [
                "Perfect for jogging, cycling, or walking",
                "Light breeze aids cooling during workout",
                "Best times: 6-8 AM or 5-7 PM",
            ],
        },
        {
            id: "respiratory",
            category: "Respiratory Health",
            icon: <Wind className="h-5 w-5" />,
            iconBg: "bg-teal-100 text-teal-600",
            title: env.airQuality <= 50 ? "Good Air Quality" : "Moderate Air Quality",
            description: `Air quality index at ${env.airQuality}. ${env.airQuality <= 50
                    ? "Excellent conditions for respiratory health."
                    : "Sensitive groups should limit outdoor time."
                }`,
            status: env.airQuality <= 50 ? "good" : env.airQuality <= 100 ? "moderate" : "caution",
            score: env.airQuality <= 50 ? 92 : env.airQuality <= 100 ? 65 : 35,
            basedOn: [
                { label: "AQI", value: env.airQuality.toString() },
                { label: "Pressure", value: `${env.pressure} hPa`, trend: "up" },
            ],
            recommendations: [
                "Safe for all outdoor activities",
                "Good ventilation throughout the day",
                "No mask required for healthy individuals",
            ],
        },
        {
            id: "rain",
            category: "Rain Preparedness",
            icon: <Umbrella className="h-5 w-5" />,
            iconBg: "bg-indigo-100 text-indigo-600",
            title: env.rainChance <= 30 ? "Low Rain Chance" : "Rain Expected",
            description: `${env.rainChance}% precipitation probability. ${env.rainChance <= 30
                    ? "Outdoor plans are safe to proceed."
                    : "Carry rain protection."
                }`,
            status: env.rainChance <= 30 ? "good" : env.rainChance <= 60 ? "moderate" : "caution",
            score: 100 - env.rainChance,
            basedOn: [{ label: "Rain Chance", value: `${env.rainChance}%`, trend: "up" }],
            recommendations: [
                env.rainChance <= 30 ? "No umbrella needed" : "Carry a compact umbrella",
                "Check forecast before extended outdoor plans",
                "Waterproof bag for electronics recommended",
            ],
        },
        {
            id: "sleep",
            category: "Sleep Quality",
            icon: <Moon className="h-5 w-5" />,
            iconBg: "bg-purple-100 text-purple-600",
            title:
                env.temperature >= 16 && env.temperature <= 22
                    ? "Optimal Sleep Conditions"
                    : "Adjust Room Temperature",
            description: `${env.temperature}°C and ${env.humidity}% humidity - ${env.temperature >= 16 && env.temperature <= 22
                    ? "ideal for quality sleep."
                    : "consider adjusting room environment."
                }`,
            status: env.temperature >= 16 && env.temperature <= 22 ? "good" : "moderate",
            score: env.temperature >= 16 && env.temperature <= 22 ? 88 : 65,
            basedOn: [
                { label: "Temperature", value: `${env.temperature}°C` },
                { label: "Humidity", value: `${env.humidity}%` },
            ],
            recommendations: [
                "Keep bedroom well-ventilated tonight",
                "Light cotton bedding recommended",
                "Ideal conditions for deep, restful sleep",
            ],
        },
    ]
}

const statusConfig = {
    good: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dotColor: "bg-emerald-500",
        label: "Optimal",
        progressColor: "bg-emerald-500",
    },
    moderate: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        dotColor: "bg-amber-500",
        label: "Moderate",
        progressColor: "bg-amber-500",
    },
    caution: {
        color: "bg-red-50 text-red-700 border-red-200",
        dotColor: "bg-red-500",
        label: "Caution",
        progressColor: "bg-red-500",
    },
}

export default function HealthTips() {
    const [expandedTip, setExpandedTip] = useState<string | null>("uv")
    const [completedActions, setCompletedActions] = useState<Record<string, number[]>>({})

    const healthTips = generateHealthTips(currentEnvData)

    const overallScore = Math.round(
        healthTips.reduce((acc, tip) => acc + tip.score, 0) / healthTips.length
    )

    const toggleAction = (tipId: string, actionIndex: number) => {
        setCompletedActions((prev) => {
            const current = prev[tipId] || []
            if (current.includes(actionIndex)) {
                return { ...prev, [tipId]: current.filter((i) => i !== actionIndex) }
            }
            return { ...prev, [tipId]: [...current, actionIndex] }
        })
    }

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                <Heart className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Overall Health Score
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">
                                        {overallScore}
                                    </span>
                                    <span className="text-lg text-muted-foreground">/100</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <Badge className="mb-2 border-emerald-200 bg-emerald-50 text-emerald-700">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Excellent Day
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                                Based on 6 health factors
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                                style={{ width: `${overallScore}%` }}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Tips Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {healthTips.map((tip) => {
                    const isExpanded = expandedTip === tip.id
                    const config = statusConfig[tip.status]
                    const completedCount = (completedActions[tip.id] || []).length

                    return (
                        <Card
                            key={tip.id}
                            className={cn(
                                "cursor-pointer border transition-all duration-300 hover:shadow-md",
                                isExpanded ? "shadow-lg ring-1 ring-primary/20" : "shadow-sm"
                            )}
                            onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                        >
                            <CardContent className="p-0">
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={cn(
                                                    "flex h-11 w-11 items-center justify-center rounded-xl",
                                                    tip.iconBg
                                                )}
                                            >
                                                {tip.icon}
                                            </div>

                                            <div>
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="text-xs text-muted-foreground">
                                                        {tip.category}
                                                    </span>

                                                    <Badge className={cn("text-xs", config.color)}>
                                                        <span
                                                            className={cn(
                                                                "mr-1.5 h-1.5 w-1.5 rounded-full",
                                                                config.dotColor
                                                            )}
                                                        />
                                                        {config.label}
                                                    </Badge>
                                                </div>

                                                <h3 className="font-semibold">{tip.title}</h3>
                                            </div>
                                        </div>

                                        <ChevronDown
                                            className={cn(
                                                "h-5 w-5 text-muted-foreground transition-transform",
                                                isExpanded && "rotate-180"
                                            )}
                                        />
                                    </div>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {tip.description}
                                    </p>

                                    <div className="mt-3 flex items-center gap-3">
                                        <div className="flex-1">
                                            <div className="h-1.5 w-full rounded-full bg-secondary">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        config.progressColor
                                                    )}
                                                    style={{ width: `${tip.score}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">{tip.score}%</span>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div
                                        className="border-t border-border bg-muted/30 p-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="space-y-2">
                                            {tip.recommendations.map((rec, idx) => {
                                                const isCompleted =
                                                    (completedActions[tip.id] || []).includes(idx)

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => toggleAction(tip.id, idx)}
                                                        className={cn(
                                                            "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm",
                                                            isCompleted
                                                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                                : "border-transparent bg-background"
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "flex h-5 w-5 items-center justify-center rounded-full border-2",
                                                                isCompleted
                                                                    ? "border-emerald-500 bg-emerald-500"
                                                                    : "border-muted-foreground/30"
                                                            )}
                                                        >
                                                            {isCompleted && (
                                                                <Check className="h-3 w-3 text-white" />
                                                            )}
                                                        </div>

                                                        <span className={cn(isCompleted && "line-through")}>
                                                            {rec}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {completedCount > 0 && (
                                            <p className="mt-3 text-center text-xs text-muted-foreground">
                                                {completedCount} of {tip.recommendations.length} actions
                                                completed
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}