export interface OutputItem {
    type: "log" | "error" | "warn" | "info" | "result"
    content: string
}