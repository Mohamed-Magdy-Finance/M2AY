IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_step' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_step bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_FunctionMaking' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_FunctionMaking bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Making' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_Making bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Outside' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_Outside bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Inside' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_Inside bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_CloseOrder' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_CloseOrder bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_RepMaking' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD  Permition_RepMaking bit


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'sT' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD  sT nvarchar(40)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TaxesCard' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD  TaxesCard nvarchar(40)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'QuGood' AND Object_ID = Object_ID(N'Store_details'))ALTER TABLE Store_details ADD  QuGood real
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'WorkNum' AND Object_ID = Object_ID(N'store_Invoice'))ALTER TABLE store_Invoice ADD  WorkNum nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Select' AND Object_ID = Object_ID(N'store_Invoice'))ALTER TABLE store_Invoice ADD  id_Select int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Tax_Ast' AND Object_ID = Object_ID(N'sal_Invoice'))ALTER TABLE sal_Invoice ADD  Tax_Ast INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Trans' AND Object_ID = Object_ID(N'tree'))ALTER TABLE tree ADD  id_Trans int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Tax_Ast' AND Object_ID = Object_ID(N'pur_Invoice'))ALTER TABLE pur_Invoice ADD  Tax_Ast INT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PrintDoubleKitchen' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  PrintDoubleKitchen bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowLastSal' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  ShowLastSal bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowLastPur' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  ShowLastPur bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes' AND Object_ID = Object_ID(N'Talbia_Invoice'))ALTER TABLE Talbia_Invoice ADD  notes nvarchar(500)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DateRecive' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  DateRecive date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'tax' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  tax float

