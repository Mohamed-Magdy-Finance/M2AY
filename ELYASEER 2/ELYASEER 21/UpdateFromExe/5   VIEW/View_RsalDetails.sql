
create view View_RsalDetails
as 
SELECT     TOP (100) PERCENT dbo.Rsal_details.id,dbo.Rsal_details.id_RSal AS id_pur,dbo.Item.BigPr0 ,dbo.Item.BigPr1 ,dbo.Item.BigPr2 , dbo.Item.ENname, dbo.Item.ARname, dbo.Item.InternationalCode, dbo.Item.net_balance,  CASE WHEN ISNULL(Item.CountMetr, 0) > 0 THEN CEILING(ROUND(CONVERT(FLOAT, (RSal_Details.qu)), 2) / ISNULL(Item.CountMetr, 0))  ELSE 0 END AS CountMetr, 
                      STR(dbo.Item.CurrentBalance0) + ' ' + STR(dbo.Item.CurrentBalance1) + ' ' + STR(dbo.Item.CurrentBalance2) AS balance, 
                      CASE WHEN [unit] = 0 THEN isnull(dbo.Z_BigUnit.aname, 'U-Big') WHEN [unit] = 1 THEN isnull(dbo.Z_MiddellUnit.aname, 'U-Middell') 
                      ELSE isnull(dbo.Z_SmallUnit.aname, 'U-Small') END AS UnitName, dbo.Rsal_details.unit, dbo.Rsal_details.qu, dbo.Rsal_details.bones, dbo.Rsal_details.Discount, 
                      ROUND(CONVERT(float, dbo.Rsal_details.qu * dbo.Rsal_details.pr - dbo.Rsal_details.total_item), 2) AS DiscountCash, ROUND(CONVERT(float,dbo.Rsal_details.total_item),3) AS total_item, 
                    dbo.RSal_Details.c_count,  dbo.Rsal_details.mm, dbo.Rsal_details.yy, dbo.Rsal_details.pr, dbo.Rsal_invoice.pdate, dbo.Rsal_invoice.notes, dbo.Rsal_invoice.id_bill, 
                         RIGHT(LTRIM(RTRIM(STR(dbo.Rsal_Details.mm))), 2) + '/' + LTRIM(RTRIM(STR(dbo.Rsal_Details.yy))) AS expire_date
                      ,'' as LOT ,Rsal_Details.tax, dbo.Item.ShortName, Rsal_invoice.AmountPaid,Rsal_invoice.Total,
                      dbo.Rsal_invoice.delegateName, dbo.Rsal_invoice.id_cust, dbo.Rsal_invoice.TypePaied, dbo.Rsal_invoice.IsFavorite, dbo.cust.Aname AS Cust_Name, dbo.Item.CountMetr AS ItemCountMetr
					, Case When ISNULL(Item.CountMetr,0)>0 Then ROUND(CONVERT(FLOAT,(Rsal_details.pr))*ISNULL(Item.CountMetr,0),2)Else 0 End As PriceTen

FROM         dbo.Item INNER JOIN
                      dbo.Rsal_details ON dbo.Item.id_item = dbo.Rsal_details.id_item INNER JOIN
                      dbo.Rsal_invoice ON dbo.Rsal_details.id_RSal = dbo.Rsal_invoice.id_Rsal LEFT OUTER JOIN
                      dbo.cust ON dbo.Rsal_invoice.id_cust = dbo.cust.id_cust LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id
ORDER BY dbo.Item.ARname