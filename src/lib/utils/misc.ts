/**
 * Misc utilities replacing decentraland-dapps/dist/lib/utils
 */

export function distanceInWordsToNow(date: number): string {
  const diff = Date.now() - date
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}
