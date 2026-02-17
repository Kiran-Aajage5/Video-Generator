
import { Video, Calendar, BarChart3, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
    const features = [
        {
            title: "AI Video Transformation",
            description: "Turn text scripts or blog posts into engaging short-form videos automatically.",
            icon: <Video className="h-8 w-8 text-violet-500" />,
        },
        {
            title: "Multi-Platform Scheduler",
            description: "Schedule once, publish everywhere. Auto-post to TikTok, Reels, and Shorts.",
            icon: <Calendar className="h-8 w-8 text-indigo-500" />,
        },
        {
            title: "Email Marketing Integration",
            description: "Embed generated videos directly into your email campaigns for higher click-through rates.",
            icon: <Mail className="h-8 w-8 text-pink-500" />,
        },
        {
            title: "Smart Analytics",
            description: "Track performance across all platforms from a single dashboard.",
            icon: <BarChart3 className="h-8 w-8 text-emerald-500" />,
        },
    ]

    return (
        <section id="features" className="py-24 bg-zinc-950">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent mb-4">
                        Everything You Need to Go Viral
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Powerful tools designed for content creators, marketers, and businesses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900 transition-colors">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800/50">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-zinc-400">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
