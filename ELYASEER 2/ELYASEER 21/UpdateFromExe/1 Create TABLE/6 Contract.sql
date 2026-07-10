
 if OBJECT_ID ('Contract') is null 
 BEGIN
CREATE TABLE [dbo].[Contract](
	[id_Contract] [bigint] NOT NULL,
	[id_cust] [bigint] NOT NULL,
	[DiscountOut] [float] NULL,
	[Discount] [float] NULL,
	[pdate] [date] NULL,
	[ContractName] [nvarchar](100) NULL,
	[Hold] [float] NULL,
	[localMid] [float] NULL,
	[OutMid] [float] NULL,
	[net] [float] NULL,
	[nots] [nvarchar](400) NULL,
	[AddCash] [float] NULL,
 CONSTRAINT [PK_Contract] PRIMARY KEY CLUSTERED 
(
	[id_Contract] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Contract]  WITH CHECK ADD  CONSTRAINT [FK_Contract_Tree] FOREIGN KEY([id_cust])
REFERENCES [dbo].[Tree] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Contract] CHECK CONSTRAINT [FK_Contract_Tree]

END

