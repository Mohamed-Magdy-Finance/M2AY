
IF OBJECT_ID (N'Essential', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[Essential](
	[autoi_d] [bigint] IDENTITY(1,1) NOT NULL,
	[id] [bigint] NOT NULL,
	[serial] [nvarchar](100) NULL,
	[locationn] [nvarchar](150) NULL,
	[company] [nvarchar](150) NULL,
	[GroupCost] [real] NULL,
	[EndCost] [real] NULL,
	[Age] [real] NULL,
	[ShotPercent] [real] NULL,
	[installment] [real] NULL,
	[DateBegin] [date] NULL,
	[pic] [nvarchar](300) NULL,
	[pic_pur] [nvarchar](300) NULL,
	[CostRule] [int] NULL,
	[CostAge] [int] NULL,
	[nots] [nvarchar](max) NULL,
 CONSTRAINT [PK_Essential] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Essential]  WITH CHECK ADD  CONSTRAINT [FK_Essential_Tree] FOREIGN KEY([id])
REFERENCES [dbo].[Tree] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Essential] CHECK CONSTRAINT [FK_Essential_Tree]
END


