export function getUploadSrc(id: string, userId: string) {
    return `${import.meta.env.VITE_API_BASE_URL}/cdn/${id}?userId=${userId}`
}

