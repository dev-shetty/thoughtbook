
export function truncateText(text: string, maxLength: number, maxLines?: number) {
    let result = text
    if (maxLines) {
        const lines = result.split("\n")
        if (lines.length > maxLines) {
            result = lines.slice(0, maxLines).join("\n") + "..."
            return result.length > maxLength ? result.slice(0, maxLength) + "..." : result
        }
    }
    return result.length > maxLength ? result.slice(0, maxLength) + "..." : result
}