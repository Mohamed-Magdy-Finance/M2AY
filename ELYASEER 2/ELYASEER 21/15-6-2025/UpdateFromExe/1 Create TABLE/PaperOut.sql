IF OBJECT_ID (N'PaperOut', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[PaperOut](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_constraint] [bigint] NOT NULL,
	[id_PaperOut] [bigint] NULL,
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
	[DateOut] [date] NULL,
 CONSTRAINT [PK_PaperOut] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[PaperOut]  WITH CHECK ADD  CONSTRAINT [FK_PaperOut_constraint_invoice] FOREIGN KEY([id_constraint])
REFERENCES [dbo].[constraint_invoice] ([id_constraint])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[PaperOut] CHECK CONSTRAINT [FK_PaperOut_constraint_invoice]


ALTER TABLE [dbo].[PaperOut]  WITH CHECK ADD  CONSTRAINT [FK_PaperOut_Tree] FOREIGN KEY([id_debt])
REFERENCES [dbo].[Tree] ([id])


ALTER TABLE [dbo].[PaperOut] CHECK CONSTRAINT [FK_PaperOut_Tree]


ALTER TABLE [dbo].[PaperOut]  WITH CHECK ADD  CONSTRAINT [FK_PaperOut_Tree1] FOREIGN KEY([id_credit])
REFERENCES [dbo].[Tree] ([id])


ALTER TABLE [dbo].[PaperOut] CHECK CONSTRAINT [FK_PaperOut_Tree1]

end

