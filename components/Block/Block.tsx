import Afor from '../Afor/Afor'

interface BlockProps {
  aforisms: any[]
}

function Block({ aforisms}: BlockProps) {
  return (
    <div>
      {aforisms.map(item =>
        <div key={item.id}><Afor id={item.id} author={item.author}
          words={item.words} likes={item.likes} /></div>)}
    </div>
  )
}

export default Block
