import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                            VidMax
                        </Link>
                        <span className="text-zinc-600">/</span>
                        <h1 className="text-xl font-medium">Dashboard</h1>
                    </div>
                    <UserButton afterSignOutUrl="/" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
                        <h2 className="text-lg font-medium mb-2">Total Videos</h2>
                        <p className="text-3xl font-bold text-violet-500">0</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
                        <h2 className="text-lg font-medium mb-2">Scheduled</h2>
                        <p className="text-3xl font-bold text-indigo-500">0</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
                        <h2 className="text-lg font-medium mb-2">Credits</h2>
                        <p className="text-3xl font-bold text-white">5</p>
                    </div>
                </div>

                <div className="mt-12 text-center py-20 bg-zinc-950 border border-dashed border-zinc-800 rounded-3xl">
                    <h3 className="text-xl font-medium mb-4">No videos generated yet</h3>
                    <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                        Ready to create your first viral short? Click the button below to get started.
                    </p>
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-medium transition-all">
                        Create New Video
                    </button>
                </div>
            </div>
        </div>
    );
}
