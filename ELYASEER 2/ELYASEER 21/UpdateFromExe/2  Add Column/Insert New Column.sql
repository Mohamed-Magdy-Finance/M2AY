
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_cust'AND Object_ID = Object_ID(N'Item_store'))ALTER TABLE Item_store ADD id_cust bigint 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BilAz'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD BilAz BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EmpIsToday'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD EmpIsToday BIT
 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Bill_Form'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD Bill_Form int 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HidePriceBarcode'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD HidePriceBarcode BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DoubleBiLL'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD DoubleBiLL BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowLot'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD ShowLot BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BarcodeIsTow'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD BarcodeIsTow BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'showVisa'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD showVisa BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DiscountVip'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD DiscountVip BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LoadItemBalance'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD LoadItemBalance BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PriceThreeVip'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD PriceThreeVip BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UnavailableBarcode'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD UnavailableBarcode BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SerialMachine'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD SerialMachine int 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DefaultTransIsCash'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD DefaultTransIsCash BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Bill_IsDesC'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD Bill_IsDesC BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UseBarcodeA4'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD UseBarcodeA4 BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VisbleOneUnit'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD VisbleOneUnit BIT 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HideBillNumber'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD HideBillNumber BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CloseMp3'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CloseMp3 BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AutoSal'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD AutoSal BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserSelectStore'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD UserSelectStore BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BonesSal'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD BonesSal BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HourOfBackup'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD HourOfBackup INT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PasswordForBill'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD PasswordForBill nvarchar(100) 


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultSal'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CashDefaultSal nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultRsal'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CashDefaultRsal nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultPur'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CashDefaultPur nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDefaultRpur'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD CashDefaultRpur nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DateEdit'AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD DateEdit DATE 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DateCreate'AND Object_ID = Object_ID(N'ITEM'))
BEGIN
      ALTER TABLE ITEM ADD DateCreate date
      ALTER TABLE [dbo].[Item] ADD  CONSTRAINT [DF_Item_DateCreate]  DEFAULT (getdate()) FOR [DateCreate]
