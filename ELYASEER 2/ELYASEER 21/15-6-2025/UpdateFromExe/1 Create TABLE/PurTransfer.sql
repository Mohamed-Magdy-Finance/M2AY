
 if OBJECT_ID ('PurTransfer') is null 
begin
CREATE TABLE [dbo].[PurTransfer](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_constraint] [bigint] NULL,
	[id_pur] [bigint] NULL,
	[CustomsNo] [nvarchar](50) NULL,
	[Expenses_Inside] [int] NULL,
	[pdate] [datetime] NULL,
	[mony] [float] NULL,
	[CostCenter] [nvarchar](350) NULL,
	[CurrencyPrice] [float] NULL,
	[debt_name] [nvarchar](350) NULL,
	[credit_name] [nvarchar](350) NULL,
	[des] [nvarchar](550) NULL,
	[Expenses_Inside1] [float] NULL,
	[Expenses_Inside2] [float] NULL,
	[Expenses_Inside3] [float] NULL,
	[Expenses_Inside4] [float] NULL,
	[Expenses_Inside5] [float] NULL,
	[Expenses_Inside6] [float] NULL,
	[Expenses_Inside7] [float] NULL,
	[Expenses_Inside8] [float] NULL,
	[Expenses_Inside9] [float] NULL,
	[tax] [float] NULL,
	[ast] [float] NULL,
	[IsGood] [int] NULL,
 CONSTRAINT [PK_PurTransfer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[PurTransfer]  WITH CHECK ADD  CONSTRAINT [FK_PurTransfer_Pur_Invoice1] FOREIGN KEY([id_pur])
REFERENCES [dbo].[Pur_Invoice] ([id_pur])
ON UPDATE CASCADE


ALTER TABLE [dbo].[PurTransfer] CHECK CONSTRAINT [FK_PurTransfer_Pur_Invoice1]




end



