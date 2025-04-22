-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 22, 2025 lúc 07:25 AM
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
-- Cơ sở dữ liệu: `giabao_nodejs_wd19304`
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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Chưa có mô tả',
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `images`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Xe côn tay', 'Các dòng xe côn tay thể thao và mạnh mẽ..mk kn ', 'xe_con_tay.jpg', 0, '2025-04-18 04:39:06', '2025-04-22 04:33:01'),
(2, 'Xe số', 'Dòng xe số phổ thông, tiết kiệm nhiên liệu.', 'xe_so.jpg', 1, '2025-04-18 04:39:06', '2025-04-18 04:39:20'),
(19, 'Xe điện', 'Các loại xe điện', NULL, 0, '2025-04-21 18:11:13', '2025-04-21 18:11:13'),
(20, 'Xe tay ga', 'Các dòng xe tay ga\r\n', NULL, 1, '2025-04-21 18:14:58', '2025-04-22 06:01:41'),
(27, 'Danh mục 1', 'áaaaa', NULL, 1, '2025-04-22 06:12:43', '2025-04-22 06:26:45'),
(33, 'ss', 'ss', NULL, 0, '2025-04-22 06:27:00', '2025-04-22 06:27:00'),
(100, 'Xe côn tay', 'Các dòng xe côn tay thể thao và mạnh mẽ..mk kn', 'xe_con_tay.jpg', 0, '2025-04-18 04:39:06', '2025-04-22 04:33:01'),
(101, 'Xe số', 'Dòng xe số phổ thông, tiết kiệm nhiên liệu.', 'xe_so.jpg', 1, '2025-04-18 04:39:06', '2025-04-18 04:39:20'),
(102, 'Xe điện', 'Các loại xe điện', NULL, 0, '2025-04-21 18:11:13', '2025-04-21 18:11:13'),
(103, 'Xe tay ga', 'Các dòng xe tay ga', NULL, 1, '2025-04-21 18:14:58', '2025-04-22 06:01:41'),
(104, 'Danh mục 1', 'áaaaa', NULL, 1, '2025-04-22 06:12:43', '2025-04-22 06:26:45'),
(105, 'ss', 'ss', NULL, 0, '2025-04-22 06:27:00', '2025-04-22 06:27:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,0) NOT NULL,
  `status` enum('pending','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pending',
  `shipping_address` text NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_status` enum('pending','completed') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `status`, `shipping_address`, `payment_method`, `payment_status`, `createdAt`, `updatedAt`) VALUES
(10, 24, 492492, 'completed', 'fsafasfas', 'COD', 'completed', '2025-04-20 15:05:46', '2025-04-20 15:06:09'),
(11, 24, 4888888, 'cancelled', 'gggg', 'COD', 'pending', '2025-04-20 15:07:25', '2025-04-20 15:07:39'),
(12, 24, 1467657, 'completed', 'bbbbb', 'COD', 'completed', '2025-04-20 15:18:17', '2025-04-21 17:38:09'),
(13, 25, 616065, 'pending', '23t34gf3wefq', 'COD', 'pending', '2025-04-21 16:25:41', '2025-04-21 16:25:41'),
(14, 25, 739278, 'pending', 'hậu giang', 'COD', 'pending', '2025-04-21 16:35:37', '2025-04-21 16:36:01'),
(15, 25, 253092, 'pending', 'sưdqqqqqqq', 'COD', 'pending', '2025-04-21 17:37:47', '2025-04-21 17:37:47'),
(16, 25, 1108917, 'pending', 'khygu', 'COD', 'pending', '2025-04-21 17:52:27', '2025-04-21 17:52:27'),
(17, 25, 143000000, 'cancelled', 'dayyyyyyyyyyyyyyyyy', 'COD', 'completed', '2025-04-22 05:39:09', '2025-04-22 05:39:51');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(19, 17, 113, 1, 57000000, '2025-04-22 05:39:09', '2025-04-22 05:39:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salePrice` int DEFAULT NULL,
  `longDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `images`, `price`, `createdAt`, `updatedAt`, `salePrice`, `longDescription`, `status`, `category_id`) VALUES
(113, 'Yamaha Exciter 155', 'Xe thể thao Yamaha Exciter 155, phong cách thể thao, mạnh mẽ.', '1745263081539-939147759.webp', '57000000', '2025-04-20 09:30:00', '2025-04-21 19:18:01', 55000000, 'Yamaha Exciter 155 với động cơ 155cc mạnh mẽ, thích hợp cho những người yêu thích tốc độ và sự thể thao, là một lựa chọn hoàn hảo cho những ai yêu thích khám phá đường phố.', 1, 1),
(239, 'Xe côn tay', 'Các dòng xe côn tay thể thao và mạnh mẽ..mk kn', '1745303950686-118626066.jpg', '5000000', '2025-04-22 13:18:39', '2025-04-22 06:39:10', 4500000, 'Xe côn tay được thiết kế với kiểu dáng thể thao, mạnh mẽ, mang lại trải nghiệm lái xe đầy hứng thú.', 1, 1),
(348, 'Sản phẩm 1', 'Mô tả ngắn sản phẩm 1', '1745303956290-529499759.webp', '100000', '2025-04-22 13:34:58', '2025-04-22 06:39:16', 90000, 'Mô tả chi tiết sản phẩm 1', 1, 1),
(349, 'Sản phẩm 2', 'Mô tả ngắn sản phẩm 2', '1745303963010-458352080.jpg', '150000', '2025-04-22 13:34:58', '2025-04-22 06:39:23', 140000, 'Mô tả chi tiết sản phẩm 2', 1, 1),
(350, 'Sản phẩm 3', 'Mô tả ngắn sản phẩm 3', '1745303969271-10603659.webp', '250000', '2025-04-22 13:34:58', '2025-04-22 06:39:29', 230000, 'Mô tả chi tiết sản phẩm 3', 1, 1),
(351, 'Sản phẩm 4', 'Mô tả ngắn sản phẩm 4', '1745303975569-732634163.jpg', '300000', '2025-04-22 13:34:58', '2025-04-22 06:39:35', 290000, 'Mô tả chi tiết sản phẩm 4', 1, 1),
(352, 'Sản phẩm 5', 'Mô tả ngắn sản phẩm 5', '1745303981487-289668196.jpg', '450000', '2025-04-22 13:34:58', '2025-04-22 06:39:41', 430000, 'Mô tả chi tiết sản phẩm 5', 1, 1),
(353, 'Sản phẩm 6', 'Mô tả ngắn sản phẩm 6', '1745303988838-134435752.jpg', '500000', '2025-04-22 13:34:58', '2025-04-22 06:39:48', 480000, 'Mô tả chi tiết sản phẩm 6', 1, 1),
(354, 'Sản phẩm 7', 'Mô tả ngắn sản phẩm 7', '1745303995208-648996211.jpg', '550000', '2025-04-22 13:34:58', '2025-04-22 06:39:55', 530000, 'Mô tả chi tiết sản phẩm 7', 1, 1),
(355, 'Sản phẩm 8', 'Mô tả ngắn sản phẩm 8', '1745304002004-504704955.jpg', '600000', '2025-04-22 13:34:58', '2025-04-22 06:40:02', 590000, 'Mô tả chi tiết sản phẩm 8', 1, 1),
(356, 'Sản phẩm 9', 'Mô tả ngắn sản phẩm 9', '1745304008067-619637337.jpeg', '700000', '2025-04-22 13:34:58', '2025-04-22 06:40:08', 680000, 'Mô tả chi tiết sản phẩm 9', 1, 1),
(357, 'Sản phẩm 10', 'Mô tả ngắn sản phẩm 10', '1745304014048-693368158.jpg', '750000', '2025-04-22 13:34:58', '2025-04-22 06:40:14', 730000, 'Mô tả chi tiết sản phẩm 10', 1, 1),
(358, 'Sản phẩm 50', 'Mô tả ngắn sản phẩm 50', 'https://via.placeholder.com/150?text=Product+50', '1200000', '2025-04-22 13:34:58', '2025-04-22 13:34:58', 1150000, 'Mô tả chi tiết sản phẩm 50', 1, 1),
(359, 'Sản phẩm 1', 'Mô tả ngắn sản phẩm 1', 'https://via.placeholder.com/150?text=Product+1', '100000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 90000, 'Mô tả chi tiết sản phẩm 1', 1, 1),
(360, 'Sản phẩm 2', 'Mô tả ngắn sản phẩm 2', 'https://via.placeholder.com/150?text=Product+2', '150000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 140000, 'Mô tả chi tiết sản phẩm 2', 1, 1),
(361, 'Sản phẩm 3', 'Mô tả ngắn sản phẩm 3', 'https://via.placeholder.com/150?text=Product+3', '250000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 230000, 'Mô tả chi tiết sản phẩm 3', 1, 1),
(362, 'Sản phẩm 4', 'Mô tả ngắn sản phẩm 4', 'https://via.placeholder.com/150?text=Product+4', '300000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 290000, 'Mô tả chi tiết sản phẩm 4', 1, 1),
(363, 'Sản phẩm 5', 'Mô tả ngắn sản phẩm 5', 'https://via.placeholder.com/150?text=Product+5', '450000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 430000, 'Mô tả chi tiết sản phẩm 5', 1, 1),
(364, 'Sản phẩm 6', 'Mô tả ngắn sản phẩm 6', 'https://via.placeholder.com/150?text=Product+6', '500000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 480000, 'Mô tả chi tiết sản phẩm 6', 1, 1),
(365, 'Sản phẩm 7', 'Mô tả ngắn sản phẩm 7', 'https://via.placeholder.com/150?text=Product+7', '550000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 530000, 'Mô tả chi tiết sản phẩm 7', 1, 1),
(366, 'Sản phẩm 8', 'Mô tả ngắn sản phẩm 8', 'https://via.placeholder.com/150?text=Product+8', '600000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 590000, 'Mô tả chi tiết sản phẩm 8', 1, 1),
(367, 'Sản phẩm 9', 'Mô tả ngắn sản phẩm 9', 'https://via.placeholder.com/150?text=Product+9', '700000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 680000, 'Mô tả chi tiết sản phẩm 9', 1, 1),
(368, 'Sản phẩm 10', 'Mô tả ngắn sản phẩm 10', 'https://via.placeholder.com/150?text=Product+10', '750000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 730000, 'Mô tả chi tiết sản phẩm 10', 1, 1),
(369, 'Sản phẩm 11', 'Mô tả ngắn sản phẩm 11', 'https://via.placeholder.com/150?text=Product+11', '800000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 780000, 'Mô tả chi tiết sản phẩm 11', 1, 1),
(370, 'Sản phẩm 12', 'Mô tả ngắn sản phẩm 12', 'https://via.placeholder.com/150?text=Product+12', '850000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 830000, 'Mô tả chi tiết sản phẩm 12', 1, 1),
(371, 'Sản phẩm 13', 'Mô tả ngắn sản phẩm 13', 'https://via.placeholder.com/150?text=Product+13', '900000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 880000, 'Mô tả chi tiết sản phẩm 13', 1, 1),
(372, 'Sản phẩm 14', 'Mô tả ngắn sản phẩm 14', 'https://via.placeholder.com/150?text=Product+14', '950000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 930000, 'Mô tả chi tiết sản phẩm 14', 1, 1),
(373, 'Sản phẩm 15', 'Mô tả ngắn sản phẩm 15', 'https://via.placeholder.com/150?text=Product+15', '1000000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 980000, 'Mô tả chi tiết sản phẩm 15', 1, 1),
(374, 'Sản phẩm 16', 'Mô tả ngắn sản phẩm 16', 'https://via.placeholder.com/150?text=Product+16', '1050000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1030000, 'Mô tả chi tiết sản phẩm 16', 1, 1),
(375, 'Sản phẩm 17', 'Mô tả ngắn sản phẩm 17', 'https://via.placeholder.com/150?text=Product+17', '1100000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1080000, 'Mô tả chi tiết sản phẩm 17', 1, 1),
(376, 'Sản phẩm 18', 'Mô tả ngắn sản phẩm 18', 'https://via.placeholder.com/150?text=Product+18', '1150000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1130000, 'Mô tả chi tiết sản phẩm 18', 1, 1),
(377, 'Sản phẩm 19', 'Mô tả ngắn sản phẩm 19', 'https://via.placeholder.com/150?text=Product+19', '1200000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1180000, 'Mô tả chi tiết sản phẩm 19', 1, 1),
(378, 'Sản phẩm 20', 'Mô tả ngắn sản phẩm 20', 'https://via.placeholder.com/150?text=Product+20', '1250000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1230000, 'Mô tả chi tiết sản phẩm 20', 1, 1),
(379, 'Sản phẩm 21', 'Mô tả ngắn sản phẩm 21', 'https://via.placeholder.com/150?text=Product+21', '1300000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1280000, 'Mô tả chi tiết sản phẩm 21', 1, 1),
(380, 'Sản phẩm 22', 'Mô tả ngắn sản phẩm 22', 'https://via.placeholder.com/150?text=Product+22', '1350000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1330000, 'Mô tả chi tiết sản phẩm 22', 1, 1),
(381, 'Sản phẩm 23', 'Mô tả ngắn sản phẩm 23', 'https://via.placeholder.com/150?text=Product+23', '1400000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1380000, 'Mô tả chi tiết sản phẩm 23', 1, 1),
(382, 'Sản phẩm 24', 'Mô tả ngắn sản phẩm 24', 'https://via.placeholder.com/150?text=Product+24', '1450000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1430000, 'Mô tả chi tiết sản phẩm 24', 1, 1),
(383, 'Sản phẩm 25', 'Mô tả ngắn sản phẩm 25', 'https://via.placeholder.com/150?text=Product+25', '1500000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1480000, 'Mô tả chi tiết sản phẩm 25', 1, 1),
(384, 'Sản phẩm 26', 'Mô tả ngắn sản phẩm 26', 'https://via.placeholder.com/150?text=Product+26', '1550000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1530000, 'Mô tả chi tiết sản phẩm 26', 1, 1),
(385, 'Sản phẩm 27', 'Mô tả ngắn sản phẩm 27', 'https://via.placeholder.com/150?text=Product+27', '1600000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1580000, 'Mô tả chi tiết sản phẩm 27', 1, 1),
(386, 'Sản phẩm 28', 'Mô tả ngắn sản phẩm 28', 'https://via.placeholder.com/150?text=Product+28', '1650000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1630000, 'Mô tả chi tiết sản phẩm 28', 1, 1),
(387, 'Sản phẩm 29', 'Mô tả ngắn sản phẩm 29', 'https://via.placeholder.com/150?text=Product+29', '1700000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1680000, 'Mô tả chi tiết sản phẩm 29', 1, 1),
(388, 'Sản phẩm 30', 'Mô tả ngắn sản phẩm 30', 'https://via.placeholder.com/150?text=Product+30', '1750000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1730000, 'Mô tả chi tiết sản phẩm 30', 1, 1),
(389, 'Sản phẩm 31', 'Mô tả ngắn sản phẩm 31', 'https://via.placeholder.com/150?text=Product+31', '1800000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1780000, 'Mô tả chi tiết sản phẩm 31', 1, 1),
(390, 'Sản phẩm 32', 'Mô tả ngắn sản phẩm 32', 'https://via.placeholder.com/150?text=Product+32', '1850000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1830000, 'Mô tả chi tiết sản phẩm 32', 1, 1),
(391, 'Sản phẩm 33', 'Mô tả ngắn sản phẩm 33', 'https://via.placeholder.com/150?text=Product+33', '1900000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1880000, 'Mô tả chi tiết sản phẩm 33', 1, 1),
(392, 'Sản phẩm 34', 'Mô tả ngắn sản phẩm 34', 'https://via.placeholder.com/150?text=Product+34', '1950000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1930000, 'Mô tả chi tiết sản phẩm 34', 1, 1),
(393, 'Sản phẩm 35', 'Mô tả ngắn sản phẩm 35', 'https://via.placeholder.com/150?text=Product+35', '2000000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 1980000, 'Mô tả chi tiết sản phẩm 35', 1, 1),
(394, 'Sản phẩm 36', 'Mô tả ngắn sản phẩm 36', 'https://via.placeholder.com/150?text=Product+36', '2050000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2030000, 'Mô tả chi tiết sản phẩm 36', 1, 1),
(395, 'Sản phẩm 37', 'Mô tả ngắn sản phẩm 37', 'https://via.placeholder.com/150?text=Product+37', '2100000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2080000, 'Mô tả chi tiết sản phẩm 37', 1, 1),
(396, 'Sản phẩm 38', 'Mô tả ngắn sản phẩm 38', 'https://via.placeholder.com/150?text=Product+38', '2150000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2130000, 'Mô tả chi tiết sản phẩm 38', 1, 1),
(397, 'Sản phẩm 39', 'Mô tả ngắn sản phẩm 39', 'https://via.placeholder.com/150?text=Product+39', '2200000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2180000, 'Mô tả chi tiết sản phẩm 39', 1, 1),
(398, 'Sản phẩm 40', 'Mô tả ngắn sản phẩm 40', 'https://via.placeholder.com/150?text=Product+40', '2250000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2230000, 'Mô tả chi tiết sản phẩm 40', 1, 1),
(399, 'Sản phẩm 41', 'Mô tả ngắn sản phẩm 41', 'https://via.placeholder.com/150?text=Product+41', '2300000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2280000, 'Mô tả chi tiết sản phẩm 41', 1, 1),
(400, 'Sản phẩm 42', 'Mô tả ngắn sản phẩm 42', 'https://via.placeholder.com/150?text=Product+42', '2350000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2330000, 'Mô tả chi tiết sản phẩm 42', 1, 1),
(401, 'Sản phẩm 43', 'Mô tả ngắn sản phẩm 43', 'https://via.placeholder.com/150?text=Product+43', '2400000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2380000, 'Mô tả chi tiết sản phẩm 43', 1, 1),
(402, 'Sản phẩm 44', 'Mô tả ngắn sản phẩm 44', 'https://via.placeholder.com/150?text=Product+44', '2450000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2430000, 'Mô tả chi tiết sản phẩm 44', 1, 1),
(403, 'Sản phẩm 45', 'Mô tả ngắn sản phẩm 45', 'https://via.placeholder.com/150?text=Product+45', '2500000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2480000, 'Mô tả chi tiết sản phẩm 45', 1, 1),
(404, 'Sản phẩm 46', 'Mô tả ngắn sản phẩm 46', 'https://via.placeholder.com/150?text=Product+46', '2550000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2530000, 'Mô tả chi tiết sản phẩm 46', 1, 1),
(405, 'Sản phẩm 47', 'Mô tả ngắn sản phẩm 47', 'https://via.placeholder.com/150?text=Product+47', '2600000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2580000, 'Mô tả chi tiết sản phẩm 47', 1, 1),
(406, 'Sản phẩm 48', 'Mô tả ngắn sản phẩm 48', 'https://via.placeholder.com/150?text=Product+48', '2650000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2630000, 'Mô tả chi tiết sản phẩm 48', 1, 1),
(407, 'Sản phẩm 49', 'Mô tả ngắn sản phẩm 49', 'https://via.placeholder.com/150?text=Product+49', '2700000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2680000, 'Mô tả chi tiết sản phẩm 49', 1, 1),
(408, 'Sản phẩm 50', 'Mô tả ngắn sản phẩm 50', 'https://via.placeholder.com/150?text=Product+50', '2750000', '2025-04-22 13:35:52', '2025-04-22 13:35:52', 2730000, 'Mô tả chi tiết sản phẩm 50', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
('bao', 'baotgpc08819@gmail.com', '0978991127 ', 'mmmccmm', '$2b$10$HNP90mWyDv1c.Le/z8puP.mDyFoSDQ.ey1jEF32bO97jj52wAPv1O', 'default-avatar.jpg', 24, 0, 0),
('Đây nguyễn', 'DayNVPC08854@gmail.com', '0795895167', 'trần hoàng na', '$2b$10$M.DuTeuUCYxvm0AMWW/fY.OE.gT9WqxRyIYMS4wcWjkybPopNEgTK', 'default-avatar.jpg', 25, 0, 0);

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
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=409;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
