CREATE TYPE [dbo].[Type_Pur] AS TABLE(
    [id] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[unit] [tinyint] NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [float] NOT NULL,
	[Discount] [float] NOT NULL,
	[PricePharmacist] [float] NOT NULL,
	[tax] [float]  NULL,
	[total_item] [float] NOT NULL,
	[come_big] [float] NOT NULL,
	[come_Middel] [float] NOT NULL,
	[come_Small] [float] NOT NULL,
	[date_expire] [date] NULL,
	[id_Rpur] [bigint] NOT NULL,
	[LOT] [nvarchar](80) NULL,
	[NetTotalItem] [float] NULL,
	[StoreNameDetails] [nvarchar](180) NULL,
	[des] [nvarchar](300) NULL,
	[c_count] [float] NULL,
    [IsRequest] [bit] NULL
)



