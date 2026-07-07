IF OBJECT_ID (N'pur_temp', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[pur_temp](
[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_pur] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[unit] [smallint] NOT NULL,
	[mm] [smallint] NULL,
	[yy] [smallint] NULL,
	[qu] [float] NOT NULL,
	[bones] [float] NOT NULL,
	[pr] [decimal](18, 3) NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[LOT] [nvarchar](150) NULL,
	[tax] [decimal](18, 2) NULL,
	[total_item] [decimal](18, 3) NULL,
	[id_rpur] [bigint] NULL,
	[PricePharmacist] [float] NULL,
	[id_store] [bigint] NULL,
 CONSTRAINT [PK_pur_temp_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

end


