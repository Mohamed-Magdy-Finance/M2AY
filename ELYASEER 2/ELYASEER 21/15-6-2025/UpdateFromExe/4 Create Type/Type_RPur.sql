CREATE TYPE [dbo].[Type_RPur] AS TABLE(
	[id_item] [bigint] NOT NULL,
	[unit] [tinyint] NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [float] NOT NULL,
	[Discount] [float] NOT NULL,
	[PricePharmacist] [float] NOT NULL,
	[tax] [float] NOT NULL,
	[total_item] [float] NOT NULL,
	[come_big] [float] NOT NULL,
	[come_Middel] [float] NOT NULL,
	[come_Small] [float] NOT NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[date_expire] [date] NULL,
	[c_count] [float] NULL
)



