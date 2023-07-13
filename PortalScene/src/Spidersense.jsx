import { SpriteAnimator } from '@react-three/drei'


export default function Spidersense() {
  return (
    <SpriteAnimator 
        position={[-0.05,0.08,1.5]}
        scale={0.8}
        startFrame={0}
        autoPlay={true}
        loop={true}
        fps={5}
        numberOfFrames={5}
        textureImageURL='/spidersense.png'
    />        
  )
}
