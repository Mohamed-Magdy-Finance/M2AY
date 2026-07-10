
create View View_paper
as

  SELECT  user_name, 0 AS selectt,des,NotBookNumber, IsBegin, MainDebt, DateOut, ConvertTo, id, id_constraint, pdate, total, CostCenter, PaperNumper, DatePaid, PaperType, debt_name, credit_name, SUM(debt) AS debt, paied, debt - paied AS rest, Combiala, CASE WHEN [combiala] = 0 THEN 'Value-ESAL' WHEN [combiala] = 1 THEN 'Value-CHECK' ELSE 'Value-Quest' END AS typee FROM PaperCome GROUP BY user_name,IsBegin, id_constraint, pdate, total, CostCenter, MainDebt, DateOut, ConvertTo, DateOut, ConvertTo, PaperNumper, DatePaid, PaperType, debt_name, credit_name, id, paied, debt - paied, Combiala ,id_PaperCome,des,NotBookNumber 
	
UNION
  SELECT  user_name, 0 AS selectt,des,NotBookNumber, IsBegin, MainDebt, DateOut, ConvertTo, id, id_constraint, pdate, total, CostCenter, PaperNumper, DatePaid, PaperType, debt_name, credit_name, SUM(debt) AS debt, paied, debt - paied AS rest, Combiala, CASE WHEN [combiala] = 0 THEN 'Value-ESAL' WHEN [combiala] = 1 THEN 'Value-CHECK' ELSE 'Value-Quest' END AS typee FROM PaperOut  GROUP BY user_name,IsBegin, id_constraint, pdate, total, CostCenter, MainDebt, DateOut, ConvertTo, DateOut, ConvertTo, PaperNumper, DatePaid, PaperType,  debt_name, credit_name, id, paied, debt - paied, Combiala ,id_PaperOut,des,NotBookNumber 
		 
		 	