# 📚 Product API Documentation

> **Hướng dẫn tích hợp Backend REST API cho Frontend Developer**

## 📋 Mục lục

- [Cấu hình ban đầu](#-cấu-hình-ban-đầu)
- [Cấu trúc Response](#-cấu-trúc-response)
- [Authentication](#-authentication)
- [Products API](#-products-api)
- [Cart API](#-cart-api)
- [Migrations API](#-migrations-api)
- [Ví dụ tích hợp](#-ví-dụ-tích-hợp)
- [Xử lý lỗi](#-xử-lý-lỗi)

---

## 🚀 Cấu hình ban đầu

### Environment Variables

Tạo file `.env.local` trong thư mục frontend:

```env
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

**Lưu ý:** 
- Môi trường local: `http://localhost:3001`
- Môi trường production: thay đổi URL tương ứng

### Base URL

Tất cả endpoints đều bắt đầu với `/api`:

```
{NEXT_PUBLIC_API_BASE}/api/{endpoint}
```

**Ví dụ:** `http://localhost:3001/api/products`

---

## 📦 Cấu trúc Response

### ✅ Response thành công

```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### ❌ Response lỗi

```json
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi (nếu có)",
  "errors": ["Validation error 1", "..."]
}
```

**Lưu ý:** Một số lỗi validation có thể trả về mảng `errors` thay vì `error` string.

---

## 🔐 Authentication

### JWT Token Info
- Backend sử dụng JWT với `JWT_SECRET` từ environment
- Token mặc định hết hạn sau **7 ngày** (có thể config qua `JWT_EXPIRES_IN`)
- Token payload chứa: `{ id, role, email }`

### 1. Đăng ký tài khoản

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"  // optional, mặc định là "user"
}
```

**Validation:**
- `name`, `email`, `password` là **bắt buộc**
- Email phải **chưa tồn tại** trong hệ thống
- Password sẽ được hash bằng bcrypt (salt rounds: 10)

**Response thành công (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Nguyễn Văn A",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response lỗi (400):**
```json
{
  "success": false,
  "message": "Missing required fields"
}
// hoặc
{
  "success": false,
  "message": "Email already in use"
}
```

**Code example:**
```javascript
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/register`, {
      name,
      email,
      password
    });
    
    if (response.data.success) {
      const { token, user } = response.data.data;
      // Lưu token
      localStorage.setItem('token', token);
      // Lưu user info (optional)
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user, token };
    }
  } catch (error) {
    const message = error.response?.data?.message || 'Đăng ký thất bại';
    return { success: false, message };
  }
};
```

### 2. Đăng nhập

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation:**
- `email` và `password` là **bắt buộc**
- Backend sẽ verify password bằng bcrypt

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Nguyễn Văn A",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response lỗi:**
```json
// 400 - Missing fields
{
  "success": false,
  "message": "Missing email or password"
}

// 401 - Invalid credentials
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Code example:**
```javascript
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/login`, {
      email,
      password
    });
    
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user, token };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, message: 'Email hoặc mật khẩu không đúng' };
    }
    return { success: false, message: 'Đăng nhập thất bại' };
  }
};
```

### 3. Lấy thông tin user hiện tại

**Endpoint:** `GET /api/auth/me`

**Headers:** 
```
Authorization: Bearer {token}
```

**Middleware:** Sử dụng `authenticate` middleware
- Verify JWT token
- Lấy user info từ database (exclude password)
- Attach user vào `req.user`

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response lỗi:**
```json
// 401 - No token
{
  "success": false,
  "message": "No token provided"
}

// 401 - Invalid token
{
  "success": false,
  "message": "Invalid token"
}

// 401 - Token expired hoặc lỗi verify
{
  "success": false,
  "message": "Unauthorized",
  "error": "jwt expired"
}
```

**Code example:**
```javascript
const getMe = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Chưa đăng nhập' };
    }
    
    const response = await axios.get(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.success) {
      return { success: true, user: response.data.data };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: false, message: 'Phiên đăng nhập hết hạn' };
    }
    return { success: false, message: 'Không thể lấy thông tin user' };
  }
};
```

---

## 🛍️ Products API

### Product Object Structure

```typescript
interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### 1. Lấy danh sách sản phẩm (có phân trang & tìm kiếm)

**Endpoint:** `GET /api/products`

**Authentication:** ❌ Không cần

**Query Parameters:**
| Tham số | Type | Mặc định | Mô tả |
|---------|------|----------|-------|
| page | number | 1 | Trang hiện tại |
| limit | number | 10 | Số sản phẩm mỗi trang |
| search | string | - | Tìm kiếm theo tên sản phẩm (regex, case-insensitive) |

**Backend Logic:**
- Sử dụng MongoDB `$regex` với option `i` (case-insensitive)
- Sort theo `createdAt` giảm dần (sản phẩm mới nhất trước)
- Skip = `(page - 1) * limit`

**Response thành công (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Áo thun nam basic",
      "description": "Áo thun cotton cao cấp",
      "price": 299000,
      "stock": 50,
      "image": "https://example.com/image.jpg",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

**Response lỗi (500):**
```json
{
  "success": false,
  "message": "Lỗi server khi lấy danh sách sản phẩm",
  "error": "..."
}
```

**Code example:**
```javascript
const getProducts = async (page = 1, limit = 12, search = '') => {
  try {
    const params = { page, limit };
    if (search) params.search = search;
    
    const response = await axios.get(`${API_BASE}/api/products`, { params });
    
    if (response.data.success) {
      return {
        success: true,
        products: response.data.data,
        pagination: response.data.pagination
      };
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, message: 'Không thể tải danh sách sản phẩm' };
  }
};

// Sử dụng
const result = await getProducts(1, 12, 'áo thun');
console.log(`Tìm thấy ${result.pagination.total} sản phẩm`);
console.log(`Trang ${result.pagination.page}/${result.pagination.pages}`);
```

### 2. Lấy chi tiết sản phẩm

**Endpoint:** `GET /api/products/:id`

**Authentication:** ❌ Không cần

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Áo thun nam basic",
    "description": "Áo thun cotton cao cấp",
    "price": 299000,
    "stock": 50,
    "image": "https://example.com/image.jpg",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response lỗi:**
```json
// 404 - Not found
{
  "success": false,
  "message": "Không tìm thấy sản phẩm"
}

// 500 - Server error
{
  "success": false,
  "message": "Lỗi server khi lấy thông tin sản phẩm",
  "error": "..."
}
```

**Code example:**
```javascript
const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/api/products/${id}`);
    
    if (response.data.success) {
      return { success: true, product: response.data.data };
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Không tìm thấy sản phẩm' };
    }
    return { success: false, message: 'Không thể tải thông tin sản phẩm' };
  }
};
```

### 3. Tạo sản phẩm mới

**Endpoint:** `POST /api/products`

**Authentication:** ❌ Không cần (nhưng nên thêm trong production)

**Request Body:**
```json
{
  "name": "Áo thun nam basic",
  "description": "Áo thun cotton cao cấp",
  "price": 299000,
  "stock": 50,
  "image": "https://example.com/image.jpg",
  "isActive": true
}
```

**Validation:** Dựa vào Product model schema

**Response thành công (201):**
```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Áo thun nam basic",
    "price": 299000,
    ...
  }
}
```

**Response lỗi:**
```json
// 400 - Validation error
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    "Name is required",
    "Price must be a positive number"
  ]
}

// 500 - Server error
{
  "success": false,
  "message": "Lỗi server khi tạo sản phẩm",
  "error": "..."
}
```

**Code example:**
```javascript
const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE}/api/products`, productData);
    
    if (response.data.success) {
      return { 
        success: true, 
        message: 'Tạo sản phẩm thành công',
        product: response.data.data 
      };
    }
  } catch (error) {
    if (error.response?.status === 400) {
      const errors = error.response.data.errors || [error.response.data.message];
      return { success: false, errors };
    }
    return { success: false, message: 'Không thể tạo sản phẩm' };
  }
};

// Sử dụng
const newProduct = {
  name: 'Áo thun nam',
  description: 'Áo thun cotton',
  price: 299000,
  stock: 50,
  image: 'https://example.com/image.jpg'
};

const result = await createProduct(newProduct);
```

### 4. Cập nhật sản phẩm

**Endpoint:** `PUT /api/products/:id`

**Authentication:** ❌ Không cần (nhưng nên thêm trong production)

**Request Body:** Các trường cần cập nhật (không cần gửi tất cả)

```json
{
  "price": 250000,
  "stock": 30
}
```

