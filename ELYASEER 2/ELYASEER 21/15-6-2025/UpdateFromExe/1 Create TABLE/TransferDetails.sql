IF OBJECT_ID (N'TransferDetails', N'U') IS NULL 
BEGIN


CREATE TABLE [dbo].[TransferDetails](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_pur] [bigint] NOT NULL,
	[Str1] [nvarchar](50) NULL,
	[Str2] [nvarchar](50) NULL,
	[Str3] [nvarchar](50) NULL,
	[Str4] [nvarchar](50) NULL,
	[Str5] [nvarchar](50) NULL,
	[Str6] [nvarchar](50) NULL,
	[pdate1] [date] NULL,
	[pdate2] [date] NULL,
	[pdate3] [date] NULL,
	[pdate4] [date] NULL,
	[pdate5] [date] NULL,
 CONSTRAINT [PK_TransferDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[TransferDetails]  WITH CHECK ADD  CONSTRAINT [FK_TransferDetails_Pur_Invoice] FOREIGN KEY([id_pur])
REFERENCES [dbo].[Pur_Invoice] ([id_pur])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[TransferDetails] CHECK CONSTRAINT [FK_TransferDetails_Pur_Invoice]

END

