IF OBJECT_ID (N'JopTime', N'U') IS  NULL 
BEGIN
CREATE TABLE [dbo].[JopTime](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[pdate] [date] NULL,
	[EndJop] [nvarchar](50) NULL,
	[BeginJop] [nvarchar](50) NULL,
	[UserName] [nvarchar](150) NULL
 
)


end














