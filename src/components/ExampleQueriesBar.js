import React, { Component } from 'react'
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Button from 'react-toolbox/lib/button/Button'

const sql1 = `*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: some_table
   partitions: NULL
         type: index_merge
possible_keys: a,b
          key: a,b
      key_len: 60,60
          ref: NULL
         rows: 169
     filtered: 100.00
        Extra: Using sort_union(a, b); Using where
1 row in set, 1 warning (0.01 sec)`

const sql2 = `********************** 1. row **********************
           id: 1
  select_type: SIMPLE
        table: Country
         type: const
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 3
          ref: const
         rows: 1
     filtered: 100.00
        Extra:
********************** 2. row **********************
           id: 1
  select_type: SIMPLE
        table: City
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 4079
     filtered: 100.00
        Extra: Using where
2 rows in set, 1 warning (0.00 sec)`

const sql3 = `********************** 1. row **********************
           id: 1
  select_type: SIMPLE
        table: l
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 7
        Extra:
********************** 2. row **********************
           id: 1
  select_type: SIMPLE
        table: p
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 110
        Extra: Using where; Using join buffer
********************** 3. row **********************
           id: 1
  select_type: SIMPLE
        table: c
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 122
        Extra: Using join buffer
********************** 4. row **********************
           id: 1
  select_type: SIMPLE
        table: o
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 326
        Extra: Using where; Using join buffer
********************** 5. row **********************
           id: 1
  select_type: SIMPLE
        table: d
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 2996
        Extra: Using where; Using join buffer
5 rows in set (0.00 sec)`

const sql4 = `********************** 1. row **********************
           id: 1
  select_type: SIMPLE
        table: o
         type: const
possible_keys: PRIMARY,customerNumber
          key: PRIMARY
      key_len: 4
          ref: const
         rows: 1
        Extra:
********************** 2. row **********************
           id: 1
  select_type: SIMPLE
        table: c
         type: const
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: const
         rows: 1
        Extra:
********************** 3. row **********************
           id: 1
  select_type: SIMPLE
        table: d
         type: ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: const
         rows: 4
        Extra:
********************** 4. row **********************
           id: 1
  select_type: SIMPLE
        table: p
         type: eq_ref
possible_keys: PRIMARY,productLine
          key: PRIMARY
      key_len: 17
          ref: classicmodels.d.productCode
         rows: 1
        Extra:
********************** 5. row **********************
           id: 1
  select_type: SIMPLE
        table: l
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 52
          ref: classicmodels.p.productLine
         rows: 1
        Extra:
5 rows in set (0.00 sec)`

const sql5 = `********************** 1. row **********************
           id: 1
  select_type: PRIMARY
        table: <derived2>
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 219
        Extra: Using where
********************** 2. row **********************
           id: 2
  select_type: DERIVED
        table: p
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 110
        Extra:
********************** 3. row **********************
           id: 2
  select_type: DERIVED
        table: l
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 52
          ref: classicmodels.p.productLine
         rows: 1
        Extra:
********************** 4. row **********************
           id: 3
  select_type: UNION
        table: v
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 109
        Extra:
********************** 5. row **********************
           id: 3
  select_type: UNION
        table: p
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 17
          ref: classicmodels.v.productCode
         rows: 1
        Extra:
********************** 6. row **********************
           id: 3
  select_type: UNION
        table: l
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 52
          ref: classicmodels.p.productLine
         rows: 1
        Extra:
********************** 7. row **********************
           id: NULL
  select_type: UNION RESULT
        table: <union2,3>
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: NULL
        Extra:
7 rows in set (0.01 sec)`

const sql6 = `********************** 1. row **********************
          id: 1
  select_type: PRIMARY
        table: <derived2>
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 12
        Extra:
********************** 2. row **********************
           id: 2
  select_type: DERIVED
        table: p
         type: range
possible_keys: idx_buyPrice,idx_productLine
          key: idx_buyPrice
      key_len: 8
          ref: NULL
         rows: 23
        Extra: Using where
********************** 3. row **********************
           id: 2
  select_type: DERIVED
        table: l
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 52
          ref: classicmodels.p.productLine
         rows: 1
        Extra: Using where
********************** 4. row **********************
           id: 3
  select_type: UNION
        table: v
         type: range
possible_keys: idx_buyPrice,idx_productCode
          key: idx_buyPrice
      key_len: 9
          ref: NULL
         rows: 1
        Extra: Using where
********************** 5. row **********************
           id: 3
  select_type: UNION
        table: p
         type: eq_ref
possible_keys: PRIMARY,idx_productLine
          key: PRIMARY
      key_len: 17
          ref: classicmodels.v.productCode
         rows: 1
        Extra: Using where
********************** 6. row **********************
           id: 3
  select_type: UNION
        table: l
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 52
          ref: classicmodels.p.productLine
         rows: 1
        Extra: Using where
********************** 7. row **********************
           id: NULL
  select_type: UNION RESULT
        table: <union2,3>
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: NULL
        Extra:
7 rows in set (0.01 sec)`

const ExampleQueriesBar = (props) => {
  let cb = props.onChange

  return (<Navigation>
    Try some exmaples:
    <Button label='1' onClick={()=>cb(sql1)} />
    <Button label='2' onClick={()=>cb(sql2)} />
    <Button label='3' onClick={()=>cb(sql3)} />
    <Button label='4' onClick={()=>cb(sql4)} />
    <Button label='5' onClick={()=>cb(sql5)} />
    <Button label='6' onClick={()=>cb(sql6)} />
  </Navigation>)
}

export default ExampleQueriesBar
