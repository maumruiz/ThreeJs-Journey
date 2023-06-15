import { useProgress } from '@react-three/drei'
import './Loader.css'


export function Loader() {
    const { active, progress } = useProgress()
    // const active = true
    // const progress = 40

    return active ? (
        <div className="loader" >
            <div>
                {Math.floor(progress)}%
            </div>
            <div className="progress">
                <div className="progress-value" style={{width: `${progress}%`}}></div>
            </div>
        </div >
    ) : null
}