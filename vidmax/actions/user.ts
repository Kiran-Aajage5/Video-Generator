"use server"

import { supabaseAdmin } from "@/lib/supabase"

export async function syncUser(userData: {
    id: string
    email: string
    name: string
    avatar: string
}) {
    if (!userData.id || !userData.email) {
        return { success: false, error: "Missing required user data" }
    }

    try {
        // .upsert() handles the "if user exists" logic:
        // It checks if 'email' already exists. If yes, it UPDATES; if no, it INSERTS.
        // We use onConflict: 'email' to ensure syncing works even if the User ID changes.
        const { error } = await supabaseAdmin.from("users").upsert(
            {
                user_id: userData.id, // Maps Clerk ID to your 'user_id' column
                email: userData.email,
                name: userData.name,
                // avatar is disabled for now
                // updated_at is handled by DB or added here if needed
            },
            { onConflict: 'email' }
        )




        if (error) {
            console.error("Error syncing user to Supabase:", error)
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (err) {
        console.error("Unexpected error during user sync:", err)
        return { success: false, error: "Unexpected error occurred" }
    }
}
