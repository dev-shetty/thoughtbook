/**
 * Parses #tags from the first and/or last non-empty lines of content.
 * Returns the badges and the display content (without tag lines).
 */

export function parseBadges(content: string): {
    badges: string[]
    displayContent: string
} {
    if (!content) return { badges: [], displayContent: "" }

    const lines = content.split("\n")

    // Trim empty lines from top and bottom to find first/last meaningful lines
    let start = 0
    let end = lines.length - 1
    while (start <= end && lines[start].trim() === "") start++
    while (end >= start && lines[end].trim() === "") end--

    if (start > end) return { badges: [], displayContent: "" }

    const badges: string[] = []
    const tagLineIndices = new Set<number>()

    const collectTags = (lineIndex: number) => {
        if (!isTagLine(lines[lineIndex])) return
        for (const tag of extractTags(lines[lineIndex])) {
            if (!badges.includes(tag)) badges.push(tag)
        }
        tagLineIndices.add(lineIndex)
    }

    collectTags(start)
    if (end !== start) collectTags(end)

    const displayLines = lines.filter((_, i) => !tagLineIndices.has(i))
    const displayContent = displayLines.join("\n").trim()

    return { badges, displayContent }
}

function isTagLine(line: string): boolean {
    return line.trim().startsWith("#")
}

function extractTags(line: string): string[] {
    const matches = line.trim().match(/#[\w-]+/g)
    if (!matches) return []
    return matches.map((t) => t.slice(1).toLowerCase())
}
