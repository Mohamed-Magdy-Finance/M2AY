create view View_VenReport
as
SELECT     dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal, SUM(dbo.Pur_Invoice.Total) AS pur, 0 AS Rpur, 0 AS sal, 0 AS Rsal, COUNT(dbo.Pur_Invoice.id_pur) AS count_pur, 0 AS count_Rpur,
                       0 AS count_sal, 0 AS count_Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.Pur_Invoice ON dbo.cust.id_cust = dbo.Pur_Invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 2)
GROUP BY dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal
UNION
SELECT     dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal, 0 AS pur, SUM(dbo.RPur_Invoice.Total) AS Rpur, 0 AS sal, 0 AS Rsal, 0 AS count_pur, COUNT(dbo.RPur_Invoice.id_Rpur) 
                      AS count_Rpur, 0 AS count_sal, 0 AS count_Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.RPur_Invoice ON dbo.cust.id_cust = dbo.RPur_Invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 2)
GROUP BY dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal
UNION
SELECT     dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal, 0 AS pur, 0 AS Rpur, SUM(dbo.Sal_Invoice.Total) AS sal, 0 AS Rsal, 0 AS count_pur, 0 AS count_Rpur, 
                      COUNT(dbo.Sal_Invoice.id_Sal) AS count_Sal, 0 AS count_Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.Sal_Invoice ON dbo.cust.id_cust = dbo.Sal_Invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 2)
GROUP BY dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal
UNION
SELECT     dbo.cust.id_cust, cust.Aname,cust.CostCenter,cust.way,cust.delegateSal, 0 AS pur, 0 AS Rpur, 0 AS sal, SUM(dbo.Rsal_Invoice.Total) AS Rsal, 0 AS count_pur, 0 AS count_Rpur, 0 AS count_sal, 
                      COUNT(dbo.Rsal_Invoice.id_Rsal) AS count_Rsal
FROM         dbo.cust LEFT OUTER JOIN
                      dbo.Rsal_Invoice ON dbo.cust.id_cust = dbo.Rsal_Invoice.id_cust
WHERE     (dbo.cust.IsCustomer = 2)
GROUP BY dbo.cust.id_cust,cust.Aname,cust.CostCenter,cust.way,cust.delegateSal