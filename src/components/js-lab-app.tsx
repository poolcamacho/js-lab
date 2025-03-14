"use client"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut"
import { AppHeader } from "@/components/layout/app-header"
import { EditorPanel } from "@/components/editor/editor-panel"
import { OutputPanel } from "@/components/output/output-panel"
import { useCodeExecution } from "@/hooks/use-code-execution"

const DEFAULT_CODE = `// Write your JavaScript code here`

export default function JSLabApp() {
    const [code, setCode] = useLocalStorage("jslab-code", DEFAULT_CODE)
    const { output, error, isRunning, activeTab, setActiveTab, runCode } = useCodeExecution(code)

    useKeyboardShortcut(["Control+Enter", "Meta+Enter"], () => {
        if (!isRunning) runCode()
    })

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
            <AppHeader isRunning={isRunning} onRunCode={runCode} />

            <div className="flex flex-1 overflow-hidden">
                <EditorPanel code={code} onChange={setCode} />

                <OutputPanel output={output} error={error} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
    )
}

