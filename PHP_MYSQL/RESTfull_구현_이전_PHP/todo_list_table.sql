-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 25-09-11 02:07
-- 서버 버전: 8.0.41
-- PHP 버전: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `moonjong`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `todo_list_table`
--

CREATE TABLE `todo_list_table` (
  `w_no` int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'index',
  `w_todo` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '할일',
  `w_completed` tinyint(1) NOT NULL COMMENT '완료',
  `w_expires` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '기한',
  `w_creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='TO DO LIST 테이블';

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `todo_list_table`
--
ALTER TABLE `todo_list_table`
  ADD PRIMARY KEY (`w_no`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `todo_list_table`
--
ALTER TABLE `todo_list_table`
  MODIFY `w_no` int NOT NULL AUTO_INCREMENT COMMENT 'index';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
