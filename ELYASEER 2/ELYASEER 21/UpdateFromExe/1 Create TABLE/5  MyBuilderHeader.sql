
if OBJECT_ID ('MyBuilderHeader') is null 
begin

CREATE TABLE [dbo].[MyBuilderHeader](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[LineAR0] [nvarchar](80) NULL,
	[LineAR1] [nvarchar](80) NULL,
	[LineAR2] [nvarchar](80) NULL,
	[LineAR3] [nvarchar](80) NULL,
	[LineEN0] [nvarchar](80) NULL,
	[LineEN1] [nvarchar](80) NULL,
	[LineEN2] [nvarchar](80) NULL,
	[LineEN3] [nvarchar](80) NULL,
 CONSTRAINT [PK_MyBuilderHeade] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
end




