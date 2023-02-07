const login = () => {
    const loginId = document.querySelector('#loginId');
    const loginPw = document.querySelector('#loginPw');

    fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            loginId: loginId.value,
            loginPw: loginPw.value,
        })
    })
        .then(async (res) => {
            const code = res.status
            console.log('code', code)
            res = await res.json();
            if (code === 200) {
                console.log('location', location.href)
               location.href = "/";
            } else {
                if (res.message) {
                    alert(res.message);
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}