**Backend Options:**
- `new: true` - Trả về document sau khi update
- `runValidators: true` - Chạy validation khi update

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Áo thun nam basic",
    "price": 250000,
    "stock": 30,
    ...
  }
}
```

**Response lỗi:**
```json
// 404 - Not found
{
  "success": false,
  "message": "Không tìm thấy sản phẩm"
}

// 400 - Validation error
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": ["Price must be positive"]
}
```

**Code example:**
```javascript
const updateProduct = async (id, updates) => {
  try {
    const response = await axios.put(`${API_BASE}/api/products/${id}`, updates);
    
    if (response.data.success) {
      return { 
        success: true, 
        message: 'Cập nhật thành công',
        product: response.data.data 
      };
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Không tìm thấy sản phẩm' };
    }
    if (error.response?.status === 400) {
      const errors = error.response.data.errors || [error.response.data.message];
      return { success: false, errors };
    }
    return { success: false, message: 'Không thể cập nhật sản phẩm' };
  }
};
```

### 5. Xóa sản phẩm (Admin only)

**Endpoint:** `DELETE /api/products/:id`

**Authentication:** ✅ **Bắt buộc** (Admin role)

**Middleware chain:**
1. `authenticate` - Verify JWT token
2. `authorizeRole('admin')` - Check user role

**Headers:**
```
Authorization: Bearer {token}
```

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công"
}
```

**Response lỗi:**
```json
// 401 - No token hoặc invalid token
{
  "success": false,
  "message": "Unauthorized"
}

// 403 - Not admin
{
  "success": false,
  "message": "Forbidden: insufficient rights"
}

// 404 - Not found
{
  "success": false,
  "message": "Không tìm thấy sản phẩm"
}
```

**Code example:**
```javascript
const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Vui lòng đăng nhập' };
    }
    
    const response = await axios.delete(`${API_BASE}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.success) {
      return { success: true, message: 'Xóa sản phẩm thành công' };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, message: 'Vui lòng đăng nhập' };
    }
    if (error.response?.status === 403) {
      return { success: false, message: 'Bạn không có quyền xóa sản phẩm' };
    }
    if (error.response?.status === 404) {
      return { success: false, message: 'Không tìm thấy sản phẩm' };
    }
    return { success: false, message: 'Không thể xóa sản phẩm' };
  }
};
```

---

## 🛒 Cart API

> **Lưu ý:** Tất cả endpoints giỏ hàng đều yêu cầu authentication

### Cart Object Structure

```typescript
interface Cart {
  _id: string;
  user: string;  // User ID
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  product: string | Product;  // Product ID hoặc populated Product object
  name: string;
  price: number;
  quantity: number;
  _id: string;
}
```

**Backend behavior:**
- Cart items được populate với thông tin product đầy đủ
- Nếu user chưa có cart, backend tự động tạo mới
- Item `name` và `price` được lưu trữ tại thời điểm thêm vào cart (snapshot)

### 1. Lấy giỏ hàng của user

**Endpoint:** `GET /api/cart`

**Authentication:** ✅ **Bắt buộc**

**Headers:**
```
Authorization: Bearer {token}
```

**Backend Logic:**
- Tìm cart theo `req.user._id` (từ authenticate middleware)
- Nếu chưa có cart → tự động tạo mới với `items: []`
- Populate `items.product` với thông tin đầy đủ

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "_id": "item_id",
        "product": {
          "_id": "product_id",
          "name": "Áo thun nam basic",
          "price": 299000,
          "stock": 50,
          "image": "https://example.com/image.jpg"
        },
        "name": "Áo thun nam basic",
        "price": 299000,
        "quantity": 2
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Response lỗi (500):**
```json
{
  "success": false,
  "message": "Server error",
  "error": "..."
}
```

**Code example:**
```javascript
const getCart = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.success) {
      const cart = response.data.data;
      const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return { 
        success: true, 
        cart,
        totalItems,
        totalPrice
      };
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { success: false, message: 'Không thể tải giỏ hàng' };
  }
};
```

### 2. Thêm sản phẩm vào giỏ hàng

**Endpoint:** `POST /api/cart`

**Authentication:** ✅ **Bắt buộc**

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2  // optional, mặc định 1
}
```

