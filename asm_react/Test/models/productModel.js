const connection = require('../database');
const { DataTypes } = require('sequelize');

const Product = connection.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    salePrice: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories', 
            key: 'id'
        }
    },
}, {
    tableName: 'products',
    timestamps: true,
});

module.exports = Product;
