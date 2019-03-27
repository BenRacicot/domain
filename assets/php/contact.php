<?php

	// Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient = "eventhemes.contact@gmail.com";


    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["contactName"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $subject = strip_tags(trim($_POST["contactSubject"]));
        $subject = str_replace(array("\r","\n"),array(" "," "),$subject);
        $email = filter_var(trim($_POST["contactEmail"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["contactMessage"]);


        $validCaptcha = true;
        if( isset($_POST['googleRecaptcha'])){
            $validForm = false;
            if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):
                //your site secret key
                $secret = '6Le4ZpoUAAAAAOyMhbJ5-vY_0L1xD99Uz06OMvTL';
                //get verify response data
                $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
                $responseData = json_decode($verifyResponse);
                if($responseData->success):
                    $validCaptcha = true;
                else:
                    $validCaptcha = false;
                endif;
            else:
                $validCaptcha = false;
            endif;
        }

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($subject) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }

        // Check Google reCaptcha.
        if ( $validCaptcha !== true ) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Wrong captcha. Try again please.";
            exit;
        }

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        if (isset($_POST["contactPhone"])) {
            $phone = strip_tags(trim($_POST["contactPhone"]));
            $phone = str_replace(array("\r","\n"),array(" "," "),$phone);
            if (!empty($phone)) {
                $email_content .= "Phone: $phone\n";
            }
        }
        if (isset($_POST["domainName"])) {
            $message_via = trim($_POST["domainName"]);
            if (!empty($message_via)) {
            	$email_content .= "Message Via: $message_via\n";
            }
        }
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {

            $file = fopen('mail.txt', 'w');
            fwrite($file, $email_content);
            fclose($file);

            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>