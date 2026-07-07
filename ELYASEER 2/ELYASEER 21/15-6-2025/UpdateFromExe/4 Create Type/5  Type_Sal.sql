CREATE TYPE [dbo].[Type_Sal] AS TABLE(
    [id] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[unit] [smallint] NULL,
	[qu] [decimal](18, 4) NULL,
	[bones] [decimal](18, 4) NULL,
	[QuSend] [decimal](18, 4) NULL,
	[pr] [decimal](18, 4) NULL,	
	[Discount] [decimal](18, 4) NULL,
	[total_item] [decimal](18, 4) NULL,
	[out_big] [float] NULL,	
	[out_Middel] [float] NULL,
	[out_Small] [float] NULL,
	[LOT] [nvarchar](80) NULL,
	[RongExpire] [bit] NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[date_expire] [date] NULL,
	[StoreNameDetails] [nvarchar](180) NULL,
	[CostByDate] [float] NULL,
	[tax] [int] NULL,
	[c_count] [float] NULL,
	[des] [nvarchar](300) NULL
)