**Backend Logic:**
1. Validate `productId` có tồn tại không
2. Tìm/tạo cart của user
3. Nếu product đã có trong cart → tăng quantity
4. Nếu chưa có → thêm item mới với `name`, `price` từ product
5. Save cart và populate items

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "_id": "item_id",
        "product": { ... },  // populated
        "name": "Áo thun nam basic",
        "price": 299000,
        "quantity": 2
      }
    ]
  }
}
```

**Response lỗi:**
```json
// 400 - Missing productId
{
  "success": false,
  "message": "productId is required"
}

// 404 - Product not found
{
  "success": false,
  "message": "Product not found"
}

// 401 - Unauthorized
{
  "success": false,
  "message": "Unauthorized"
}
```

**Code example:**
```javascript
const addToCart = async (productId, quantity = 1) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'Vui lòng đăng nhập' };
    }
    
    const response = await axios.post(
      `${API_BASE}/api/cart`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (response.data.success) {
      return { 
        success: true, 
        message: 'Đã thêm vào giỏ hàng',
        cart: response.data.data 
      };
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Sản phẩm không tồn tại' };
    }
    if (error.response?.status === 401) {
      return { success: false, message: 'Vui lòng đăng nhập' };
    }
    return { success: false, message: 'Không thể thêm vào giỏ hàng' };
  }
};

// Sử dụng với notification
const handleAddToCart = async (productId) => {
  const result = await addToCart(productId, 1);
  if (result.success) {
    toast.success(result.message); // Assuming you use a toast library
    // Update cart count in header
    updateCartCount(result.cart.items.length);
  } else {
    toast.error(result.message);
  }
};
```

### 3. Cập nhật số lượng sản phẩm

**Endpoint:** `PUT /api/cart/:productId`

**Authentication:** ✅ **Bắt buộc**

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 5
}
```

**Validation:**
- `quantity` phải >= 1
- `productId` phải tồn tại trong cart

**Backend Logic:**
1. Tìm cart của user
2. Tìm item có `product` matching `productId`
3. Update quantity
4. Save và populate

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "product": { ... },
        "name": "Áo thun nam basic",
        "price": 299000,
        "quantity": 5  // updated
      }
    ]
  }
}
```

**Response lỗi:**
```json
// 400 - Invalid quantity
{
  "success": false,
  "message": "quantity must be >= 1"
}

// 404 - Cart not found
{
  "success": false,
  "message": "Cart not found"
}

// 404 - Item not in cart
{
  "success": false,
  "message": "Item not found in cart"
}
```

**Code example:**
```javascript
const updateCartItemQuantity = async (productId, quantity) => {
  try {
    if (quantity < 1) {
      return { success: false, message: 'Số lượng phải lớn hơn 0' };
    }
    
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_BASE}/api/cart/${productId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (response.data.success) {
      return { 
        success: true, 
        message: 'Đã cập nhật số lượng',
        cart: response.data.data 
      };
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Sản phẩm không có trong giỏ hàng' };
    }
    return { success: false, message: 'Không thể cập nhật số lượng' };
  }
};

// Sử dụng với input number
const handleQuantityChange = async (productId, newQuantity) => {
  const result = await updateCartItemQuantity(productId, newQuantity);
  if (result.success) {
    // Update UI with result.cart
    setCart(result.cart);
  } else {
    toast.error(result.message);
  }
};
```

### 4. Xóa sản phẩm khỏi giỏ hàng

**Endpoint:** `DELETE /api/cart/:productId`

**Authentication:** ✅ **Bắt buộc**

**Headers:**
```
Authorization: Bearer {token}
```

**Backend Logic:**
- Filter out item có `product` matching `productId`
- Save cart và populate

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      // Remaining items after deletion
    ]
  }
}
```

**Response lỗi:**
```json
// 404 - Cart not found
{
  "success": false,
  "message": "Cart not found"
}
```

**Code example:**
```javascript
const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${API_BASE}/api/cart/${productId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (response.data.success) {
      return { 
        success: true, 
        message: 'Đã xóa khỏi giỏ hàng',
        cart: response.data.data 
      };
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Không tìm thấy giỏ hàng' };
    }
    return { success: false, message: 'Không thể xóa sản phẩm' };
  }
};

// Sử dụng với confirm dialog
const handleRemoveItem = async (productId, productName) => {
  if (confirm(`Bạn có chắc muốn xóa "${productName}" khỏi giỏ hàng?`)) {
    const result = await removeFromCart(productId);
    if (result.success) {
      toast.success(result.message);
      setCart(result.cart);
    } else {
      toast.error(result.message);
    }
  }
};
```

