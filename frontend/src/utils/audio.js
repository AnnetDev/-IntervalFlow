export function playBeep(audioCtxRef, type = 'work') {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext()
  }
  const ctx = audioCtxRef.current
  if (ctx.state === 'suspended') ctx.resume()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)

  if (type === 'work') {
    osc.frequency.value = 880
  } else if (type === 'rest') {
    osc.frequency.value = 440
  } else {
    osc.frequency.value = 330
  }

  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.4)
}
