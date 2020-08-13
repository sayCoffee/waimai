
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_RATINGS_TYPE
} from './mutation-types';
import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqShopsInfo,
    reqShopsGoods,
    reqShopsRatings
} from '../api';

export default {
    async getAddress({ commit }) {
        const result = await reqAddress();
        if (result.code === 200) {
            const address = result.data;
            commit(RECEIVE_ADDRESS, { address });
        }
    },
    async getCategorys({ commit }) {
        const result = await reqCategorys();
        if (result.code === 200) {
            const categorys = result.data.result;
            commit(RECEIVE_CATEGORYS, { categorys });
        }
    },
    async getShops({ commit, state }) {
        const { longitude, latitude } = state;
        const result = await reqShops(longitude, latitude);
        if (result.code === 200) {
            const shops = result.data.result;
            commit(RECEIVE_SHOPS, { shops });
        }
    },
    async getShopsInfo({ commit }) {
        const result = await reqShopsInfo();
        if (result.code === 200) {
            const info = result.data;
            commit(RECEIVE_INFO, { info });
        }
    },
    async getShopsGoods({ commit }) {
        const result = await reqShopsGoods();
        if (result.code === 200) {
            const goods = result.data.result;
            let id = 0;
            for (const item of goods) {
                for (const value of item.foods) {
                    id++;
                    value.count = 0;
                    value.id = id;
                }
            }
            // const goods = result.data.result;
            commit(RECEIVE_GOODS, { goods })
        }
    },
    async getShopsRatings({ commit }, query) {
        console.log(query);
        const result = await reqShopsRatings();
        if (result.code === 200) {
            const ratings = result.data.result;
            commit(RECEIVE_RATINGS, { ratings })
        }
    },
    async getRatingsType({ commit }) {
        commit(RECEIVE_RATINGS_TYPE, {
            all: {
                total: 20,
                id: 2
            },
            man: {
                total: 16,
                id: 0
            },
            bu: {
                total: 4,
                id: 1
            }
        });
    }
}