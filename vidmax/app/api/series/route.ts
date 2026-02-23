import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { createVideoSeries, getUserSeries } from "@/actions/video"

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const result = await getUserSeries(userId)

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 })
        }

        return NextResponse.json(result.data)
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()

        // Basic validation
        const requiredFields = [
            "seriesName",
            "niche",
            "language",
            "voice",
            "music",
            "videoStyle",
            "captionStyle",
            "duration",
            "platforms",
            "publishTime"
        ]

        for (const field of requiredFields) {
            if (body[field] === undefined) {
                return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
            }
        }

        const result = await createVideoSeries(userId, {
            seriesName: body.seriesName,
            niche: body.niche,
            isCustomNiche: body.isCustomNiche || false,
            language: body.language,
            voice: body.voice,
            music: body.music,
            videoStyle: body.videoStyle,
            captionStyle: body.captionStyle,
            duration: body.duration,
            platforms: body.platforms,
            publishTime: body.publishTime,
            modelName: body.modelName,
            modelLangCode: body.modelLangCode
        })

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: "Series saved successfully" })
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
