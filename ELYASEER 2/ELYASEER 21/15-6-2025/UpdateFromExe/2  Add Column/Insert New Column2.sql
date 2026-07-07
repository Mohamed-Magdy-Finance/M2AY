IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Item_store'))ALTER TABLE Item_store ADD id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AutoRequest' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD AutoRequest bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'timeOut' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD timeOut nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsEmp' AND Object_ID = Object_ID(N'tree'))ALTER TABLE tree ADD IsEmp bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UnPrintBestItem' AND Object_ID = Object_ID(N'OrderSetting'))ALTER TABLE OrderSetting ADD UnPrintBestItem bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'default_sal' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD default_sal tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE MyProduct ADD CashName nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'FIFO' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD FIFO int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NewInternationalCode' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD NewInternationalCode bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NewInternationalCode001' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD NewInternationalCode001 bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountMetr' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD CountMetr float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrMetrName' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StrMetrName nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountTypeItem' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CountTypeItem int

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeItem4' AND Object_ID = Object_ID(N'ZZitem_types'))ALTER TABLE ZZitem_types ADD TypeItem4 nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeItem5' AND Object_ID = Object_ID(N'ZZitem_types'))ALTER TABLE ZZitem_types ADD TypeItem5 nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeItem6' AND Object_ID = Object_ID(N'ZZitem_types'))ALTER TABLE ZZitem_types ADD TypeItem6 nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeItem7' AND Object_ID = Object_ID(N'ZZitem_types'))ALTER TABLE ZZitem_types ADD TypeItem7 nvarchar(50)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IdTypeItem4' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD IdTypeItem4 bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IdTypeItem5' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD IdTypeItem5 bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IdTypeItem6' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD IdTypeItem6 bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IdTypeItem7' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD IdTypeItem7 bigint


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Ticket' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD Ticket int
