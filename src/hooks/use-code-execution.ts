"use client"

import {useState} from "react"
import {captureConsoleOutput} from "@/lib/console-capture"
import {executeJavaScript} from "@/lib/code-execution"
import type {OutputItem} from "@/types/output"

export function useCodeExecution(code: string) {
    const [output, setOutput] = useState<OutputItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isRunning, setIsRunning] = useState(false)
    const [activeTab, setActiveTab] = useState("output")

    const runCode = async () => {
        setIsRunning(true)
        setOutput([])
        setError(null)
        setActiveTab("output")

        try {

            const {startCapture, stopCapture} = captureConsoleOutput()
            const logs = startCapture()

            const result = await executeJavaScript(code)

            if (result !== undefined) {
                logs.push({
                    type: "result",
                    content: typeof result === "object" ? JSON.stringify(result, null, 2) : String(result),
                })
            }

            stopCapture()
            setOutput(logs)
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsRunning(false)
        }
    }

    return {
        output,
        error,
        isRunning,
        activeTab,
        setActiveTab,
        runCode,
    }
}

