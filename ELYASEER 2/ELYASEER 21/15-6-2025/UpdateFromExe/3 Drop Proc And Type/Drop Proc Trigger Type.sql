IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemClacExpire') AND type in (N'P', N'PC'))DROP PROCEDURE [dbo].[ItemClacExpire]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'SalSave') AND type in (N'P', N'PC'))DROP PROCEDURE [dbo].[SalSave]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'StoreConvertSave') AND type in (N'P', N'PC'))DROP proc [dbo].[StoreConvertSave]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'PurSave') AND type in (N'P', N'PC'))DROP proc [dbo].[PurSave]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'PurSaveOneRow') AND type in (N'P', N'PC'))DROP proc [dbo].[PurSaveOneRow]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'RpurSave') AND type in (N'P', N'PC'))DROP proc [dbo].[RpurSave]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'RSalSave') AND type in (N'P', N'PC'))DROP proc [dbo].[RSalSave]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'SalSaveOneRow') AND type in (N'P', N'PC'))DROP proc [dbo].[SalSaveOneRow]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'CustSave') AND type in (N'P', N'PC'))DROP proc [dbo].[CustSave]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemBigSales') AND type in (N'P', N'PC'))DROP proc [dbo].[ItemBigSales]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemsInventory') AND type in (N'P', N'PC'))DROP proc [dbo].[ItemsInventory]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'FindENname') AND type in (N'P', N'PC'))DROP proc [dbo].[FindENname]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'StoresBalanceCustom') AND type in (N'P', N'PC'))DROP proc [dbo].[StoresBalanceCustom]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemComeOut') AND type in (N'P', N'PC'))DROP proc [dbo].[ItemComeOut]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemComeOutBetweenTowDate') AND type in (N'P', N'PC'))DROP proc [dbo].[ItemComeOutBetweenTowDate]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemsOutside') AND type in (N'P', N'PC'))DROP proc [dbo].[ItemsOutside]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemsInSide') AND type in (N'P', N'PC'))DROP proc [dbo].ItemsInSide
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'TransItem') AND type in (N'P', N'PC'))DROP proc [dbo].TransItem
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemFindByCode') AND type in (N'P', N'PC'))DROP proc [dbo].ItemFindByCode

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'TalbiaClear') AND type in (N'P', N'PC'))DROP proc [dbo].TalbiaClear
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'TalbiaSave') AND type in (N'P', N'PC'))DROP proc [dbo].TalbiaSave
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'SetBeginTreeWithDate') AND type in (N'P', N'PC'))DROP proc [dbo].SetBeginTreeWithDate
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'SetBeginAccountWithDate') AND type in (N'P', N'PC'))DROP proc [dbo].SetBeginAccountWithDate
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'AmortizationSave') AND type in (N'P', N'PC'))DROP proc [dbo].AmortizationSave
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemMaster') AND type in (N'P', N'PC'))DROP proc [dbo].ItemMaster
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemComeOut_LOT') AND type in (N'P', N'PC'))DROP proc [dbo].ItemComeOut_LOT
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'MakingSave') AND type in (N'P', N'PC'))DROP proc [dbo].MakingSave
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'InvoiceTax') AND type in (N'P', N'PC'))DROP proc [dbo].InvoiceTax


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemSave') AND type in (N'P', N'PC'))DROP proc [dbo].ItemSave
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'StoresBalance') AND type in (N'P', N'PC'))DROP proc [dbo].StoresBalance
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'PrompetDiscount') AND type in (N'P', N'PC'))DROP proc [dbo].PrompetDiscount
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemFind') AND type in (N'P', N'PC'))DROP proc [dbo].ItemFind
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ItemsFill') AND type in (N'P', N'PC'))DROP proc [dbo].ItemsFill
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'GetExpire') AND type in (N'P', N'PC'))DROP proc [dbo].GetExpire
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ReportBill') AND type in (N'P', N'PC'))DROP proc [dbo].ReportBill


--Type
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_RSal' AND is_table_type = 1)DROP TYPE [dbo].[Type_RSal]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_Convert' AND is_table_type = 1)DROP TYPE [dbo].[Type_Convert]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_Pur' AND is_table_type = 1 )DROP TYPE [dbo].[Type_Pur]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_Sal' AND is_table_type = 1 )DROP TYPE [dbo].[Type_Sal]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_Talbia' AND is_table_type = 1 )DROP TYPE [dbo].[Type_Talbia]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_Amortization' AND is_table_type = 1 )DROP TYPE [dbo].[Type_Amortization]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_RPur' AND is_table_type = 1 )DROP TYPE [dbo].[Type_RPur]
IF EXISTS(SELECT 1 FROM sys.types WHERE name = 'Type_Making' AND is_table_type = 1 )DROP TYPE [dbo].[Type_Making]

--Trigger
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'UpdateCostCenter' AND type = 'TR') DROP TRIGGER UpdateCostCenter
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'DeleteBalance' AND type = 'TR') DROP TRIGGER DeleteBalance
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'InsertBalance' AND type = 'TR') DROP TRIGGER InsertBalance
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'insert_Tree_Account' AND type = 'TR') DROP TRIGGER insert_Tree_Account
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'UpdateDelegate' AND type = 'TR') DROP TRIGGER UpdateDelegate
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'UpdateBalance' AND type = 'TR') DROP TRIGGER UpdateBalance
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'DeleteFromTableS' AND type = 'TR') DROP TRIGGER DeleteFromTableS
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'update_constraint' AND type = 'TR') DROP TRIGGER update_constraint
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'insert_constraint' AND type = 'TR') DROP TRIGGER insert_constraint
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'update_constraintDetails' AND type = 'TR') DROP TRIGGER update_constraintDetails
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'delZZproperties' AND type = 'TR') DROP TRIGGER delZZproperties
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE Name = 'UpdateStoreName' AND type = 'TR') DROP TRIGGER UpdateStoreName

