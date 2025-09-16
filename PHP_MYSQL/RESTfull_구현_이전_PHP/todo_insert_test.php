<?PHP
    // 1 헤더
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    
    $DB_SEVER   = 'localhost';
    $DB_ID      = 'moonjong';
    $DB_PW      = 'anstjswhd0105#';
    $DB_NAME    = 'moonjong';  
    $CONN = mysqli_connect($DB_SEVER, $DB_ID, $DB_PW, $DB_NAME);

    // 2 본문
        // 2-1 데이터 변수에 받기
        $w_todo         = "할일1";
        $w_completed    = 0;
        $w_expires      = "2024-11-07T15:29";

        // 2-2 데이터베이스에 저장하기
        $SQL = "INSERT INTO todo_list_table (w_todo, w_completed, w_expires) VALUES 
                ('할일1', 0, '2024-11-07T15:29'),
                ('할일2', 0, '2024-12-07T15:29'),
                ('할일3', 0, '2024-13-07T15:29'),
                ('할일4', 0, '2024-14-07T15:29'),
                ('할일5', 0, '2024-15-07T15:29')";

        // 2-3 데이터베이스에 저장 $SQL 쿼리 실행
        $RES = mysqli_query($CONN, $SQL);

        // 2-4 데이터베이스에 저장 확인 하기
        if($RES==true){
            echo "데이터베이스에 저장 성공!";
        }
        else{
            echo "데이터베이스에 저장 실패!";
        }
        

        // 2-5 리액트 AXIOS에 JSON 형식(TYPE)으로 응답하기
        echo '{"번호":"'.$w_no.'", "할일":"'.$w_todo.'", "완료":"'.$w_completed.'", "기한":"'.$w_expires.'"}';


    // 4 결문
    mysqli_close($CONN);
?>