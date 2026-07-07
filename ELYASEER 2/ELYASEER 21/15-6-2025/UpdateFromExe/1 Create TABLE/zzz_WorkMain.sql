IF OBJECT_ID (N'zzz_WorkMain', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[zzz_WorkMain](
	[id_work] [bigint] NOT NULL,
	[WorkNum] [nvarchar](150) NULL,
	[id_step] [bigint] NOT NULL,
	[pdate] [datetime] NULL,
	[CustName] [nvarchar](150) NULL,
	[VenName] [nvarchar](150) NULL,
	[StoreComplete] [nvarchar](150) NULL,
	[status] [int] NULL,
 CONSTRAINT [PK_zzz_WorkMain] PRIMARY KEY CLUSTERED 
(
	[id_work] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

END


