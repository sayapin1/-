const completeOrder = async () => {
    const checkbox = document.querySelector("#orderCheck");
    const orderId = checkbox.value;
    const isChecked = checkbox.checked;

    fetch(`/api/admin/order/${orderId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({isApproved: isChecked})
    })
        .then(async (res) => {
            const code = res.status
            res = await res.json();
            if (res.message) {
                alert(res.message);
                if (code === 200) {
                    location.href = '/admin/order'
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

const completeOrderButton = document.querySelector('#completeOrder')
completeOrderButton.addEventListener('click', completeOrder)