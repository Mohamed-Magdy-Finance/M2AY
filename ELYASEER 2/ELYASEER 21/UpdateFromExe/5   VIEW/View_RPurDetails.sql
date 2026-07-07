
create view View_RPurDetails
as 
SELECT     TOP (100) PERCENT dbo.RPur_Details.id,dbo.RPur_Details.id_Rpur AS id_pur,dbo.Item.ENname, dbo.Item.BigPr0 ,dbo.Item.BigPr1 ,dbo.Item.BigPr2 , dbo.Item.ARname, dbo.Item.InternationalCode, dbo.Item.net_balance,  CASE WHEN ISNULL(Item.CountMetr, 0) > 0 THEN CEILING(ROUND(CONVERT(FLOAT, (Rpur_Details.qu)), 2) / ISNULL(Item.CountMetr, 0))  ELSE 0 END AS CountMetr, 
                      STR(dbo.Item.CurrentBalance0) + ' ' + STR(dbo.Item.CurrentBalance1) + ' ' + STR(dbo.Item.CurrentBalance2) AS balance, dbo.Z_MiddellUnit.aname AS mid, 
                      dbo.Z_SmallUnit.aname AS big, dbo.Z_BigUnit.aname AS small, CASE WHEN [unit] = 0 THEN isnull(dbo.Z_BigUnit.aname, 'U-Big') 
                      WHEN [unit] = 1 THEN isnull(dbo.Z_MiddellUnit.aname, 'U-Middell') ELSE isnull(dbo.Z_SmallUnit.aname, 'U-Small') END AS UnitName, dbo.RPur_Details.unit, 
                      
                      RIGHT(LTRIM(RTRIM(STR(dbo.RPur_Details.mm))), 2) + '/' + LTRIM(RTRIM(STR(dbo.rPUR_Details.YY))) AS expire_date
                      ,'' as LOT , dbo.Item.ShortName,RPur_Details.c_count,RPur_Details.mm,RPur_Details.yy,
                      dbo.RPur_Details.qu, dbo.RPur_Details.bones, dbo.RPur_Details.Discount, ROUND(CONVERT(float, 
                      dbo.RPur_Details.qu * dbo.RPur_Details.pr - dbo.RPur_Details.total_item), 2) AS DiscountCash, dbo.RPur_Details.PricePharmacist, dbo.RPur_Details.tax, 
                      dbo.RPur_Details.total_item,
					  RPur_Invoice.AmountPaid, RPur_Invoice.Total,  RPur_Invoice.CostCenter, RPur_Invoice.user_name,
					  dbo.RPur_Invoice.pdate, dbo.RPur_Details.pr, dbo.RPur_Invoice.notes, dbo.RPur_Invoice.id_bill, dbo.RPur_Invoice.id_cust, 
                      dbo.RPur_Invoice.TypePaied , dbo.RPur_Invoice.IsFavorite, dbo.cust.Aname AS Cust_Name, dbo.Item.CountMetr AS ItemCountMetr
					 ,	 Case When ISNULL(Item.CountMetr,0)>0 Then ROUND(CONVERT(FLOAT,(Rpur_Details.pr))*ISNULL(Item.CountMetr,0),2)Else 0 End As PriceTen


FROM         dbo.Item INNER JOIN
                      dbo.RPur_Details ON dbo.Item.id_item = dbo.RPur_Details.id_item INNER JOIN
                      dbo.RPur_Invoice ON dbo.RPur_Details.id_Rpur = dbo.RPur_Invoice.id_Rpur LEFT OUTER JOIN
                      dbo.cust ON dbo.RPur_Invoice.id_cust = dbo.cust.id_cust LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id
ORDER BY dbo.Item.ARname