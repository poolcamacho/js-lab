"use client"

export function Play({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    )
}

interface AppHeaderProps {
    isRunning: boolean
    onRunCode: () => void
}

export function AppHeader({ isRunning, onRunCode }: AppHeaderProps) {
    return (
        <header className="border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">JSLab</h1>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Press Ctrl+Enter to run</div>
                </div>
                <button
                    onClick={onRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Play className="h-4 w-4" />
                    Run
                </button>
            </div>
        </header>
    )
}

