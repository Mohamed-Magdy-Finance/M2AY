
create view View_PurInvoice
as 
SELECT     TOP (100) PERCENT Pur_Invoice.id_pur, Pur_Invoice.pdate,Pur_Invoice.TalbiaNum, Pur_Invoice.cashDiscount, 
                      CASE WHEN [TypePaied] = 1 THEN 'B-Credit' WHEN [TypePaied] = 2 THEN 'B-Net' ELSE 'B-Cash' END AS TypePaied, round(convert(float,Pur_Invoice.AmountPaid ),4)AS AmountPaid , Pur_Invoice.id_bill,  Pur_Invoice.delegateName,
                      round(convert(float,Pur_Invoice.Total),4)AS Total, Pur_Invoice.user_name, Z_Stores.aname AS Store_Name, CustTable.Aname AS Cust_Name,CustTable.Email,CustTable.Address,CustTable.CustTypeAst,
					  CONVERT(int, CASE WHEN isnull(Total,0)+ isnull(Pur_Invoice.cashDiscount,0) > 0 THEN Pur_Invoice.cashDiscount / (isnull(Pur_Invoice.Total,0) + isnull(Pur_Invoice.cashDiscount,0)) * 100 ELSE 0 END) AS PercentDiscount, 
                    CustTable.TaxesCard, Pur_Invoice.DisName,  Pur_Invoice.notes, Pur_Invoice.IsFavorite, Pur_Invoice.CostCenter, Pur_Invoice.TypePaied AS TypePaied1, Pur_Invoice.CashName,Pur_Invoice.id_shift ,
                       round(convert(float,Pur_Invoice.Transfer),4)AS Transfer,round(convert(float,Pur_Invoice.commission),4)AS commission,
 round(convert(float,Pur_Invoice.Total+pur_Invoice.cashDiscount-Pur_Invoice.TotalTax),4)   as TotalBeforTax,
                     round(convert(float,Pur_Invoice.commission*Pur_Invoice.Total/100),4)AS TotalCommision,round(convert(float,pur_invoice.TotalTax),4)AS TotalTax,
                       DATEDIFF (DAY ,pur_Invoice.pdate,GETDATE ()) as days
                       ,pur_Invoice.PurName,pur_Invoice.Tax_Ast
                        ,case when isnull(pur_Invoice.Tax_Ast,0)>0 then round(convert(float,(pur_Invoice.Total +pur_Invoice.cashDiscount -pur_Invoice.TotalTax)/100),2) else 0 end  as total_Ast
                       , Pur_Invoice.IsClose,Pur_Invoice.CurrencyPrice
   , (CASE WHEN DATEPART(HOUR, pur_Invoice.pdate) > 12 THEN CAST((DATEPART(HOUR,   pur_Invoice.pdate)-12)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, pur_Invoice.pdate )AS VARCHAR(2))+ ' U-PM' ELSE CAST(DATEPART(HOUR,   pur_Invoice.pdate)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, pur_Invoice.pdate )AS VARCHAR(2))+' U-AM' END) as  Timee
, round(convert(float,(isnull(pur_Invoice.Total, 0)-isnull(pur_Invoice.AmountPaid, 0))),2)as rest
 ,(SELECT SUM(isnull(Tree_Account.debt,0) - isnull(Tree_Account.credit,0)) AS balance FROM   Tree_Account where  Tree_Account.id_Account=CustTable.id_account ) as CustBalance

FROM         Pur_Invoice INNER JOIN
                      cust as CustTable ON Pur_Invoice.id_cust = CustTable.id_cust INNER JOIN
                      Z_Stores ON Pur_Invoice.id_store = Z_Stores.id
ORDER BY Pur_Invoice.id_pur,Pur_Invoice.pdate