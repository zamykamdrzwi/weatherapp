<?php
$weatherLatLon = false;
$weatherCity = false;
$showWeather = false;
$cityGlobal;
$latGlobal;
$lonGlobal;
if(isset($_REQUEST['action'])&&($_REQUEST['action'])=="latLon"){
    $lat = $_REQUEST['lat'];
    $lon = $_REQUEST['lon'];
    $appid ="19de70c141fa4749dd0305edb2cd82a9";
    $url = "http://api.openweathermap.org/data/2.5/weather?lat=".$lat."&lon=".$lon."&units=metric&APPID=".$appid;

    try{
        $response = @file_get_contents($url);
        $latTrue = stripos($response, $lat);
        if($latTrue == false){
            throw new Exception("Wpisz poprawnie wysokość i szerokość geograficzną");
        }
    }catch(Exception $e){
        echo "Wystąpił błąd: ".$e->getMessage();
    }
    
    $latTrue = stripos($response, $lat);
    if($latTrue == true){
        $weatherLatLon = true;
        $latGlobal = $lat;
        $lonGlobal = $lon;
        //echo $response;
    }
    
}
if(isset($_REQUEST['action'])&&($_REQUEST['action'])=="cityName"){
    $city = $_REQUEST['city'];
    $appid ="19de70c141fa4749dd0305edb2cd82a9";
    $url = "http://api.openweathermap.org/data/2.5/weather?q=".$city."&units=metric&APPID=".$appid;

    try{
        $response = @file_get_contents($url);
        $cityTrue = stripos($response, $city);
        if($cityTrue == false){
            throw new Exception("Wpisz poprawnie nazwę miejscowości");
        }
    }catch(Exception $e){
        echo "Wystąpił błąd: ".$e->getMessage();
    }

    $cityTrue = stripos($response, $city);
    if($cityTrue == true){
        $weatherCity = true;
        $cityGlobal = $city;
        echo $response;
    }
}

if($weatherCity || $weatherLatLon){
    $showWeather = true;

    $findTemp = strpos($response, 'temp":');
    $temp = substr($response, $findTemp+6, 4);

    $findFeels_like = strpos($response, 'feels_like":');
    $feels_like = substr($response, $findFeels_like+12, 5);

    $findTemp_min = strpos($response, 'temp_min":');
    $temp_min = substr($response, $findTemp_min+10, 5);

    $findTemp_max = strpos($response, 'temp_max":');
    $temp_max = substr($response, $findTemp_max+10, 5); 
}
else{
    echo "";
}

?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="style.scss">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <div class="upMenu">
        TEST
    </div>
    <h1>Sprawdź pogodę</h1>
    <p id="time"></p>
    <form action="weather.php" method="post"> 
        <div>SZEROKOŚCI GEOGRAFICZNE</div>
        <label for="latInput">Szerokość geograficzna:</label>
        <input type="number" name="lat" id="latInput">
        </br>
        <label for="lonInput">Wysokość geograficzna:</label>
        <input type="number" name="lon" id="lonInput">
        </br>
        <input type="hidden" name="action" value="latLon">
        <input type="submit" value="sprawdź">
        </br>
    </form>
    <form action="weather.php" method="post">
        <div>NAZWA MIASTA</div>
        <label for="cityInput">Wpisz nazwę miejscowości: </label>
        <input type="text" name="city" id="cityInput">
        </br>
        <input type="hidden" name="action" value="cityName">
        <input type="submit" value="sprawdź" id="takeData">
        </br></br>
    </form> 
    <div>
        <?php
            if($showWeather){
                if($weatherCity){
                    echo "Pogoda w miejscowości ".$cityGlobal.":</br>";
                }
                if($weatherLatLon){
                    echo "Pogoda na szerokości: ".$latGlobal." i wysokości: ".$lonGlobal." to:</br>";
                }
                echo "Temperatura w tej chwili: ".$temp."°C</br>";
                echo "Odczuwalna temperatura: ".$feels_like."°C</br>";
                echo "Minimalna temperatura dzisiaj: ".$temp_min."°C</br>";
                echo "Maksymalna temperatura dzisiaj: ".$temp_max."°C</br></br>";
            }
        ?>
        </br>
    </div>
    <div>
        </br></br>
        <a href="http://localhost/rejestracja/index.php">Formularz rejestracji urzytkownika</a></br>
    </div>
    <script src="main.js"></script>
</body>
