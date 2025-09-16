<?
    include_once('./header.php');

    $w_no   = $_POST['w_no'];

    $SQL = "DELETE FROM todo_list_table 
            WHERE w_no='$w_no'";
    $RES = mysqli_query($CONN, $SQL);
    
    if($RES==true){
        echo 1;
    }
    else{
        echo 0;
    }


    include_once('./footer.php');
?>