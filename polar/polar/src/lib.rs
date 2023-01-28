use pyo3::prelude::*;
mod expected_returns;
mod type_parse;

/// Formats the sum of two numbers as string.
#[pyfunction]
fn sum_as_string(a: usize, b: usize) -> PyResult<String> {
    Ok((a + b).to_string())
}

/// A Python module implemented in Rust.
#[pymodule]
fn polar(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    m.add_function(wrap_pyfunction!(expected_returns::returns_from_prices, m)?)?;
    m.add_function(wrap_pyfunction!(type_parse::type_parse, m)?)?;
    Ok(())
}