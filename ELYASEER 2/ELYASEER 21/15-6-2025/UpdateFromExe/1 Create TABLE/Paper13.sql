IF OBJECT_ID (N'Paper13', N'U') IS  NULL 
BEGIN
CREATE TABLE [dbo].[Paper13](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_constraint] [bigint] NOT NULL,
	[id_Paper13] [bigint] NULL,
	[PaperNumper] [nvarchar](80) NULL,
	[PaperType] [int] NULL,
	[DatePaid] [date] NULL,
	[pdate] [date] NULL,
	[id_debt] [bigint] NULL,
	[id_credit] [bigint] NULL,
	[debt] [float] NULL,
	[credit] [float] NULL,
	[paied] [float] NULL,
	[NotBookNumber] [nvarchar](120) NULL,
	[Combiala] [int] NULL,
	[ConvertTo] [nvarchar](120) NULL,
	[MainDebt] [nvarchar](150) NULL,
	[DateOut] [date] NULL,
	[IsBegin] [bit] NULL,
	[CostCenter] [nvarchar](250) NULL,
	[debt_name] [nvarchar](250) NULL,
	[credit_name] [nvarchar](250) NULL,
	[total] [float] NULL,
	[des] [nvarchar](500) NULL,
	[user_name] [nvarchar](60) NULL,
 CONSTRAINT [PK_Paper13] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Paper13]  WITH CHECK ADD  CONSTRAINT [FK_Paper13_constraint_invoice] FOREIGN KEY([id_constraint])
REFERENCES [dbo].[constraint_invoice] ([id_constraint])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Paper13] CHECK CONSTRAINT [FK_Paper13_constraint_invoice]


ALTER TABLE [dbo].[Paper13]  WITH CHECK ADD  CONSTRAINT [FK_Paper13_Tree] FOREIGN KEY([id_debt])
REFERENCES [dbo].[Tree] ([id])


ALTER TABLE [dbo].[Paper13] CHECK CONSTRAINT [FK_Paper13_Tree]


ALTER TABLE [dbo].[Paper13]  WITH CHECK ADD  CONSTRAINT [FK_Paper13_Tree1] FOREIGN KEY([id_credit])
REFERENCES [dbo].[Tree] ([id])


ALTER TABLE [dbo].[Paper13] CHECK CONSTRAINT [FK_Paper13_Tree1]




end

