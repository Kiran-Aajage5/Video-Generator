"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"
import { syncUser } from "@/actions/user"

export default function UserSync() {
    const { isLoaded, isSignedIn, user } = useUser()
    const syncedRef = useRef(false)

    useEffect(() => {
        if (isLoaded && isSignedIn && user && !syncedRef.current) {
            const userData = {
                id: user.id,
                email: user.primaryEmailAddress?.emailAddress || "",
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                avatar: user.imageUrl || "",
            }

            if (userData.id && userData.email) {
                syncedRef.current = true
                syncUser(userData).then((res) => {
                    if (!res.success) {
                        console.error("Failed to sync user:", res.error)
                        syncedRef.current = false // Retry on next render if failed
                    }
                })
            }
        }

        // Reset sync ref if user signs out to allow sync for next user
        if (isLoaded && !isSignedIn) {
            syncedRef.current = false
        }
    }, [isLoaded, isSignedIn, user])

    return null
}
