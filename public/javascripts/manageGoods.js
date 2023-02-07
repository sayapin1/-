const deleteGoods = () => {
    const checkbox = document.querySelector('.goodsCheck:checked');
    const goodsId = checkbox.value;
    const isChecked = checkbox.checked;

    fetch(`/api/admin/goods/${goodsId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({isApproved: isChecked})
    })
        .then(async (res) => {
            const code = res.status
            res = await res.json();
            if (res.message) {
                alert(res.message);
                if (code === 200) {
                    location.href = '/admin/goods'
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

const editGoodsPage = () => {
    const checkbox = document.querySelector('.goodsCheck:checked');
    const goodsId = checkbox.value

    location.href = `/admin/goods/${goodsId}`
}