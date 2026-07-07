

IF not EXISTS (SELECT *  FROM sys.indexes  WHERE name='ind_ARname' 
    AND object_id = OBJECT_ID('[dbo].[item]'))
  begin
    create index ind_ARname on item(ARname)
  end