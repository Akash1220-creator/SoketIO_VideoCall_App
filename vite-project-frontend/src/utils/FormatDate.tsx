// Shared date helpers so every session view formats timestamps the same way

/** e.g. "Aug 14, 2026, 03:00 PM" */
export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

/** e.g. "03:01 PM" */
export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })