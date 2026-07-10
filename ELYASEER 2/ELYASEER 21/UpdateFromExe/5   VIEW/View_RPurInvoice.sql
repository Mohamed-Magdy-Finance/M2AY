
create view View_RPurInvoice
as 
SELECT     TOP (100) PERCENT RPur_Invoice.id_Rpur AS id_pur, RPur_Invoice.pdate, RPur_Invoice.cashDiscount, 
                      CASE WHEN [TypePaied] = 1 THEN 'B-Credit' WHEN [TypePaied] = 2 THEN 'B-Net' ELSE 'B-Cash' END AS TypePaied, round(convert(float,RPur_Invoice.AmountPaid),4)AS AmountPaid, RPur_Invoice.id_bill, 
                      round(convert(float,RPur_Invoice.Total),4)AS Total, RPur_Invoice.user_name, Z_Stores.aname AS Store_Name, CustTable.Aname AS Cust_Name, CONVERT(int, 
                      CASE WHEN isnull(Total,0) > 0 THEN RPur_Invoice.cashDiscount / (isnull(RPur_Invoice.Total,0) + isnull(RPur_Invoice.cashDiscount,0)) * 100 ELSE 0 END) AS PercentDiscount, round(convert(float,Rpur_invoice.TotalTax),4)AS TotalTax,
                      CustTable.TaxesCard,RPur_Invoice.notes, RPur_Invoice.IsFavorite, RPur_Invoice.CostCenter,RPur_Invoice.id_shift
					  	,	    round(convert(float,RPur_Invoice.Total-RPur_Invoice.TotalTax),4)AS TotalBeforTax
                     ,     (CASE WHEN DATEPART(HOUR, Rpur_Invoice.pdate) > 12 THEN CAST((DATEPART(HOUR,   Rpur_Invoice.pdate)-12)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, Rpur_Invoice.pdate )AS VARCHAR(2))+ ' U-PM' ELSE CAST(DATEPART(HOUR,   Rpur_Invoice.pdate)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, Rpur_Invoice.pdate )AS VARCHAR(2))+' U-AM' END) as  Timee
, round(convert(float,(isnull(Rpur_Invoice.Total, 0)-isnull(Rpur_Invoice.AmountPaid, 0))),2)as rest
    ,DATEDIFF (DAY ,RPur_Invoice.pdate,GETDATE ()) as days
	 ,(SELECT SUM(isnull(Tree_Account.debt,0) - isnull(Tree_Account.credit,0)) AS balance FROM   Tree_Account where  Tree_Account.id_Account=CustTable.id_account ) as CustBalance

FROM         RPur_Invoice INNER JOIN
                      cust as CustTable  ON RPur_Invoice.id_cust = CustTable.id_cust INNER JOIN
                      Z_Stores ON RPur_Invoice.id_store = Z_Stores.id
ORDER BY id_pur, RPur_Invoice.pdate