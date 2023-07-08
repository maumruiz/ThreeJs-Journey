import { useProgress } from '@react-three/drei'
import './Loader.css'

export function LoadScene() {
    const { active, progress } = useProgress()

    return active ? (
        <div className="loader" >
            <div>
                {Math.floor(progress)}%
            </div>
            <div className="progress">
                <div className="progress-value" style={{ width: `${progress}%` }}></div>
            </div>
        </div >
    ) : null
}