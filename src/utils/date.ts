import { format, parseISO } from 'date-fns'

export const toISODate = (date: Date) => date.toISOString()

export const fromISODate = (value: string) => parseISO(value)

export const formatDisplayDate = (value: string | Date, pattern = 'dd MMM yyyy') =>
  format(typeof value === 'string' ? parseISO(value) : value, pattern)