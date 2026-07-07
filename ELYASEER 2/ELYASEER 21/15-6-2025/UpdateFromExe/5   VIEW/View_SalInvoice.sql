
create view View_SalInvoice
as

SELECT        TOP (100) PERCENT dbo.Sal_Invoice.id_sal AS id_pur, dbo.Sal_Invoice.pdate, dbo.Sal_Invoice.cashDiscount, ROUND(CONVERT(float, dbo.Sal_Invoice.Profit), 4) AS Profit, 
                         CASE WHEN [TypePaied] = 1 THEN 'B-Credit' WHEN [TypePaied] = 2 THEN 'B-Net' ELSE 'B-Cash' END AS TypePaied, dbo.Sal_Invoice.TypePaied AS TypePaied00, ROUND(CONVERT(float, dbo.Sal_Invoice.AmountPaid), 4) 
                         AS AmountPaid, dbo.Sal_Invoice.id_bill, ROUND(CONVERT(float, dbo.Sal_Invoice.Total), 4) AS Total, dbo.Sal_Invoice.user_name, dbo.Z_Stores.aname AS Store_Name, ROUND(CONVERT(float, dbo.Sal_Invoice.TotalTax), 4) 
                         AS TotalTax, ROUND(CONVERT(float, dbo.Sal_Invoice.TableTax), 4) AS TableTax, CASE WHEN isnull(sal_Invoice.Tax_Ast, 0) > 0 THEN round(CONVERT(float, 
                         sal_Invoice.Total + sal_Invoice.cashDiscount - sal_Invoice.TotalTax), 4) - round(CONVERT(float, (sal_Invoice.Total + sal_Invoice.cashDiscount - sal_Invoice.TotalTax) / 100), 2) ELSE round(CONVERT(float, 
                         sal_Invoice.Total + sal_Invoice.cashDiscount - sal_Invoice.TotalTax), 4) END AS TotalBeforTax, CustTable.Aname AS Cust_Name, CustTable.Mobile, CONVERT(int, CASE WHEN isnull(Total, 0) + isnull(Sal_Invoice.cashDiscount,
                          0) > 0 THEN Sal_Invoice.cashDiscount / (isnull(Sal_Invoice.Total, 0) + isnull(Sal_Invoice.cashDiscount, 0)) * 100 ELSE 0 END) AS PercentDiscount, CustTable.TaxesCard, CustTable.Address, dbo.Sal_Invoice.notes, 
                         dbo.Sal_Invoice.delegateName, dbo.Sal_Invoice.IsFavorite, dbo.Sal_Invoice.CostCenter, dbo.Sal_Invoice.id_shift, dbo.Sal_Invoice.Expense, dbo.Sal_Invoice.TaxValue, dbo.Sal_Invoice.ServiceValue, 
                         dbo.Sal_Invoice.CashName, dbo.Sal_Invoice.IsClose, ISNULL(dbo.Sal_Invoice.DesExpense, 'TakeAway') AS DesExpense, dbo.Sal_Invoice.tables, dbo.Sal_Invoice.DeliveryDate, dbo.Sal_Invoice.CurrencyPrice, 
                         dbo.Sal_Invoice.OtherPrice, dbo.Sal_Invoice.Tax_Ast, ROUND(CONVERT(float, ISNULL(dbo.Sal_Invoice.Total, 0) - ISNULL(dbo.Sal_Invoice.AmountPaid, 0)), 2) AS rest, DATEDIFF(DAY, dbo.Sal_Invoice.pdate, GETDATE()) 
                         AS days, CASE WHEN isnull(sal_Invoice.Tax_Ast, 0) > 0 THEN round(CONVERT(float, (sal_Invoice.Total + sal_Invoice.cashDiscount - sal_Invoice.TotalTax - sal_Invoice.TableTax) / 100) * sal_Invoice.Tax_Ast, 2) 
                         ELSE 0 END AS total_Ast, CASE WHEN ISNULL(Sal_Invoice.total, 0) - ISNULL(Sal_Invoice.profit, 0) = 0 THEN '0' ELSE '%' + LTRIM(RTRIM(STR(CONVERT(decimal(18, 2), (Sal_Invoice.profit / (ISNULL(Sal_Invoice.total, 0) 
                         - ISNULL(Sal_Invoice.profit, 0))) * 100)))) END AS PercentProfit, ROUND(CONVERT(decimal(18, 2), dbo.Sal_Invoice.Total - dbo.Sal_Invoice.Profit), 2) AS cost, (CASE WHEN DATEPART(HOUR, sal_Invoice.pdate) 
                         > 12 THEN CAST((DATEPART(HOUR, Sal_Invoice.pdate) - 12) AS VARCHAR(2)) + ':' + CAST(DATEPART(MINUTE, Sal_Invoice.pdate) AS VARCHAR(2)) + ' U-PM' ELSE CAST(DATEPART(HOUR, Sal_Invoice.pdate) AS VARCHAR(2)) 
                         + ':' + CAST(DATEPART(MINUTE, Sal_Invoice.pdate) AS VARCHAR(2)) + ' U-AM' END) AS Timee, dbo.Sal_Invoice.Transfer
						,  (SELECT        SUM(ISNULL(debt, 0) - ISNULL(credit, 0)) AS balance    FROM            dbo.Tree_Account  WHERE        (id_Account = CustTable.id_account)) AS CustBalance
FROM            dbo.Sal_Invoice INNER JOIN
                         dbo.cust AS CustTable ON dbo.Sal_Invoice.id_cust = CustTable.id_cust INNER JOIN
                         dbo.Z_Stores ON dbo.Sal_Invoice.id_store = dbo.Z_Stores.id
ORDER BY id_pur, dbo.Sal_Invoice.pdate




