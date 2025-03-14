"use client"

import { ConsoleOutput } from "@/components/output/console-output"
import { ResultOutput } from "@/components/output/result-output"
import type { OutputItem } from "@/types/output"
import { useEffect } from "react"

interface OutputPanelProps {
    output: OutputItem[]
    error: string | null
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function OutputPanel({ output, error, activeTab, setActiveTab }: OutputPanelProps) {
    const consoleItems = output.filter((item) => item.type !== "result")
    const resultItems = output.filter((item) => item.type === "result")

    useEffect(() => {
        const tabButtons = document.querySelectorAll('[role="tab"]')
        tabButtons.forEach((button) => {
            if (button.getAttribute("data-value") === activeTab) {
                button.setAttribute("aria-selected", "true")
            } else {
                button.setAttribute("aria-selected", "false")
            }
        })
    }, [activeTab])

    return (
        <div className="w-1/2 flex flex-col">
            <div className="flex-1 flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4">
                    <div className="flex mt-2" role="tablist" aria-orientation="horizontal">
                        <button
                            role="tab"
                            data-value="output"
                            aria-selected={activeTab === "output"}
                            onClick={() => setActiveTab("output")}
                            className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none ${
                                activeTab === "output"
                                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                            }`}
                        >
                            Output
                        </button>
                        <button
                            role="tab"
                            data-value="console"
                            aria-selected={activeTab === "console"}
                            onClick={() => setActiveTab("console")}
                            className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none flex items-center ${
                                activeTab === "console"
                                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                            }`}
                        >
                            Console
                            {consoleItems.length > 0 && (
                                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {consoleItems.length}
                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div
                    role="tabpanel"
                    hidden={activeTab !== "output"}
                    className={`flex-1 p-4 overflow-auto ${activeTab !== "output" ? "hidden" : ""}`}
                >
                    <ResultOutput error={error} resultItems={resultItems} />
                </div>

                <div
                    role="tabpanel"
                    hidden={activeTab !== "console"}
                    className={`flex-1 p-4 overflow-auto ${activeTab !== "console" ? "hidden" : ""}`}
                >
                    <ConsoleOutput items={consoleItems} />
                </div>
            </div>
        </div>
    )
}

