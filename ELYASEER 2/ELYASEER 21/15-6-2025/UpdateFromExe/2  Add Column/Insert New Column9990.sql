IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowMoreCurrency' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD AllowMoreCurrency bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowEinvoice' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD AllowEinvoice bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyPrice' AND Object_ID = Object_ID(N'tree'))ALTER TABLE tree ADD CurrencyPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TaxesCard' AND Object_ID = Object_ID(N'tree'))ALTER TABLE tree ADD TaxesCard nvarchar(300)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BeginSerial' AND Object_ID = Object_ID(N'z_stores'))ALTER TABLE z_stores ADD BeginSerial nvarchar(20)



IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CurrencyPrice' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE sal_invoice ADD CurrencyPrice float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrCount' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StrCount nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StartFrmSal0' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StartFrmSal0 bit

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'dateEditExpire' AND Object_ID = Object_ID(N'item_store'))ALTER TABLE item_store ADD dateEditExpire date

