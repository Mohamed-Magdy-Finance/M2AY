
IF OBJECT_ID (N'ItemTicket', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[ItemTicket](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_order] [bigint] NULL,
	[id_item] [bigint] NULL,
	[CustName] [nvarchar](100) NULL,
	[qu] [float] NULL,
	[pr] [float] NULL,
	[Arbon] [float] NULL,
	[unit] [smallint] NULL,
	[pdate] [datetime] NULL,
	[user_name] [nvarchar](100) NULL,
	[notes] [nvarchar](300) NULL,
 CONSTRAINT [PK_ItemTicket] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]) ON [PRIMARY]



ALTER TABLE [dbo].[ItemTicket]  WITH CHECK ADD  CONSTRAINT [FK_ItemTicket_Item] FOREIGN KEY([id_item])
REFERENCES [dbo].[Item] ([id_item])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[ItemTicket] CHECK CONSTRAINT [FK_ItemTicket_Item]


ALTER TABLE [dbo].[ItemTicket] ADD  CONSTRAINT [DF_ItemTicket_pdate]  DEFAULT (getdate()) FOR [pdate]

END

