
create view View_PurDetails
as 
SELECT     TOP (100) PERCENT dbo.Pur_Details.id,dbo.Pur_Details.id_pur ,dbo.Item.BigPr0 ,dbo.Item.BigPr1 ,dbo.Item.BigPr2 , dbo.Item.ENname,  dbo.Item.ARname +' ' + isnull(pur_Details.des,'') as ARname, dbo.Item.InternationalCode,
Item.CountMetr,
--CASE WHEN ISNULL(Item.CountMetr, 0) > 0 THEN CEILING(ROUND(CONVERT(FLOAT, (pur_Details.qu)), 2) / ISNULL(Item.CountMetr, 0))  ELSE 0 END AS CountMetr,
dbo.Z_MiddellUnit.aname AS mid, 
                      dbo.Z_SmallUnit.aname AS big, dbo.Z_BigUnit.aname AS small, CASE WHEN [unit] = 0 THEN isnull(dbo.Z_BigUnit.aname, 'U-Big') 
                      WHEN [unit] = 1 THEN isnull(dbo.Z_MiddellUnit.aname, 'U-Middell') ELSE isnull(dbo.Z_SmallUnit.aname, 'U-Small') END AS UnitName, dbo.Pur_Details.unit, 
                      dbo.Pur_Details.mm, dbo.Pur_Details.yy, dbo.Pur_Details.qu, dbo.Pur_Details.bones, dbo.Pur_Details.Discount, ROUND(CONVERT(float, 
                      dbo.Pur_Details.qu * dbo.Pur_Details.pr - dbo.Pur_Details.total_item), 2) AS DiscountCash, dbo.Pur_Details.PricePharmacist, case when isnull(pur_Details.tax,0) =0 then 0 else round(convert(float,pur_Details.total_item*pur_Details.tax/100),2) end  AS tax, 
                    dbo.Pur_Details.c_count,  dbo.Pur_Details.total_item, dbo.Pur_Invoice.pdate,dbo.Pur_Invoice.CashName,
					dbo.Pur_Invoice.Total,dbo.Pur_Invoice.CurrencyPrice,dbo.Pur_Invoice.Tax_Ast,dbo.Pur_Invoice.id_bill,
dbo.Pur_Invoice.user_name,dbo.Pur_Invoice.Transfer,dbo.Pur_Invoice.CostCenter,dbo.Pur_Invoice.commission,dbo.Pur_Invoice.delegateName,
					dbo.Pur_Details.pr, dbo.Pur_Invoice.notes, dbo.Pur_Invoice.AmountPaid, dbo.Pur_Details.LOT, 
                      RTRIM(LTRIM(STR(dbo.Pur_Details.mm))) + '/' + RTRIM(LTRIM(STR(dbo.Pur_Details.yy))) AS expire_date, dbo.Item.net_balance, STR(dbo.Item.CurrentBalance0) 
                      + ' ' + STR(dbo.Item.CurrentBalance1) + ' ' + STR(dbo.Item.CurrentBalance2) AS balance, dbo.Pur_Invoice.Expense, dbo.Pur_Invoice.DesExpense, 
                      dbo.Pur_Invoice.id_cust, dbo.Pur_Invoice.TypePaied, dbo.Pur_Invoice.IsFavorite, dbo.cust.Aname AS Cust_Name
                      , dbo.Item.CountMetr AS ItemCountMetr, dbo.Item.ShortName
					, Case When ISNULL(Item.CountMetr,0)>0 Then ROUND(CONVERT(FLOAT,(Pur_Details.pr))*ISNULL(Item.CountMetr,0),2)Else 0 End As PriceTen

FROM         dbo.Item INNER JOIN
                      dbo.Pur_Details ON dbo.Item.id_item = dbo.Pur_Details.id_item INNER JOIN
                      dbo.Pur_Invoice ON dbo.Pur_Details.id_pur = dbo.Pur_Invoice.id_pur LEFT OUTER JOIN
                      dbo.cust ON dbo.Pur_Invoice.id_cust = dbo.cust.id_cust LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id
ORDER BY dbo.Item.ARname