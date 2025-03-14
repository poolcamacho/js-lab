import type { OutputItem } from "@/types/output"

interface ResultOutputProps {
    error: string | null
    resultItems: OutputItem[]
}

export function ResultOutput({ error, resultItems }: ResultOutputProps) {
    if (error) {
        return (
            <div className="border border-red-400 rounded-md overflow-hidden">
                <div className="py-2 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                    <h3 className="text-sm font-medium">Error</h3>
                </div>
                <div className="p-4">
                    <pre className="whitespace-pre-wrap text-sm">{error}</pre>
                </div>
            </div>
        )
    }

    if (resultItems.length > 0) {
        return (
            <div>
                {resultItems.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="font-medium text-sm mb-1 text-gray-900 dark:text-gray-100">Result:</div>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md whitespace-pre-wrap text-sm overflow-x-auto">
              {item.content}
            </pre>
                    </div>
                ))}
            </div>
        )
    }

    return <div className="text-gray-500 dark:text-gray-400 text-center mt-8">Run your code to see the output here</div>
}

