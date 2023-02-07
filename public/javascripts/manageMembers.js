const editMembershipLevel = async () =>  {
    const checkbox = document.querySelector(".memberCheck:checked");
    const memberId = checkbox.value;
    const isChecked = checkbox.checked;

    fetch(`/api/admin/member/${memberId}`, {
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
                    location.href = '/admin/member'
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}


const editLevelButton = document.querySelector('#editLevel');
editLevelButton.addEventListener('click', editMembershipLevel);

