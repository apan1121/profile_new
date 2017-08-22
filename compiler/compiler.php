<?php
require ("less/Less.php");

$cssFolder = __dir__."/../css";

getSubRsPaths($cssFolder);


// $less = new lessc;
// echo $less->compile(".block { padding: 3 + 4px }");



function getSubRsPaths($dir){
    $files = scandir($dir);
    foreach($files AS $file){
        if( in_array($file,array(".","..",".DS_Store"))){
            continue;
        }
        $filePath = realpath($dir."/".$file);
        if (is_dir($filePath)) {
            getSubRsPaths($filePath);
        } else if(is_file($filePath)) {
            echo $filePath."\n";
            $ext = pathinfo($filePath, PATHINFO_EXTENSION);

            switch(strtolower($ext)){
                case "less":
                    compiler_less($filePath);
                break;
                case "css":
                    compiler_css($filePath);
                break;
            }
        }

    }
}



function compiler_less($filePath){
    try{
        $filePathInfo = pathinfo($filePath);

        $parser = new Less_Parser();
        $parser->parseFile( $filePath, '../profile/' );
        $css = $parser->getCss();
        // $css = text_smooth_css($css);

        $newFilePath = $filePathInfo['dirname']."/".$filePathInfo["filename"].".min.css";

        $fh = fopen($newFilePath, 'w') or die("can't open file");
        fwrite($fh, $css);
        fclose($fh);

    }catch(Exception $e){
        $error_message = $e->getMessage();
        echo $error_message."\n";
    }

}

function compiler_css($filePath){
    try{
        if(strpos($filePath,".min.css") !== false) {
            return true;
        }

        $filePathInfo = pathinfo($filePath);
        $css = file_get_contents($filePath);
        $css = text_smooth_css($css);

        $newFilePath = $filePathInfo['dirname']."/".$filePathInfo["filename"].".min.css";

        $fh = fopen($newFilePath, 'w') or die("can't open file");
        fwrite($fh, $css);
        fclose($fh);

    }catch(Exception $e){
        $error_message = $e->getMessage();
        echo $error_message."\n";
    }
}

function text_smooth_css($t, $is_debug = 0)
{
    if ($is_debug) {
        return $t;
    }

    /* Remove comments */
    $t = preg_replace("/\/\*(.*?)\*\//s", ' ', $t);

    /* Remove new lines, spaces */
    $t = preg_replace("/(\s{2,}|[\r\n|\n|\t|\r])/", ' ', $t);

    /* Join rules */
    $t = preg_replace('/([,|;|:|{|}]) /', '\\1', $t);
    $t = str_replace(' {', '{', $t);

    /* Remove ; for the last attribute */
    $t = str_replace(';}', '}', $t);
    $t = str_replace(' }', '}', $t);

    return $t;
}
