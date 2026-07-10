
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_store' AND Object_ID = Object_ID(N'Sal_details'))ALTER TABLE Sal_details ADD id_store bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_store' AND Object_ID = Object_ID(N'pur_details'))ALTER TABLE pur_details ADD id_store bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowListDiscount' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD ShowListDiscount bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowMoreStore' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD ShowMoreStore bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DataBaseName' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD DataBaseName nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NetCost' AND Object_ID = Object_ID(N'Item_store'))ALTER TABLE Item_store ADD NetCost float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PaperSize' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD PaperSize nvarchar(5)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'CostCenterDetails'))ALTER TABLE CostCenterDetails ADD des nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PrompetDelegate' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD PrompetDelegate bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HideRest' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD HideRest bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'percent0' AND Object_ID = Object_ID(N'empTimeInOut'))ALTER TABLE empTimeInOut ADD percent0 FLOAT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Action_Type' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD Action_Type int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Action_Type' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ADD Action_Type int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DiffrentPrice' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD DiffrentPrice int


IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pdate' AND Object_ID = Object_ID(N'Delivery_box'))
begin
ALTER TABLE Delivery_box ADD pdate date 
ALTER TABLE [dbo].[Delivery_box] ADD  CONSTRAINT [DF_Delivery_box_pdate]  DEFAULT (getdate()) FOR [pdate]
end

