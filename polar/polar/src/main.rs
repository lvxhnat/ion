mod expected_returns;

fn main() {
    println!("Hello, world!");
    let mut test_vector: Vec<f32> = Vec::new();
    test_vector.push(2.3);
    test_vector.push(3.4);
    expected_returns::returns_from_prices(test_vector, true);
}
