
import { Check } from "lucide-react"

export default function HowItWorks() {
    const steps = [
        {
            step: 1,
            title: "Input Your Topic",
            description: "Simply type a topic, keyword, or paste your blog post URL.",
        },
        {
            step: 2,
            title: "AI Generation",
            description: "Our AI analyzes the content, writes a script, selects visuals, and adds voiceovers.",
        },
        {
            step: 3,
            title: "Customize & Edit",
            description: "Fine-tune the video with our easy-to-use editor. Add branding and captions.",
        },
        {
            step: 4,
            title: "Auto-Schedule",
            description: "Set your publishing schedule for YouTube, TikTok, and Instagram.",
        },
    ]

    return (
        <section id="how-it-works" className="py-24 bg-black relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                    From Idea to Published in Minutes
                </h2>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600/0 via-violet-600/50 to-indigo-600/0 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((item, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)] group-hover:scale-110 transition-transform duration-300">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-400 text-sm max-w-[200px]">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </section>
    )
}
