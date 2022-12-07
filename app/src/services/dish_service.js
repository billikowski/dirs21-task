import Api from "@/services/api";

export default {
  getDishes() {
    return Api().get("dishes");
  },
  getDish(id) {
    return Api().get(`dishes/${id}`);
  },
  clearDishes() {
    return Api().get("dishes/clear");
  },
  putDish(dish) {
    return Api().put("dishes", dish);
  },
  deleteDish(id) {
    return Api().delete(`dishes/${id}`);
  },
};
