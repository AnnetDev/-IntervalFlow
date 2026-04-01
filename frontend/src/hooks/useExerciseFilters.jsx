import { useState, useMemo } from 'react'
import { ChartNoAxesColumnIncreasing, BicepsFlexed, ListChecks } from 'lucide-react'

export function useExerciseFilters(exercises = []) {
    const [difficulty, setDifficulty] = useState('')
    const [muscleGroup, setMuscleGroup] = useState('')
    const [equipment, setEquipment] = useState('')

    const selectOptions = useMemo(() => {
        function getOptions(field) {
            const unique = [...new Set(exercises.map(ex => ex[field]).filter(Boolean))]
            return [{ value: '', label: 'Show all' }, ...unique.map(v => ({ value: v, label: v }))]
        }
        return [
            { name: 'Difficulty', options: getOptions('difficulty'), value: difficulty, onChange: setDifficulty, icon: <ChartNoAxesColumnIncreasing size={12} /> },
            { name: 'Muscle Group', options: getOptions('muscleGroup'), value: muscleGroup, onChange: setMuscleGroup, icon: <BicepsFlexed size={12} /> },
            { name: 'Equipment', options: getOptions('equipment'), value: equipment, onChange: setEquipment, icon: <ListChecks size={12} /> },
        ]
    }, [exercises, difficulty, muscleGroup, equipment])

    const filters = { difficulty, muscleGroup, equipment }

    const filtered = useMemo(() => exercises.filter(ex => {
        if (difficulty && ex.difficulty !== difficulty) return false
        if (muscleGroup && ex.muscleGroup !== muscleGroup) return false
        if (equipment && ex.equipment !== equipment) return false
        return true
    }), [exercises, difficulty, muscleGroup, equipment])

    function handleClearFilters() {
        setDifficulty('')
        setMuscleGroup('')
        setEquipment('')
    }

    return { filters, filtered, selectOptions, handleClearFilters }
}
