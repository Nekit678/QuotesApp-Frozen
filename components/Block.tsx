import Afor from './Afor'

interface BlockProps {
  aforisms: any[],
  data: number[]
}
function Block({ aforisms, data }: BlockProps) {
  return (
    <div>
      {aforisms.map(item =>
        <div key={item.id}><Afor id={item.id} author={item.author}
          words={item.words} likes={item.likes} sel = {(data.findIndex((item1: number) => item1 == item.id)) != -1 ? "Liked!":" "} /></div>)}
    </div>
  )
}

export default Block
