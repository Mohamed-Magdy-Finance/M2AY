IF OBJECT_ID (N'itemLastExpire', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[itemLastExpire](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_item] [bigint] NOT NULL,
	[pdate] [date] NULL,
	[mm] [int] NULL,
	[yy] [int] NULL,
	[come_big] [float] NULL,
	[come_Middel] [float] NULL,
	[come_Small] [float] NULL,
)


ALTER TABLE [dbo].[itemLastExpire]  WITH CHECK ADD  CONSTRAINT [FK_ItemLastExpire_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[itemLastExpire] CHECK CONSTRAINT [FK_ItemLastExpire_Item]
end


