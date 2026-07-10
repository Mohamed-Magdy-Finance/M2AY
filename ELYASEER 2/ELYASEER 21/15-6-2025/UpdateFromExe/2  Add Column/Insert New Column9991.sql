IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_Paper13' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD id_Paper13 bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'phone' AND Object_ID = Object_ID(N'Z_delegate'))ALTER TABLE Z_delegate ADD phone nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowCustList' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD ShowCustList bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateSal' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE  MyProduct ADD delegateSal nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CostCenter' AND Object_ID = Object_ID(N'MyProduct'))ALTER TABLE  MyProduct ADD CostCenter nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'governate' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD governate nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'buildingNumber' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD buildingNumber nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'street' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD street nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'regionCity' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD regionCity nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'country' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD country nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CustTypeAst' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD CustTypeAst int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CustTypeAst2' AND Object_ID = Object_ID(N'cust'))ALTER TABLE  cust ADD CustTypeAst2 int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VenName' AND Object_ID = Object_ID(N'PurTransfer'))ALTER TABLE  PurTransfer ADD VenName nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'VenBillNumber' AND Object_ID = Object_ID(N'PurTransfer'))ALTER TABLE  PurTransfer ADD VenBillNumber nvarchar(150)

IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShortName' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ALTER COLUMN ShortName nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DeleteTakeAway' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE  TableSetting ADD DeleteTakeAway bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'level' AND Object_ID = Object_ID(N'tree'))ALTER TABLE  tree ADD level int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StrLotNumber' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD StrLotNumber  nvarchar(100)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Quotation' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD Quotation  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsClose' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD IsClose  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'StoreName' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD StoreName  nvarchar(250)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountMiddel' AND Object_ID = Object_ID(N'ItemExpire'))ALTER TABLE ItemExpire ADD CountMiddel  int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountSmall' AND Object_ID = Object_ID(N'ItemExpire'))ALTER TABLE ItemExpire ADD CountSmall  int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NetQuBig' AND Object_ID = Object_ID(N'ItemExpire'))ALTER TABLE ItemExpire ADD NetQuBig  int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NetMidell' AND Object_ID = Object_ID(N'ItemExpire'))ALTER TABLE ItemExpire ADD NetMidell  int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NetSmall' AND Object_ID = Object_ID(N'ItemExpire'))ALTER TABLE ItemExpire ADD NetSmall  int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsRequest' AND Object_ID = Object_ID(N'pur_details'))ALTER TABLE pur_details ADD IsRequest  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_EditDate' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD Permition_EditDate  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserShowAllCash' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD UserShowAllCash  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CloseTableAuto' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD CloseTableAuto  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'DisablePrintNotSend' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD DisablePrintNotSend  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'branch' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD branch  bit

IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'branch' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ALTER COLUMN branch bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'lastYear' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD lastYear  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Typetax' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD Typetax  tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeTable' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD TypeTable  tinyint

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeInPur' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD TypeInPur  tinyint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TypeInSal' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ADD TypeInSal  tinyint

update sal_invoice set id_bill =0 where convert (bigint,isnull(id_bill,0) )=0
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'id_bill' AND Object_ID = Object_ID(N'sal_invoice'))ALTER TABLE  sal_invoice ALTER COLUMN id_bill bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDiscount' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ADD CashDiscount  FLOAT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashDiscount' AND Object_ID = Object_ID(N'tree_account'))ALTER TABLE tree_account ADD CashDiscount  FLOAT
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'Delivery_box'))ALTER TABLE Delivery_box ADD CashName  nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CashName' AND Object_ID = Object_ID(N'Sal_Deleted'))ALTER TABLE Sal_Deleted ADD CashName  nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Current_shift' AND Object_ID = Object_ID(N'TREE'))ALTER TABLE TREE ADD Current_shift  bigint
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'MinuteForClose' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  MinuteForClose  int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CommaClear' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD  CommaClear  bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes' AND Object_ID = Object_ID(N'ItemListPrice'))ALTER TABLE ItemListPrice ADD  notes  nvarchar(600)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'UserName' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD  UserName  nvarchar(300)

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PrinterBackup' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  PrinterBackup  nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PrinterBackup2' AND Object_ID = Object_ID(N'TableSetting'))ALTER TABLE TableSetting ADD  PrinterBackup2  nvarchar(300)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Street' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD  Street  nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BranchID' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD  BranchID  nvarchar(50)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Address' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD  Address  nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Governate' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD  Governate  nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'RegionCity' AND Object_ID = Object_ID(N'z_branch'))ALTER TABLE z_branch ADD  RegionCity  nvarchar(200)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Brows_Pur' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD   Permition_Brows_Pur bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_OpenSalOrder' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD   Permition_OpenSalOrder bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_itemOutside' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD   Permition_itemOutside bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_itemInSide' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD   Permition_itemInSide bit
--IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SeqMonth' AND Object_ID = Object_ID(N'cust'))ALTER TABLE cust ADD   SeqMonth int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsPrint' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD   IsPrint bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'InstallmentValue' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD   InstallmentValue float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'FirstDate' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD   FirstDate date
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'EndDate' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD   EndDate date

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SeqMonth' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD   SeqMonth int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'CountInstalment' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD   CountInstalment int

IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'HourOfBackup' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties ADD   HourOfBackup int
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'IsClose' AND Object_ID = Object_ID(N'ItemTicket'))ALTER TABLE ItemTicket ADD   IsClose bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'OneInstalmentValue' AND Object_ID = Object_ID(N'Installment'))ALTER TABLE Installment ADD   OneInstalmentValue float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_SetInstallment' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD   Permition_SetInstallment bit
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_ReportInstallment' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition ADD   Permition_ReportInstallment bit


