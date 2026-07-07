

CREATE TYPE [dbo].[Type_Convert] AS TABLE(
	[id_item] [bigint] NOT NULL,
	[unit] [smallint]  NULL,
	[id_storeFrom] [bigint]  NULL,
	[id_storeTo] [bigint]  NULL,
	[storeFrom] [nvarchar](50) NULL,
	[storeTo] [nvarchar](50) NULL,
	[qu] [float]  NULL,
	[QuGood] [float]  NULL,
	[pr] [decimal](18, 3)  NULL,
	[QU_big] [float]  NULL,
	[QU_Middel] [float]  NULL,
	[QU_Small] [float]  NULL,
	[LOT] [nvarchar](100) NULL,
	[date_expire] [date] NULL
)



