import { useEffect, useState } from 'react';
import styles from "../styles/Afor.module.css";

interface AforProps {
    id: number,
    author: string,
    words: string,
    likes: number,
    sel: string
}

export default function Afor({ id, author, words, likes, sel }: AforProps) {
    const [like, setLike] = useState(likes)
    const [select, setSelect] = useState(sel)

    useEffect(() => {
        if (typeof window !== "undefined") {
            set_like(id, like);
        }
    }, [like])

    async function set_like(id: number, likes: number) {
        const response = await fetch(`api/like_request`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(
                {
                    id: id,
                    likes: likes
                })
        });

        const aforisms = await response.json()
    }

    function LikeAforism() {
        const data = JSON.parse(String(localStorage.getItem("likes")))

        if (select == " ") {
            setSelect("Liked!");
            setLike(like + 1)

            data.push(id)
        }
        else {
            setSelect(" ");
            setLike(like - 1)

            data.splice(data.findIndex((item: Number) => item == id), 1)
        }

        localStorage.setItem("likes", JSON.stringify(data))
    }

    return (
        <div>
            <fieldset className={styles.post}>
                <cite className={styles.words}>{words}</cite>
                <p className={styles.author}>{author}</p>
                <input className={styles.button} type="button" onClick={LikeAforism}></input>
                <text className={styles.like}>{like}</text>
                <text className={styles.select}>{select}</text>
            </fieldset>
            <p></p>
        </div>
    )
}
