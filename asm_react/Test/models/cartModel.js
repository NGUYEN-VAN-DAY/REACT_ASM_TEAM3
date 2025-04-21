const connection = require("../database");
const { DataTypes } = require("sequelize");
const User = require("./userModel");
const Product = require("./productModel");

const Cart = connection.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);

// Thiết lập mối quan hệ
Cart.belongsTo(User, { foreignKey: "user_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Cart;
