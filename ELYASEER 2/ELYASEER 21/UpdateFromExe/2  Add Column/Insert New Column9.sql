
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idpur' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD  idpur bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idRpur' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD  idRpur bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idCashCome' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD  idCashCome bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idCashOut' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD  idCashOut bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowCountINsal' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  ShowCountINsal bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'c_count' AND Object_ID = Object_ID(N'Sal_Details'))ALTER TABLE Sal_Details ADD  c_count int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'tax' AND Object_ID = Object_ID(N'RSal_Details'))ALTER TABLE RSal_Details ADD  tax int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'OrderTypeItem' AND Object_ID = Object_ID(N'OrderSetting'))ALTER TABLE OrderSetting ADD  OrderTypeItem bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CustInBegin' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  CustInBegin bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DefaultCash' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  DefaultCash nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DefaultCash_pur' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  DefaultCash_pur nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'c_count' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD  c_count int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrDelegate' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  StrDelegate nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_BrowsBill' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_BrowsBill bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'commission' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  commission int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes1' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD  notes1 nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes2' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD  notes2 nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MaxAllowInSal' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  MaxAllowInSal int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrWay' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  StrWay nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencySmallStr' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  CurrencySmallStr nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyBigStr' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  CurrencyBigStr nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_InSide' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD  id_InSide bigint

IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'commission' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ALTER COLUMN commission decimal(18, 3)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MaxPriceAndQU' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  MaxPriceAndQU bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ConfirmBegin' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD  ConfirmBegin tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IdItemMaster' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  IdItemMaster bigint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BigPr3' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  BigPr3 float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BigPr4' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  BigPr4 float

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MIDPr3' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  MIDPr3 float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MIDPr4' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  MIDPr4 float

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SmallPr3' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  SmallPr3 float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SmallPr4' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  SmallPr4 float

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrBigPr3' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  StrBigPr3 nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrBigPr4' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  StrBigPr4 nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountPrice' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  CountPrice tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'sal_details'))ALTER TABLE sal_details ADD  des nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyPrice' AND Object_ID = Object_ID(N'pur_invoice'))ALTER TABLE pur_invoice ADD  CurrencyPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyPrice' AND Object_ID = Object_ID(N'Talbia_invoice'))ALTER TABLE Talbia_invoice ADD  CurrencyPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyPrice' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD  CurrencyPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyPrice' AND Object_ID = Object_ID(N'tree_account'))ALTER TABLE tree_account ADD  CurrencyPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StoreMatrial' AND Object_ID = Object_ID(N'item_Requ'))ALTER TABLE item_Requ ADD  StoreMatrial nvarchar(80)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'QU_Product' AND Object_ID = Object_ID(N'item_Requ'))ALTER TABLE item_Requ ADD  QU_Product float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'WorkNum' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD  WorkNum nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'locationn' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  locationn nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ProductNameMatrail' AND Object_ID = Object_ID(N'zzz_workMatrail'))ALTER TABLE zzz_workMatrail ADD  ProductNameMatrail nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'zzz_Workdirect'))ALTER TABLE zzz_Workdirect ADD  CashName nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ARname' AND Object_ID = Object_ID(N'zzz_Workdirect'))ALTER TABLE zzz_Workdirect ADD  ARname nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DesDirectEx' AND Object_ID = Object_ID(N'zzz_Workdirect'))ALTER TABLE zzz_Workdirect ADD  DesDirectEx nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'QuMatrial' AND Object_ID = Object_ID(N'zzz_workMatrail'))ALTER TABLE zzz_workMatrail ADD  QuMatrial float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ARname' AND Object_ID = Object_ID(N'zzz_UnWorkdirect'))ALTER TABLE zzz_UnWorkdirect ADD  ARname nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'cost_step' AND Object_ID = Object_ID(N'zzz_StepOfWork'))ALTER TABLE zzz_StepOfWork ADD cost_step float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsTrue' AND Object_ID = Object_ID(N'zzz_WorkMain'))ALTER TABLE zzz_WorkMain ADD IsTrue bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_work' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD  id_work bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_step' AND Object_ID = Object_ID(N'item_Requ'))ALTER TABLE item_Requ ADD  id_step bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SelectPathReport' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  SelectPathReport bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DefaultCashName' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  DefaultCashName nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ReturnTax' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD  ReturnTax bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TotalTax' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD  TotalTax float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TotalTax' AND Object_ID = Object_ID(N'RPur_Invoice'))ALTER TABLE RPur_Invoice ADD  TotalTax float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TotalTax' AND Object_ID = Object_ID(N'sal_Invoice'))ALTER TABLE sal_Invoice ADD  TotalTax float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TotalTax' AND Object_ID = Object_ID(N'Rsal_Invoice'))ALTER TABLE Rsal_Invoice ADD  TotalTax float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TalbiaNum' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD  TalbiaNum bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Transfer' AND Object_ID = Object_ID(N'ItemListPur'))ALTER TABLE ItemListPur ADD  Transfer float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TalbiaNum' AND Object_ID = Object_ID(N'ItemListPur'))ALTER TABLE ItemListPur ADD  TalbiaNum bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LOT' AND Object_ID = Object_ID(N'Store_details'))ALTER TABLE Store_details ADD  LOT nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ReturnTaxName' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD  ReturnTaxName nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BillMustCredit' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  BillMustCredit bit
