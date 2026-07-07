IF OBJECT_ID (N'zzz_workMatrail', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[zzz_workMatrail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_stepWork] [bigint] NOT NULL,
	[id_item] [bigint] NOT NULL,
	[CostMatrial] [float] NULL,
	[StoreNameMatrial] [nvarchar](150) NULL,
	[ProductName0] [nvarchar](150) NULL,
 CONSTRAINT [PK_zzz_workMatrail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[zzz_workMatrail]  WITH CHECK ADD  CONSTRAINT [FK_zzz_workMatrail_Item1] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_workMatrail] CHECK CONSTRAINT [FK_zzz_workMatrail_Item1]


ALTER TABLE [dbo].[zzz_workMatrail]  WITH CHECK ADD  CONSTRAINT [FK_zzz_workMatrail_zzz_StepOfWork] FOREIGN KEY([id_stepWork])
REFERENCES [dbo].[zzz_StepOfWork] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_workMatrail] CHECK CONSTRAINT [FK_zzz_workMatrail_zzz_StepOfWork]

END

