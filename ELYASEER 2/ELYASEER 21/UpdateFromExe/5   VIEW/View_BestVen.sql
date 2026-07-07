create view View_BestVen
as
SELECT     TOP (100) PERCENT dbo.cust.id_cust, cust.way,cust.delegateSal,cust.CostCenter,dbo.cust.Code, dbo.cust.Aname, SUM(ISNULL(CONVERT(Int, dbo.pur_Invoice.Total), 0)) AS sal, 0 AS Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.pur_Invoice ON dbo.cust.id_cust = dbo.pur_Invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 2)
GROUP BY dbo.cust.id_cust,cust.way,cust.delegateSal,cust.CostCenter, dbo.cust.Code, dbo.cust.Aname
UNION
SELECT     TOP (100) PERCENT dbo.cust.id_cust, cust.way,cust.delegateSal,cust.CostCenter,dbo.cust.Code, dbo.cust.Aname, 0 AS sal, SUM(ISNULL(CONVERT(Int, dbo.Rpur_invoice.Total), 0)) AS Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.Rpur_invoice ON dbo.cust.id_cust = dbo.Rpur_invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 2)
GROUP BY dbo.cust.id_cust,cust.way,cust.delegateSal,cust.CostCenter, dbo.cust.Code, dbo.cust.Aname