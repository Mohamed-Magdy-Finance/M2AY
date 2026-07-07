create view View_Ekhtar_Order
as 
SELECT        TOP (100) PERCENT dbo.EkhtarOrder.id, dbo.EkhtarOrder.id_Ekhtar, dbo.EkhtarOrder.id_number, dbo.EkhtarOrder.id_order, dbo.EkhtarOrder.SchoolName, dbo.EkhtarOrder.SchoolAddress, dbo.EkhtarOrder.date_Recive, 
                         dbo.EkhtarOrder.QuOrder, dbo.EkhtarOrder.tamweel, dbo.EkhtarOrder.Date_Begin, dbo.Item.ARname, dbo.EkhtarOrder.Education,
                             (SELECT        MAX(pr_main) AS Expr1
                                FROM            dbo.Ekhtar_details
                                WHERE        (id_Ekhtar = dbo.EkhtarOrder.id_Ekhtar) AND (id_item = dbo.EkhtarOrder.id_item) AND (qu_main > 0)) AS pr
FROM            dbo.EkhtarOrder INNER JOIN
                         dbo.Item ON dbo.EkhtarOrder.id_item = dbo.Item.id_item
ORDER BY dbo.EkhtarOrder.date_Recive