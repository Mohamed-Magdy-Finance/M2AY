
IF OBJECT_ID (N'AccountDeleted', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[AccountDeleted](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[CustName] [nvarchar](120) NULL,
	[pdate] [nvarchar](50) NULL,
	[des] [nvarchar](100) NULL,
	[debt] [decimal](18, 2) NULL,
	[credit] [decimal](18, 2) NULL,
	[Timee] [datetime] NULL,
 CONSTRAINT [PK_AccountDeleted] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[AccountDeleted] ADD  CONSTRAINT [DF_AccountDeleted_debt]  DEFAULT ((0)) FOR [debt]


ALTER TABLE [dbo].[AccountDeleted] ADD  CONSTRAINT [DF_AccountDeleted_credit]  DEFAULT ((0)) FOR [credit]


ALTER TABLE [dbo].[AccountDeleted] ADD  CONSTRAINT [DF_AccountDeleted_Timee]  DEFAULT (getdate()) FOR [Timee]

end

