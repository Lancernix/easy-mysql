SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for node_mysql_test
-- ----------------------------
DROP TABLE IF EXISTS `node_mysql_test`;
CREATE TABLE `node_mysql_test` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `age` tinyint NOT NULL COMMENT '年龄',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `msg` varchar(255) NOT NULL DEFAULT 'message' COMMENT '信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
