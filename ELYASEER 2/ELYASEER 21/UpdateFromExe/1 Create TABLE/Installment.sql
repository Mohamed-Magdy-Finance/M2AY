IF OBJECT_ID (N'Installment', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[Installment](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_cust] [bigint] NULL,
	[DateMerit] [date] NULL,
	[debt] [float] NULL,

 CONSTRAINT [PK_Installment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Installment]  WITH CHECK ADD  CONSTRAINT [FK_Installment_cust] FOREIGN KEY([id_cust])
REFERENCES [dbo].[cust] ([id_cust])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Installment] CHECK CONSTRAINT [FK_Installment_cust]


end
