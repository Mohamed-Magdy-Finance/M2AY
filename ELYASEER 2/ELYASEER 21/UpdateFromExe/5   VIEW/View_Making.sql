
create view View_Making
as
SELECT        TOP (100) PERCENT Invoice.id_order, Invoice.WorkNum, Invoice.pdate, Invoice.QuComplete,
                             (SELECT        ARname
                                FROM            Item
                                WHERE        (id_item = Invoice.id_itemComplete)) AS ARnameComplete,
                             (SELECT        BigPr0
                                FROM            Item AS Item_2
                                WHERE        (id_item = Invoice.id_itemComplete)) AS BigPr0, Invoice.CostComplete, Invoice.CostTrans, Invoice.CostCenter, Invoice.notes, 
                         Invoice.user_name, ROUND(Invoice.QuComplete * Invoice.CostComplete, 3) AS TotalCost, Item_1.ARname AS ARnameMatrial, Z_Stores.aname AS StoreMatrial, 
                         ItemMaking_Details.DateOut, ItemMaking_Details.unit, CASE WHEN [unit] = 0 THEN isnull(Z_BigUnit.aname, 'U-Big') WHEN [unit] = 1 THEN isnull(Z_MiddellUnit.aname, 'U-Middell') ELSE isnull(Z_SmallUnit.aname, 
                         'U-Small') END AS UnitName, ItemMaking_Details.qu, ItemMaking_Details.cost, ROUND(CONVERT(float, ItemMaking_Details.cost) * CONVERT(float, ItemMaking_Details.qu),2) AS TotCost

						 ,(select aname from Z_Stores where id= Invoice.id_StoreComplete )as StoreComplete
						 ,(SELECT round( convert(decimal(5,1), Invoice.QuComplete / (SUM(ItemMaking_Details.qu)+.00001)*100) ,0)  AS Expr1
FROM            ItemMaking_Invoice INNER JOIN
                         ItemMaking_Details ON Invoice.id_order = ItemMaking_Details.id_order
GROUP BY ItemMaking_Invoice.QuComplete, ItemMaking_Invoice.id_order
HAVING        (ItemMaking_Invoice.id_order = Invoice.id_order  )) as Converter

FROM           ItemMaking_Invoice as Invoice INNER JOIN
                         ItemMaking_Details ON Invoice.id_order = ItemMaking_Details.id_order INNER JOIN
                         Z_Stores ON ItemMaking_Details.id_StoreMatrial = Z_Stores.id INNER JOIN
                         Item AS Item_1 ON ItemMaking_Details.id_itemMatrial = Item_1.id_item LEFT OUTER JOIN
                         Z_MiddellUnit ON Item_1.IdMiddellUnit = Z_MiddellUnit.id LEFT OUTER JOIN
                         Z_BigUnit ON Item_1.IdBigUnit = Z_BigUnit.id LEFT OUTER JOIN
                         Z_SmallUnit ON Item_1.IdSmallUnit = Z_SmallUnit.id