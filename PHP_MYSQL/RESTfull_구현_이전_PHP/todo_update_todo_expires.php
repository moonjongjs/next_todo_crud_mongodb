<?
    include_once('./header.php');


    $w_no      = $_POST['w_no'];
    $w_todo    = $_POST['w_todo'];
    $w_expires = $_POST['w_expires'];

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