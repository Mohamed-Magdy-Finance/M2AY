IF OBJECT_ID (N'Ekhtar_details', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[Ekhtar_details](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_item] [bigint] NULL,
	[id_Ekhtar] [bigint] NOT NULL,
	[code] [nvarchar](550) NULL,
	[qu_main] [int] NULL,
	[pr_main] [int] NULL,
	[qu_Add] [int] NULL,
	[date_Add] [date] NULL,
 CONSTRAINT [PK_Ekhtar_details] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)
--WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Ekhtar_details]  WITH CHECK ADD  CONSTRAINT [FK_Ekhtar_details_Ekhtar_invoice] FOREIGN KEY([id_Ekhtar])
REFERENCES [dbo].[Ekhtar_invoice] ([id_Ekhtar])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Ekhtar_details] CHECK CONSTRAINT [FK_Ekhtar_details_Ekhtar_invoice]


ALTER TABLE [dbo].[Ekhtar_details]  WITH CHECK ADD  CONSTRAINT [FK_Ekhtar_details_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE


ALTER TABLE [dbo].[Ekhtar_details] CHECK CONSTRAINT [FK_Ekhtar_details_Item]
END



