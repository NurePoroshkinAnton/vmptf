import baseDayJs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

baseDayJs.extend(utc)
baseDayJs.extend(timezone)
baseDayJs.extend(duration)
baseDayJs.extend(relativeTime)

baseDayJs.tz.setDefault(baseDayJs.tz.guess())

export const dayjs = baseDayJs

