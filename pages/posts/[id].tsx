import Link from 'next/link';
import { useRouter } from 'next/router';
import Block from '../../components/Block/Block';
import styles from '../../styles/Home.module.css';

interface PageProps {
    aforisms: any[]
}

export default function ({ aforisms }: PageProps) {
    const { query } = useRouter()
    return (
        <div className={styles.background}>
            <h1 className={styles.head}>Афоризмы</h1>
            <div><Block aforisms={aforisms} /></div>
            <Link href={`/posts/${(Number(query.id) - 1) == 0 ? 1 : (Number(query.id) - 1)}`} >
                <a className={styles.button}>Pre PAGE</a>
            </Link>
            <text>{query.id}</text>
            <Link href={`/posts/${(Number(query.id) + 1)}`} >
                <a className={styles.button}>NEXT PAGE</a>
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