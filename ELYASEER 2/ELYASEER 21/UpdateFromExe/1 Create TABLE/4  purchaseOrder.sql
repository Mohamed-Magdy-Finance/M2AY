
if OBJECT_ID ('purchaseOrder') is  null 
BEGIN
CREATE TABLE [dbo].[purchaseOrder](
	[id_order] [bigint] IDENTITY(1,1) NOT NULL,
	[code] [nvarchar](50) NULL,
	[ven_name] [nvarchar](100) NULL,
	[currency_name] [nvarchar](50) NULL,
	[ExChange_value] [float] NULL,
	[Total] [float] NULL,
	[pdate] [date] NULL,
 CONSTRAINT [PK_purchaseOrder] PRIMARY KEY CLUSTERED 
(
	[id_order] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

END


