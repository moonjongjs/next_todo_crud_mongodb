<?
    include_once('./header.php');

    $SQL = "SELECT * FROM todo_list_table ORDER BY w_no DESC";
    $RES = mysqli_query($CONN, $SQL);
    
    $arr = array();
    if( mysqli_num_rows($RES) >=1 ){        
        while( $row = mysqli_fetch_array($RES) ){
            array_push($arr,
                array(
                    '번호' => $row['w_no'],
                    '할일' => $row['w_todo'],
                    '완료' => $row['w_completed'],
                    '기한' => $row['w_expires'],
                    '등록일' => $row['w_creation_date']
                )
            );
        }
    }

    $JSON = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $JSON;

    include_once('./footer.php');
?>