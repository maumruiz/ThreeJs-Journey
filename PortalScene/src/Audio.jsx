import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import styles from './Audio.module.css'
import spiderfx from '/spiderverse.mp3';

export default function LoadbarSound() {
    const [playing, setPlaying] = useState(false)
    const [play, { pause }] = useSound(spiderfx, { loop: true })

    // useEffect(() => {
    //     if (playing) {
    //         play()
    //     } else {
    //         pause()
    //     }
    // }, [playing])

    return (
        <>
            <div className={styles.iconBars} onClick={play}>
                <div className={`${styles.bar} ${playing && styles.active}`}></div>
                <div className={`${styles.bar} ${playing && styles.active}`}></div>
                <div className={`${styles.bar} ${playing && styles.active}`}></div>
            </div>
        </>
    )
}