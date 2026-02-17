
import Link from "next/link"
import { Zap, Github, Twitter, Instagram } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-white">VidMax</span>
                        </Link>
                        <p className="text-zinc-500 text-sm max-w-xs">
                            Automate your short-form video creation and scheduling. Grow your audience on autopilot.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-600 text-center md:text-left">
                        &copy; {new Date().getFullYear()} VidMax AI. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Instagram className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
