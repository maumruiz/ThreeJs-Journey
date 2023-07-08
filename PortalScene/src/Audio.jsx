import { useEffect, useState } from 'react';
import ReactHowler from 'react-howler'

import styles from './Audio.module.css'
import spiderfx from '/spiderverse_bg.mp3';

export default function LoadbarSound() {
    const [playing, setPlaying] = useState(true)

    const toggleAudio = () => {
        setPlaying((val) => !val)
    }

    return (
        <>
            <ReactHowler
                src={spiderfx}
                preload={true}
                playing={playing}
                volume={0.8}
                loop
            />
            <div className={styles.iconBars} onClick={() => toggleAudio()}>
                <div className={`${styles.bar} ${playing && styles.active}`}></div>
                <div className={`${styles.bar} ${playing && styles.active}`}></div>
                <div className={`${styles.bar} ${playing && styles.active}`}></div>
            </div>
        </>
    )
}