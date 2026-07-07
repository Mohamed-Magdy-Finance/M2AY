IF OBJECT_ID (N'TableSetting', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[TableSetting](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ShowTable] [bit] NULL,
	[CountOfTable] [int] NULL,
	[HightItemFrame] [int] NULL,
	[HighTableFrame] [int] NULL,
	[AutoPrint] [bit] NULL,
	[Printer1] [nvarchar](120) NULL,
	[Printer2] [nvarchar](120) NULL,
	[Printer3] [nvarchar](120) NULL,
	[ServiceValue] [decimal](18, 2) NULL,
	[TaxValue] [decimal](18, 2) NULL,
	[Expense] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TableSetting] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

end


