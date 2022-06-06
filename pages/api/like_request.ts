export default async function load(req: any, res: any) {
    const response = await fetch(`${process.env.HOST}:4200/aforisms/${req.body.id}`, {
        method: 'PATCH', headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify(
            {
                likes: req.body.likes
            })
    });
    res.status(200).json({})
}