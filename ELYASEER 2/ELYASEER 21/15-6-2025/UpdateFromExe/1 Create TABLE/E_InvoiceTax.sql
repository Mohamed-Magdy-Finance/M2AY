
if OBJECT_ID ('E_InvoiceTax') is not null 
BEGIN
drop TABLE [dbo].[E_InvoiceTax]
end

CREATE TABLE [dbo].[E_InvoiceTax](
	[BranchID] [nvarchar](255) NULL,
	[InvoiceId] [nvarchar](255) NULL,
	[Date] Datetime NULL,
	[CustomerType] [float] NULL,
	[CustomerId] [float] NULL,
	[Customer] [nvarchar](255) NULL,
	[NetTotal] [float] NULL,
	[Currency] [nvarchar](255) NULL,
	[ExchangeRate] [float] NULL,
	[Tax] [float] NULL,
	[TaxValue] [float] NULL,
	[TabletaxPercent] [float] NULL,
	[Resource_development_feesAmount] [float] NULL,
	[StampingTax_amount] [float] NULL,
	[DiscountPercent] [float] NULL,
	[DiscountAmount] [float] NULL,
	[ItemId] [float] NULL,
	[ItemName] [nvarchar](max) NULL,
	[Qty] [float] NULL,
	[SalesPrice] [float] NULL,
	[Total] [float] NULL,
	[InvoiceType] [float] NULL,
	[TaxRegistration] [float] NULL,
	[ItemCode] [nvarchar](255) NULL,
	[WithholdingTax] [nvarchar](255) NULL,
	[WithholdingTaxSubType] [nvarchar](255) NULL,
	[purchaseOrderDescription] [nvarchar](255) NULL,
	[purchaseOrderReference] [float] NULL,
	[salesOrderDescription] [nvarchar](255) NULL,
	[salesOrderReference] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[governate] [nvarchar](255) NULL,
	[buildingNumber] [nvarchar](255) NULL,
	[street] [nvarchar](255) NULL,
	[regionCity] [nvarchar](255) NULL




) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_NetTotal]  DEFAULT ((0)) FOR [NetTotal]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_ExchangeRate]  DEFAULT ((0)) FOR [ExchangeRate]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_WithholdingTax]  DEFAULT ((1)) FOR [WithholdingTax]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_WithholdingTaxSubType]  DEFAULT (N'W002') FOR [WithholdingTaxSubType]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_purchaseOrderDescription]  DEFAULT (N'no Description') FOR [purchaseOrderDescription]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_purchaseOrderReference]  DEFAULT ((0)) FOR [purchaseOrderReference]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_salesOrderDescription]  DEFAULT (N'no Description') FOR [salesOrderDescription]


ALTER TABLE [dbo].[E_InvoiceTax] ADD  CONSTRAINT [DF_E_InvoiceTax_salesOrderReference]  DEFAULT ((457)) FOR [salesOrderReference]
