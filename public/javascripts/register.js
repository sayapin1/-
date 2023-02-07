const register = () => {
    const loginId = document.querySelector('#loginId');
    const loginPw = document.querySelector('#loginPw');
    const checkPassword = document.querySelector('#checkPassword');
    const memberName = document.querySelector('#memberName');

    fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            loginId: loginId.value,
            loginPw: loginPw.value,
            checkPassword: checkPassword.value,
            memberName: memberName.value
        })
    })
        .then(async (res) => {
            const code = res.status
            res = await res.json();
            alert(res.message);
            if (code === 201) {
                location.href = '/login'
            }

        })
        .catch((error) => {
            console.error(error)
        })
}