IF OBJECT_ID (N'empTimeInOut', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[empTimeInOut](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_emp] [bigint] NULL,
	[pdate] [date] NULL,
	[TimeIn] [time](7) NULL,
	[TimeOut] [time](7) NULL,
	[nots] [nvarchar](300) NULL,
 CONSTRAINT [PK_empTimeInOut] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[empTimeInOut]  WITH CHECK ADD  CONSTRAINT [FK_empTimeInOut_emp] FOREIGN KEY([id_emp])
REFERENCES [dbo].[emp] ([id_emp])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[empTimeInOut] CHECK CONSTRAINT [FK_empTimeInOut_emp]


END
