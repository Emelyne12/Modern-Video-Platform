const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/

export const formatDuration = (isoDuration = '') => {
  const matches = durationRegex.exec(isoDuration)

  if (!matches) {
    return ''
  }

  const [, rawHours = '0', rawMinutes = '0', rawSeconds = '0'] = matches
  const hours = Number(rawHours)
  const minutes = Number(rawMinutes)
  const seconds = Number(rawSeconds)

  const paddedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes)
  const paddedSeconds = String(seconds).padStart(2, '0')

  return hours > 0 ? `${hours}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`
}

export const formatViews = (views) => {
  if (!views) {
    return 'No views'
  }

  return `${Number(views).toLocaleString()} views`
}

export const formatSubscribers = (subscribers) => {
  if (!subscribers) {
    return 'Subscribers hidden'
  }

  return `${Number(subscribers).toLocaleString()} subscribers`
}
