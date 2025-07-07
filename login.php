<?php
session_start(); // Start session at the very beginning

// Connect to the MySQL database
$conn = new mysqli("localhost", "root", "", "whatcanicook");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize input
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Query to find the user
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            
            // Store user data in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['dietary'] = $user['dietary_pref'];
            $_SESSION['meal'] = $user['meal_type'];
            $_SESSION['allergies'] = $user['allergies']; // optional if you're storing allergies

            // Redirect to home
            header("Location: home.php");
            exit();
        } else {
            echo "<script>alert('Incorrect password.'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('User not found.'); window.location.href='login.html';</script>";
    }

    // Close statement
    $stmt->close();
}

// Close DB connection
$conn->close();
?>
