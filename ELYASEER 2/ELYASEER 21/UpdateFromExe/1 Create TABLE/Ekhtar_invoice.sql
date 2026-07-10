IF OBJECT_ID (N'Ekhtar_invoice', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[Ekhtar_invoice](
	[id_Ekhtar] [bigint] NOT NULL,
	[id_cust] [bigint] NULL,
	[date_Begin] [date] NULL,
	[Ekhtar_num] [bigint] NULL,
	[nots] [nvarchar](max) NULL,
	[momarsa] [nvarchar](50) NULL,
 CONSTRAINT [PK_Ekhtar] PRIMARY KEY CLUSTERED 
(
	[id_Ekhtar] ASC
)
--WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [dbo].[Ekhtar_invoice]  WITH CHECK ADD  CONSTRAINT [FK_Ekhtar_invoice_cust1] FOREIGN KEY([id_cust])
REFERENCES [dbo].[cust] ([id_cust])
ON UPDATE CASCADE


ALTER TABLE [dbo].[Ekhtar_invoice] CHECK CONSTRAINT [FK_Ekhtar_invoice_cust1]
END



