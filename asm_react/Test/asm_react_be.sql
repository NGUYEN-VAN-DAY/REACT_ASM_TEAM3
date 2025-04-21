-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 18, 2025 lúc 09:13 AM
-- Phiên bản máy phục vụ: 8.0.36
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asm_react_be`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`, `image`, `status`, `description`) VALUES
(72, 'fwefwefw', '2025-04-18 08:54:14', '2025-04-18 08:54:14', '1744966454092.jpg', '1', 'fwfwefw'),
(73, 'fewfwfwee', '2025-04-18 08:59:05', '2025-04-18 08:59:05', '1744966745539.jpeg', '1', 'fwfwfw');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salePrice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `longDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `images`, `price`, `createdAt`, `updatedAt`, `salePrice`, `longDescription`, `status`, `category_id`) VALUES
(112, 'fwfwfwa', '22222222222222', '1744966858666-453329941.jpeg', '22222222222222222222', '2025-04-18 09:00:58', '2025-04-18 09:00:58', '222', '2eqdqdqwđ', 1, 72),
(113, 'fwefwfw', '2222222222222', '1744967489368-485100492.jpeg', '222222222222222', '2025-04-18 09:11:29', '2025-04-18 09:11:29', '22222222222222', '22222222222', 0, 72);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Không có địa chỉ',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id` int NOT NULL,
  `credits` int NOT NULL DEFAULT '0',
  `role` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`name`, `email`, `phone`, `address`, `password`, `avatar`, `id`, `credits`, `role`) VALUES
('Đây nguyễn', 'daynvpc08855@gmail.com', '0795895167', 'Không có địa chỉ', '$2b$12$jTb18nStcVtUWA9tCIK6ZeztvNoxlGtbnMM/o5x96j.IA05CLlOaO', NULL, 15, 0, 0),
('admin', 'daynvpc08855@gmadil.com', '0795895167', 'Không có địa chỉ', '$2b$12$jaOmGNEUmVYkEGllmAiLXO3d30MwyHl7Yguv6jEeCrHkxyPFsJHmi', NULL, 16, 0, 1),
('Đây nguyễn', 'ưefewfewffw', '0795895167', 'Không có địa chỉ', '$2b$12$vV/xNKc46OTtDOaXLdbR5uXJ2r.fnHvyzrNUh8c.z.SvpZHXHa4Ve', NULL, 17, 0, 0),
('Đây nguyễn', 'ưefwfwf', '0795895167', 'Không có địa chỉ', '$2b$12$ngWLu74h/5XslPIbZeeva.ju16v8Ijia4YEQO3XacjQ6TMcjo5nIS', NULL, 18, 0, 0),
('Đây nguyễn', 'thinhnppc08854@gmail.com', '0795895167', 'Không có địa chỉ', '$2b$12$FpXCOpF3lkUjHff4isfdX.ke4ATouGtF0d9.9nBOrabDN9rCWmA9C', NULL, 19, 0, 0),
('dan', 'vvvvvv', '0795895167', 'Không có địa chỉ', '$2b$12$bJUZdeoIasVzaX/IxgxLEOV3UqSmO2VxmmEiiKa4GtAbMbBq.N3Bi', NULL, 20, 0, 0),
('tuan', 'daynguyen0109@gmail.comd', '0795895167', 'Không có địa chỉ', '$2b$12$zu/MHcNKtdV26npVVRM0A.ca2cbd3.9P7s2oBiwGtFrHY2RjQN2HC', NULL, 21, 0, 0),
('dddđ', 'daynvpc08855ff@gmail.com', '3453535345', 'Không có địa chỉ', '$2b$12$BRMOveVYk5is1c3sDIek8uWbLWAUuuK25xD1DqZsn963xIvs2pRIK', NULL, 22, 0, 0),
('Đây nguyễn', 'daynvpc08855@gmail.com', '0795895167', 'Không có địa chỉ', '21232f297a57a5a743894a0e4a801fc3', NULL, 24, 0, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
