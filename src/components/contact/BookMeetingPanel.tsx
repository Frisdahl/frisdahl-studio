import { flushSync } from 'react-dom'
import { useMemo, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { getAvailableDates, getNextMonths, getTimeSlots } from '../../lib/booking'
import { Button } from '../ui'
import { ContactDrawerHeader } from './ContactDrawerHeader'

interface BookMeetingPanelProps {
  onClose: () => void
}

export function BookMeetingPanel({ onClose }: BookMeetingPanelProps) {
  const { locale } = useLocale()
  const { contact } = getHomeContent(locale)
  const { drawer } = contact

  const months = useMemo(() => getNextMonths(locale), [locale])
  const timeSlots = useMemo(() => getTimeSlots(), [])

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)
  const selectedMonth = months[selectedMonthIndex]

  const dates = useMemo(
    () => getAvailableDates(selectedMonth.year, selectedMonth.month, locale),
    [locale, selectedMonth.month, selectedMonth.year],
  )

  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleMonthSelect = (index: number) => {
    flushSync(() => {
      setSelectedMonthIndex(index)
    })
    setSelectedDateKey(null)
    setSelectedTime(null)
  }

  const canProceed = Boolean(selectedDateKey && selectedTime)

  return (
    <div className="contact-drawer-content">
      <ContactDrawerHeader closeLabel={drawer.closeLabel} onClose={onClose} />

      <div className="contact-drawer-body">
        <p className="contact-drawer-eyebrow">{drawer.bookEyebrow}</p>
        <h3 className="booking-drawer-title mt-md">{drawer.bookTitle}</h3>

        <hr className="contact-drawer-divider mt-xl" />

        <div className="mt-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="booking-drawer-label shrink-0">{drawer.whenLabel}</p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {months.map((month, index) => (
              <button
                key={`${month.year}-${month.month}`}
                type="button"
                className={`booking-month-btn ${index === selectedMonthIndex ? 'booking-month-btn-active' : ''}`}
                onClick={() => handleMonthSelect(index)}
              >
                {month.label}
              </button>
            ))}
          </div>
        </div>

        <hr className="contact-drawer-divider mt-xl" />

        <p className="booking-drawer-label mt-xl">{drawer.dateLabel}</p>
        <div className="booking-scroll-wrap mt-md">
          <div className="booking-scroll-row">
            {dates.map((dateOption) => (
              <button
                key={dateOption.key}
                type="button"
                className={`booking-date-card ${dateOption.key === selectedDateKey ? 'booking-select-btn-active' : ''}`}
                onClick={() => setSelectedDateKey(dateOption.key)}
              >
                <span className="booking-date-card-date">{dateOption.dateLabel}</span>
                <span className="booking-date-card-day">{dateOption.dayLabel}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="booking-drawer-label mt-xl">{drawer.timesLabel}</p>
        <div className="booking-scroll-wrap mt-md">
          <div className="booking-scroll-row">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`booking-time-slot ${slot === selectedTime ? 'booking-select-btn-active' : ''}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-drawer-footer">
        <hr className="contact-drawer-divider" />
        <div className="contact-drawer-footer-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            {drawer.back}
          </Button>
          <Button type="button" disabled={!canProceed}>
            {drawer.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
