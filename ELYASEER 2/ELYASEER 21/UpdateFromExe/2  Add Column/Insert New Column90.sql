
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_begin' AND Object_ID = Object_ID(N'serial'))ALTER TABLE serial ADD  id_begin bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MaxDayOfCredit' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD  MaxDayOfCredit int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LOT' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  LOT nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'tax' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  tax float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'Talbia_Details'))ALTER TABLE Talbia_Details ADD  des nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  des nvarchar(500)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes' AND Object_ID = Object_ID(N'Item'))ALTER TABLE Item ADD  notes nvarchar(500)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'total' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  total float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BigPr0' AND Object_ID = Object_ID(N'ItemCode'))ALTER TABLE ItemCode ADD  BigPr0 float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateName' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  delegateName nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  user_name nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDiscount' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  CashDiscount float


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PromptReport' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  PromptReport nvarchar(max)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserShowCost' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  UserShowCost bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserShowHisEnter' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  UserShowHisEnter bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StoreName' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  StoreName nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MotherBoardID' AND Object_ID = Object_ID(N'Protiction'))ALTER TABLE Protiction ADD  MotherBoardID nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsBegin' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD  IsBegin bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsBegin' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD  IsBegin bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserStrBigPr' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  UserStrBigPr nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Transfer' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE sal_invoice ADD  Transfer float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostVenOneUnit' AND Object_ID = Object_ID(N'item_Requ'))ALTER TABLE item_Requ ADD  CostVenOneUnit real
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostVenOneUnit' AND Object_ID = Object_ID(N'zzz_WorkProduct'))ALTER TABLE zzz_WorkProduct ADD  CostVenOneUnit real
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Printer4' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  Printer4 nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Printer5' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  Printer5 nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Printer6' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  Printer6 nvarchar(250)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RoofName1' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  RoofName1 nvarchar(40)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RoofName2' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  RoofName2 nvarchar(40)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndRoof1' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  EndRoof1 int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndRoof2' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  EndRoof2 int

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD   CostCenter nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'debt_name' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD   debt_name nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'credit_name' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD   credit_name nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'total' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD total  float 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD   des nvarchar(500)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NotBookNumber' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE NotBookNumber ADD   des nvarchar(500)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD   CostCenter nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'debt_name' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD   debt_name nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'credit_name' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD   credit_name nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'total' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD total  float 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StopPaperConstraint' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StopPaperConstraint  bit 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'tax' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD tax  float 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD   des nvarchar(500)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD  user_name nvarchar(180)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MainDebt' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD  MainDebt nvarchar(280)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ConvertTo' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD  ConvertTo nvarchar(180)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD   CostCenter nvarchar(250)
