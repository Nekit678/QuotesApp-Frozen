import { useState } from 'react'
import Block from '../components/Block'
import styles from '../styles/Home.module.css';

export default function Home() {

  const [list, setList] = useState(Array())
  const [count, setCount] = useState(0)

  if (count == 0 && typeof window !== "undefined") {
    showPosts()
  }

  async function showPosts() {
    setCount(count + 5)


    if (JSON.parse(String(localStorage.getItem("likes"))) == null) {
      localStorage.setItem("likes", "[]")
    }
    const data = JSON.parse(String(localStorage.getItem("likes")))

    const response = await fetch(`api/load`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify(
        {
          start_id: count
        })
    });

    const aforisms = await response.json()

    if (aforisms.length < 5) {
      const response = await fetch(`api/outsideReq`)

      setTimeout(async function () {
        const response = await fetch(`api/load`, {
          method: 'POST', headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, body: JSON.stringify(
            {
              start_id: count
            })
        });
        const aforisms = await response.json()
        setList([...list, (<div key={count}><Block aforisms={aforisms} data={data} /></div>)])
      }, 200)
      
    }
    else {
      setList([...list, (<div key={count}><Block aforisms={aforisms} data={data} /></div>)])
    }

  }

  return (
    <div className={styles.background}>
      <h1 className={styles.head}>Афоризмы</h1>
      {list}
      <input type="button" value="Смотреть дальше" className={styles.button} onClick={showPosts}></input>
    </div>
  )
}