export const serverPath = import.meta.env.VITE_API_URL + "/api/v1/";

export const serverUrls = {
  register: serverPath + "user/register",
  login: serverPath + "user/login",
  placeOrder: serverPath + "order/placeorder",
  getOrders: serverPath + "order/getOrders",
  getPizzas: serverPath + "pizza/getPizzas",
};
