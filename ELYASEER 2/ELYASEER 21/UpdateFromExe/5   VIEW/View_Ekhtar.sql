create view View_Ekhtar
as 
SELECT        dbo.Ekhtar_invoice.id_Ekhtar, dbo.cust.Aname AS CustName, dbo.Ekhtar_invoice.date_Begin, dbo.Ekhtar_invoice.Ekhtar_num, dbo.Ekhtar_invoice.nots, dbo.Ekhtar_invoice.momarsa
FROM            dbo.Ekhtar_invoice INNER JOIN
                         dbo.cust ON dbo.Ekhtar_invoice.id_cust = dbo.cust.id_cust