### 5. Xóa toàn bộ giỏ hàng

**Endpoint:** `DELETE /api/cart`

**Authentication:** ✅ **Bắt buộc**

**Headers:**
```
Authorization: Bearer {token}
```

**Backend Logic:**
- Set `cart.items = []`
- Save cart

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "user": "user_id",
    "items": []
  }
}
```

**Response lỗi:**
```json
// 404 - Cart not found
{
  "success": false,
  "message": "Cart not found"
}
```

**Code example:**
```javascript
const clearCart = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.success) {
      return { 
        success: true, 
        message: 'Đã xóa toàn bộ giỏ hàng',
        cart: response.data.data 
      };
    }
  } catch (error) {
    return { success: false, message: 'Không thể xóa giỏ hàng' };
  }
};

// Sử dụng sau khi checkout thành công
const handleCheckoutSuccess = async () => {
  const result = await clearCart();
  if (result.success) {
    // Redirect to success page
    router.push('/checkout/success');
  }
};
```

---

## 🔄 Migrations API

### Reset & Seed Database

**Endpoint:** `POST /api/migrations/reset`

**Authentication:** ❌ Không cần

**Mô tả:** 
- Drop toàn bộ collections trong database
- Seed lại dữ liệu mẫu (products, users, etc.)

**⚠️ CẢNH BÁO:**
- **CHỈ SỬ DỤNG TRONG DEVELOPMENT**
- **KHÔNG BAO GIỜ DÙNG TRONG PRODUCTION**
- Sẽ xóa toàn bộ dữ liệu hiện có

**Response:**
```json
{
  "success": true,
  "message": "Database reset and seeded successfully"
}
```

**Code example:**
```javascript
const resetDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error('Cannot reset database in production!');
    return;
  }
  
  if (!confirm('CẢNH BÁO: Hành động này sẽ xóa toàn bộ dữ liệu. Bạn có chắc?')) {
    return;
  }
  
  try {
    const response = await axios.post(`${API_BASE}/api/migrations/reset`);
    if (response.data.success) {
      alert('Database đã được reset thành công!');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error resetting database:', error);
    alert('Không thể reset database');
  }
};
```

---

## 💡 Ví dụ tích hợp

### Setup Axios Instance (Recommended)

Tạo file `src/lib/api.ts`:

```typescript
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

// Tạo axios instance
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Tự động thêm token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token hết hạn hoặc không hợp lệ
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?expired=true';
        }
      }
    }
    
    // Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### Service Layer Pattern

Tạo file `src/services/authService.ts`:

```typescript
import api from '@/lib/api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Đăng ký
  register: async (data: RegisterData) => {
    const response = await api.post('/api/auth/register', data);
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  // Đăng nhập
  login: async (data: LoginData) => {
    const response = await api.post('/api/auth/login', data);
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Lấy thông tin user
  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Kiểm tra đã đăng nhập
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Lấy user từ localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
```

Tạo file `src/services/productService.ts`:

```typescript
import api from '@/lib/api';

export const productService = {
  // Lấy danh sách sản phẩm
  getAll: async (params: { page?: number; limit?: number; search?: string } = {}) => {
    const response = await api.get('/api/products', { params });
    return response.data;
  },

  // Lấy chi tiết sản phẩm
  getById: async (id: string) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  // Tạo sản phẩm
  create: async (data: any) => {
    const response = await api.post('/api/products', data);
    return response.data;
  },

  // Cập nhật sản phẩm
  update: async (id: string, data: any) => {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
  },

  // Xóa sản phẩm
  delete: async (id: string) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
};
```

Tạo file `src/services/cartService.ts`:

```typescript
import api from '@/lib/api';

export const cartService = {
  // Lấy giỏ hàng
  get: async () => {
    const response = await api.get('/api/cart');
    return response.data;
  },

  // Thêm vào giỏ
  addItem: async (productId: string, quantity: number = 1) => {
    const response = await api.post('/api/cart', { productId, quantity });
    return response.data;
  },

  // Cập nhật số lượng
  updateItem: async (productId: string, quantity: number) => {
    const response = await api.put(`/api/cart/${productId}`, { quantity });
    return response.data;
  },

  // Xóa sản phẩm
  removeItem: async (productId: string) => {
    const response = await api.delete(`/api/cart/${productId}`);
    return response.data;
  },

  // Xóa toàn bộ giỏ
  clear: async () => {
    const response = await api.delete('/api/cart');
    return response.data;
  },
};
```

