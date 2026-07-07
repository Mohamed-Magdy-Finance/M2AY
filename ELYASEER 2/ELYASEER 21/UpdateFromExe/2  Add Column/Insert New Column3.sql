
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'debt_name' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD debt_name nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'credit_name' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD credit_name nvarchar(120)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'debt_name' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD debt_name nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'credit_name' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD credit_name nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_sal' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD id_sal bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Transfer' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD Transfer FLOAT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrBigPr1' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StrBigPr1 nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrBigPr2' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StrBigPr2 nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HideStarBarcode' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD HideStarBarcode bit

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MinPrice' AND Object_ID = Object_ID(N'item_Request'))ALTER TABLE item_Request ADD MinPrice nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MinDiscount' AND Object_ID = Object_ID(N'item_Request'))ALTER TABLE item_Request ADD MinDiscount nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SalInMonth' AND Object_ID = Object_ID(N'item_Request'))ALTER TABLE item_Request ADD SalInMonth nvarchar(50)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostTrans' AND Object_ID = Object_ID(N'ItemMaking_Invoice'))ALTER TABLE ItemMaking_Invoice ADD CostTrans float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LeftBuilderName' AND Object_ID = Object_ID(N'ZZBarcodeSetting'))ALTER TABLE ZZBarcodeSetting ADD LeftBuilderName float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LeftItemName' AND Object_ID = Object_ID(N'ZZBarcodeSetting'))ALTER TABLE ZZBarcodeSetting ADD LeftItemName float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LeftPrice' AND Object_ID = Object_ID(N'ZZBarcodeSetting'))ALTER TABLE ZZBarcodeSetting ADD LeftPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'itm_effictive' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD itm_effictive nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_CostCenterSal' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD id_CostCenterSal bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idBill' AND Object_ID = Object_ID(N'Store_invoice'))ALTER TABLE Store_invoice ADD idBill nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Transfer' AND Object_ID = Object_ID(N'Talbia_invoice'))ALTER TABLE Talbia_invoice ADD Transfer float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD CostCenter nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_FromTalbia' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD id_FromTalbia bigint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'credit' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD credit float

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD EndClose nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE sal_invoice ADD EndClose smallint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'Rsal_invoice'))ALTER TABLE Rsal_invoice ADD EndClose smallint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'pur_invoice'))ALTER TABLE pur_invoice ADD EndClose smallint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'Rpur_invoice'))ALTER TABLE Rpur_invoice ADD EndClose smallint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndClose' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD EndClose smallint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TaxesCard' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD TaxesCard nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'sT' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD sT nvarchar(100)


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LaterTime' AND Object_ID = Object_ID(N'empTimeInOut'))ALTER TABLE empTimeInOut ADD  LaterTime float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'OverTime' AND Object_ID = Object_ID(N'empTimeInOut'))ALTER TABLE empTimeInOut ADD  OverTime float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AutoRequest' AND Object_ID = Object_ID(N'item_Request'))ALTER TABLE item_Request ADD  AutoRequest bit

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowCome' AND Object_ID = Object_ID(N'emp'))ALTER TABLE emp ADD  AllowCome time(7)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowOut' AND Object_ID = Object_ID(N'emp'))ALTER TABLE emp ADD  AllowOut time(7)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VisbleSearchByCode' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  VisbleSearchByCode bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Discount' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD Discount float

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TimeOverTime' AND Object_ID = Object_ID(N'empTimeInOut'))ALTER TABLE empTimeInOut ADD  TimeOverTime time(7)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TimeLaterTime' AND Object_ID = Object_ID(N'empTimeInOut'))ALTER TABLE empTimeInOut ADD  TimeLaterTime time(7)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Current_shift' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  Current_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Current_shift' AND Object_ID = Object_ID(N'Sal_Deleted'))ALTER TABLE Sal_Deleted ADD  Current_shift bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_ven' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD  id_ven bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CovenantItem' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  CovenantItem bit
