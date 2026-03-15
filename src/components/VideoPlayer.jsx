import { useRef } from 'react'

function VideoPlayer({ videoId, title }) {
  const playerWrapRef = useRef(null)

  const toggleFullscreen = async () => {
    const element = playerWrapRef.current

    if (!element) {
      return
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await element.requestFullscreen()
  }

  return (
    <div className="player-wrap" ref={playerWrapRef}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <button type="button" className="fullscreen-btn" onClick={toggleFullscreen}>
        Full Screen
      </button>
    </div>
  )
}

export default VideoPlayer
