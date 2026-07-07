IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'SetBeginTree') AND type in (N'P', N'PC'))DROP proc [dbo].[SetBeginTree]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ClearData') AND type in (N'P', N'PC'))DROP proc [dbo].[ClearData]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'SetBeginAccount') AND type in (N'P', N'PC'))DROP proc [dbo].[SetBeginAccount]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'DeleteConstraint') AND type in (N'P', N'PC'))DROP proc [dbo].[DeleteConstraint]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[ReportBillCostCenter]') AND type in (N'P', N'PC'))DROP proc [dbo].[ReportBillCostCenter]
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[GetTransferCost]') AND type in (N'P', N'PC'))DROP proc [dbo].[GetTransferCost]

--views
IF OBJECT_ID('View_paper', 'V') IS NOT NULL DROP VIEW View_paper;
IF OBJECT_ID('View_RepInstallmentMaster', 'V') IS NOT NULL DROP VIEW View_RepInstallmentMaster;
IF OBJECT_ID('View_Making', 'V') IS NOT NULL DROP VIEW View_Making;

IF OBJECT_ID('View_BestCust', 'V') IS NOT NULL DROP VIEW View_BestCust;
IF OBJECT_ID('View_BestVen', 'V') IS NOT NULL DROP VIEW View_BestVen;
IF OBJECT_ID('View_CustReport', 'V') IS NOT NULL DROP VIEW View_CustReport;
IF OBJECT_ID('View_VenReport', 'V') IS NOT NULL DROP VIEW View_VenReport;
IF OBJECT_ID('view_ItemComeOut', 'V') IS NOT NULL DROP VIEW view_ItemComeOut;
IF OBJECT_ID('View_TalbiaDetails', 'V') IS NOT NULL DROP VIEW View_TalbiaDetails;
IF OBJECT_ID('ViewIteminStore', 'V') IS NOT NULL DROP VIEW ViewIteminStore;
IF OBJECT_ID('View_GetSumEquation', 'V') IS NOT NULL DROP VIEW View_GetSumEquation;
IF OBJECT_ID('View_TalbiaInvoice', 'V') IS NOT NULL DROP VIEW View_TalbiaInvoice;
IF OBJECT_ID('view_ItemComeOut_lOT', 'V') IS NOT NULL DROP VIEW view_ItemComeOut_lOT;
IF OBJECT_ID('View_Get_Import_Pur', 'V') IS NOT NULL DROP VIEW View_Get_Import_Pur;
IF OBJECT_ID('View_Convert', 'V') IS NOT NULL DROP VIEW View_Convert;
IF OBJECT_ID('View_item', 'V') IS NOT NULL DROP VIEW View_item;
IF OBJECT_ID('View_itemBegin', 'V') IS NOT NULL DROP VIEW View_itemBegin;
IF OBJECT_ID('View_tree', 'V') IS NOT NULL DROP VIEW View_tree;
IF OBJECT_ID('ViewCustomBalance', 'V') IS NOT NULL DROP VIEW ViewCustomBalance;
IF OBJECT_ID('View_PurExcelSheet', 'V') IS NOT NULL DROP VIEW View_PurExcelSheet;

IF OBJECT_ID('View_PurInvoice', 'V') IS NOT NULL DROP VIEW View_PurInvoice;
IF OBJECT_ID('View_SalInvoice', 'V') IS NOT NULL DROP VIEW View_SalInvoice;
IF OBJECT_ID('View_RSalInvoice', 'V') IS NOT NULL DROP VIEW View_RSalInvoice;
IF OBJECT_ID('View_RPurInvoice', 'V') IS NOT NULL DROP VIEW View_RPurInvoice;

IF OBJECT_ID('View_RSalProf', 'V') IS NOT NULL DROP VIEW View_RSalProf;
IF OBJECT_ID('View_RpurProf', 'V') IS NOT NULL DROP VIEW View_RpurProf;
IF OBJECT_ID('View_PurProf', 'V') IS NOT NULL DROP VIEW View_PurProf;
IF OBJECT_ID('View_SalProf', 'V') IS NOT NULL DROP VIEW View_SalProf;
IF OBJECT_ID('View_Requ', 'V') IS NOT NULL DROP VIEW View_Requ;



IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.FixBalanceToday') AND type in (N'P', N'PC'))DROP proc dbo.FixBalanceToday
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.ItemsBeginOneItem') AND type in (N'P', N'PC'))DROP proc dbo.ItemsBeginOneItem
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.ItemsContinuous_inventory') AND type in (N'P', N'PC'))DROP proc dbo.ItemsContinuous_inventory
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.ProMe') AND type in (N'P', N'PC'))DROP proc dbo.ProMe

IF OBJECT_ID('view_code', 'V') IS NOT NULL DROP VIEW view_code;
IF OBJECT_ID('View_PurDetails', 'V') IS NOT NULL DROP VIEW View_PurDetails;

IF OBJECT_ID('View_RPurDetails', 'V') IS NOT NULL DROP VIEW View_RPurDetails;
IF OBJECT_ID('View_RsalDetails', 'V') IS NOT NULL DROP VIEW View_RsalDetails;

IF OBJECT_ID('View_salDetails', 'V') IS NOT NULL DROP VIEW View_salDetails;
IF OBJECT_ID('View_store', 'V') IS NOT NULL DROP VIEW View_store;


IF OBJECT_ID('View_Ekhtar', 'V') IS NOT NULL DROP VIEW View_Ekhtar;
IF OBJECT_ID('View_Ekhtar_details', 'V') IS NOT NULL DROP VIEW View_Ekhtar_details;
IF OBJECT_ID('View_Ekhtar_Order', 'V') IS NOT NULL DROP VIEW View_Ekhtar_Order;
IF OBJECT_ID('View_Ekhtar_Send', 'V') IS NOT NULL DROP VIEW View_Ekhtar_Send;
IF OBJECT_ID('View_Ekhtar_Bill', 'V') IS NOT NULL DROP VIEW View_Ekhtar_Bill;
IF OBJECT_ID('View_Ekhtar_Summery', 'V') IS NOT NULL DROP VIEW View_Ekhtar_Summery;

