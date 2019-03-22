SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;
--管理员信息表 ;
CREATE TABLE xfn_admin(
	aid     INT   PRIMARY KEY AUTO_INCREMENT,
	aname	VARCHAR(32),
	apwd	VARCHAR(64),
	role	VARCHAR(64),
);
--项目全局设置;商家名称,数据api子系统地址;管理后台子系统地址,
--顾客app子系统地址,系统备案号,系统版权声明;
CREATE TABLE xfn_settings(
	sid	INT   PRIMARY KEY AUTO_INCREMENT,
	appName	VARCHAR(32),
	apiUrl	VARCHAR(64),
	adminUrl VARCHAR(64),
	appUrl	 VARCHAR(64),
	icp	 VARCHAR(64),
	copyright VARCHAR(128)
);
--桌台信息表,桌台昵称,桌台类型,当前状态;1-空闲,2-预定,3-占用,0-其他;
CREATE TABLE xfn_table(
	tid	INT   PRIMARY KEY AUTO_INCREMENT,
	tname	VARCHAR(64),
	type	VARCHAR(64),
	status	INT 
);
--桌台预定信息表 xfn_reservation 
--联系人的姓名,手机号,联系的时间,预约的用餐时间
CREATE TABLE xfn_reservation(
	rid      INT    PRIMARY KEY AUTO_INCREMENT,
	contactName	VARVHAR(64), 
	phone		VARCHAR(16),
	contactTime	BIGINT,
	dinnerTime	BIGINT
);
--菜品的分类表,xfn_category
--类别名称
CREATE TEBLE xfn_category(
	cid	INT PRIMARY KEY AUTO_INCREMENT,
	cname	VARCHAR(32)
);
--菜品信息表,菜品的编号,菜品的名称,菜品的图片,菜品的价格,
--菜品的标题, 
CRATE TEBLT xfn_dish(
	did	INT PRIMARY KEY AUTO_INCREMENT,
	title	VARCHAR(32),
	imgUrl	VARCHAR(128),
	price	DECIMAL(6,2),
	detail	VARCHAR(128),
	categoryId INT	
);
--订单表xfn_order 订单编号,开始时间,结束时间,
--用餐人数,桌台的编号(外键)
CREATE TEBLT xfn_order(
	oid	INT PRIMARY KEY AUTO_INCREMENT,
	startTime	BIGINT,
	endTime		BIGINT,
	customerCount	INT,
	tableld		INT
);
--订单的详情表xfn_order_detail
--订单编号,菜品编号(外键)                                                   ---菜品的数量,用餐用户的称呼
--订单编号,指明所属的订单;(外键)
CRATE TABLE xfn_order_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	dishld	INT,
	dishCount INT,
	customerName	VARCHAR(64)
	orderld		INT
);
 
-- https://github.com/Mhw1996/xiaofeiniu-api.git
-- https://github.com/Mhw1996/-xiaofeiniu-app.git
-- https://github.com/Mhw1996/xiaofeiniu-admin.git










