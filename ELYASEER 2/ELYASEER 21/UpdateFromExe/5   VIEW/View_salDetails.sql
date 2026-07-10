
create view View_salDetails
as 
SELECT     TOP (100) PERCENT dbo.Sal_Details.id, dbo.Sal_Details.id_sal AS id_pur, dbo.Item.id_item,Item.CountMiddel, dbo.Item.ENname, dbo.Item.ARname + ' ' + ISNULL(dbo.Sal_Details.des, '') AS ARname, 
                      dbo.Item.InternationalCode, dbo.Item.BigPr0 ,dbo.Item.BigPr1 ,dbo.Item.BigPr2 , dbo.Item.IsImported,Item.CountMetr as ItemCountMetr,  dbo.Item.IdTypeItem2,dbo.Item.IdTypeItem7, dbo.Item.PublicPr, dbo.Item.PathItemPic, dbo.Item.net_balance, dbo.Item.TYPE, Item.ARname as ARnameNotDes,
					  STR(dbo.Item.CurrentBalance0) + ' ' + STR(dbo.Item.CurrentBalance1) 
                      + ' ' + STR(dbo.Item.CurrentBalance2) AS balance, 
                      CASE WHEN [unit] = 0 THEN dbo.Z_BigUnit.aname WHEN [unit] = 1 THEN dbo.Z_MiddellUnit.aname ELSE dbo.Z_SmallUnit.aname END AS UnitName, dbo.Sal_Details.LOT, dbo.Sal_Details.unit, 
                     dbo.Sal_Details.tax as PercentTax, dbo.Sal_Details.qu, dbo.Sal_Details.bones, CASE WHEN isnull(Sal_Details.tax, 0) = 0 THEN 0 ELSE round(CONVERT(float, Sal_Details.total_item * Sal_Details.tax / 100), 2) END AS tax, 
                      CASE WHEN isnull(Sal_Details.tax, 0) = 0 THEN dbo.Sal_Details.total_item ELSE round(CONVERT(float, (Sal_Details.total_item * Sal_Details.tax / 100) + dbo.Sal_Details.total_item), 2) 
                      END AS total_item, dbo.Sal_Details.Discount, ROUND(CONVERT(float, dbo.Sal_Details.qu * dbo.Sal_Details.pr - dbo.Sal_Details.total_item), 2) AS DiscountCash, CONVERT(nvarchar, 
                      dbo.Sal_Details.yy) + '/' + CONVERT(nvarchar, dbo.Sal_Details.mm) AS expire_date, dbo.Sal_Details.pr, dbo.Sal_Details.c_count, dbo.Sal_Details.des, dbo.Sal_Invoice.id_sal, 
                     dbo.Sal_Invoice.CurrencyPrice,Sal_Invoice.OtherPrice, dbo.Sal_Invoice.CashName,dbo.Sal_Invoice.CostCenter,
					 Case When ISNULL(Item.CountMetr,0)>0 Then ROUND(CONVERT(FLOAT,(Sal_Details.pr))*ISNULL(Item.CountMetr,0),2)Else 0 End As PriceTen,
					 
					 dbo.Sal_Invoice.Tax_Ast,  dbo.Sal_Invoice.id_store, dbo.Sal_Invoice.id_cust, dbo.Sal_Invoice.pdate, dbo.Sal_Invoice.cashDiscount, dbo.Sal_Invoice.AmountPaid, dbo.Sal_Invoice.id_bill, dbo.Sal_Invoice.Total, 
                      dbo.Sal_Invoice.TypePaied, dbo.Sal_Details.mm, dbo.Sal_Details.yy, dbo.Sal_Invoice.notes, dbo.Sal_Invoice.user_name, dbo.Sal_Invoice.Profit, dbo.Sal_Invoice.IsClose, dbo.Sal_Invoice.AmountPaidRest, dbo.Sal_Invoice.delegateName, 
                      dbo.Sal_Invoice.DesExpense,dbo.Sal_Details.RongExpire, dbo.Sal_Invoice.Expense, dbo.Sal_Invoice.IsFavorite, dbo.cust.Aname AS Cust_Name, dbo.Sal_Invoice.id_shift, dbo.Sal_Invoice.ServiceValue, 
                      dbo.Sal_Invoice.TaxValue, dbo.Item.CountMetr , dbo.Item.ShortName, dbo.Z_Stores.aname
,(select Z_Stores.aname as Z_StoresAname from Z_Stores where Z_Stores.id=Sal_Details.id_store )as StoreNameDetails
FROM         dbo.Item INNER JOIN
                      dbo.Sal_Details ON dbo.Item.id_item = dbo.Sal_Details.id_item INNER JOIN
                      dbo.Sal_Invoice ON dbo.Sal_Details.id_sal = dbo.Sal_Invoice.id_sal INNER JOIN
                      dbo.Z_Stores ON dbo.Sal_Invoice.id_store = dbo.Z_Stores.id LEFT OUTER JOIN
                      dbo.cust ON dbo.Sal_Invoice.id_cust = dbo.cust.id_cust LEFT OUTER JOIN
                      dbo.Z_SmallUnit ON dbo.Item.IdSmallUnit = dbo.Z_SmallUnit.id LEFT OUTER JOIN
                      dbo.Z_MiddellUnit ON dbo.Item.IdMiddellUnit = dbo.Z_MiddellUnit.id LEFT OUTER JOIN
                      dbo.Z_BigUnit ON dbo.Item.IdBigUnit = dbo.Z_BigUnit.id
ORDER BY ARname, dbo.Sal_Details.id DESC