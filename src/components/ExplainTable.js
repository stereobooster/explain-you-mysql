import React, { Component } from 'react'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import Tooltip from 'react-toolbox/lib/tooltip';
import { SyntaxError, parse } from '../mysql_response'
import FontIcon from 'react-toolbox/lib/font_icon';
// import IconButton from 'react-toolbox/lib/button';
// <IconButton icon='warning'/>

const TooltipCell = Tooltip(TableCell)
const TooltipIcon = Tooltip(FontIcon)

const ExplainModel = {
  id: {type: Number},
  select_type: {type: String}
};

const explainSelectType = {
  "SIMPLE":  "Simple SELECT (not using UNION or subqueries)",
  "PRIMARY": "Outermost SELECT",
  "UNION": "Second or later SELECT statement in a UNION",
  "DEPENDENT UNION": "Second or later SELECT statement in a UNION, dependent on outer query",
  "UNION RESULT":  "Result of a UNION.",
  "SUBQUERY":  "First SELECT in subquery",
  "DEPENDENT SUBQUERY":  "First SELECT in subquery, dependent on outer query",
  "DERIVED": "Derived table SELECT (subquery in FROM clause)",
  "MATERIALIZED":  "Materialized subquery",
  "UNCACHEABLE SUBQUERY":  "A subquery for which the result cannot be cached and must be re-evaluated for each row of the outer query",
  "UNCACHEABLE UNION": "The second or later select in a UNION that belongs to an uncacheable subquery (see UNCACHEABLE SUBQUERY)"
}

const explainJoinTypes = {
  "system": "The table has only one row (= system table). This is a special case of the const join type.",
  "const": "The table has at most one matching row, which is read at the start of the query. Because there is only one row, values from the column in this row can be regarded as constants by the rest of the optimizer. const tables are very fast because they are read only once.",
  "eq_ref": "One row is read from this table for each combination of rows from the previous tables. Other than the system and const types, this is the best possible join type. It is used when all parts of an index are used by the join and the index is a PRIMARY KEY or UNIQUE NOT NULL index.",
  "ref": "All rows with matching index values are read from this table for each combination of rows from the previous tables. ref is used if the join uses only a leftmost prefix of the key or if the key is not a PRIMARY KEY or UNIQUE index (in other words, if the join cannot select a single row based on the key value). If the key that is used matches only a few rows, this is a good join type.",
  "fulltext": "The join is performed using a FULLTEXT index.",
  "ref_or_null": "This join type is like ref, but with the addition that MySQL does an extra search for rows that contain NULL values. This join type optimization is used most often in resolving subqueries.",
  "index_merge": "This join type indicates that the Index Merge optimization is used. In this case, the key column in the output row contains a list of indexes used, and key_len contains a list of the longest key parts for the indexes used.",
  "unique_subquery": "unique_subquery is just an index lookup function that replaces the subquery completely for better efficiency.",
  "index_subquery": "This join type is similar to unique_subquery. It replaces IN subqueries, but it works for nonunique indexes",
  "range": "Only rows that are in a given range are retrieved, using an index to select the rows. The key column in the output row indicates which index is used. The key_len contains the longest key part that was used. The ref column is NULL for this type.",
  "index": "The index join type is the same as ALL, except that the index tree is scanned.",
  "ALL": "A full table scan is done for each combination of rows from the previous tables. This is normally not good if the table is the first table not marked const, and usually very bad in all other cases. Normally, you can avoid ALL by adding indexes that enable row retrieval from the table based on constant values or column values from earlier tables."
}

const warn = <FontIcon value='warning' />

const analyzeFiltered = (item) => (
  item.filtered < 80 ? <TooltipIcon value="warning" tooltip="Try to filter more rows"/> : null
)

const analyzeKey = (item) => (
  item.key == 'NULL' ? <TooltipIcon value="warning" tooltip="No index is used"/> : null
)

const analyzePossibleKeys = (item) => (
  item.possible_keys == 'NULL' ? <TooltipIcon value="warning" tooltip="Add index to table"/> : null
)

export default function ExplainTable(props) {
  let source;
  try {
    source = parse(props.sql).filter(x => x != null)[0];

    return <Table selectable={false}>
      <TableHead>
        <TableCell numeric>id</TableCell>
        <TooltipCell tooltip="The SELECT identifier">select_type</TooltipCell>
        <TooltipCell tooltip="The table for the output row">table</TooltipCell>
        <TooltipCell tooltip="The SELECT type">type</TooltipCell>
        <TooltipCell tooltip="The possible indexes to choose">possible_keys</TooltipCell>
        <TooltipCell tooltip="The index actually chosen">key</TooltipCell>
        <TooltipCell tooltip="The length of the chosen key" numeric>key_len</TooltipCell>
        <TooltipCell tooltip="The columns compared to the index">ref</TooltipCell>
        <TooltipCell tooltip="Estimate of rows to be examined" numeric>rows</TooltipCell>
        <TooltipCell tooltip="Percentage of rows filtered by table condition" numeric>filtered</TooltipCell>
        <TooltipCell tooltip="Additional information">Extra</TooltipCell>
      </TableHead>
      {source.map((item, idx) => (
        <TableRow key={idx}>
          <TableCell numeric>{item.id}</TableCell>
          <TooltipCell tooltip={explainSelectType[item.select_type]}>{item.select_type}</TooltipCell>
          <TableCell>{item.table}</TableCell>
          <TooltipCell tooltip={explainJoinTypes[item.type]}>{item.type}</TooltipCell>
          <TableCell>{item.possible_keys}{analyzePossibleKeys(item)}</TableCell>
          <TableCell>{item.key}{analyzeKey(item)}</TableCell>
          <TableCell>{item.key_len}</TableCell>
          <TableCell>{item.ref}</TableCell>
          <TableCell numeric>{item.rows}</TableCell>
          <TableCell numeric>{item.filtered}{analyzeFiltered(item)}</TableCell>
          <TableCell>{item.Extra}</TableCell>
        </TableRow>
      ))}
    </Table>
  } catch (e) {
    // console.log(e)
    return <div>{warn} Parse error: {e.message} At {e.location.start.line}:{e.location.start.column}</div>
  }

}
