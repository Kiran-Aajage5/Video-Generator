"use server"

import { supabaseAdmin } from "@/lib/supabase"

export interface VideoSeriesData {
    seriesName: string
    niche: string
    isCustomNiche: boolean
    language: string
    voice: string
    music: string[]
    videoStyle: string
    captionStyle: string
    duration: string
    platforms: string[]
    publishTime: string
    modelName?: string
    modelLangCode?: string
}

export async function createVideoSeries(userId: string, data: VideoSeriesData) {
    if (!userId) {
        return { success: false, error: "User ID is required" }
    }

    try {
        const { error } = await supabaseAdmin.from("series").insert({
            user_id: userId,
            series_name: data.seriesName,
            niche: data.niche,
            is_custom_niche: data.isCustomNiche,
            language: data.language,
            voice: data.voice,
            background_music: data.music,
            video_style: data.videoStyle,
            caption_style: data.captionStyle,
            duration: data.duration,
            platforms: data.platforms,
            publish_time: data.publishTime,
            model_name: data.modelName || 'deepgram',
            model_lang_code: data.modelLangCode || 'en-US',
            status: 'active'
        })

        if (error) {
            console.error("Error creating video series in Supabase:", error)
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (err) {
        console.error("Unexpected error during video series creation:", err)
        return { success: false, error: "Unexpected error occurred" }
    }
}

export async function getUserSeries(userId: string) {
    if (!userId) {
        return { success: false, error: "User ID is required", data: [] }
    }

    try {
        const { data, error } = await supabaseAdmin
            .from("series")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching user series:", error)
            return { success: false, error: error.message, data: [] }
        }

        return { success: true, data }
    } catch (err) {
        console.error("Unexpected error during series fetch:", err)
        return { success: false, error: "Unexpected error occurred", data: [] }
    }
}

export async function deleteVideoSeries(seriesId: string) {
    try {
        const { error } = await supabaseAdmin
            .from("series")
            .delete()
            .eq("id", seriesId)

        if (error) {
            console.error("Error deleting series:", error)
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (err) {
        console.error("Unexpected error during series deletion:", err)
        return { success: false, error: "Unexpected error occurred" }
    }
}

export async function toggleSeriesStatus(seriesId: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' || currentStatus === 'scheduled' ? 'paused' : 'active'

    try {
        const { error } = await supabaseAdmin
            .from("series")
            .update({ status: newStatus })
            .eq("id", seriesId)

        if (error) {
            console.error("Error toggling series status:", error)
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (err) {
        console.error("Unexpected error during status toggle:", err)
        return { success: false, error: "Unexpected error occurred" }
    }
}
