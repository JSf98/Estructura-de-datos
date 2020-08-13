<?php include "../Pagina WEB/php/dadescon.php"; ?>

<?php
//Comprovació del deslogin
if(isset($_GET["out"])){
  // Destruim les variables de la sessió
  $_SESSION = array();
  //Borram cookies de la sessió
  if (ini_get("session.use_cookies")) {
      $params = session_get_cookie_params();
      setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
      );
    }
    //Destruim la sessió
    session_destroy();
}
?>
