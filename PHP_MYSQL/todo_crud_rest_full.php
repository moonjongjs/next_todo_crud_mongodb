<?PHP

    include_once('./header.php');
 
    // 1) 메서드/입력
    // PHP의 슈퍼글로벌 값
    // 클라이언트(브라우저/앱)가 GET / POST / PUT / DELETE / PATCH / HEAD / OPTIONS 중 
    // 무엇으로 보냈는지 알려줌.
    $method = $_SERVER['REQUEST_METHOD'];
    $input  = json_decode(file_get_contents("php://input"), true) ?? [];  // prepared statements 사용
  
    
    switch ($method) {
        case 'GET':     // 전체 조회  
                      
            $SQL = "SELECT * FROM todo_list_table ORDER BY w_creation_date DESC";
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

            break;
        case 'POST':   // 입력

            // 데이터받기
            $w_todo         = $input['w_todo'];
            $w_completed    = $input['w_completed'];
            $w_expires      = $input['w_expires'];

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
            break;
        case 'PUT':   // 수정
 
            if($input['flag']=='PUT1'){ // 완료 여부  체크박스

                $w_no        = $input['w_no'];
                $w_completed = $input['w_completed'];

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

            }
            else {  // 할일, 만료일 수정
            
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
            }
           
            break;
        case 'DELETE': // 삭제

            $w_no   = $input['w_no'];
            
            $SQL = "DELETE FROM todo_list_table 
                    WHERE w_no='$w_no'";
            $RES = mysqli_query($CONN, $SQL);
            
            if($RES==true){
                echo 1;
            }
            else{
                echo 0;
            }
            break;
        default:
            break;
    }

    include_once('./footer.php');
?>    