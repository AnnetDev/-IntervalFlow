import { useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { SkipBack, SkipForward, Play, Pause, RotateCcw, Minus, Plus } from 'lucide-react';
import { playBeep, unlockAudio } from '../../utils/audio';
import Layout from '../../components/layout/Layout/Layout';
import styles from './TimerPage.module.css';

export default function Timer() {
    const [workDuration, setWorkDuration] = useState(30);
    const [restDuration, setRestDuration] = useState(10);
    const [exercisesPerRound, setExercisesPerRound] = useState(5);
    const [rounds, setRounds] = useState(3);
    const roundRestDuration = 60;

    const {
        isPlaying, setIsPlaying,
        key, phase,
        currentExercise, currentRound,
        audioCtxRef, lastBeepRef,
        goForward, goBack, handleReset, handleComplete
    } = useTimer({ workDuration, restDuration, exercisesPerRound, rounds, roundRestDuration })

    const timerSettings = [
        { title: 'Exercise', value: workDuration, min: 5, step: 5, unit: 's', onChange: setWorkDuration },
        { title: 'Rest', value: restDuration, min: 5, step: 5, unit: 's', onChange: setRestDuration },
        { title: 'Per round', value: exercisesPerRound, min: 1, step: 1, unit: '', onChange: setExercisesPerRound },
        { title: 'Rounds', value: rounds, min: 1, step: 1, unit: '', onChange: setRounds },
    ];

    const duration = phase === 'work' ? workDuration
        : phase === 'rest' ? restDuration
            : roundRestDuration

    const isWork = phase === 'work'
    const phaseLabel = phase === 'work' ? 'Work' : phase === 'rest' ? 'Rest' : 'Round rest'

    return (
        <Layout>
            <div className={styles.timerContainer}>

                {/* settings — 2×2 chip grid with steppers */}
                <div className={styles.settings}>
                    {timerSettings.map((setting) => (
                        <div key={setting.title} className={styles.setChip}>
                            <span className={styles.settingKey}>{setting.title}</span>
                            <div className={styles.settingValue}>
                                <b>{setting.value}<small>{setting.unit}</small></b>
                                <div className={styles.stepper}>
                                    <button
                                        type="button"
                                        aria-label={`Decrease ${setting.title}`}
                                        onClick={() => setting.onChange(Math.max(setting.min, setting.value - setting.step))}
                                    >
                                        <Minus size={15} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label={`Increase ${setting.title}`}
                                        onClick={() => setting.onChange(setting.value + setting.step)}
                                    >
                                        <Plus size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* dominant ring */}
                <div className={styles.ringWrap}>
                    <CountdownCircleTimer
                        key={key}
                        isPlaying={isPlaying}
                        duration={duration}
                        onComplete={handleComplete}
                        colors={isWork ? ['#FF6B5B', '#FF9D5C'] : ['#4FACFE', '#00F2FE']}
                        colorsTime={[duration, 0]}
                        size={268}
                        strokeWidth={14}
                        trailColor="rgba(255,255,255,0.09)"
                        strokeLinecap="round"
                        onUpdate={(remaining) => {
                            const sec = Math.ceil(remaining)
                            if (sec <= 3 && sec > 0 && sec !== lastBeepRef.current) {
                                lastBeepRef.current = sec
                                playBeep(audioCtxRef, 'countdown')
                            }
                        }}
                    >
                        {({ remainingTime }) => (
                            <div className={styles.ringCenter}>
                                <div className={`${styles.time} ${isWork ? styles.timeWork : styles.timeRest}`}>
                                    {remainingTime}
                                </div>
                                <div className={`${styles.phasePill} ${isWork ? styles.phaseWork : styles.phaseRest}`}>
                                    <span className={styles.phaseDot}></span>{phaseLabel}
                                </div>
                            </div>
                        )}
                    </CountdownCircleTimer>
                </div>

                {/* progress */}
                <div className={styles.progress}>
                    <div className={styles.roundLabel}>
                        Round {currentRound} / {rounds} · Exercise {currentExercise} / {exercisesPerRound}
                    </div>
                    <div className={styles.dots}>
                        {Array.from({ length: exercisesPerRound }).map((_, i) => (
                            <i
                                key={i}
                                className={i < currentExercise - 1 ? styles.dotDone : i === currentExercise - 1 ? styles.dotCur : ''}
                            ></i>
                        ))}
                    </div>
                </div>

                {/* big controls */}
                <div className={styles.controls}>
                    <button type="button" className={styles.ctrl} onClick={goBack} aria-label="Previous">
                        <SkipBack size={22} />
                    </button>
                    <button
                        type="button"
                        className={`${styles.ctrl} ${styles.ctrlMain} ${isWork ? styles.ctrlWork : styles.ctrlRest}`}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        onClick={async () => {
                            await unlockAudio(audioCtxRef)
                            setIsPlaying(p => {
                                if (!p) playBeep(audioCtxRef, phase)
                                return !p
                            })
                        }}
                    >
                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                    <button type="button" className={styles.ctrl} onClick={goForward} aria-label="Next">
                        <SkipForward size={22} />
                    </button>
                    <button type="button" className={styles.ctrl} onClick={handleReset} aria-label="Reset">
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>
        </Layout>
    )
}
