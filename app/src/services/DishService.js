import Api from '@/services/Api'

export default {
    getDishes() {
        return Api().post('dishes');
    }
}

// DishService.getDishes({
//     name: "Test Dish",
//     description: "Test description for a dish",
//     price: 1099,
//     category: "mainCourse",
//     availability: "breakfast",
//     active: true,
//     waitTime: 15
// })