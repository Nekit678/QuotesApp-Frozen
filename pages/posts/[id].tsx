import Link from 'next/link';
import { useRouter } from 'next/router';
import Block from '../../components/Block/Block';
import styles from '../../styles/Home.module.css';

type aforism = {
    id: number,
    author: string,
    words: string,
    likes: number
}

interface PageProps {
    aforisms: aforism[]
}

export default function ({ aforisms }: PageProps) {
    const { query } = useRouter()
    return (
        <div className={styles.background}>
            <h1 className={styles.head}>Афоризмы</h1>
            <div><Block aforisms={aforisms} /></div>
            <Link href={`/posts/${(Number(query.id) - 1) == 0 ? 1 : (Number(query.id) - 1)}`} >
                <text className={styles.button}>Назад</text>
            </Link>
            {[(Number(query.id) - 2) <= 0 ? '' : Number(query.id) - 2, (Number(query.id) - 1) <= 0 ? '' : Number(query.id) - 1, Number(query.id), Number(query.id) + 1,
            Number(query.id) + 2].map(item => <Link href={`/posts/${item}`} ><text className={styles.page}>{(Number(query.id) != item) ? item : `[${item}]`}</text></Link>)}
            <Link href={`/posts/${(Number(query.id) + 1)}`} >
                <text className={styles.button}>Вперед</text>
            </Link>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const response = await fetch(`${process.env.HOST}:3000/api/load`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify(
            {
                start_id: (Number(context.params.id) - 1) * 5
            })
    });

    let aforisms = await response.json()

    if (aforisms.length < 5) {
        const response = await fetch(`${process.env.HOST}:3000/api/outsideReq`)

        const response1 = await fetch(`api/load`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(
                {
                    start_id: (Number(context.params.id) - 1) * 5
                })
        });
        aforisms = await response1.json()
    }

    return { props: { aforisms } }
}