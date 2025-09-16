<?    
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $DB_SEVER   = 'localhost';
    $DB_ID      = 'moonjong';
    $DB_PW      = 'anstjswhd0105#';
    $DB_NAME    = 'moonjong';        
    $CONN = mysqli_connect($DB_SEVER, $DB_ID, $DB_PW, $DB_NAME);
    mysqli_set_charset($CONN, 'utf8mb4');
?>