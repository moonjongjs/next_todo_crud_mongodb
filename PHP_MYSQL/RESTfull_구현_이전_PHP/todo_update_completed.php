<?
    include_once('./header.php');

    $w_no        = $_POST['w_no'];
    $w_completed = $_POST['w_completed'];

    $SQL = "UPDATE todo_list_table
            SET w_completed='$w_completed'
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