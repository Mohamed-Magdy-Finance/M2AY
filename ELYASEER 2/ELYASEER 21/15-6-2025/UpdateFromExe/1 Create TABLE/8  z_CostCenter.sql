IF OBJECT_ID (N'z_CostCenter', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[z_CostCenter](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[aname] [nvarchar](50) NULL,
	[sahm] [int] NULL,
	[shop] [int] NULL,
	[mangment] [int] NULL,
	[Roof] [int] NULL,
	[RoomInRoof] [int] NULL,
 CONSTRAINT [PK_z_CostCenter] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]


END



