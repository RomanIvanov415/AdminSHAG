export default class BrandService{
    static transformBrands(brands){
        let brandList = [];
        brands.forEach(brand => {
            let quantity = 0;
            brand.devices.forEach(device => {
                quantity += device.quantity;
            });
            brandList.push({
                id: brand.id,
                name: brand.name,
                quantity
            });
        });
        return brandList;
    }

    static transforsDeviceList(list){
        let deviceList = [];
        list.forEach(device => {
            deviceList.push({
                id: device.id,
                name: device.name,
                vendorCode: device.vendorCode,
                image: device.images[0]
            });
        });
        return deviceList;
    }
}