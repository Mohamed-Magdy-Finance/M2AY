IF OBJECT_ID (N'ItemListPur', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[ItemListPur](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_order] [bigint] NOT NULL,
	[id_item] [bigint] NULL,
	[id_cust] [bigint] NULL,
	[pdate] [datetime] NULL,
	[notes] [nvarchar](300) NULL,
	[qu] [float] NULL,
	[pr] [float] NULL,
	[unit] [smallint] NULL,
	[Discount] [float] NULL,
 CONSTRAINT [PK_ItemListPur] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[ItemListPur]  WITH CHECK ADD  CONSTRAINT [FK_ItemListPur_cust] FOREIGN KEY([id_cust])
REFERENCES [dbo].[cust] ([id_cust])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[ItemListPur] CHECK CONSTRAINT [FK_ItemListPur_cust]


ALTER TABLE [dbo].[ItemListPur]  WITH CHECK ADD  CONSTRAINT [FK_ItemListPur_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[ItemListPur] CHECK CONSTRAINT [FK_ItemListPur_Item]


ALTER TABLE [dbo].[ItemListPur] ADD  CONSTRAINT [DF_ItemListPur_pdate]  DEFAULT (getdate()) FOR [pdate]


end
