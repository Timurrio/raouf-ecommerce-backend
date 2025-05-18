const sequelize = require("../db");
const { DataTypes } = require('sequelize');

// Модель пользователя
const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull:false},
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

// Модель заказа
const Order = sequelize.define("order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }
});

// Модель товара
const Item = sequelize.define("item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    otherImgs: { type: DataTypes.JSON, allowNull: true }, // массив изображений
    specs: { type: DataTypes.STRING(1000), allowNull: true },
    texture: { type: DataTypes.STRING, allowNull: true },
    weight: { type: DataTypes.STRING, allowNull: true },
    size: { type: DataTypes.STRING, allowNull: true }
});

// Модель строки заказа (товары в заказе)
const OrderItem = sequelize.define("order_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    itemId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false } // цена товара в момент заказа
});

const Commentary = sequelize.define("commentary", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false},
    itemId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    text: { type: DataTypes.STRING, allowNull: false}, 
    verdict: { type: DataTypes.BOOLEAN, allowNull: false}
})

// Устанавливаем связи между таблицами

// Связь User -> Order (один пользователь может иметь много заказов)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Связь Order -> OrderItem (один заказ содержит несколько товаров)
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Связь Item -> OrderItem (один товар может быть в нескольких заказах)
Item.hasMany(OrderItem, { foreignKey: 'itemId' });
OrderItem.belongsTo(Item, { foreignKey: 'itemId' });

User.hasMany(Commentary, { foreignKey: 'userId' });
Commentary.belongsTo(User, { foreignKey: 'userId' });

Item.hasMany(Commentary, { foreignKey: 'itemId' });
Commentary.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = {
    User, Order, Item, OrderItem, Commentary
};


// const sequelize = require("../db")
// const {DataTypes} = require('sequelize')

// const User = sequelize.define( "user", {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     email: {type: DataTypes.STRING, unique: true, },
//     password: {type: DataTypes.STRING},
//     role: {type: DataTypes.STRING, defaultValue: "USER"}
// })

// const Item = sequelize.define( "item", {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     category: {type: DataTypes.STRING, allowNull: false}, 
//     img: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: true}, 
//     price: {type: DataTypes.FLOAT, allowNull: false},
//     otherImgs: {type: DataTypes.JSON}, 
//     specs: {type: DataTypes.STRING, allowNull: false},
//     texture: {type: DataTypes.STRING, allowNull: false},
//     weight: {type: DataTypes.STRING, allowNull: false},
//     size: {type: DataTypes.STRING, allowNull: false},
// })

// const Order = sequelize.define( "order", {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

// })

// User.hasOne(Basket)
// Basket.belongsTo(User)

// User.hasMany(Rating)
// Rating.belongsTo(User)

// Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)

// Type.hasMany(Device)
// Device.belongsTo(Type)

// Brand.hasMany(Device)
// Device.belongsTo(Brand)

// Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)

// Device.hasMany(DeviceInfo, {as: "info"})
// DeviceInfo.belongsTo(Device)

// Type.belongsToMany(Brand, {through: TypeBrand})
// Brand.belongsToMany(Type, {through: TypeBrand})

// module.exports = {
//     User, Basket, BasketDevice, Device, Type, Brand, Rating, TypeBrand, DeviceInfo
// }
