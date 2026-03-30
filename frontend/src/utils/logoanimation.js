import { useEffect, useState } from "react"

export default function RunnerIcon() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("runnerPlayed")

    if (!alreadyPlayed) {
      setAnimate(true)

      setTimeout(() => {
        setAnimate(false)
        sessionStorage.setItem("runnerPlayed", "true")
      }, 4000)
    }
  }, [])

  return (
    <svg
      width="173"
      height="191"
      viewBox="0 0 173 191"
      className={animate ? "runner-animate" : ""}
    >
      {/* твой SVG 그대로 */}
    </svg>
  )
}