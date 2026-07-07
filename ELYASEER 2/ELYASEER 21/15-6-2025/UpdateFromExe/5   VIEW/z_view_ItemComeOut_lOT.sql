

create view [dbo].[view_ItemComeOut_lOT]
as
-----pur
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, ROUND(SUM(CONVERT(float, comee)), 2) AS pur, 0 AS Rpur, 
                      0 AS sal, 0 AS Rsal, 0 AS beginn, 0 AS InventoryTo,0 AS InSide, 0 AS Outside,0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_pur > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
---rpur
UNION
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, ROUND(SUM(CONVERT(float, outt)), 2) AS Rpur, 
                      0 AS sal, 0 AS Rsal, 0 AS beginn, 0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_rpur > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
----sal
UNION
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, ROUND(SUM(CONVERT(float, outt)), 2) 
                      AS sal, 0 AS Rsal, 0 AS beginn, 0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_sal > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
---rsal
UNION
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, ROUND(SUM(CONVERT(float, 
                      comee)), 2) AS Rsal, 0 AS beginn, 0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_rsal > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
UNION
----begin
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 
                      ROUND(SUM(CONVERT(float, comee)), 2) AS beginn, 0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_begin > 0)

GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
UNION
-----------id_Inventory
SELECT   LOT,  id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      ROUND(SUM(CONVERT(float, comee)), 2) AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     isnull(id_Inventory,0)> 0

GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, comee)), 2) > 0)
UNION
-----------id_InSide
SELECT   LOT,  id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, ROUND(SUM(CONVERT(float, comee)), 2) AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     isnull(id_InSide ,0) > 0
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, comee)), 2) > 0)
UNION
------------Convert
SELECT  LOT,   id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, 0 AS Outside, ROUND(SUM(CONVERT(float, comee)), 2) AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_Convert > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, comee)), 2) > 0)

UNION
--------------------Making
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, ROUND(SUM(CONVERT(float, comee)), 2) AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_Making > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, comee)), 2) > 0)
UNION
--------------id_Amortization
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, ROUND(SUM(CONVERT(float, outt)), 2) AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_Amortization > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
UNION
--------------------id_Convert
SELECT   LOT,  id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, ROUND(SUM(CONVERT(float, outt)), 2) AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE     (id_Convert > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, outt)), 2) > 0)

UNION
----------------------------id_Inventory
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, ROUND(SUM(CONVERT(float, outt)), 2) AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE      isnull(id_Inventory,0) > 0
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, outt)), 2) > 0)
UNION
-------------id_Outside
SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, ROUND(SUM(CONVERT(float, outt)), 2) AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, 
                      0 AS MakingFrom
FROM         dbo.View_store
WHERE      isnull(id_Outside ,0) > 0
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, outt)), 2) > 0)
UNION


SELECT    LOT, id_item, id_store, CostCenter, pdate, InternationalCode, ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, ROUND(SUM(CONVERT(float, comee)), 2) AS comee, 
                      ROUND(SUM(CONVERT(float, outt)), 2) AS outt, ROUND(CONVERT(float, net_balance), 2) AS balance, 0 AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS beginn, 
                      0 AS InventoryTo,0 AS InSide, 0 AS Outside, 0 AS ConvertTo, 0 AS MakingTo, 0 AS Amortization, 0 AS ConvertFrom, 0 AS InventoryFrom, ROUND(SUM(CONVERT(float, outt)), 2) 
                      AS MakingFrom
FROM         dbo.View_store
WHERE     (id_Making > 0)
GROUP BY LOT,id_item, id_store, CostCenter, pdate, ROUND(CONVERT(float, net_balance), 2), ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7, InternationalCode
HAVING      (ROUND(SUM(CONVERT(float, outt)), 2) > 0)



