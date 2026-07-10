if OBJECT_ID ('z_branch') is  null 
BEGIN
CREATE TABLE [dbo].[z_branch](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[aname] [nvarchar](150) NULL,
	[con] [nvarchar](500) NULL,
 CONSTRAINT [PK_z_branch] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

end


