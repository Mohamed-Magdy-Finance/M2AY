IF OBJECT_ID (N'Talbia_Invoice', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[Talbia_Invoice](
	[id_Talbia] [bigint] NOT NULL,
	[id_store] [bigint] NULL,
	[id_cust] [bigint] NOT NULL,
	[pdate] [datetime] NULL,
	[cashDiscount] [decimal](18, 2) NOT NULL,
	[Total] [decimal](18, 3) NOT NULL,
	[user_name] [nvarchar](50) NULL,
 CONSTRAINT [PK_Talbia_Invoice_1] PRIMARY KEY CLUSTERED 
(
	[id_Talbia] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Talbia_Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Talbia_Invoice_cust] FOREIGN KEY([id_cust])
REFERENCES [dbo].[cust] ([id_cust])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Talbia_Invoice] CHECK CONSTRAINT [FK_Talbia_Invoice_cust]


ALTER TABLE [dbo].[Talbia_Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Talbia_Invoice_Z_Stores] FOREIGN KEY([id_store])
REFERENCES [dbo].[Z_Stores] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Talbia_Invoice] CHECK CONSTRAINT [FK_Talbia_Invoice_Z_Stores]


ALTER TABLE [dbo].[Talbia_Invoice] ADD  CONSTRAINT [DF_Talbia_Invoice_Total]  DEFAULT ((0)) FOR [Total]

END
