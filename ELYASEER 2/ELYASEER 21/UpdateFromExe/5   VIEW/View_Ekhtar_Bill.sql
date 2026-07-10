create view View_Ekhtar_Bill
as 
SELECT        TOP (100) PERCENT dbo.EkhtarBill.id, dbo.EkhtarBill.id_Ekhtar, dbo.EkhtarBill.id_order, dbo.EkhtarBill.id_number, dbo.EkhtarBill.SchoolName, dbo.EkhtarBill.SchoolAddress, dbo.EkhtarBill.date_Bill, dbo.EkhtarBill.QuBill, 
                         dbo.EkhtarBill.id_Bill, dbo.EkhtarBill.tamweel, dbo.Item.ARname, dbo.EkhtarBill.Education,
                             (SELECT        MAX(pr_main) AS Expr1
                                FROM            dbo.Ekhtar_details
                                WHERE        (id_Ekhtar = dbo.EkhtarBill.id_Ekhtar) AND (id_item = dbo.EkhtarBill.id_item) AND (qu_main > 0)) AS pr, dbo.EkhtarBill.QuSend, dbo.EkhtarBill.date_Send
FROM            dbo.EkhtarBill INNER JOIN
                         dbo.Item ON dbo.EkhtarBill.id_item = dbo.Item.id_item
ORDER BY dbo.EkhtarBill.date_Bill