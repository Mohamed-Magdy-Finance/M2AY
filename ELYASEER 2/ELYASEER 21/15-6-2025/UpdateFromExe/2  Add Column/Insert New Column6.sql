IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BaseTime' AND Object_ID = Object_ID(N'EMP'))ALTER TABLE EMP ADD  BaseTime INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'tax' AND Object_ID = Object_ID(N'Sal_Details'))ALTER TABLE Sal_Details ADD  tax INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Barcode538' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  Barcode538 BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrListDis' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  StrListDis nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MustSelectCostCenter' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  MustSelectCostCenter BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HideDiscount' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  HideDiscount BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SetRtl' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  SetRtl BIT


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'sh_tree' AND Object_ID = Object_ID(N'Z_Stores'))ALTER TABLE Z_Stores ADD sh_tree int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BarAddConstraint' AND Object_ID = Object_ID(N'Z_Stores'))ALTER TABLE Z_Stores ADD BarAddConstraint int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BarSubItem8' AND Object_ID = Object_ID(N'Z_Stores'))ALTER TABLE Z_Stores ADD BarSubItem8 int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'GeneralAccount' AND Object_ID = Object_ID(N'Z_Stores'))ALTER TABLE Z_Stores ADD GeneralAccount int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'backup_expire' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD backup_expire date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes' AND Object_ID = Object_ID(N'item_Request'))ALTER TABLE item_Request ADD notes NVARCHAR(500)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CloseGeneralAccount' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CloseGeneralAccount bit

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pdate' AND Object_ID = Object_ID(N'pur_temp'))ALTER TABLE pur_temp ADD pdate datetime
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pdate' AND Object_ID = Object_ID(N'sal_temp'))ALTER TABLE sal_temp ADD pdate datetime

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'pur_temp'))ALTER TABLE pur_temp ADD user_name NVARCHAR(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'sal_temp'))ALTER TABLE sal_temp ADD user_name NVARCHAR(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'mm' AND Object_ID = Object_ID(N'ItemAmortization_details'))ALTER TABLE ItemAmortization_details ADD mm int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'yy' AND Object_ID = Object_ID(N'ItemAmortization_details'))ALTER TABLE ItemAmortization_details ADD yy int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'mm' AND Object_ID = Object_ID(N'Rpur_Details'))ALTER TABLE Rpur_Details ADD mm int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'yy' AND Object_ID = Object_ID(N'Rpur_Details'))ALTER TABLE Rpur_Details ADD yy int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RebitItem' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD RebitItem bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LeftMergBarcodeZepra' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD LeftMergBarcodeZepra int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowMoreStore' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD ShowMoreStore bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PublicPr' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD PublicPr DECIMAL(18,2)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowPublicPr' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD ShowPublicPr bit
