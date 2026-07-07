IF OBJECT_ID (N'sal_temp', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[sal_temp](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_sal] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[unit] [smallint] NOT NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [decimal](18, 3) NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[total_item] [decimal](18, 3) NULL,
	[expire_date] [date] NULL,
	[profit] [decimal](18, 2) NULL,
	[LOT] [nvarchar](150) NULL,
	[RongExpire] [bit] NULL,
	[id_store] [bigint] NULL,
	[tax] [int] NULL,
 CONSTRAINT [PK_sal_temp_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

end


