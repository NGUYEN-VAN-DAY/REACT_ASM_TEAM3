import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm format tiền VNĐ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Lấy giỏ hàng từ server khi component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Lấy giỏ hàng từ server
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart', {
        withCredentials: true
      });
      
      // Kiểm tra response.data có phải là object và có thuộc tính data không
      if (response.data && Array.isArray(response.data.data)) {
        // Chuyển đổi dữ liệu để phù hợp với cấu trúc hiện tại
        const formattedCartItems = response.data.data.map(item => ({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.Product.salePrice || item.Product.price,
          title: item.Product.title,
          images: item.Product.images,
          totalPrice: item.totalPrice
        }));
        
        setCartItems(formattedCartItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response?.status === 401) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        navigate('/login');
      }
      setCartItems([]); // Đặt giỏ hàng rỗng nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Lấy thông tin sản phẩm
      const productResponse = await axios.get(`http://localhost:3000/products/${productId}`);
      const product = productResponse.data;
      
      // Sử dụng giá chính thức
      const price = product.price;

      const response = await axios.post(
        'http://localhost:3000/cart',
        { productId, quantity, price },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.message === 'Thêm vào giỏ hàng thành công') {
        await fetchCart();
        toast.success('Thêm vào giỏ hàng thành công');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/cart/${cartItemId}`,
        {
          quantity
        },
        { withCredentials: true }
      );
      
      if (response.data.message === 'Cập nhật số lượng thành công') {
        fetchCart(); // Cập nhật lại giỏ hàng
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating cart:', error);
      if (error.response?.status === 401) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        navigate('/login');
      }
      return false;
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/cart/${cartItemId}`,
        { withCredentials: true }
      );
      
      if (response.data.message === 'Xóa sản phẩm khỏi giỏ hàng thành công') {
        fetchCart(); // Cập nhật lại giỏ hàng
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from cart:', error);
      if (error.response?.status === 401) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        navigate('/login');
      }
      return false;
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:3000/cart/clear',
        { withCredentials: true }
      );
      
      if (response.data.message === 'Xóa giỏ hàng thành công') {
        setCartItems([]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing cart:', error);
      if (error.response?.status === 401) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        navigate('/login');
      }
      return false;
    }
  };

  // Tính tổng tiền giỏ hàng
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.totalPrice);
    }, 0);
  };

  // Tính tổng số sản phẩm trong giỏ hàng
  const getCartCount = () => {
    return cartItems.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        formatCurrency
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 