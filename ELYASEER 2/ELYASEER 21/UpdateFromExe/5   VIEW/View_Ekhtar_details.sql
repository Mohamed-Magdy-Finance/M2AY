create view View_Ekhtar_details
as 
SELECT        dbo.Ekhtar_details.id, dbo.Ekhtar_details.id_Ekhtar, dbo.Ekhtar_details.code, dbo.Item.ARname, dbo.Ekhtar_details.qu_main, dbo.Ekhtar_details.pr_main, dbo.Ekhtar_details.qu_main * dbo.Ekhtar_details.pr_main AS total_main, 
                         dbo.Ekhtar_details.qu_Add, dbo.Ekhtar_details.date_Add
FROM            dbo.Ekhtar_details INNER JOIN
                         dbo.Item ON dbo.Ekhtar_details.id_item = dbo.Item.id_item