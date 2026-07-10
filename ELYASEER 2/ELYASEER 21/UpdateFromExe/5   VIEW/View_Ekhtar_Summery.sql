create view View_Ekhtar_Summery
as 
SELECT        dbo.Item.id_item, Ekhtar_details.id_Ekhtar, Ekhtar_details.code, dbo.Item.ARname, Ekhtar_details.pr_main,
                             (SELECT        SUM(qu_main) AS Expr1
                                FROM            dbo.Ekhtar_details AS Ekhtar_details_1
                                WHERE        (id_Ekhtar = Ekhtar_details.id_Ekhtar) AND (id_item = dbo.Item.id_item)) AS qu_main,
                             (SELECT        SUM(qu_Add) AS Expr1
                                FROM            dbo.Ekhtar_details AS Ekhtar_details_2
                                WHERE        (id_Ekhtar = Ekhtar_details.id_Ekhtar) AND (id_item = dbo.Item.id_item)) AS Total_qu_Add,
                             (SELECT        SUM(QuOrder) AS Expr1
                                FROM            dbo.EkhtarOrder AS EkhtarOrder_2
                                WHERE        (id_Ekhtar = Ekhtar_details.id_Ekhtar) AND (id_item = dbo.Item.id_item)) AS TotalQuOrder,
                             (SELECT        SUM(QuSend) AS Expr1
                                FROM            dbo.EkhtarSend AS EkhtarSend_1
                                WHERE        (id_Ekhtar = Ekhtar_details.id_Ekhtar) AND (id_item = dbo.Item.id_item)) AS TotalQuSend,
                             (SELECT        SUM(QuBill) AS Expr1
                                FROM            dbo.EkhtarBill
                                WHERE        (id_Ekhtar = Ekhtar_details.id_Ekhtar) AND (id_item = dbo.Item.id_item)) AS Total_qu_Bill
FROM            dbo.Ekhtar_details AS Ekhtar_details INNER JOIN
                         dbo.Item ON Ekhtar_details.id_item = dbo.Item.id_item LEFT OUTER JOIN
                         dbo.EkhtarBill AS EkhtarBill_1 ON dbo.Item.id_item = EkhtarBill_1.id_item LEFT OUTER JOIN
                         dbo.EkhtarOrder AS EkhtarOrder ON dbo.Item.id_item = EkhtarOrder.id_item LEFT OUTER JOIN
                         dbo.EkhtarSend AS EkhtarSend ON dbo.Item.id_item = EkhtarSend.id_item
GROUP BY dbo.Item.id_item, Ekhtar_details.id_Ekhtar, Ekhtar_details.code, dbo.Item.ARname, Ekhtar_details.pr_main