import Afor from '../Afor/Afor'

interface BlockProps {
  aforisms: any[]
}

export default function Block({ aforisms}: BlockProps) {
  return (
    <div>
      {aforisms.map(item =>
        <div key={item.id}><Afor id={item.id} author={item.author}
          words={item.words} likes={item.likes} /></div>)}
    </div>
  )
}
