# Types/Request

## Overview
Types of `Request body` of external APIs are defined in this directory.  
Since this application uses graphql, it should be defined in `mutation.gql` at the same time with mutation of graphql.  
Type and mutation must be synchronized.
(Automatic generation of type from mutation should be considered.)

## Details(limitations)
- In principle, the value returned by mutation should refer to the type of `. /response` type.
- If you want to have different return queries for the same graphql mutation, split the file.

See [types document](https://www.notion.so/ispec/fbcc19eac6f6405787527fb62ae361f0) for other basic information.
