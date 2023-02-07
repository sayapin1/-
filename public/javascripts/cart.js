const orderCartItem = () => {
    const checkbox = document.querySelector('.cartCheck:checked');
    const cartId = checkbox.value

    fetch(`/api/cart/${cartId}/order`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
        .then(async (res) => {
            const code = res.status
            res = await res.json();
            alert(res.message);
            if (code === 200) {
                location.href = '/cart'
            }

        })
        .catch((error) => {
            console.error(error)
        })
}