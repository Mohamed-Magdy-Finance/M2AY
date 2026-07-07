create view View_Ekhtar_Send
as 
SELECT        TOP (100) PERCENT dbo.EkhtarSend.id, dbo.EkhtarSend.id_Ekhtar, dbo.EkhtarSend.id_order, dbo.EkhtarSend.id_number, dbo.EkhtarSend.SchoolName, dbo.EkhtarSend.SchoolAddress, dbo.EkhtarSend.date_Send, 
                         dbo.EkhtarSend.QuSend, dbo.EkhtarSend.tamweel, dbo.Item.ARname, dbo.EkhtarSend.date_Recive, dbo.EkhtarSend.Education,
                             (SELECT        MAX(pr_main) AS Expr1
                                FROM            dbo.Ekhtar_details
                                WHERE        (id_Ekhtar = dbo.EkhtarSend.id_Ekhtar) AND (id_item = dbo.EkhtarSend.id_item) AND (qu_main > 0)) AS pr
FROM            dbo.EkhtarSend INNER JOIN
                         dbo.Item ON dbo.EkhtarSend.id_item = dbo.Item.id_item
ORDER BY dbo.EkhtarSend.date_Send