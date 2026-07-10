
create View View_GetSumEquation
as
SELECT     CASE WHEN [unit] = 0 THEN Item.cost * item_Requ.qu_Requ WHEN [unit] = 1 THEN round(Item.cost / Item.CountMiddel, 2) * item_Requ.qu_Requ ELSE round(Item.cost / Item.CountSmall, 2) 
                      * item_Requ.qu_Requ END AS TotalCost, dbo.item_Requ.ARname_Requ
FROM         dbo.Item INNER JOIN
                      dbo.item_Requ ON dbo.Item.id_item = dbo.item_Requ.id_item
GROUP BY CASE WHEN [unit] = 0 THEN Item.cost * item_Requ.qu_Requ WHEN [unit] = 1 THEN round(Item.cost / Item.CountMiddel, 2) * item_Requ.qu_Requ ELSE round(Item.cost / Item.CountSmall, 2) 
                      * item_Requ.qu_Requ END, dbo.item_Requ.ARname_Requ
