IF OBJECT_ID (N'UserPermitionData', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[UserPermitionData](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_user] [bigint] NOT NULL,
	[id_branch] [bigint] NOT NULL,
	[permType] nvarchar(50) NULL,
 CONSTRAINT [PK_UserPermitionData] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)
) ON [PRIMARY]

ALTER TABLE [dbo].[UserPermitionData]  WITH CHECK ADD  CONSTRAINT [FK_UserPermitionData_UserPermition] FOREIGN KEY([id_user])
REFERENCES [dbo].[UserPermition] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE

ALTER TABLE [dbo].[UserPermitionData] CHECK CONSTRAINT [FK_UserPermitionData_UserPermition]
ALTER TABLE [dbo].[UserPermitionData]  WITH CHECK ADD  CONSTRAINT [FK_UserPermitionData_z_branch] FOREIGN KEY([id_branch])
REFERENCES [dbo].[z_branch] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE

ALTER TABLE [dbo].[UserPermitionData] CHECK CONSTRAINT [FK_UserPermitionData_z_branch]
END
