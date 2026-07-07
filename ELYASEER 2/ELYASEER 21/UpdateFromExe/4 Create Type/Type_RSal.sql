
CREATE TYPE [dbo].[Type_RSal] AS TABLE(
	[id_item] [bigint] NOT NULL,
	[unit] [tinyint] NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [float] NOT NULL,
	[Discount] [float] NOT NULL,
	[total_item] [float] NOT NULL,
	[come_big] [float] NOT NULL,
	[come_Middel] [float] NOT NULL,
	[come_Small] [float] NOT NULL,	
	[date_expire] [date] NULL,
	[tax] [int] NULL,
	[CostByDate] [float]  NULL,
	[c_count] [float]  NULL
)