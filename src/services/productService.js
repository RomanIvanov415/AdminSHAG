export default class ProductService{
    static transformProducts(data, brandList = null, categoryList = null, subcategoryList = null){
        const products = data.rows;
        const productList = [];
        products.forEach(product => {
            let brandName, categoryName , subcategoryName;
            if(brandList && categoryList && subcategoryList){
                brandName = brandList.find(i => i.id === product.brandId).name;
                categoryName = categoryList.find(i => i.id === product.categoryId).name;
                subcategoryName = subcategoryList.find(i => i.id === product.subcategoryId).name;
            }
            else{
                brandName = null; categoryName = null; subcategoryName = null;
            }
            productList.push({
                id: product.id,
                name: product.name,
                vendorCode: product.vendorCode,
                description: product.description,
                shortDescription: product.shortDescription,
                overallRating: product.overallRating,
                quantity: product.quantity,
                price: product.price,
                category: {id: product.categoryId, name: categoryName},
                subcategory: {id: product.subcategoryId, name: subcategoryName},
                brand: {id: product.brandId, name: brandName},
                images: product.images.map(image => {
                    return({
                        id: image.id,
                        path: image.path.slice(-40),
                        src: false,
                    })
                }),
                characteristics: product.characteristics.map(char => {
                    return({
                        id: char.id,
                        title: char.title,
                        value: char.value
                    })
                })
            })
        });

        return productList;
    }

    static getImages(images){
        const oldImages = [];
        const newImages = [];

        images.forEach(img => {
            if(img.path === false){
                newImages.push(img);
            };
            if(img.src === false){
                oldImages.push(img.id);
            }
        })

        return {oldImages, newImages};
    }
}