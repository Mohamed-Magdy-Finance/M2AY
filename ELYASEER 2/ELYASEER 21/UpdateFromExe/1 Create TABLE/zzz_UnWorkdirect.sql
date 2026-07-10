IF OBJECT_ID (N'zzz_UnWorkdirect', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[zzz_UnWorkdirect](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_stepWork] [bigint] NOT NULL,
	[id_Undirect] [bigint] NOT NULL,
	[CostUnDirectEx] [bigint] NULL,
 CONSTRAINT [PK_zzz_UnWorkdirect] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[zzz_UnWorkdirect]  WITH CHECK ADD  CONSTRAINT [FK_zzz_UnWorkdirect_zzz_StepOfWork] FOREIGN KEY([id_stepWork])
REFERENCES [dbo].[zzz_StepOfWork] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_UnWorkdirect] CHECK CONSTRAINT [FK_zzz_UnWorkdirect_zzz_StepOfWork]


ALTER TABLE [dbo].[zzz_UnWorkdirect]  WITH CHECK ADD  CONSTRAINT [FK_zzz_UnWorkdirect_zzz_UnDirectEx] FOREIGN KEY([id_Undirect])
REFERENCES [dbo].[zzz_UnDirectEx] ([id])


ALTER TABLE [dbo].[zzz_UnWorkdirect] CHECK CONSTRAINT [FK_zzz_UnWorkdirect_zzz_UnDirectEx]
END


