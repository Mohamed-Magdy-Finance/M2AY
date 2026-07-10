

create view View_BestCust
as
SELECT     TOP (100) PERCENT dbo.cust.id_cust,cust.way,cust.delegateSal,cust.CostCenter, dbo.cust.Code, dbo.cust.Aname, SUM(ISNULL(CONVERT(Int, dbo.Sal_Invoice.Total), 0)) AS sal, 0 AS Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.Sal_Invoice ON dbo.cust.id_cust = dbo.Sal_Invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 1)
GROUP BY dbo.cust.id_cust, cust.way,cust.delegateSal,cust.CostCenter,dbo.cust.Code, dbo.cust.Aname
UNION
SELECT     TOP (100) PERCENT dbo.cust.id_cust, cust.way,cust.delegateSal,cust.CostCenter,dbo.cust.Code, dbo.cust.Aname, 0 AS sal, SUM(ISNULL(CONVERT(Int, dbo.Rsal_invoice.Total), 0)) AS Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.Rsal_invoice ON dbo.cust.id_cust = dbo.Rsal_invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 1)
GROUP BY dbo.cust.id_cust,cust.way,cust.delegateSal,cust.CostCenter, dbo.cust.Code, dbo.cust.Aname