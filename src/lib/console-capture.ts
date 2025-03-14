import type { OutputItem } from "@/types/output"

export function captureConsoleOutput() {
    const logs: OutputItem[] = []

    const originalConsoleLog = console.log
    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn
    const originalConsoleInfo = console.info

    const formatOutput = (...args: unknown[]): string => {
        return args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" ")
    }

    const startCapture = () => {
        console.log = (...args) => {
            logs.push({ type: "log", content: formatOutput(...args) })
            originalConsoleLog(...args)
        }

        console.error = (...args) => {
            logs.push({ type: "error", content: formatOutput(...args) })
            originalConsoleError(...args)
        }

        console.warn = (...args) => {
            logs.push({ type: "warn", content: formatOutput(...args) })
            originalConsoleWarn(...args)
        }

        console.info = (...args) => {
            logs.push({ type: "info", content: formatOutput(...args) })
            originalConsoleInfo(...args)
        }

        return logs
    }

    const stopCapture = () => {
        console.log = originalConsoleLog
        console.error = originalConsoleError
        console.warn = originalConsoleWarn
        console.info = originalConsoleInfo
    }

    return {
        startCapture,
        stopCapture,
    }
}

