

CREATE proc [dbo].[SetBeginTreeWithDate]
@PDATE DATE
as


Delete from dbo.MyProduct  
dbcc checkident(MyProduct,reseed,0)

delete from  dbo.Delivery_box
dbcc checkident(Delivery_box,reseed,0)

delete from dbo.JopTime
dbcc checkident(JopTime,reseed,0)

delete from dbo.serial
dbcc checkident(serial,reseed,0)

delete from dbo.Sizee
dbcc checkident(Sizee,reseed,0)

delete from Sal_Deleted
dbcc checkident(Sal_Deleted,reseed,0)

delete from  item_Request
dbcc checkident(item_Request,reseed,0)
delete from  dbo.item_Requ
dbcc checkident(item_Requ,reseed,0)
delete from PurTransfer
dbcc checkident([PurTransfer],reseed,0)
delete from Pur_Invoice where convert(date,Pdate)< @PDATE
delete from RPur_Invoice where convert(date,Pdate)< @PDATE

delete from Sal_Invoice where convert(date,Pdate)< @PDATE
delete from RSal_Invoice where convert(date,Pdate)< @PDATE

delete from dbo.ItemAmortization_invoice where convert(date,Pdate)< @PDATE

delete from dbo.ItemMaking_Invoice  where convert(date,Pdate)< @PDATE

delete from dbo.store_Invoice where convert(date,Pdate)< @PDATE

delete from Item_store  where convert(date,Pdate)< @PDATE
