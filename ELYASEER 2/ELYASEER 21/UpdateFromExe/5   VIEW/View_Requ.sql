create view View_Requ
as 
SELECT     dbo.item_Requ.id_step, dbo.item_Requ.StoreMatrial, dbo.item_Requ.id, dbo.item_Requ.ARname_Requ, dbo.Item.ARname, ROUND(CONVERT(float, dbo.item_Requ.qu_Requ), 5) AS qu_Requ, 
                      dbo.item_Requ.unit, CASE WHEN [unit] = 0 THEN isnull(Z_BigUnit.aname, 'ÊÕœ… ﬂ»—Ï') WHEN [unit] = 1 THEN isnull(Z_MiddellUnit.aname, 'ÊÕœ… Ê”ÿÏ') ELSE isnull(Z_SmallUnit.aname, 'ÊÕœ… ’€—Ï') 
                      END AS UnitName, dbo.Z_BigUnit.aname AS big, dbo.Z_MiddellUnit.aname AS mid, dbo.Z_SmallUnit.aname AS small, CASE WHEN [unit] = 0 THEN CONVERT(decimal(18, 6), Item.PurchasePrice) 
                      WHEN [unit] = 1 THEN CONVERT(decimal(18, 6), Item.PurchasePrice / Item.CountMiddel) ELSE CONVERT(decimal(18, 6), Item.PurchasePrice / Item.CountSmall) END AS cost, 
                      CASE WHEN [unit] = 0 THEN CONVERT(decimal(18, 6), Item.PurchasePrice * item_Requ.qu_Requ) WHEN [unit] = 1 THEN CONVERT(decimal(18, 6), Item.PurchasePrice / Item.CountMiddel) 
                      * item_Requ.qu_Requ ELSE CONVERT(decimal(18, 6), (Item.PurchasePrice / Item.CountSmall) * item_Requ.qu_Requ) END AS TotalCost, dbo.Item.CountMiddel, dbo.Item.CountSmall, 
                      dbo.item_Requ.QU_Product
FROM         dbo.Item INNER JOIN
                      dbo.item_Requ ON dbo.Item.id_item = dbo.item_Requ.id_item LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id