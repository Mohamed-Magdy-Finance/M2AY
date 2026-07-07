IF OBJECT_ID (N'ItemCost', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[ItemCost](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_item] [bigint] NOT NULL,
	[comee] [float]  NULL,
	[tot_item] [float] NULL,
 CONSTRAINT [PK_ItemClacCost] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[ItemCost] ADD  CONSTRAINT [DF_ItemClacCost_comee]  DEFAULT ((0)) FOR [comee]
END