END


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RongExpire'AND Object_ID = Object_ID(N'Sal_Details')) ALTER TABLE Sal_Details  ADD RongExpire BIT

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsFavorite'AND Object_ID = Object_ID(N'sal_invoice')) ALTER TABLE sal_invoice  ADD IsFavorite BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsFavorite'AND Object_ID = Object_ID(N'Rsal_invoice')) ALTER TABLE Rsal_invoice  ADD IsFavorite BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsFavorite'AND Object_ID = Object_ID(N'pur_invoice')) ALTER TABLE pur_invoice  ADD IsFavorite BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsFavorite'AND Object_ID = Object_ID(N'Rpur_invoice')) ALTER TABLE Rpur_invoice  ADD IsFavorite BIT

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Cash'AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD Permition_Cash BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_DeleteItem'AND Object_ID = Object_ID(N'UserPermition')) ALTER TABLE UserPermition  ADD Permition_DeleteItem BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_EditItem'AND Object_ID = Object_ID(N'UserPermition')) ALTER TABLE UserPermition  ADD Permition_EditItem BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Delivery_box'AND Object_ID = Object_ID(N'UserPermition')) ALTER TABLE UserPermition  ADD Permition_Delivery_box BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_ItemForbidden'AND Object_ID = Object_ID(N'UserPermition')) ALTER TABLE UserPermition  ADD Permition_ItemForbidden BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Emp'AND Object_ID = Object_ID(N'UserPermition')) ALTER TABLE UserPermition  ADD Permition_Emp BIT

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_ItemTicket'AND Object_ID = Object_ID(N'constraint_invoice')) ALTER TABLE constraint_invoice  ADD id_ItemTicket BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Product'AND Object_ID = Object_ID(N'constraint_invoice')) ALTER TABLE constraint_invoice  ADD id_Product BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_PaperCome'AND Object_ID = Object_ID(N'constraint_invoice')) ALTER TABLE constraint_invoice  ADD id_PaperCome BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_PaperOut'AND Object_ID = Object_ID(N'constraint_invoice')) ALTER TABLE constraint_invoice  ADD id_PaperOut BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Contract'AND Object_ID = Object_ID(N'constraint_invoice')) ALTER TABLE constraint_invoice  ADD id_Contract BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_PurExpenses'AND Object_ID = Object_ID(N'constraint_invoice')) ALTER TABLE constraint_invoice  ADD id_PurExpenses BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_PurExpenses'AND Object_ID = Object_ID(N'Tree_Account')) ALTER TABLE Tree_Account  ADD id_PurExpenses BIGINT

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DiscountLocal'AND Object_ID = Object_ID(N'TREE')) ALTER TABLE TREE  ADD DiscountLocal float 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DiscountOut'AND Object_ID = Object_ID(N'TREE')) ALTER TABLE TREE  ADD DiscountOut float 


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'expire_date'AND Object_ID = Object_ID(N'Store_details')) ALTER TABLE Store_details  ADD expire_date nvarchar(50) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'RSal_Invoice'))ALTER TABLE RSal_Invoice ADD CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'RPUR_Invoice'))ALTER TABLE RPUR_Invoice ADD CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'PUR_Invoice'))ALTER TABLE PUR_Invoice ADD CostCenter nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Str_CostCenter'AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD Str_CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MainAccount'AND Object_ID = Object_ID(N'Cust'))ALTER TABLE Cust ADD MainAccount nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD CostCenter nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'ItemAmortization_invoice'))ALTER TABLE ItemAmortization_invoice ADD CostCenter nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter'AND Object_ID = Object_ID(N'store_Invoice'))ALTER TABLE store_Invoice ADD CostCenter nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name'AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD user_name nvarchar(50) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'user_name'AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD user_name nvarchar(50) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'FindBadil'AND Object_ID = Object_ID(N'Item'))ALTER TABLE Item ADD FindBadil bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'Contract'))ALTER TABLE Contract ADD CashName  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'code' AND Object_ID = Object_ID(N'Tree'))ALTER TABLE Tree ADD code  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'nots' AND Object_ID = Object_ID(N'constraint_details'))ALTER TABLE constraint_details ADD nots  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsSub' AND Object_ID = Object_ID(N'Tree'))ALTER TABLE Tree ADD IsSub  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_main' AND Object_ID = Object_ID(N'Tree'))ALTER TABLE Tree ADD id_main  bigint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_EditCash' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD Permition_EditCash  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Timee'AND Object_ID = Object_ID(N'Tree_Account'))
BEGIN
      ALTER TABLE Tree_Account  ADD Timee DATETIME
      ALTER TABLE [dbo].[Tree_Account] ADD  CONSTRAINT [DF_Tree_Account_Timee]  DEFAULT (getdate()) FOR [Timee]
