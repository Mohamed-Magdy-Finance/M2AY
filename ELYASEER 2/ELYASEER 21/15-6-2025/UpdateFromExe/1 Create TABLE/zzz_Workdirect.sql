IF OBJECT_ID (N'zzz_Workdirect', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[zzz_Workdirect](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_stepWork] [bigint] NOT NULL,
	[id_direct] [bigint] NOT NULL,
	[CostDirectEx] [bigint] NULL,
 CONSTRAINT [PK_zzz_Workdirect] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[zzz_Workdirect]  WITH CHECK ADD  CONSTRAINT [FK_zzz_Workdirect_zzz_DirectEx] FOREIGN KEY([id_direct])
REFERENCES [dbo].[zzz_DirectEx] ([id])


ALTER TABLE [dbo].[zzz_Workdirect] CHECK CONSTRAINT [FK_zzz_Workdirect_zzz_DirectEx]


ALTER TABLE [dbo].[zzz_Workdirect]  WITH CHECK ADD  CONSTRAINT [FK_zzz_Workdirect_zzz_StepOfWork] FOREIGN KEY([id_stepWork])
REFERENCES [dbo].[zzz_StepOfWork] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_Workdirect] CHECK CONSTRAINT [FK_zzz_Workdirect_zzz_StepOfWork]
END


