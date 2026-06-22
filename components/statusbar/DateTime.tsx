'use client'
import React, { useState, useEffect, useRef } from "react"
import { Calendar } from "../ui/calendar"
import { Button } from "../ui/button"

export function DateTime() {
  const [time, setTime] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    }
    
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

    useEffect(() => {
      if (!isCalendarOpen) return;
      
      const handleOutsideClick = (event: MouseEvent) => {
      // Close calendar if the click happened outside the container ref
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }

    // Use mousedown to prevent race conditions with the trigger button
    window.addEventListener('mousedown', handleOutsideClick)
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isCalendarOpen])

  return (
    <div className="relative inline-block text-sm tracking-wider tabular-nums" ref={containerRef}>
      <Button
        variant="ghost-bar"
        size="default"
        onClick={() => setIsCalendarOpen((prev) => !prev)}
      >
        <span>
          {date ? (
            `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()} ${date.toLocaleDateString('en-US', { weekday: 'short' })}`
          ) : (
            "--- -- ---"
          )}
        </span>
        <span>
          {time || "--:--"}
        </span>
      </Button>
      {isCalendarOpen && (
        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 bg-background shadow-xl rounded-lg z-50">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border bg-card"
            captionLayout="dropdown"
          />
        </div>
      )}
    </div>
  )
}