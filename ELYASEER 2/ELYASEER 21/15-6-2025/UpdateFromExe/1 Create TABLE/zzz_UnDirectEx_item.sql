IF OBJECT_ID (N'zzz_UnDirectEx_item', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[zzz_UnDirectEx_item](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_item] [bigint] NOT NULL,
	[CostUnDirectEx] [nvarchar](150) NULL,
	[aname] [nvarchar](150) NULL,
	[id_step] [bigint] NULL,
 CONSTRAINT [PK_zzz_UnDirectEx_item] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[zzz_UnDirectEx_item]  WITH CHECK ADD  CONSTRAINT [FK_zzz_UnDirectEx_item_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_UnDirectEx_item] CHECK CONSTRAINT [FK_zzz_UnDirectEx_item_Item]
end


