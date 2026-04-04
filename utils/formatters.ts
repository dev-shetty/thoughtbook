export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    })
}

export function formatDateTime(date: string) {
    const d = new Date(date)
    const month = d.toLocaleString("en-US", { month: "long" })
    const day = d.getDate()
    let hours = d.getHours()
    const minutes = d.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    if (hours === 0) hours = 12
    return `${month} ${day}, ${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`
}