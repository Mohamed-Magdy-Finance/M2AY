create proc [dbo].[ItemComeOutBetweenTowDate]
@variable BIGINT,
@pdate1  date,
@pdate2 date,
 @CostCenter nvarchar(100)
as
  IF @CostCenter='' SELECT     id_item, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, balance, SUM(comee) AS comee, SUM(outt) AS outt, SUM(pur) AS pur, SUM(Rpur) AS Rpur, SUM(sal) AS sal, SUM(Rsal) AS Rsal, SUM(beginn) AS beginn, SUM(InventoryTo) AS InventoryTo, SUM(ConvertTo) AS ConvertTo, SUM(MakingTo) AS MakingTo, SUM(Amortization) AS Amortization, SUM(ConvertFrom) AS ConvertFrom, SUM(InventoryFrom) AS InventoryFrom, SUM(MakingFrom) AS MakingFrom FROM         dbo.view_ItemComeOut WHERE     (id_store = @variable)AND (pdate BETWEEN @pdate1 AND @pdate2) GROUP BY id_item, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, balance
  
  IF @CostCenter<>''SELECT     id_item, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, balance, SUM(comee) AS comee, SUM(outt) AS outt, SUM(pur) AS pur, SUM(Rpur) AS Rpur, SUM(sal) AS sal, SUM(Rsal) AS Rsal, SUM(beginn) AS beginn, SUM(InventoryTo) AS InventoryTo, SUM(ConvertTo) AS ConvertTo, SUM(MakingTo) AS MakingTo, SUM(Amortization) AS Amortization, SUM(ConvertFrom) AS ConvertFrom, SUM(InventoryFrom) AS InventoryFrom, SUM(MakingFrom) AS MakingFrom FROM         dbo.view_ItemComeOut WHERE     (id_store = @variable) AND (pdate BETWEEN @pdate1 AND @pdate2) and CostCenter = @CostCenter  GROUP BY id_item, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, balance
