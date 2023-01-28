use pyo3::prelude::*;
use std::collections::HashMap;

#[pyfunction]
pub fn type_parse(column_names: Vec<String>, body: Vec<Vec<String>>) {
    
    let mut data_types = HashMap::new()

    for column_name in column_names.iter_mut() {
        
    }
    println!("{}", s.chars().all(char::numbers));
}