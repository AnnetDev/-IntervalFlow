import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useState } from 'react';
import { SkipBack, SkipForward, Play, Pause, RotateCcw } from 'lucide-react';
import { Input } from '../../components/common/Input/Input'
import { Button } from '../../components/common/Button/Button';
import Layout from '../../components/layout/Layout/Layout';
import styles from './TimerPage.module.css'
import { playBeep } from '../../utils/audio';
import { useTimer } from '../../hooks/useTimer';


export default function Timer() {
    const [workDuration, setWorkDuration] = useState(30);
    const [restDuration, setRestDuration] = useState(10);
    const [exercisesPerRound, setExercisesPerRound] = useState(5);
    const [rounds, setRounds] = useState(3);
    const [roundRestDuration] = useState(60);

    const {
        isPlaying, setIsPlaying,
        key, phase,
        currentExercise, currentRound,
        audioCtxRef, lastBeepRef,
        goForward, goBack, handleReset, handleComplete
    } = useTimer({ workDuration, restDuration, exercisesPerRound, rounds, roundRestDuration })

    const timerSettings = [
        { title: 'Exercise Duration', value: workDuration, min: 5, onChange: setWorkDuration },
        { title: 'Rest Duration', value: restDuration, min: 5, onChange: setRestDuration },
        { title: 'Exercises per Round', value: exercisesPerRound, min: 1, onChange: setExercisesPerRound },
        { title: 'Rounds', value: rounds, min: 1, onChange: setRounds },
    ];

    const duration = phase === 'work' ? workDuration
        : phase === 'rest' ? restDuration
            : roundRestDuration

    return (
        <Layout>
            <div className={styles.timerContainer}>
                <div className={styles.settings}>
                    {timerSettings.map((setting) => (
                        <div key={setting.title} className={styles.setting}>
                            <span>{setting.title}</span>
                            <Input
                                type="number"
                                className={styles.input}
                                value={setting.value}
                                min={setting.min}
                                onChange={e => setting.onChange(Number(e.target.value))}
                            />
                        </div>
                    ))}
                </div>

                <CountdownCircleTimer
                    key={key}
                    isPlaying={isPlaying}
                    duration={duration}
                    onComplete={handleComplete}
                    colors={phase === 'work' ? ['#FF6B5B', '#FF8F5C'] : ['#4FACFE', '#00F2FE']}
                    colorsTime={[duration, 0]}
                    size={240}
                    strokeWidth={12}
                    onUpdate={(remaining) => {
                        const sec = Math.ceil(remaining)
                        if (sec <= 3 && sec > 0 && sec !== lastBeepRef.current) {
                            lastBeepRef.current = sec
                            playBeep(audioCtxRef, 'countdown')
                        }
                    }}
                >
                    {({ remainingTime }) => (
                        <div style={{ textAlign: 'center' }}>
                            <div className={`${styles.time} ${phase === 'work' ? styles.timeWork : styles.timeRest}`}>
                                {remainingTime}
                            </div>
                            <div className={`${styles.label} ${phase === 'work' ? styles.labelWork : styles.labelRest}`}>
                                {phase === 'work' ? 'WORK' : phase === 'rest' ? 'REST' : 'ROUND REST'}
                            </div>
                        </div>
                    )}
                </CountdownCircleTimer>

                <div className={styles.roundLabel}>
                    Round {currentRound}/{rounds} · Exercise {currentExercise}/{exercisesPerRound}
                </div>

                <div className={styles.controls}>
                    <Button onClick={goBack}><SkipBack size={16} /></Button>
                    <Button onClick={() => setIsPlaying(p => {
                        if (!p) playBeep(audioCtxRef, phase)
                        return !p
                    })}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </Button>
                    <Button onClick={goForward}><SkipForward size={16} /></Button>
                    <Button onClick={handleReset}><RotateCcw size={16} />Reset</Button>
                </div>
            </div>
        </Layout>
    )
}
