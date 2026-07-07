

create view View_Get_Import_Pur
as
SELECT        ROUND(CONVERT(float, dbo.Pur_Details.total_item), 4) * CONVERT(float, dbo.Pur_Invoice.CurrencyPrice) 
                         + SUM(dbo.PurTransfer.Expenses_Inside1 + dbo.PurTransfer.Expenses_Inside2 + dbo.PurTransfer.Expenses_Inside3 + dbo.PurTransfer.Expenses_Inside4) AS total_item, dbo.cust.CustomerType, 
                         MONTH(dbo.PurTransfer.pdate) AS monthh, YEAR(dbo.PurTransfer.pdate) AS yearr, ISNULL(dbo.Item.TYPE, 0) AS type
FROM            dbo.Pur_Details INNER JOIN
                         dbo.Item ON dbo.Pur_Details.id_item = dbo.Item.id_item INNER JOIN
                         dbo.Pur_Invoice ON dbo.Pur_Details.id_pur = dbo.Pur_Invoice.id_pur INNER JOIN
                         dbo.cust ON dbo.Pur_Invoice.id_cust = dbo.cust.id_cust INNER JOIN
                         dbo.PurTransfer ON dbo.Pur_Invoice.id_pur = dbo.PurTransfer.id_pur
WHERE        (ISNULL(dbo.PurTransfer.IsGood, '0') = 0)
GROUP BY ROUND(CONVERT(float, dbo.Pur_Details.total_item), 4) * dbo.Pur_Invoice.CurrencyPrice, dbo.cust.CustomerType, ISNULL(dbo.Item.TYPE, 0), MONTH(dbo.PurTransfer.pdate), YEAR(dbo.PurTransfer.pdate)