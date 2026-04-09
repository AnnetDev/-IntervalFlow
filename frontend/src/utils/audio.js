// AudioContext init is duplicated between unlockAudio and playBeep — extract a shared helper
export async function unlockAudio(audioCtxRef) {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext()
  }
  if (audioCtxRef.current.state === 'suspended') {
    await audioCtxRef.current.resume()
  }
}

// Called fire-and-forget (no await) in useTimer — errors from resume() will be unhandled rejections.
// Fix: either wrap body in try/catch, or drop async/await entirely (unlockAudio already resumes the
// context before playBeep is called, and callers never await the result).
export async function playBeep(audioCtxRef, type = 'work') {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext()
  }
  const ctx = audioCtxRef.current
  if (ctx.state === 'suspended') await ctx.resume()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)

  // Magic numbers: 880 = A5, 440 = A4, 330 = E4 — consider a frequency map for readability
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
  // Nodes stay connected after stop — add osc.onended = () => { osc.disconnect(); gain.disconnect(); }
}
