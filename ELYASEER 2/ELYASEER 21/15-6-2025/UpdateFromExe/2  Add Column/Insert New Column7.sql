
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsImported' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  IsImported Bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowSide' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  ShowSide bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DeliveryDate' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE sal_invoice ADD  DeliveryDate datetime
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateSal' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD  delegateSal nvarchar(250)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrBillNumber' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD  StrBillNumber nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_bill' AND Object_ID = Object_ID(N'Contract'))ALTER TABLE Contract ADD  id_bill nvarchar(50)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'target' AND Object_ID = Object_ID(N'Z_delegate'))ALTER TABLE Z_delegate ADD  target bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_sal' AND Object_ID = Object_ID(N'contract'))ALTER TABLE contract ADD  id_sal bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowTicket' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  AllowTicket bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DateMerit' AND Object_ID = Object_ID(N'constraint_details'))ALTER TABLE constraint_details ADD  DateMerit date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'payed' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD  payed decimal(18, 0)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_constraint' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD  id_constraint bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowInstallment' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  ShowInstallment bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'OtherPrice' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD  OtherPrice nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'str_price' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD  str_price nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TopMergBarcodeZepra' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  TopMergBarcodeZepra int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PathItemPic' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  PathItemPic nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountMonth' AND Object_ID = Object_ID(N'protiction'))ALTER TABLE protiction ADD  CountMonth INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pdate' AND Object_ID = Object_ID(N'protiction'))ALTER TABLE protiction ADD  pdate date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PrintAll' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  PrintAll bit

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'store_Invoice'))ALTER TABLE store_Invoice ADD  EndClose smallint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsClose' AND Object_ID = Object_ID(N'store_Invoice'))ALTER TABLE store_Invoice ADD  IsClose bit

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD  EndClose bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsClose' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD  IsClose bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrBigPr0' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  StrBigPr0 nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_SalDiscount' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_SalDiscount bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowInternationalCodeBill' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  ShowInternationalCodeBill bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UseBarcodeBalance' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  UseBarcodeBalance nvarchar(10)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RebitItem' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ALTER COLUMN RebitItem int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ven_id' AND Object_ID = Object_ID(N'ItemBarcode'))ALTER TABLE ItemBarcode ADD  ven_id nvarchar(10)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultPur' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  CashDefaultPur nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultRPur' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  CashDefaultRPur nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultSal' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  CashDefaultSal nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultRSal' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  CashDefaultRSal nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DefaultStoreName' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  DefaultStoreName nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PriceFontSize' AND Object_ID = Object_ID(N'ZZBarcodeSettingZebra'))ALTER TABLE dbo.ZZBarcodeSettingZebra ADD  PriceFontSize float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'pur_invoice'))ALTER TABLE dbo.pur_invoice ADD  id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Rpur_invoice'))ALTER TABLE dbo.Rpur_invoice ADD  id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_shift' AND Object_ID = Object_ID(N'Rsal_invoice'))ALTER TABLE dbo.Rsal_invoice ADD  id_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashTo' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD  CashTo nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idBill' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD  idBill nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD  notes nvarchar(500)

