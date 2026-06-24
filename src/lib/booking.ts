import type { Locale } from '../data/navigation'

export interface BookingMonth {
  year: number
  month: number
  label: string
}

export interface BookingDateOption {
  key: string
  date: Date
  dayLabel: string
  dateLabel: string
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getNextMonths(locale: Locale, count = 4): BookingMonth[] {
  const formatter = new Intl.DateTimeFormat(locale === 'da' ? 'da-DK' : 'en-GB', {
    month: 'long',
  })
  const now = new Date()

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() + index, 1)

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      label: capitalize(formatter.format(date)),
    }
  })
}

export function getAvailableDates(
  year: number,
  month: number,
  locale: Locale,
): BookingDateOption[] {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const dayFormatter = new Intl.DateTimeFormat(locale === 'da' ? 'da-DK' : 'en-GB', {
    weekday: 'long',
  })
  const monthFormatter = new Intl.DateTimeFormat(locale === 'da' ? 'da-DK' : 'en-GB', {
    month: 'long',
  })
  const lastDay = new Date(year, month + 1, 0).getDate()
  const dates: BookingDateOption[] = []

  for (let day = 1; day <= lastDay; day += 1) {
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()

    if (date < now || dayOfWeek === 0 || dayOfWeek === 6) continue

    dates.push({
      key: `${year}-${month}-${day}`,
      date,
      dayLabel: capitalize(dayFormatter.format(date)),
      dateLabel: `${day}. ${monthFormatter.format(date)}`,
    })
  }

  return dates
}

function formatTime(hour: number, minute: number) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export function getTimeSlots() {
  const slots: string[] = []
  const startMinutes = 9 * 60 + 30
  const lastStartMinutes = 14 * 60 + 30

  for (let minutes = startMinutes; minutes <= lastStartMinutes; minutes += 60) {
    const startH = Math.floor(minutes / 60)
    const startM = minutes % 60
    const endMinutes = minutes + 60
    const endH = Math.floor(endMinutes / 60)
    const endM = endMinutes % 60

    slots.push(`${formatTime(startH, startM)} - ${formatTime(endH, endM)}`)
  }

  return slots
}
