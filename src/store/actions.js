
import {
    RECEIVE_ADDRESS, 
    RECEIVE_CATEGORYS, 
    RECEIVE_SHOPS
} from './mutation-types';
import {
    reqAddress, 
    reqCategorys,
    reqShops
} from '../api';

export default {
    async getAddress({commit}) {
        const result = await reqAddress();
        if(result.code === 200) {
            const address = result.data;
            commit(RECEIVE_ADDRESS, {address});
        }
    },
    async getCategorys({commit}) {
        const result = await reqCategorys();
        if(result.code === 200) {
            const categorys = result.data.result;
            commit(RECEIVE_CATEGORYS, {categorys});
        }
    },
    async getShops({commit, state}) {
        const {longitude, latitude} = state;
        const result = await reqShops(longitude, latitude);
        if(result.code === 200) {
            const shops = result.data.result;
            commit(RECEIVE_SHOPS, {shops});
        }
    }
}