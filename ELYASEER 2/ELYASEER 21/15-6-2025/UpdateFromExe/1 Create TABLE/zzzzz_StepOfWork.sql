IF OBJECT_ID (N'zzz_StepOfWork', N'U') IS NULL 
BEGIN

CREATE TABLE [dbo].[zzz_StepOfWork](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_work] [bigint] NULL,
	[id_step] [bigint] NULL,
 CONSTRAINT [PK_zzz_StepOfWork] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[zzz_StepOfWork]  WITH CHECK ADD  CONSTRAINT [FK_zzz_StepOfWork_zzz_Step] FOREIGN KEY([id_step])
REFERENCES [dbo].[zzz_Step] ([id])
ON UPDATE CASCADE


ALTER TABLE [dbo].[zzz_StepOfWork] CHECK CONSTRAINT [FK_zzz_StepOfWork_zzz_Step]


ALTER TABLE [dbo].[zzz_StepOfWork]  WITH CHECK ADD  CONSTRAINT [FK_zzz_StepOfWork_zzz_WorkMain] FOREIGN KEY([id_work])
REFERENCES [dbo].[zzz_WorkMain] ([id_work])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[zzz_StepOfWork] CHECK CONSTRAINT [FK_zzz_StepOfWork_zzz_WorkMain]
END