END
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateSal' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD delegateSal  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'way' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD way  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Title' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD Title  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Making' AND Object_ID = Object_ID(N'ITEM_STORE'))ALTER TABLE ITEM_STORE ADD id_Making  BIGINT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LOT' AND Object_ID = Object_ID(N'ITEM_STORE'))ALTER TABLE ITEM_STORE ADD LOT nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'last_balance' AND Object_ID = Object_ID(N'ITEM_STORE'))ALTER TABLE ITEM_STORE ADD last_balance FLOAT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LOT' AND Object_ID = Object_ID(N'Sal_Details'))ALTER TABLE Sal_Details ADD LOT nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateName' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD delegateName nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DesExpense' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD DesExpense nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Expense' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD Expense FLOAT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateName' AND Object_ID = Object_ID(N'Rsal_invoice'))ALTER TABLE Rsal_invoice ADD delegateName nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LOT' AND Object_ID = Object_ID(N'Sal_Details'))ALTER TABLE Sal_Details ADD LOT nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LOT' AND Object_ID = Object_ID(N'PUR_Details'))ALTER TABLE PUR_Details ADD LOT nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DesExpense' AND Object_ID = Object_ID(N'PUR_Invoice'))ALTER TABLE PUR_Invoice ADD DesExpense nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Expense' AND Object_ID = Object_ID(N'PUR_Invoice'))ALTER TABLE PUR_Invoice ADD Expense FLOAT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'PUR_Invoice'))ALTER TABLE PUR_Invoice ADD CashName nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'SAL_Invoice'))ALTER TABLE SAL_Invoice ADD CashName nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'Rpur_invoice'))ALTER TABLE Rpur_invoice ADD CashName nvarchar(100) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'Rsal_invoice'))ALTER TABLE Rsal_invoice ADD CashName nvarchar(100) 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VISA' AND Object_ID = Object_ID(N'TREE'))ALTER TABLE TREE ADD VISA BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VISA' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD VISA BIT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VISA' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD VISA BIT 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MaxSalDiscount' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD MaxSalDiscount FLOAT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MinSalPr' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD MinSalPr FLOAT 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MoreCheck' AND Object_ID = Object_ID(N'ITEM'))ALTER TABLE ITEM ADD MoreCheck bit 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'LeftBarcode' AND Object_ID = Object_ID(N'ZZBarcodeSetting'))ALTER TABLE ZZBarcodeSetting ADD LeftBarcode float 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TopItemName' AND Object_ID = Object_ID(N'ZZBarcodeSetting'))ALTER TABLE ZZBarcodeSetting ADD TopItemName float 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashBegin' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD CashBegin float 

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'OldPr1' AND Object_ID = Object_ID(N'ItemBarcode'))ALTER TABLE ItemBarcode ADD OldPr1 float 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PathBackGroundImage' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ADD PathBackGroundImage nvarchar(500) 
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'tables' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE sal_invoice ADD tables int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowMaking' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD ShowMaking bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_InventoryExpire' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD id_InventoryExpire bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NeverUseBarcode' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD NeverUseBarcode BIT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ServiceDes' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE MyProduct ADD ServiceDes nvarchar(100)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Profit' AND Object_ID = Object_ID(N'Rsal_invoice'))ALTER TABLE Rsal_invoice ADD Profit decimal(18, 2)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Profit' AND Object_ID = Object_ID(N'Rsal_details'))ALTER TABLE Rsal_details ADD Profit decimal(18, 2)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Installment' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD id_Installment bigint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NotBookNumber' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD NotBookNumber nvarchar(120)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Combiala' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD Combiala int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ConvertTo' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD ConvertTo nvarchar(120)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'bones' AND Object_ID = Object_ID(N'Item_store'))ALTER TABLE Item_store ADD bones float
--IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NotBookNumber' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD NotBookNumber nvarchar(120)
--IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Combiala' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD Combiala int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'top_main' AND Object_ID = Object_ID(N'TREE'))ALTER TABLE TREE ADD top_main INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MainDebt' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD MainDebt NVARCHAR(150)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DateOut' AND Object_ID = Object_ID(N'PaperCome'))ALTER TABLE PaperCome ADD DateOut date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DateOut' AND Object_ID = Object_ID(N'PaperOut'))ALTER TABLE PaperOut ADD DateOut date



IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Outside' AND Object_ID = Object_ID(N'Item_store'))ALTER TABLE Item_store ADD id_Outside bigint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'sahm' AND Object_ID = Object_ID(N'z_CostCenter'))ALTER TABLE z_CostCenter ADD sahm int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'shop' AND Object_ID = Object_ID(N'z_CostCenter'))ALTER TABLE z_CostCenter ADD shop int

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'mangment' AND Object_ID = Object_ID(N'z_CostCenter'))ALTER TABLE z_CostCenter ADD mangment int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Roof' AND Object_ID = Object_ID(N'z_CostCenter'))ALTER TABLE z_CostCenter ADD Roof int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RoomInRoof' AND Object_ID = Object_ID(N'z_CostCenter'))ALTER TABLE z_CostCenter ADD RoomInRoof int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_CostCenterSal' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD id_CostCenterSal bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idBill' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD idBill bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_InSide' AND Object_ID = Object_ID(N'Item_store'))ALTER TABLE Item_store ADD id_InSide bigint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ServiceValue' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD ServiceValue int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TaxValue' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ADD TaxValue int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TaxValue' AND Object_ID = Object_ID(N'pur_Invoice'))ALTER TABLE pur_Invoice ADD TaxValue int

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'idBill' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD idBill bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_ActionToday' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD Permition_ActionToday bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PromeptMoreItem' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD PromeptMoreItem bit


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'valuess' AND Object_ID = Object_ID(N'CostCenterDetails'))ALTER TABLE CostCenterDetails ADD valuess bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MaxQu' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD MaxQu FLOAT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserRepetitionBill' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD UserRepetitionBill bit
