<?php
session_start();
if(isset($_POST['subject']) && isset($_POST['model'])){
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
         $servername = "localhost";
    $username = "gukitzpx_roota";
    $password = "hY}^(qu_t[@=";
    $database = "gukitzpx_test";

    
        $conn = new mysqli($servername, $username, $password, $database);
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    $subject = $_POST['subject'];
        $model = $_POST['model'];
    
        // Define the SQL query
        $sql = "INSERT INTO info (subject, link) VALUES ('$subject', '$model')
                ON DUPLICATE KEY UPDATE link='$model'";
    
        // Execute the SQL query
        if ($conn->query($sql) === TRUE) {
            // Check if a new record was inserted
            if ($conn->affected_rows == 1) {
                // New record inserted
                echo "New record inserted successfully";
            } else {
                // Existing record updated
                echo "Existing record updated successfully";
            }
        } else {
            // Error occurred
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}else{

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iofrm</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/fontawesome-all.min.css">
    <link rel="stylesheet" type="text/css" href="css/iofrm-style.css">
    <link rel="stylesheet" type="text/css" href="css/iofrm-theme10.css">
</head>
<body>
    <div class="form-body">
        <div class="row">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <div class="website-logo-inside">
                            <a href="">
                               
                            </a>
                        </div>
                        <h3>Add more things to Xperi platform.</h3>
                        <p>Access to the most powerfull AR-AI tool in web industry.</p>
                        <div class="page-links">
                            <a href="" class="active">Add things</a>
                        </div>
                        <form action="index.php" method="POST">
                            <input class="form-control" type="text" name="subject" placeholder="Subject" required>
                            <input class="form-control" type="text" name="model" placeholder="Paste Trained model URL " required>
                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Save</button> 
                            </div>
                        </form>
                       <div class="form-button">
                               <a href="https://teachablemachine.withgoogle.com/train/image"> <button id="Create"  class="ibtn">Create Model</button></a> 
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="js/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
