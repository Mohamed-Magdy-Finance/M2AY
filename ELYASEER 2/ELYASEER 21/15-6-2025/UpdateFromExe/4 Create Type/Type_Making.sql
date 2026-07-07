CREATE TYPE [dbo].[Type_Making] AS TABLE(
	[id_itemMatrial] [bigint] NOT NULL,
	[id_StoreMatrial] [bigint] NOT NULL,
	[unit] [smallint] NOT NULL,
	[cost] [float] NOT NULL,
	[qu] [float] NOT NULL,
	[QU_big] [float] NOT NULL,
	[QU_Middel] [float] NOT NULL,
	[QU_Small] [float] NOT NULL,
    [DateOut] date
)



