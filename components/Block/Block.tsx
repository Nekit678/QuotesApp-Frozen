import Afor from '../Afor/Aforism'

type aforism = {
  id:number,
  author:string,
  words:string,
  likes:number
}

interface BlockProps {
  aforisms: aforism[]
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
