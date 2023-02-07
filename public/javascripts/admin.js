// window.addEventListener("popstate", function (event) {
//     document.open();
//     document.write(event.state.content);
//     document.close();
// });

const getMemberListPage = () => {
    fetch(`/admin/member`, {
        method: 'GET',
    })
        .then(async (res) => {
            const code = res.status
            if (code === 200) {
               window.location.href = "/admin/member";
            } else {
                res = await res.json();
                if (res.message) {
                    alert(res.message);
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

const getGoodsListPage = () => {
    fetch(`/admin/goods`, {
        method: 'GET',
    })
        .then(async (res) => {
            const code = res.status
            if (code === 200) {
               window.location.href = "/admin/goods";
            } else {
                res = await res.json();
                if (res.message) {
                    alert(res.message);
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

const getOrderListPage = () => {
    fetch(`/admin/order`, {
        method: 'GET',
    })
        .then(async (res) => {
            const code = res.status
           if (code === 200) {
               window.location.href = "/admin/order";
            } else {
                res = await res.json();
                if (res.message) {
                    alert(res.message);
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}