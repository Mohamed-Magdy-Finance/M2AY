
 if OBJECT_ID ('MyProduct') is null 
begin
CREATE TABLE [dbo].[MyProduct](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_Product] [bigint] NOT NULL,
	[CustName] [nvarchar](100) NOT NULL,
	[phone] [nvarchar](100) NULL,
	[dateRecive] [date] NULL,
	[dateSend] [date] NULL,
	[cost] [float] NULL,
	[paied] [float] NULL,
	[nots] [nvarchar](400) NULL,
	[UnderSend] [bit] NULL,
	[CashName] [nvarchar](100) NULL,
 CONSTRAINT [PK_MyProduct] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
end



