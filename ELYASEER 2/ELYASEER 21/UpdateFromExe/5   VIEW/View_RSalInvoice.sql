
create view View_RSalInvoice
as 
SELECT     TOP (100) PERCENT Rsal_invoice.id_Rsal AS id_pur, Rsal_invoice.pdate, Rsal_invoice.cashDiscount, 
                      CASE WHEN [TypePaied] = 1 THEN 'B-Credit' WHEN [TypePaied] = 2 THEN 'B-Net' ELSE 'B-Cash' END AS TypePaied, round(convert(float,Rsal_invoice.AmountPaid),4)AS AmountPaid, Rsal_invoice.id_bill, 
                      round(convert(float,Rsal_invoice.Total),4)AS Total, Rsal_invoice.user_name, Z_Stores.aname AS Store_Name, CustTable.Aname AS Cust_Name, CONVERT(int, 
                      CASE WHEN isnull(Total,0)+isnull(Rsal_invoice.cashDiscount,0) > 0 THEN Rsal_invoice.cashDiscount / (isnull(Rsal_invoice.Total,0) + isnull(Rsal_invoice.cashDiscount,0)) * 100 ELSE 0 END) AS PercentDiscount, 
                     CustTable.TaxesCard, Rsal_invoice.notes, Rsal_invoice.delegateName, Rsal_invoice.IsFavorite, Rsal_invoice.CostCenter, round(convert(float,RSal_Invoice.Profit),4)AS Profit,Rsal_invoice.id_shift ,Rsal_invoice.CashName, round(convert(float,Rsal_invoice.TotalTax),4)AS TotalTax,
                        (CASE WHEN DATEPART(HOUR, Rsal_Invoice.pdate) > 12 THEN CAST((DATEPART(HOUR,   RSal_Invoice.pdate)-12)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, RSal_Invoice.pdate )AS VARCHAR(2))+ ' U-PM' ELSE CAST(DATEPART(HOUR,   RSal_Invoice.pdate)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, RSal_Invoice.pdate )AS VARCHAR(2))+' U-AM' END) as  Timee
                        ,DATEDIFF (DAY ,Rsal_Invoice.pdate,GETDATE ()) as days
, round(convert(float,(isnull(Rsal_Invoice.Total, 0)-isnull(Rsal_Invoice.AmountPaid, 0))),2)as rest
, round(convert(float,Rsal_invoice.Total-rsal_invoice.TotalTax),4)AS TotalBeforTax
          ,CASE WHEN ISNULL(Rsal_invoice.total,0) - ISNULL(Rsal_invoice.profit,0)=0 THEN '0' ELSE '%'+LTRIM(RTRIM(STR(Convert(decimal(18,2),(Rsal_invoice.profit/(ISNULL(Rsal_invoice.total,0) - ISNULL(Rsal_invoice.profit,0)) )*100))))END as PercentProfit
  ,(SELECT SUM(isnull(Tree_Account.debt,0) - isnull(Tree_Account.credit,0)) AS balance FROM   Tree_Account where  Tree_Account.id_Account=CustTable.id_account ) as CustBalance

FROM         Rsal_invoice INNER JOIN
                      cust as CustTable ON Rsal_invoice.id_cust = CustTable.id_cust INNER JOIN
                      Z_Stores ON Rsal_invoice.id_store = Z_Stores.id
ORDER BY id_pur, Rsal_invoice.pdate