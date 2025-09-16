<?

    include_once('./header.php');

    $method = $_SERVER['REQUEST_METHOD'];
    $input  = json_decode(file_get_contents("php://input"), true);

    $w_no      = $input['w_no'];
    $w_todo    = $input['w_todo'];
    $w_expires = $input['w_expires'];

    $SQL = "UPDATE todo_list_table
            SET    w_todo='$w_todo', 
                   w_expires='$w_expires'
            WHERE  w_no='$w_no'";
    $RES = mysqli_query($CONN, $SQL);

    if($RES==true){
        echo 1;
    }
    else{
        echo 0;
    }

    
    include_once('./footer.php');
?>