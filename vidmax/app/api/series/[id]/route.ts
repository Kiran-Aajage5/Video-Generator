import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(
    req: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await props.params
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { data, error } = await supabaseAdmin
            .from("series")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .single()

        if (error) {
            console.error("Error fetching series:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!data) {
            return NextResponse.json({ error: "Series not found" }, { status: 404 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function PUT(
    req: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await props.params
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()

        const { error } = await supabaseAdmin
            .from("series")
            .update({
                series_name: body.seriesName,
                niche: body.niche,
                is_custom_niche: body.isCustomNiche,
                language: body.language,
                voice: body.voice,
                background_music: body.music,
                video_style: body.videoStyle,
                caption_style: body.captionStyle,
                duration: body.duration,
                platforms: body.platforms,
                publish_time: body.publishTime,
                model_name: body.modelName,
                model_lang_code: body.modelLangCode
            })
            .eq("id", id)
            .eq("user_id", userId)

        if (error) {
            console.error("Error updating series:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: "Series updated successfully" })
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
