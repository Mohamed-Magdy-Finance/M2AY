IF OBJECT_ID (N'CostCenterDetails', N'U') IS NULL 
BEGIN
CREATE TABLE [dbo].[CostCenterDetails](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_CostCenter] [bigint] NOT NULL,
	[Details] [nvarchar](150) NULL,
	[CustName] [nvarchar](150) NULL,
	[pdate] [date] NULL,
	[total] [bigint] NULL,
 CONSTRAINT [PK_CostCenterDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[CostCenterDetails]  WITH CHECK ADD  CONSTRAINT [FK_CostCenterDetails_z_CostCenter] FOREIGN KEY([id_CostCenter])
REFERENCES [dbo].[z_CostCenter] ([id])
ON UPDATE CASCADE


ALTER TABLE [dbo].[CostCenterDetails] CHECK CONSTRAINT [FK_CostCenterDetails_z_CostCenter]

end

