const editGoods = () => {
    const goodsName = document.getElementById('goodsName');
    const price = document.getElementById('price');
    const detail = document.getElementById('detail');
    const urlList = window.location.href.split('/');
    const goodsId = urlList[5]

    const req = {
        goodsName: goodsName.value,
        price: price.value,
        detail: detail.value
    }

    fetch(`/api/admin/goods/${goodsId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    })
        .then(async (res) => {
            const code = res.status
            res = await res.json();
            alert(res.message);
            if (code === 200) {
                location.href = '/admin/goods'
            }

        })
        .catch((error) => {
            console.error(error)
        })
}