QueryOutput
  = empty QueryRow* FinalRow? empty

FinalRow
  = rows:Integer " row" [s]? " in set" ", "? warnings:Integer? " warning"? [s]? " (" [0-9.]* " sec)" nl? { return {rows: rows, warnings: warnings} }

Identifier
  = res: [A-Za-z_0-9]* { return res.join("") }

Value
  = res: [A-Za-z0-9_,.(); ]* { return res.join("") }

InfoRow
  = _* id:Identifier ":" _? val:Value? nl? {return [id, val] }

InfoRows
  = rows:InfoRow* { var res ={}; for (var i in rows) { var row = rows[i]; res[row[0]] = row[1]; } return res }

Header
  = "*"+ _ rowNumber:Integer ". row" _ "*"+ nl { return {number: rowNumber}; }

QueryRow
  = header:Header rows:InfoRows  { rows.number = header.number; return rows }

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t]

nl "newline"
  = _*[\n\r]

empty
  = [ \t\n\r]* { return null }
