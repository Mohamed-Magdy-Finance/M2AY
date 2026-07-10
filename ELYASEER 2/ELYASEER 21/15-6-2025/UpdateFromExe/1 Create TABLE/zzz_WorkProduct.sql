IF OBJECT_ID (N'zzz_WorkProduct', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[zzz_WorkProduct](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_work] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[qu] [float] NULL,
	[TotalCost] [float] NULL,
 CONSTRAINT [PK_zzz_itemWork] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[zzz_WorkProduct]  WITH CHECK ADD  CONSTRAINT [FK_zzz_Workitem_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_WorkProduct] CHECK CONSTRAINT [FK_zzz_Workitem_Item]
END