### React Custom Hooks

Tạo file `src/hooks/useAuth.ts`:

```typescript
import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const response = await authService.getMe();
        if (response.success) {
          setUser(response.data);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng nhập thất bại' 
      };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.register({ name, email, password });
      if (response.success) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng ký thất bại' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, login, register, logout, isAuthenticated: !!user };
}
```

Tạo file `src/hooks/useProducts.ts`:

```typescript
import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';

export function useProducts(page = 1, limit = 12, search = '') {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [page, limit, search]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getAll({ page, limit, search });
      
      if (response.success) {
        setProducts(response.data);
        setPagination(response.pagination);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchProducts();
  };

  return { products, pagination, loading, error, refetch };
}
```

Tạo file `src/hooks/useCart.ts`:

```typescript
import { useState, useEffect } from 'react';
import { cartService } from '@/services/cartService';
import { useAuth } from './useAuth';

export function useCart() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cartService.get();
      if (response.success) {
        setCart(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: string, quantity: number = 1) => {
    try {
      const response = await cartService.addItem(productId, quantity);
      if (response.success) {
        setCart(response.data);
        return { success: true, message: 'Đã thêm vào giỏ hàng' };
      }
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Không thể thêm vào giỏ' 
      };
    }
  };

  const updateItem = async (productId: string, quantity: number) => {
    try {
      const response = await cartService.updateItem(productId, quantity);
      if (response.success) {
        setCart(response.data);
        return { success: true };
      }
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Không thể cập nhật' 
      };
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const response = await cartService.removeItem(productId);
      if (response.success) {
        setCart(response.data);
        return { success: true, message: 'Đã xóa khỏi giỏ hàng' };
      }
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Không thể xóa' 
      };
    }
  };

  const clearCart = async () => {
    try {
      const response = await cartService.clear();
      if (response.success) {
        setCart(response.data);
        return { success: true };
      }
    } catch (err: any) {
      return { success: false };
    }
  };

  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = cart?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  return { 
    cart, 
    loading, 
    error, 
    addItem, 
    updateItem, 
    removeItem, 
    clearCart,
    refetch: fetchCart,
    totalItems,
    totalPrice
  };
}
```

### Sử dụng trong Component

```tsx
// pages/products/index.tsx
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { products, pagination, loading } = useProducts(page, 12, search);
  const { addItem } = useCart();

  const handleAddToCart = async (productId: string) => {
    const result = await addItem(productId, 1);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString('vi-VN')}đ</p>
            <button onClick={() => handleAddToCart(product._id)}>
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={p === page ? 'font-bold' : ''}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

```tsx
// pages/cart/index.tsx
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { cart, loading, updateItem, removeItem, totalPrice } = useCart();

  if (loading) return <div>Đang tải...</div>;
  if (!cart || cart.items.length === 0) return <div>Giỏ hàng trống</div>;

  return (
    <div>
      <h1>Giỏ hàng của bạn</h1>
      
      {cart.items.map((item) => (
        <div key={item._id} className="flex items-center gap-4 p-4 border-b">
          <img src={item.product.image} alt={item.name} className="w-20 h-20" />
          <div className="flex-1">
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString('vi-VN')}đ</p>
          </div>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateItem(item.product._id, parseInt(e.target.value))}
            className="w-20"
          />
          <button onClick={() => removeItem(item.product._id)}>Xóa</button>
        </div>
      ))}

      <div className="mt-4 text-xl font-bold">
        Tổng: {totalPrice.toLocaleString('vi-VN')}đ
      </button>
    </div>
  );
}
```

---

## ⚠️ Xử lý lỗi

### Các loại lỗi thường gặp

| Status Code | Ý nghĩa | Xử lý trong code |
|-------------|---------|------------------|
| 400 | Bad Request - Dữ liệu không hợp lệ | Kiểm tra validation, hiển thị `errors` array |
| 401 | Unauthorized - Chưa đăng nhập/token hết hạn | Xóa token, redirect về /login |
| 403 | Forbidden - Không có quyền | Hiển thị thông báo, không cho phép thao tác |
| 404 | Not Found - Không tìm thấy resource | Hiển thị trang 404 hoặc thông báo |
| 500 | Server Error | Hiển thị lỗi chung, log error để debug |

### Error Response Types

Backend trả về các kiểu lỗi khác nhau:

```typescript
// Type 1: Simple error
{
  success: false,
  message: "Error message"
}

