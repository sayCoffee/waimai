//封装接口请求函数

import ajax from "./ajax";
const BASE_URL = "http://rap2.taobao.org:38080/app/mock/259945";
//获取店铺位置
export const reqAddress = () => ajax(`${BASE_URL}/location/shop`);
//获取食品分类列表
export const reqCategorys = () => ajax(`${BASE_URL}/menu`);
//获取店铺列表
export const reqShops = (longitude, latitude) => ajax(`${BASE_URL}/shops/list`, {longitude, latitude});
//获取商家信息
export const reqShopsInfo = () => ajax(`${BASE_URL}/shops/details/1`);
//获取商品列表
export const reqShopsGoods = () => ajax(`${BASE_URL}/shop/goods/list`);
//获取评价
export const reqShopsRatings = () => ajax(`${BASE_URL}/goods/ratings`);