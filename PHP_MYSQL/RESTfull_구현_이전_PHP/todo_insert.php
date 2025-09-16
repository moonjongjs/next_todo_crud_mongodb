<?PHP
    include_once('./header.php');
    
    // 데이터받기
    $w_todo         = $_POST['w_todo'];
    $w_completed    = $_POST['w_completed'];
    $w_expires      = $_POST['w_expires'];

    // DB 저장
    $SQL = "INSERT INTO todo_list_table (w_todo, w_completed, w_expires) 
            VALUES ('$w_todo','$w_completed','$w_expires')";
    $RES = mysqli_query($CONN, $SQL);

    if($RES==true){
        echo 1;
    }
    else{
        echo 0;
    }
    
    include_once('./footer.php');
?>