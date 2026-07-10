
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD  user_name nvarchar(60)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PrinterCash2' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  PrinterCash2 nvarchar(60)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'pur_details'))ALTER TABLE pur_details ADD  des nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Sal_Deleted'))ALTER TABLE Sal_Deleted ADD  id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PathPic' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE MyProduct ADD  PathPic nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'mm' AND Object_ID = Object_ID(N'sal_details'))ALTER TABLE sal_details ADD mm   tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'yy' AND Object_ID = Object_ID(N'sal_details'))ALTER TABLE sal_details ADD yy  tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'phone2' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE MyProduct ADD phone2  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Good' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE MyProduct ADD Good  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE MyProduct ADD user_name  nvarchar(250)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateSal' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD delegateSal  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'QuSend' AND Object_ID = Object_ID(N'sal_details'))ALTER TABLE sal_details ADD QuSend  float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'c_count' AND Object_ID = Object_ID(N'RSal_Details'))ALTER TABLE RSal_Details ADD c_count  float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NumBookOk' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD NumBookOk  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'c_count' AND Object_ID = Object_ID(N'Rpur_Details'))ALTER TABLE Rpur_Details ADD c_count  float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'c_count' AND Object_ID = Object_ID(N'pur_Details'))ALTER TABLE pur_Details ADD c_count  float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_bill' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  id_bill nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'keep' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD keep  float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  CostCenter nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateName' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  delegateName nvarchar(200)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'Item'))ALTER TABLE Item ADD  user_name nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'nots' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD  nots nvarchar(320)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ISOpen' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD ISOpen  INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'OrderSal' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD OrderSal  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsGo' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD IsGo  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DisName' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD DisName  nvarchar(350)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DefaultCostCenter' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE  UserPermition ADD DefaultCostCenter  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_sal' AND Object_ID = Object_ID(N'ItemMaking_invoice'))ALTER TABLE  ItemMaking_invoice ADD id_sal  bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CustomerType' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD CustomerType  SmallInt
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'nowww' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE  MyProduct ADD nowww  datetime
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'mm' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE  ItemListPrice ADD mm  tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'yy' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE  ItemListPrice ADD yy  tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypePaied' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE  ItemListPrice ADD TypePaied  tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Store_Name' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE  ItemListPrice ADD Store_Name  nvarchar(320)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RongExpireExp' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE  ItemListPrice ADD RongExpireExp  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name' AND Object_ID = Object_ID(N'AccountDeleted'))ALTER TABLE AccountDeleted ADD user_name  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pdate' AND Object_ID = Object_ID(N'ItemExpire'))ALTER TABLE ItemExpire ADD pdate  date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PurName' AND Object_ID = Object_ID(N'Pur_invoice'))ALTER TABLE Pur_invoice ADD PurName  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MainName' AND Object_ID = Object_ID(N'tree'))ALTER TABLE tree ADD MainName  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TableTax' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE sal_invoice ADD TableTax  float

