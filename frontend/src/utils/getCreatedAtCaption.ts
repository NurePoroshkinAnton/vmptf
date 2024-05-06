import { Dayjs } from "dayjs"
import { dayjs } from "./dayjs"

export function getCreatedAtCaption(date: Dayjs) {
    const createdAtCaption = dayjs
        .duration(date.diff(dayjs(), "h"), "h")
        .humanize(true)

    return createdAtCaption
}
