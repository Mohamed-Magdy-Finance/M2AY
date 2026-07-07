IF OBJECT_ID (N'item_Requ', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[item_Requ](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_item] [bigint] NULL,
	[qu_Requ] [float] NULL,
	[ARname_Requ] [nvarchar](100) NULL,
	[Cost_Requ] [float] NULL,
	[unit] [smallint] NULL,
 CONSTRAINT [PK_item_Requ] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[item_Requ]  WITH CHECK ADD  CONSTRAINT [FK_item_Requ_item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[item_Requ] CHECK CONSTRAINT [FK_item_Requ_item]


ALTER TABLE [dbo].[item_Requ] ADD  CONSTRAINT [DF_item_Requ_unit1]  DEFAULT ((0)) FOR [unit]



END