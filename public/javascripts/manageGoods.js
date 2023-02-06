const deleteGoods = () => {

}

const editGoodsPage = () => {
    const checkbox = document.querySelector('#goodsCheck');
    const goodsId = checkbox.value

    location.href = `/admin/goods/${goodsId}`
}