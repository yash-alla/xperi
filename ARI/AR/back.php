<?php
function handleAjaxRequest() {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo 'Invalid request format.';
        return;
    }

    $message = isset($data['message']) ? $data['message'] : '';

    http_response_code(200);
    echo azure_AI($message);
}

function azure_AI($c){
    $url = "https://xperig.openai.azure.com/openai/deployments/ARI/chat/completions?api-version=2024-02-15-preview";
    
    $headers = array(
        "Content-Type: application/json",
        "api-key: "
    );

    $s = 'masters';
    
    $data = array(
        "messages" => array(
            array("role" => "system", "content" => "You are an AI assistant that answers the question in short understandable way to education level of " .$s),
            array("role" => "user", "content" => 
                 $c . "answer in short briefly directly ")
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
                $messageContent = $firstChoice['message']['content'];
                return $messageContent;
            } else {
               echo "Error: API limit exceed wait 30seconds";
            }
        } else {
            echo "Error: API limit exceed wait 30seconds";
        }
    }
    
    curl_close($ch);
}

handleAjaxRequest();
?>
