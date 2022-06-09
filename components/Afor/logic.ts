export async function LikeServer(id: number, action: number) {
    const response = await fetch(`../api/like_request`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify(
            {
                id: id,
                action: action
            })
    });

    return await response.json()
}

export async function LikeAforism(select: string, setSelect: Function, setLike: Function, id: number) {
    const data = JSON.parse(String(localStorage.getItem("likes")))

    if (select == " ") {
        setSelect("Liked!");
        setLike(await LikeServer(id, 1))
        data.push(id)
    }
    else {
        setSelect(" ");
        setLike(await LikeServer(id, -1))
        data.splice(data.findIndex((item: Number) => item == id), 1)
    }

    localStorage.setItem("likes", JSON.stringify(data))
}