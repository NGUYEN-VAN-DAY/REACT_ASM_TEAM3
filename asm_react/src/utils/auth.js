import axios from "axios";

// Set up axios interceptors
axios.defaults.withCredentials = true;

// API URL
const API_URL = "http://localhost:3000";

// Lưu thông tin người dùng vào localStorage
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Lấy thông tin người dùng từ localStorage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error("Lỗi khi parse thông tin user:", e);
    return null;
  }
};

// Kiểm tra người dùng đã đăng nhập chưa
export const isAuthenticated = () => {
  return !!getUser();
};

// Đăng xuất
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/users/logout`);
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return false;
  }
};

// Kiểm tra session từ server
export const checkServerSession = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/check-auth`);
    if (response.data.isAuthenticated) {
      // Cập nhật thông tin người dùng nếu có sự thay đổi
      setUser(response.data.user);
      return true;
    } else {
      // Xóa thông tin người dùng nếu session đã hết hạn
      localStorage.removeItem("user");
      return false;
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra phiên đăng nhập:", error);
    return false;
  }
};

// Lấy giỏ hàng từ API
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return [];
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (product, quantity, price) => {
  // Kiểm tra đăng nhập
  if (!isAuthenticated()) {
    throw new Error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
  }

  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      productId: product.id,
      quantity: quantity,
      price: price,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    throw new Error(
      error.response?.data?.message || "Không thể thêm vào giỏ hàng"
    );
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartQuantity = async (cartId, quantity) => {
  // Kiểm tra đăng nhập
  if (!isAuthenticated()) {
    throw new Error("Vui lòng đăng nhập để cập nhật giỏ hàng!");
  }

  try {
    const response = await axios.put(`${API_URL}/cart/${cartId}`, {
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật giỏ hàng:", error);
    throw new Error(
      error.response?.data?.message || "Không thể cập nhật giỏ hàng"
    );
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (cartId) => {
  // Kiểm tra đăng nhập
  if (!isAuthenticated()) {
    throw new Error("Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng!");
  }

  try {
    const response = await axios.delete(`${API_URL}/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa khỏi giỏ hàng:", error);
    throw new Error(
      error.response?.data?.message || "Không thể xóa khỏi giỏ hàng"
    );
  }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async () => {
  try {
    const response = await axios.delete(`${API_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
    throw new Error(error.response?.data?.message || "Không thể xóa giỏ hàng");
  }
};

// Tính tổng tiền giỏ hàng
export const calculateCartTotal = (cartItems) => {
  if (!cartItems || !cartItems.length) return 0;

  return cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    return total + itemPrice * item.quantity;
  }, 0);
};
