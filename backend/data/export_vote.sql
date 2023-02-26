SELECT V.rank, C.long_name, U.long_name, U.nim 
FROM Vote V 
LEFT JOIN User U ON V.voter_id = U.id 
LEFT JOIN 
(
       	SELECT Candidate.id, User.long_name 
	FROM Candidate 
	LEFT JOIN User ON Candidate.account_id = User.id 
) AS C ON V.candidate_id = C.id;
