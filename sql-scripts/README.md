> **Warning**  
> Project instances are NOT required to run this section of the repository.

## What is this?

This directory contains the SQL scripts required to initialise cloudSQL databases based on existing schemas in the main synthesis-fcm directory. Do not change this unless explicitly required to do so! 

## Quick Start
```sql
-- In general it is recommended that you insert the values into the database first
INSERT INTO users VALUES (
    '....', 
    '......@gmail.com',
    current_timestamp,
    current_timestamp
);
```