if OBJECT_ID ('UserAddNew') is  null 
BEGIN
CREATE TABLE [dbo].[UserAddNew](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[user_name] [nvarchar](550) NULL,
	[id_sal] [bigint] NULL,
	[id_Rsal] [bigint] NULL,
	[id_pur] [bigint] NULL,
	[id_Rpur] [bigint] NULL,
 CONSTRAINT [PK_UserAddNew] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

end


