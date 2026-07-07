
create trigger [dbo].[delZZproperties]
on [dbo].[Rsal_invoice]
for insert
AS
BEGIN
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'ShowSall' AND Object_ID = Object_ID(N'ZZproperties'))ALTER TABLE ZZproperties drop COLUMN ShowSall

end