// Type 2: Error with details
{
  success: false,
  message: "Error message",
  error: "Detailed error info"
}

// Type 3: Validation errors (array)
{
  success: false,
  message: "Dữ liệu không hợp lệ",
  errors: ["Field 1 error", "Field 2 error"]
}
```

### Complete Error Handling Example

```typescript
import axios, { AxiosError } from 'axios';

interface ApiError {
  success: false;
  message: string;
  error?: string;
  errors?: string[];
}

async function handleApiCall<T>(apiCall: () => Promise<any>): Promise<{
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}> {
  try {
    const response = await apiCall();
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    
    return {
      success: false,
      message: response.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      const status = axiosError.response?.status;
      const errorData = axiosError.response?.data;
      
      // Network error
      if (!axiosError.response) {
        return {
          success: false,
          message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
        };
      }
      
      // Handle specific status codes
      switch (status) {
        case 400:
          return {
            success: false,
            message: errorData?.message || 'Dữ liệu không hợp lệ',
            errors: errorData?.errors,
          };
          
        case 401:
          // Auto logout handled by interceptor
          return {
            success: false,
            message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          };
          
        case 403:
          return {
            success: false,
            message: 'Bạn không có quyền thực hiện hành động này.',
          };
          
        case 404:
          return {
            success: false,
            message: errorData?.message || 'Không tìm thấy dữ liệu.',
          };
          
        case 500:
          return {
            success: false,
            message: 'Lỗi server. Vui lòng thử lại sau.',
          };
          
        default:
          return {
            success: false,
            message: errorData?.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
          };
      }
    }
    
    // Unknown error
    return {
      success: false,
      message: 'Có lỗi không xác định xảy ra.',
    };
  }
}

// Sử dụng
const result = await handleApiCall(() => 
  api.post('/api/products', productData)
);

if (result.success) {
  console.log('Product created:', result.data);
} else {
  console.error('Error:', result.message);
  if (result.errors) {
    result.errors.forEach(err => console.error('- ', err));
  }
}
```

### CORS Issues

Nếu gặp lỗi CORS:

**Triệu chứng:**
```
Access to XMLHttpRequest at 'http://localhost:3001/api/products' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Nguyên nhân:**
- Backend chưa cấu hình CORS
- Frontend origin không được cho phép
- Thiếu credentials config

**Giải pháp:**

1. **Kiểm tra backend CORS config** (trong `server.js`):
```javascript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

2. **Kiểm tra `.env.local`**:
```env
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

3. **Nếu dùng credentials**, thêm vào axios config:
```javascript
axios.defaults.withCredentials = true;
```

---

## 📁 Cấu trúc thư mục đề xuất

```
src/
├── lib/
│   └── api.ts              # Axios instance với interceptors
├── services/
│   ├── authService.ts      # Auth API calls
│   ├── productService.ts   # Product API calls
│   └── cartService.ts      # Cart API calls
├── hooks/
│   ├── useAuth.ts          # Authentication hook
│   ├── useProducts.ts      # Products hook với pagination
│   └── useCart.ts          # Cart management hook
├── types/
│   ├── auth.types.ts       # Auth interfaces
│   ├── product.types.ts    # Product interfaces
│   └── cart.types.ts       # Cart interfaces
└── utils/
    └── errorHandler.ts     # Centralized error handling
```

---

## 🔗 Tài nguyên bổ sung

### Backend Code Structure
```
product-be/
├── src/
│   ├── routes/
│   │   ├── auth.routes.js      # Authentication endpoints
│   │   ├── product.routes.js   # Product CRUD endpoints
│   │   ├── cart.routes.js      # Cart management endpoints
│   │   └── migration.routes.js # Database utilities
│   ├── controllers/
│   │   ├── auth.controller.js   # Auth business logic
│   │   ├── product.controller.js # Product business logic
│   │   └── cart.controller.js   # Cart business logic
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT verification & role check
│   └── models/
│       ├── user.model.js        # User schema
│       ├── product.model.js     # Product schema
│       └── cart.model.js        # Cart schema
```

### Tài liệu tham khảo
- **Axios Documentation:** https://axios-http.com
- **JWT Introduction:** https://jwt.io/introduction
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables

---