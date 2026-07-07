
IF OBJECT_ID (N'ItemListPrice', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[ItemListPrice](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_order] [bigint] NOT NULL,
	[id_item] [bigint] NULL,
	[id_cust] [bigint] NULL,
	[pdate] [datetime] NULL,
	[notes] [nvarchar](300) NULL,
	[qu] [float] NULL,
	[pr] [float] NULL,
	[unit] [smallint] NULL,
 CONSTRAINT [PK_ItemListPrice] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[ItemListPrice]  WITH CHECK ADD  CONSTRAINT [FK_ItemListPrice_cust] FOREIGN KEY([id_cust])
REFERENCES [dbo].[cust] ([id_cust])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[ItemListPrice] CHECK CONSTRAINT [FK_ItemListPrice_cust]


ALTER TABLE [dbo].[ItemListPrice]  WITH CHECK ADD  CONSTRAINT [FK_ItemListPrice_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[ItemListPrice] CHECK CONSTRAINT [FK_ItemListPrice_Item]


ALTER TABLE [dbo].[ItemListPrice] ADD  CONSTRAINT [DF_ItemListPrice_pdate]  DEFAULT (getdate()) FOR [pdate]
END


