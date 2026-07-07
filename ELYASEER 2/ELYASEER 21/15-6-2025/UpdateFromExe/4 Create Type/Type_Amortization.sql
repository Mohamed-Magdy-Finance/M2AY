CREATE TYPE [dbo].[Type_Amortization] AS TABLE(
	[id_item] [bigint] NOT NULL,
	[unit] [smallint] NOT NULL,
	[cost] [float] NOT NULL,
	[qu] [float] NOT NULL,
	[QU_big] [float] NOT NULL,
	[QU_Middel] [float] NOT NULL,
	[QU_Small] [float] NOT NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[date_expire] [date] NULL

)


