IF OBJECT_ID (N'EkhtarOrder', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[EkhtarOrder](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_Ekhtar] [bigint] NOT NULL,
	[id_order] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[SchoolName] [nvarchar](250) NULL,
	[SchoolAddress] [nvarchar](250) NULL,
	[Date_Begin] [date] NULL,
	[date_Recive] [date] NULL,
	[QuOrder] [float] NULL,
	[tamweel] [nvarchar](50) NULL,
	[id_number] [nvarchar](250) NULL,
	[Education] [nvarchar](150) NULL,
 CONSTRAINT [PK_EkhtarOrder] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)
--WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[EkhtarOrder]  WITH CHECK ADD  CONSTRAINT [FK_EkhtarOrder_Ekhtar_invoice] FOREIGN KEY([id_Ekhtar])
REFERENCES [dbo].[Ekhtar_invoice] ([id_Ekhtar])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[EkhtarOrder] CHECK CONSTRAINT [FK_EkhtarOrder_Ekhtar_invoice]


ALTER TABLE [dbo].[EkhtarOrder]  WITH CHECK ADD  CONSTRAINT [FK_EkhtarOrder_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE


ALTER TABLE [dbo].[EkhtarOrder] CHECK CONSTRAINT [FK_EkhtarOrder_Item]
END



