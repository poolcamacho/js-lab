"use client"

import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

interface EditorPanelProps {
    code: string
    onChange: (value: string) => void
}

export function EditorPanel({ code, onChange }: EditorPanelProps) {
    const { theme } = useTheme()
    const editorTheme = theme === "dark" ? "vs-dark" : "light"

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            onChange(value)
        }
    }

    return (
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
            <div className="h-full">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={handleEditorChange}
                    theme={editorTheme}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        lineNumbers: "on",
                        renderLineHighlight: "all",
                        formatOnPaste: true,
                        cursorBlinking: "smooth",
                    }}
                />
            </div>
        </div>
    )
}

