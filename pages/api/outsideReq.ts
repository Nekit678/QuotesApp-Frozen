export default async function(req: any, res: any) {
    const response = await fetch(`https://zenquotes.io/api/quotes`)
    let aforisms = await response.json()

    aforisms.forEach(async function (item: any) {
        const response = await fetch(`${process.env.HOST}:4200/aforisms`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(
                {
                    words: item.q,
                    author: item.a,
                    likes: 0
                })
            
        });

        await response.json()
    })

    res.status(200).json({})
}