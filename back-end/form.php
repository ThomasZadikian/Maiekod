<?php
function messageAndRedirect($page, $message)
{
    echo '<script type="text/javascript">alert("' . $message . '"); window.location.replace("' . $page . '");</script>';
    header("Location :" . $page);
    exit();
}

messageAndRedirect("http://localhost:3000/index.html", "Je redirige vers l'index");
