<?php
session_start();

if(!isset($_SESSION['level'])){
    header("Location: ./login/index.php");
    exit; // Make sure to exit after redirection
}else{
    $s = $_SESSION['level'];
}

$f = '';
if (isset($_GET['i'])) {
    $f = $_GET['i'];
    
    if(!isset($_GET['g'])){
        dense($f);
    }else{
        $clf = $_COOKIE["clf"];
        azure_AI($clf);
    }    
} else {
    $clf = $_COOKIE["clf"];
    $s = $_SESSION['level'];
    azure_AI($clf);
}

function dense($f){
    $subscription_key = '';
    $endpoint = 'https://eastus.api.cognitive.microsoft.com';
    if(!empty($f)){
        $image_url = 'https://nextio.in/ARI/AR/img/'.$f;
    }
    else{
        $image_url = 'https://i.insider.com/5dd70284fd9db2267c19edfc?width=700';
    }

    $request_params = [
        'api-version' => '2024-02-01',
        'features' => 'denseCaptions',
        'model-version' => 'latest',
        'language' => 'en',
        'gender-neutral-caption' => 'True'
    ];

    $headers = [
        'Content-Type: application/json',
        'Ocp-Apim-Subscription-Key: ' . $subscription_key
    ];

    $request_body = json_encode(['url' => $image_url]);

    $ch = curl_init($endpoint . '/computervision/imageanalysis:analyze?' . http_build_query($request_params));

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_body);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }

    curl_close($ch);

    $response_data = json_decode($response, true);
    if (isset($response_data['denseCaptionsResult']['values'])) {
        $dense_captions = $response_data['denseCaptionsResult']['values'];
        $c ='';
        foreach ($dense_captions as $caption) {
            $c = $caption['text'] . $c;
        }
        azure_AI($c);
    } else {
        echo "No dense captions found.";
    }
}

function azure_AI($c){
    $url = "https://xperig.openai.azure.com/openai/deployments/ARI/chat/completions?api-version=2024-02-15-preview";
    $headers = array(
        "Content-Type: application/json",
        "api-key: "
    );
    
    global $s;
    $data = array(
        "messages" => array(
            array("role" => "system", "content" => "You are an AI assistant that identifies objects based on provided descriptions and gives students all information related to the object identified based on descriptions."),
            array("role" => "user", "content" => "concluded or assume the object based on these descriptions ".$c." explain about concluded object and in response just explain everything shortly related to the object to a student studying ".$s." in one paragraph")
        ),
        "max_tokens" => 800,
        "temperature" => 0.7,
        "frequency_penalty" => 0,
        "presence_penalty" => 0,
        "top_p" => 0.95,
        "stop" => null
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if ($response === false) {
        echo "cURL Error: " . curl_error($ch);
    } else {
        $responseData = json_decode($response, true);
        if (isset($responseData['choices']) && is_array($responseData['choices'])) {
            $firstChoice = $responseData['choices'][0];
            if (isset($firstChoice['message'])) {
                curl_close($ch);
                $messageContent = $firstChoice['message']['content'];
                $cookie_name = "info";
                $cookie_value = $messageContent;
                setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
                header("location: ../ARI/AR/index.php");
            } else {
                echo "Error: API limit exceeded wait 30s";
            }
        } else {
            echo "Error: API limit exceeded wait 30s";
        }
    }

    curl_close($ch);
}

function tts($m){
    $m = str_replace("<br>", "", $m);
    $m = str_replace(['"', "'",','], '', $m);
    $m = preg_replace('/\s+/', ' ', $m);
    $m = trim($m);
    echo '<script type="text/JavaScript">  
var msg = new SpeechSynthesisUtterance(); 
msg.rate = 0.9;
msg.text ="'. $m.'";
window.speechSynthesis.speak(msg);
     </script>' 
    ; 
}
?>
