import { useState, useRef } from 'react'
import { playBeep } from '../utils/audio'

export function useTimer({ exercisesPerRound, rounds }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [key, setKey] = useState(0)
  const [phase, setPhase] = useState('work')
  const [currentExercise, setCurrentExercise] = useState(1)
  const [currentRound, setCurrentRound] = useState(1)
  const audioCtxRef = useRef(null)
  const lastBeepRef = useRef(null)

  function handleComplete() {
    goForward();
  }

  function goForward() {
    if (phase === 'work') {
      setPhase('rest')
      playBeep(audioCtxRef, 'rest')
    } else if (phase === 'rest') {
      if (currentExercise < exercisesPerRound) {
        setCurrentExercise(e => e + 1)
        setPhase('work')
        playBeep(audioCtxRef, 'work')

      } else if (currentRound < rounds) {
        setCurrentExercise(1)
        setCurrentRound(r => r + 1)
        setPhase('roundRest')
        playBeep(audioCtxRef, 'roundRest')

      } else {
        handleReset()
      }
    } else if (phase === 'roundRest') {
      setPhase('work')
      playBeep(audioCtxRef, 'work')

    }
    lastBeepRef.current = null
    setKey(k => k + 1)
  }

  function goBack() {
    if (phase === 'rest') {
      setPhase('work')
    } else if (phase === 'roundRest') {
      setCurrentRound(r => r - 1)
      setCurrentExercise(exercisesPerRound)
      setPhase('rest')
    } else {
      if (currentExercise === 1 && currentRound === 1) {
        // самое первое — перезапустить
      } else if (currentExercise > 1) {
        setCurrentExercise(e => e - 1)
        setPhase('rest')
      } else {
        // первое упр. раунда — назад к roundRest
        setCurrentRound(r => r - 1)
        setPhase('roundRest')
      }
    }
    setKey(k => k + 1)
  }

  function handleReset() {
    setPhase('work')
    setCurrentExercise(1)
    setCurrentRound(1)
    setIsPlaying(false)
    setKey(k => k + 1)
  }
  return { isPlaying, setIsPlaying, key, phase, currentExercise, currentRound, audioCtxRef, lastBeepRef, goForward, goBack, handleReset, handleComplete }
}