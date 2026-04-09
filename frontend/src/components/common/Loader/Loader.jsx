import styles from './Loader.module.css';

// Fragment is redundant. 12 empty divs could be generated with Array(12) to reduce repetition.
// Alternatives: a single-element CSS spinner (border + border-radius + animation),
// an animated SVG, or a native <progress> element (indeterminate when no value is set).
export function Loader() {
    return (
        <>
            <div className={styles.ldsDefault}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
}
