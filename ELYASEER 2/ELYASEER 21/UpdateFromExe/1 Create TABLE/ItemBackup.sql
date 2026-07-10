
IF OBJECT_ID (N'ItemBackup', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[ItemBackup](
	[id_item] [bigint] NOT NULL,
	[ARname] [nvarchar](80) NOT NULL,
	[InternationalCode] [nvarchar](20) NULL,
	[ShortName] [nvarchar](20) NULL,
	[ENname] [nvarchar](80) NULL,
	[IdTypeItem1] [bigint] NULL,
	[IdTypeItem2] [bigint] NULL,
	[IdTypeItem3] [bigint] NULL,
	[IdBigUnit] [bigint] NULL,
	[IdMiddellUnit] [bigint] NULL,
	[IdSmallUnit] [bigint] NULL,
	[PurchasePrice] [real] NULL,
	[BigPr0] [real] NULL,
	[Dioscount_main] [decimal](18, 2) NULL,
	[Dioscount_over] [decimal](18, 2) NULL,
	[Day_Recession] [int] NULL,
	[Minimum] [int] NULL,
	[Discount0] [decimal](18, 2) NULL,
	[Discount1] [decimal](18, 2) NULL,
	[Discount2] [decimal](18, 2) NULL,
	[Tax] [decimal](18, 3) NULL,
	[CountMiddel] [float] NULL,
	[CountSmall] [float] NULL,
	[BigPr1] [decimal](18, 3) NULL,
	[BigPr2] [decimal](18, 3) NULL,
	[MIDPr0] [real] NULL,
	[MIDPr1] [real] NULL,
	[MIDPr2] [decimal](18, 2) NULL,
	[SmallPr0] [decimal](18, 2) NULL,
	[SmallPr1] [decimal](18, 2) NULL,
	[SmallPr2] [decimal](18, 2) NULL,
	[Balance] [float] NULL,
	[BeginBalance0] [float] NULL,
	[BeginBalance1] [float] NULL,
	[BeginBalance2] [float] NULL,
	[CurrentBalance0] [float] NULL,
	[CurrentBalance1] [float] NULL,
	[CurrentBalance2] [float] NULL,
	[TYPE] [tinyint] NULL,
	[Deleted] [bit] NULL,
	[cost] [real] NULL,
	[IsExpire] [bit] NULL,
	[net_balance] [float] NOT NULL,
	[MoreCheck] [bit] NULL,
	[MaxSalDiscount] [decimal](18, 2) NULL,
	[MinSalPr] [decimal](18, 2) NULL,
	[DateEdit] [date] NULL,
	[DateCreate] [date] NULL,
	[FindBadil] [bigint] NULL,
	[default_pur] [tinyint] NULL,
	[default_sal] [tinyint] NULL,
	[CountMetr] [float] NULL,
	[IdTypeItem4] [bigint] NULL,
	[IdTypeItem5] [bigint] NULL,
	[IdTypeItem6] [bigint] NULL,
	[IdTypeItem7] [bigint] NULL,
	[Ticket] [int] NULL,
	[itm_effictive] [nvarchar](200) NULL,
	[id_ven] [bigint] NULL,
	[PublicPr] [decimal](18, 2) NULL,
	[IsImported] [bit] NULL,
	[MaxQu] [float] NULL,
	[PathItemPic] [nvarchar](300) NULL,
	[commission] [decimal](18, 3) NULL,
	[IdItemMaster] [bigint] NULL,
	[BigPr3] [float] NULL,
	[BigPr4] [float] NULL,
	[MIDPr3] [float] NULL,
	[MIDPr4] [float] NULL,
	[SmallPr3] [float] NULL,
	[SmallPr4] [float] NULL,
	[locationn] [nvarchar](150) NULL,
	[notes] [nvarchar](500) NULL,
	[keep] [float] NULL,
	[user_name] [nvarchar](200) NULL
) ON [PRIMARY]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_InternationalCode]  DEFAULT ((0)) FOR [InternationalCode]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IdTypeItem1]  DEFAULT ((0)) FOR [IdTypeItem1]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IdTypeItem2]  DEFAULT ((0)) FOR [IdTypeItem2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IdTypeItem3]  DEFAULT ((0)) FOR [IdTypeItem3]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IdBigUnit]  DEFAULT ((0)) FOR [IdBigUnit]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IdMiddellUnit]  DEFAULT ((0)) FOR [IdMiddellUnit]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IdSmallUnit]  DEFAULT ((0)) FOR [IdSmallUnit]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_PurchasePrice]  DEFAULT ((0)) FOR [PurchasePrice]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_BigPr0]  DEFAULT ((0)) FOR [BigPr0]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Dioscount_main]  DEFAULT ((0)) FOR [Dioscount_main]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Dioscount_over]  DEFAULT ((0)) FOR [Dioscount_over]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Day_Recession]  DEFAULT ((0)) FOR [Day_Recession]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Minimum]  DEFAULT ((0)) FOR [Minimum]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Discount0]  DEFAULT ((0)) FOR [Discount0]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Discount1]  DEFAULT ((0)) FOR [Discount1]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Discount2]  DEFAULT ((0)) FOR [Discount2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Tax]  DEFAULT ((0)) FOR [Tax]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_CountMiddel]  DEFAULT ((1)) FOR [CountMiddel]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_CountSmall]  DEFAULT ((1)) FOR [CountSmall]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_BigPr2]  DEFAULT ((0)) FOR [BigPr2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_MIDPr0]  DEFAULT ((0)) FOR [MIDPr0]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_MIDPr1]  DEFAULT ((0)) FOR [MIDPr1]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_MIDPr2]  DEFAULT ((0)) FOR [MIDPr2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_SmallPr0]  DEFAULT ((0)) FOR [SmallPr0]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_SmallPr2]  DEFAULT ((0)) FOR [SmallPr2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Balance]  DEFAULT ((0)) FOR [Balance]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_BeginBalance0]  DEFAULT ((0)) FOR [BeginBalance0]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_BeginBalance1]  DEFAULT ((0)) FOR [BeginBalance1]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_BeginBalance2]  DEFAULT ((0)) FOR [BeginBalance2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_CurrentBalance0]  DEFAULT ((0)) FOR [CurrentBalance0]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_CurrentBalance1]  DEFAULT ((0)) FOR [CurrentBalance1]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_CurrentBalance2]  DEFAULT ((0)) FOR [CurrentBalance2]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_TYPE]  DEFAULT ((0)) FOR [TYPE]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_Deleted]  DEFAULT ((0)) FOR [Deleted]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_cost]  DEFAULT ((0)) FOR [cost]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_IsExpire]  DEFAULT ((0)) FOR [IsExpire]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_net_balance]  DEFAULT ((0)) FOR [net_balance]


ALTER TABLE [dbo].[ItemBackup] ADD  CONSTRAINT [DF_ItemBackup_DateCreate]  DEFAULT (getdate()) FOR [DateCreate]
END


