CREATE TYPE [dbo].[Type_Talbia] AS TABLE(
	[id_item] [bigint] NOT NULL,
	[unit] [tinyint] NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [float] NOT NULL,
	[Discount] [float] NOT NULL,
	[PricePharmacist] [float] NOT NULL,
	[tax] [float] NOT NULL,
	[total_item] [float] NOT NULL,
	[LOT] [nvarchar](120) NULL,
    [des] [nvarchar](120) NULL
)



