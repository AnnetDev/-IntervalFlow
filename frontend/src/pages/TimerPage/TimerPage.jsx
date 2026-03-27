import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useState } from 'react';
import { SkipBack, SkipForward, Play, Pause, RotateCcw } from 'lucide-react';

import { Button } from '../../components/common/Button/Button';
import Layout from '../../components/layout/Layout/Layout';
import styles from './TimerPage.module.css'

export default function Timer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [key, setKey] = useState(0)

    const [workDuration, setWorkDuration] = useState(30);
    const [restDuration, setRestDuration] = useState(10);
    const [exercisesPerRound, setExercisesPerRound] = useState(5);
    const [rounds, setRounds] = useState(3);
    const [roundRestDuration] = useState(60);

    // const [started, setStarted] = useState(false)
    const [phase, setPhase] = useState('work')
    const [currentExercise, setCurrentExercise] = useState(1)
    const [currentRound, setCurrentRound] = useState(1)

    const timerSettings = [
        { title: 'Exercise Duration', value: workDuration, min: 5, onChange: setWorkDuration },
        { title: 'Rest Duration', value: restDuration, min: 5, onChange: setRestDuration },
        { title: 'Exercises per Round', value: exercisesPerRound, min: 1, onChange: setExercisesPerRound },
        { title: 'Rounds', value: rounds, min: 1, onChange: setRounds },
    ];

    function handleComplete() {
        goForward();
    }

    function goForward() {
        if (phase === 'work') {
            setPhase('rest')
        } else if (phase === 'rest') {
            if (currentExercise < exercisesPerRound) {
                setCurrentExercise(e => e + 1)
                setPhase('work')
            } else if (currentRound < rounds) {
                setCurrentExercise(1)
                setCurrentRound(r => r + 1)
                setPhase('roundRest')
            } else {
                handleReset()
            }
        } else if (phase === 'roundRest') {
            setPhase('work')
        }
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



    const duration = phase === 'work' ? workDuration
        : phase === 'rest' ? restDuration
            : roundRestDuration

    return (
        <Layout>
            <div className={styles.setting}>
                {timerSettings.map((setting) => (
                    <div key={setting.title} className={styles.setting}>
                        <span>{setting.title}</span>
                        <input
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
                <Button onClick={() => setIsPlaying(p => !p)}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {/* {isPlaying ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play</>} */}

                </Button>
                <Button onClick={goForward}><SkipForward size={16} /></Button>
                <Button onClick={handleReset}><RotateCcw size={16} />Reset</Button>
            </div>

        </Layout>
    )
}