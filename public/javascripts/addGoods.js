'use strict';

const goodsName = document.querySelector('#goodsName');
const price = document.querySelector('#price');
const detail = document.querySelector('#detail');

const addGoods = () => {
    const req = {
        goodsName: goodsName.value,
        price: price.value,
        detail: detail.value
    }

    fetch(`/api/admin/goods`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    })
        .then(async (res) => {
            const code = res.status
            console.log('code', code)
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