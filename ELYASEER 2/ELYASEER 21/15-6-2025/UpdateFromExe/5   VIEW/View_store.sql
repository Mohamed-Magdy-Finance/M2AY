create view View_store
as 
SELECT     TOP (100) PERCENT dbo.Item_store.dateEditExpire, dbo.Item_store.id_item, dbo.Item_store.id_store, dbo.Item_store.come_big, dbo.Item_store.come_Middel, dbo.Item_store.come_Small, dbo.Item_store.notes, 
                      dbo.Item_store.out_big, dbo.Item_store.out_Middel, dbo.Item_store.out_Small, dbo.Item_store.unit, dbo.Item_store.pr, dbo.Item_store.pdate, dbo.Item_store.id_pur, 
                      dbo.Item_store.id_rpur, dbo.Item_store.id_sal, dbo.Item_store.id_rsal, dbo.Item_store.total_item, dbo.Item_store.id, dbo.Item_store.id_Amortization, 
                      dbo.Item_store.discount, dbo.Item_store.id_begin, dbo.Item_store.Profit, dbo.Item_store.date_expire, dbo.Item.Dioscount_main, dbo.Item.Dioscount_over, 
                      dbo.Item.net_balance, dbo.Item.CountMiddel, dbo.Item.CountSmall, dbo.Item.InternationalCode,Item.keep, dbo.Item.ShortName,dbo.Item.CountMetr, dbo.Item.ARname, dbo.Item.ENname, 
                      dbo.Item.BigPr0,Item.BigPr1,Item.BigPr2,dbo.Item.Discount0,dbo.Item.Discount1,dbo.Item.Discount2, dbo.Item_store.Tax,dbo.Item.Ticket, dbo.Item.cost, dbo.Item.IsExpire, dbo.Item.CurrentBalance0, dbo.Item.CurrentBalance1, dbo.Item.CurrentBalance2, dbo.Item.Minimum, 
                      dbo.Item.MIDPr0, dbo.Item.SmallPr0, dbo.Item.PurchasePrice, dbo.Z_Stores.aname, (dbo.Item_store.out_big + ISNULL(dbo.Item_store.out_Middel, 3) 
                      / ISNULL(dbo.Item.CountMiddel, 3)) + dbo.Item_store.out_Small / ISNULL(dbo.Item.CountSmall, 3) AS outt, 
                      (dbo.Item_store.come_big + ISNULL(dbo.Item_store.come_Middel, 3) / ISNULL(dbo.Item.CountMiddel, 3)) + dbo.Item_store.come_Small / ISNULL(dbo.Item.CountSmall,
                       3) AS comee, dbo.Item_store.out_big * ISNULL(dbo.Item.CountSmall, 1) + ISNULL(dbo.Item_store.out_Middel, 1) * (ISNULL(dbo.Item.CountSmall, 1) 
                      / ISNULL(dbo.Item.CountMiddel, 1)) + dbo.Item_store.out_Small AS OutSmall, dbo.Item_store.come_big * ISNULL(dbo.Item.CountSmall, 1) 
                      + ISNULL(dbo.Item_store.come_Middel, 1) * (ISNULL(dbo.Item.CountSmall, 1) / ISNULL(dbo.Item.CountMiddel, 1)) + dbo.Item_store.come_Small AS ComeSmall, 
                      dbo.Z_TypeItem1.aname AS TypeItem1, dbo.Z_TypeItem2.aname AS TypeItem2, dbo.Z_TypeItem3.aname AS TypeItem3, dbo.Z_BigUnit.aname AS BigUnit, 
                      dbo.Z_MiddellUnit.aname AS MiddellUnit, dbo.Z_SmallUnit.aname AS SmallUnit, dbo.Item_store.id_Convert, dbo.Item_store.id_Inventory, 
                      dbo.Item_store.last_balance, dbo.Item_store.id_Making, dbo.Item_store.LOT, dbo.Item_store.id_cust, dbo.Item_store.CostCenter, dbo.Item.TYPE, 
                      dbo.Item_store.bones,Item_store.WorkNum, dbo.Item_store.id_Outside, dbo.Item_store.id_InSide, dbo.Item_store.idBill, dbo.Item_store.id_shift, dbo.Item_store.NetCost, 
                      dbo.Item_store.backup_expire,dbo.Item_store.c_count, dbo.Z_TypeItem4.aname AS TypeItem4, dbo.Z_TypeItem5.aname AS TypeItem5, dbo.Z_TypeItem6.aname AS TypeItem6, 
                      dbo.Z_TypeItem7.aname AS TypeItem7, dbo.Item.id_ven, dbo.Item_store.id_InventoryExpire
                      
FROM         dbo.Item INNER JOIN
                      dbo.Item_store ON dbo.Item.id_item = dbo.Item_store.id_item LEFT OUTER JOIN
                      dbo.Z_TypeItem4 ON dbo.Item.IdTypeItem4 = dbo.Z_TypeItem4.id LEFT OUTER JOIN
                      dbo.Z_TypeItem5 ON dbo.Item.IdTypeItem5 = dbo.Z_TypeItem5.id LEFT OUTER JOIN
                      dbo.Z_TypeItem6 ON dbo.Item.IdTypeItem6 = dbo.Z_TypeItem6.id LEFT OUTER JOIN
                      dbo.Z_TypeItem7 ON dbo.Item.IdTypeItem7 = dbo.Z_TypeItem7.id LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id LEFT OUTER JOIN
                      dbo.Z_TypeItem2 ON dbo.Item.IdTypeItem2 = dbo.Z_TypeItem2.id LEFT OUTER JOIN
                      dbo.Z_TypeItem3 ON dbo.Item.IdTypeItem3 = dbo.Z_TypeItem3.id LEFT OUTER JOIN
                      dbo.Z_Stores ON dbo.Item_store.id_store = dbo.Z_Stores.id AND dbo.Item_store.id_store = dbo.Z_Stores.id LEFT OUTER JOIN
                      dbo.Z_TypeItem1 ON dbo.Item.IdTypeItem1 = dbo.Z_TypeItem1.id
ORDER BY CONVERT(date, dbo.Item_store.pdate)