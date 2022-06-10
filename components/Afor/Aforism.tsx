import { useEffect, useState } from 'react';
import styles from "../../styles/Aforism.module.css";
import { likeAforism } from "./logic"

interface AforProps {
    id: number,
    author: string,
    words: string,
    likes: number
}

export default function Aforism({ id, author, words, likes }: AforProps) {
    const [like, setLike] = useState(likes)
    const [select, setSelect] = useState(" ")

    useEffect(() => {
        if (JSON.parse(String(localStorage.getItem("likes"))) == null) {
            localStorage.setItem("likes", "[]")
        }
        const lk: any = JSON.parse(String(localStorage.getItem("likes")))
        setSelect(lk.findIndex((item: number) => item == id) != -1 ? "Liked!" : " ");
    }, [])

    async function likePost() {
        likeAforism(select, setSelect, setLike, id)
    }

    return (
        <div>
            <fieldset className={styles.post}>
                <cite className={styles.words}>{words}</cite>
                <p className={styles.author}>{author}</p>
                <input className={styles.button} type="button" onClick={likePost}></input>
                <text className={styles.like}>{like}</text>
                <text className={styles.select}>{select}</text>
            </fieldset>
            <p></p>
        </div>
    )
}
