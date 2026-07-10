
 if OBJECT_ID ('NewInstallment') is null 
 BEGIN
CREATE TABLE [dbo].[NewInstallment](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_cust] [bigint] NOT NULL,
	[DateMerit] [date] NULL,
	[debt] [float] NULL,
	[credit] [float] NULL,
	[payed] [decimal](18, 0) NULL,
 CONSTRAINT [PK_NewInstallment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[NewInstallment]  WITH CHECK ADD  CONSTRAINT [FK_NewInstallment_cust] FOREIGN KEY([id_cust])
REFERENCES [dbo].[cust] ([id_cust])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[NewInstallment] CHECK CONSTRAINT [FK_NewInstallment_cust]

END

