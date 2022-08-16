export default async function(req: any, res: any) {
    const response = await fetch(`${process.env.HOST}:4200/aforisms/${req.body.id}`)
    const post = await response.json()

    const response1 = await fetch(`${process.env.HOST}:4200/aforisms/${req.body.id}`, {
        method: 'PATCH', headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify(
            {
                likes: post.likes + req.body.action
            })
    });


    res.status(200).json(post.likes + req.body.action)
}