IF OBJECT_ID (N'Talbia_Details', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[Talbia_Details](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_Talbia] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[unit] [smallint] NOT NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[LOT] [nvarchar](150) NULL,
	[tax] [decimal](18, 2) NULL,
	[total_item] [decimal](18, 2) NOT NULL,
	[PricePharmacist] [float] NULL,
 CONSTRAINT [PK_Talbia_Details] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Talbia_Details]  WITH CHECK ADD  CONSTRAINT [FK_Talbia_Details_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Talbia_Details] CHECK CONSTRAINT [FK_Talbia_Details_Item]







ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Table_1_id_pur_2]  DEFAULT ((0)) FOR [id_Talbia]


ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Talbia_Details_unit]  DEFAULT ((0)) FOR [unit]


ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Talbia_Details_qu]  DEFAULT ((0)) FOR [qu]


ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Talbia_Details_bones]  DEFAULT ((0)) FOR [bones]


ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Talbia_Details_pr]  DEFAULT ((0)) FOR [pr]


ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Talbia_Details_Discount]  DEFAULT ((0)) FOR [Discount]


ALTER TABLE [dbo].[Talbia_Details] ADD  CONSTRAINT [DF_Talbia_Details_total_item]  DEFAULT ((0)) FOR [total_item]

end

