IF OBJECT_ID (N'item_OtherPrice', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[item_OtherPrice](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_item] [bigint] NULL,
	[price] [float] NULL,
	[aname] [nvarchar](100) NULL,
 CONSTRAINT [PK_item_OtherPrice] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[item_OtherPrice]  WITH CHECK ADD  CONSTRAINT [FK_item_OtherPrice_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[item_OtherPrice] CHECK CONSTRAINT [FK_item_OtherPrice_Item]


END
