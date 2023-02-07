const addCart = () => {
    const quantity = document.querySelector('#quantity');
    const urlList = window.location.href.split('/');
    const goodsId = urlList[4]

    fetch(`/api/cart/${goodsId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            quantity: quantity.value
        })
    })
        .then(async (res) => {
            const code = res.status
            res = await res.json();
            alert(res.message);
            if (code === 200) {
                location.href = `/goods/${goodsId}`
            }

        })
        .catch((error) => {
            console.error(error)
        })
}