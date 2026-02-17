
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-32">
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-violet-500 mr-2 animate-pulse"></span>
                    AI-Powered Video Generation
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                    Create Viral Shorts <br />
                    <span className="text-white">In Seconds.</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Transform your ideas into engaging short-form videos for TikTok, Instagram Reels, and YouTube Shorts. Schedule and publish automatically.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-violet-500/20 rounded-full transition-all hover:scale-105">
                        Start Generating Free
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-full transition-all">
                        View How it Works
                    </Button>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20 -z-20"></div>
            </div>
        </section>
    )
}
