export default class CategoryService {
    static transformCategories(categories){
        let cat = [];

        const countQuantity = (devices) => {
            let quant = 0;
            devices.forEach((device) => {
                quant += device.quantity;
            });
            return quant;
        }

        categories.forEach((category) => {
            cat.push({
                name: category.name,
                quantity: countQuantity(category.devices),
                id: category.id
            })
        })

        return cat;
    }

    static transformSubcategories(subcategories, categoryId = 1) {
        let subcat = [];
        let filtered = subcategories; 
        
        if(categoryId){
            filtered = subcategories.filter(subcategory => subcategory.categoryId === categoryId);
        }
        

        const countQuantity = (devices) => {
            let quant = 0;
            devices.forEach((device) => {
                quant += device.quantity;
            });
            return quant;
        }

        filtered.forEach((subcategory) => {
            subcat.push({
                name: subcategory.name,
                quantity: countQuantity(subcategory.devices),
                id: subcategory.id
            })
        })


        return subcat;
    }

    static getSubcategoryDevicesData (devices) {
        let products = [];
        devices.forEach(device => {
            products.push({
                id: device.id,
                name: device.name,
                vendorCode: device.vendorCode,
                image: device.images[0]
            })
        })
        return products;
    }
}