"use client"

import { useEffect } from "react"

type KeyCombination = string

export function useKeyboardShortcut(
    keyCombinations: KeyCombination[],
    callback: () => void,
    options: { preventDefault?: boolean } = { preventDefault: true },
) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase()
            const ctrl = event.ctrlKey
            const meta = event.metaKey
            const shift = event.shiftKey
            const alt = event.altKey

            const matchesCombination = keyCombinations.some((combo) => {
                const parts = combo.split("+").map((part) => part.trim().toLowerCase())
                const hasCtrl = parts.includes("control") || parts.includes("ctrl")
                const hasMeta = parts.includes("meta") || parts.includes("cmd")
                const hasShift = parts.includes("shift")
                const hasAlt = parts.includes("alt")
                const targetKey = parts.find((part) => !["control", "ctrl", "meta", "cmd", "shift", "alt"].includes(part))

                return (
                    hasCtrl === ctrl &&
                    hasMeta === meta &&
                    hasShift === shift &&
                    hasAlt === alt &&
                    targetKey === key.toLowerCase()
                )
            })

            if (matchesCombination) {
                if (options.preventDefault) {
                    event.preventDefault()
                }
                callback()
            }
        }

        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [keyCombinations, callback, options.preventDefault])
}

