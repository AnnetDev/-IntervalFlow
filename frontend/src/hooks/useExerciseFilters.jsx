import { useState } from 'react'
import { ChartNoAxesColumnIncreasing, BicepsFlexed, ListChecks } from 'lucide-react'

export function useExerciseFilters(exercises = []) {
    const [difficulty, setDifficulty] = useState('')
    const [muscleGroup, setMuscleGroup] = useState('')
    const [equipment, setEquipment] = useState('')

    function getSelectOptions(field) {
        const unique = [...new Set(exercises.map(ex => ex[field]).filter(Boolean))]
        return [{ value: '', label: 'Show all' }, ...unique.map(v => ({ value: v, label: v }))]
    }

    const selectOptions = [
        { name: 'Difficulty', options: getSelectOptions('difficulty'), value: difficulty, onChange: setDifficulty, icon: <ChartNoAxesColumnIncreasing size={12} /> },
        { name: 'Muscle Group', options: getSelectOptions('muscleGroup'), value: muscleGroup, onChange: setMuscleGroup, icon: <BicepsFlexed size={12} /> },
        { name: 'Equipment', options: getSelectOptions('equipment'), value: equipment, onChange: setEquipment, icon: <ListChecks size={12} /> },
    ]

    const filters = { difficulty, muscleGroup, equipment }

    const filtered = exercises.filter(ex => {
        if (difficulty && ex.difficulty !== difficulty) return false
        if (muscleGroup && ex.muscleGroup !== muscleGroup) return false
        if (equipment && ex.equipment !== equipment) return false
        return true
    })

    function handleClearFilters() {
        setDifficulty('')
        setMuscleGroup('')
        setEquipment('')
    }

    return { filters, filtered, selectOptions, handleClearFilters }
}
