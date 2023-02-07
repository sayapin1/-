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

const deleteCartItem = ()=>{
    const checkbox = document.querySelector('.cartCheck:checked');
    const cartId = checkbox.value
    const isChecked = checkbox.checked;

    fetch(`/api/cart/${cartId}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({isApproved: isChecked})
    })
        .then(async (res)=> {
            const code = res.status
            res = await res.json();
            if(res.message){
                alert(res.message);
                if(code===200){
                    location.href= '/'
                }
            }
        })
        .catch((error0)=> {
            console.error(error)
        })
}

const editCartItem = () => {
    const checkbox = document.querySelector('.cartCheck:checked');
    const cartId = checkbox.value

    location.href= `/`
}