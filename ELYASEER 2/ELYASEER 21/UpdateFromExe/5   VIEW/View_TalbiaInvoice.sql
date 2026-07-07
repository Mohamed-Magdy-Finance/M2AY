
create view View_TalbiaInvoice
as 
SELECT     TOP (100) PERCENT Talbia_Invoice.id_Talbia AS id_pur, Talbia_Invoice.pdate, Talbia_Invoice.cashDiscount, 
          
                      round(convert(float,Talbia_Invoice.Total),4)AS Total, Talbia_Invoice.user_name, Z_Stores.aname AS Store_Name, CustTable.Aname AS Cust_Name, CONVERT(int, 
                      CASE WHEN isnull(Total,0) > 0 THEN Talbia_Invoice.cashDiscount / (isnull(Talbia_Invoice.Total,0) + isnull(Talbia_Invoice.cashDiscount,0)) * 100 ELSE 0 END) AS PercentDiscount, 
            
                         (CASE WHEN DATEPART(HOUR, Talbia_Invoice.pdate) > 12 THEN CAST((DATEPART(HOUR,   Talbia_Invoice.pdate)-12)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, Talbia_Invoice.pdate )AS VARCHAR(2))+ ' U-PM' ELSE CAST(DATEPART(HOUR,   Talbia_Invoice.pdate)AS VARCHAR(2))   + ':'+CAST(DATEPART(MINUTE, Talbia_Invoice.pdate )AS VARCHAR(2))+' U-AM' END) as  Timee
 ,(SELECT SUM(isnull(Tree_Account.debt,0) - isnull(Tree_Account.credit,0)) AS balance FROM   Tree_Account where  Tree_Account.id_Account=CustTable.id_account ) as CustBalance

FROM         Talbia_Invoice INNER JOIN
                      cust as CustTable ON Talbia_Invoice.id_cust = CustTable.id_cust INNER JOIN
                      Z_Stores ON Talbia_Invoice.id_store = Z_Stores.id
ORDER BY id_pur, Talbia_Invoice.pdate