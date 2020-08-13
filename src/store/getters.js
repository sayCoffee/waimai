export default {
    totalCount(state) {//购物车总数量计算
        return state.carFoods.reduce((prev, food) => {
            return prev + food.count;
        }, 0);
    },
    totalPrice(state) {//购物车总价格计算
        return state.carFoods.reduce((prev, food) => {
            return prev + food.count * food.price
        }, 0)
    },
}
