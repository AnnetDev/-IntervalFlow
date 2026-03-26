import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Select } from '../../common/Select/Select';
import { Button } from '../../common/Button/Button';
import styles from './ExerciseFilters.module.css';

export function ExerciseFilters({ selectOptions, onClearFilters, exerciseCount, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filtersWrapper}>
      <button
        className={styles.accordionToggle}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <h3>Filters</h3>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      <div className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ''}`}>
        <div className={styles.accordionInner}>
          <div className={styles.filters}>
            {selectOptions.map((option) => (
              <div className={styles.filter} key={option.name}>
                <div className={styles.filterTitle}>
                  {option.icon}
                  <h4>{option.name}</h4>
                </div>
                <Select
                  options={option.options}
                  value={option.value}
                  onChange={(e) => option.onChange(e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className={styles.filterResWrap}>
            <h3>{isLoading ? 'Loading...' : `Found ${exerciseCount} exercises`}</h3>
            <Button onClick={onClearFilters}>Clear Filters</Button>
          </div>
        </div>
      </div>


    </div>
  );
}
