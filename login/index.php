<?php
session_start();
if(isset($_POST['mail']) && isset($_POST['password'])){
    $servername = "localhost";
    $username = "gukitzpx_roota";
    $password = "hY}^(qu_t[@=";
    $database = "gukitzpx_test";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $mail = strtolower($_POST['mail']);
        $password = $_POST['password'];

        $mail = stripslashes($mail);
        $password = stripslashes($password);
        $mail = mysqli_real_escape_string($conn, $mail);
        $password = mysqli_real_escape_string($conn, $password);

        $sql = "SELECT level FROM login WHERE mail='$mail' AND password='$password'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            //session_destroy(); 
            $_SESSION['level'] = $row['level'];
            $_SESSION['sub'] = $_POST['sub'];
            if($row['level'] == 'prof'){
                $_SESSION['auth'] = 1;
                header("location: ../ARI/prof/index.php");
                exit;
                die();
            }
            else{
            header("location: https://nextio.in/");
            exit;
            die();
            }
        } else {
            $error = "Invalid username or password";
        }
    }
}
$html = '<option value="Common">Common Objects</option>';
 $servername = "localhost";
    $username = "gukitzpx_roota";
    $password = "hY}^(qu_t[@=";
    $database = "gukitzpx_test";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


    // Check if the record already exists
    $check_sql = "SELECT subject,link FROM info";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        // If the record exists, update it
        while($row = $check_result->fetch_assoc()) {
            $html='<option value="'.$row['subject'].'">'.$row['subject'].'</option> '. $html;
            setcookie($row['subject'], $row['link'], time() + (86400 * 30), "/"); // 86400 = 1 day
          }
    }


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
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
                        <h3>Learn more things with Xperi platform.</h3>
                        <p>Access to the most powerfull AR-AI tool in web industry.</p>
                        <div class="page-links">
                            <a href="" class="active">Login</a>
                        </div>
                        <form action="index.php" method="POST">
                            <input class="form-control" type="text" name="mail" placeholder="E-mail Address" required>
                            <input class="form-control" type="password" name="password" placeholder="Password" required>
                           <select class="form-control" name="sub" id="cars">
  <?php echo $html; ?>
</select> 
                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Login</button> <a href="forget10.html">Forget password?</a>
                            </div>
                        </form>
                       
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
