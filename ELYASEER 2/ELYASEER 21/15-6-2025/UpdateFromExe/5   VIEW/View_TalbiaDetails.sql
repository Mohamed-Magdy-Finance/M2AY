create View View_TalbiaDetails
as
SELECT     TOP (100) PERCENT dbo.Talbia_Details.des, dbo.Talbia_Details.id,dbo.Talbia_Details.id_Talbia as id_pur, dbo.Item.ARname +' ' + isnull(Talbia_Details.des,'') as ARname, dbo.Item.InternationalCode,  CASE WHEN ISNULL(Item.CountMetr, 0) > 0 THEN CEILING(ROUND(CONVERT(FLOAT, (Talbia_Details.qu)), 2) / ISNULL(Item.CountMetr, 0))  ELSE 0 END AS CountMetr
                      , dbo.Z_MiddellUnit.aname AS mid, dbo.Z_SmallUnit.aname AS big, dbo.Z_BigUnit.aname AS small, 
                      CASE WHEN [unit] = 0 THEN isnull(dbo.Z_BigUnit.aname, 'U-Big') WHEN [unit] = 1 THEN isnull(dbo.Z_MiddellUnit.aname, 'U-Middell') 
                      ELSE isnull(dbo.Z_SmallUnit.aname, 'U-Small') END AS UnitName, dbo.Talbia_Details.unit, dbo.Talbia_Details.mm, dbo.Talbia_Details.yy, dbo.Talbia_Details.qu, 
                      dbo.Talbia_Details.bones, dbo.Talbia_Details.Discount, ROUND(CONVERT(float, dbo.Talbia_Details.qu * dbo.Talbia_Details.pr - dbo.Talbia_Details.total_item), 2) AS DiscountCash,
                       dbo.Talbia_Details.PricePharmacist, dbo.Talbia_Details.tax, dbo.Talbia_Details.total_item, dbo.Talbia_Invoice.pdate, dbo.Talbia_Details.pr, 
                       dbo.Talbia_Details.LOT, RTRIM(LTRIM(STR(dbo.Talbia_Details.mm))) + '/' + RTRIM(LTRIM(STR(dbo.Talbia_Details.yy))) AS expire_date, 
                      dbo.Item.net_balance, STR(dbo.Item.CurrentBalance0) + ' ' + STR(dbo.Item.CurrentBalance1) + ' ' + STR(dbo.Item.CurrentBalance2) AS balance, 
                     dbo.Talbia_Invoice.id_cust,  
                      dbo.cust.Aname AS Cust_Name
                      , dbo.Item.CountMetr AS ItemCountMetr, dbo.Item.ShortName
FROM         dbo.Item INNER JOIN
                      dbo.Talbia_Details ON dbo.Item.id_item = dbo.Talbia_Details.id_item INNER JOIN
                      dbo.Talbia_Invoice ON dbo.Talbia_Details.id_Talbia = dbo.Talbia_Invoice.id_Talbia LEFT OUTER JOIN
                      dbo.cust ON dbo.Talbia_Invoice.id_cust = dbo.cust.id_cust LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id
ORDER BY dbo.Item.ARname