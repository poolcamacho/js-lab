import type { OutputItem } from "@/types/output"

interface ConsoleOutputProps {
    items: OutputItem[]
}

export function ConsoleOutput({ items }: ConsoleOutputProps) {
    if (items.length === 0) {
        return <div className="text-gray-500 dark:text-gray-400 text-center mt-8">Console output will appear here</div>
    }

    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="mb-2">
                    <div
                        className={`p-2 rounded-md text-sm ${
                            item.type === "error"
                                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                : item.type === "warn"
                                    ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                                    : item.type === "info"
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                        : "bg-gray-100 dark:bg-gray-800"
                        }`}
                    >
                        <div className="flex items-start">
                            <span className="font-mono whitespace-pre-wrap overflow-x-auto">{item.content}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

