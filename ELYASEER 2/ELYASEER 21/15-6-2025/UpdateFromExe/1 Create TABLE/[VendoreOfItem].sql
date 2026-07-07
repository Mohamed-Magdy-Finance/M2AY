
IF OBJECT_ID (N'VendoreOfItem', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[VendoreOfItem]

end


IF OBJECT_ID (N'CurrenyPrice', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[CurrenyPrice]

end
IF OBJECT_ID (N'EmpTypeSalary', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[EmpTypeSalary]

end
IF OBJECT_ID (N'dbo.ZZitem_WidthCol', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[ZZitem_WidthCol]

end

IF OBJECT_ID (N'dbo.ZZitem_unvisibleCol', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[ZZitem_unvisibleCol]

end

IF OBJECT_ID (N'dbo.ZZitem_OrderCol', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[ZZitem_OrderCol]

end
IF OBJECT_ID (N'dbo.ZZCust_WidthCol', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[ZZCust_WidthCol]

end
IF OBJECT_ID (N'dbo.ZZCust_unvisibleCol', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[ZZCust_unvisibleCol]

end
IF OBJECT_ID (N'dbo.ZZCust_OrderCol', N'U') IS not NULL 
BEGIN
drop TABLE [dbo].[ZZCust_OrderCol]

end
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.newid') AND type in (N'P', N'PC'))DROP proc dbo.newid
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.GetItems') )DROP function dbo.GetItems
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.WAWA_V_TAB') )DROP function dbo.WAWA_V_TAB
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.WAWA_VTAB') )DROP function dbo.WAWA_VTAB
