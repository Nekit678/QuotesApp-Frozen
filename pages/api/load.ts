export default async function load(req: any, res: any) {
  const response = await fetch(`${process.env.HOST}:4200/aforisms?_start=${req.body.start_id}&_end=${req.body.start_id+5}`)
  const aforisms = await response.json()
  res.status(200).json(aforisms)
}