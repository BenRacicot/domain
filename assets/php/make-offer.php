<?php

	// Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient = "benjaminracicot@gmail.com";

    // FIXME: Update this to your desired email subject
    $subject = "Domain Bid";

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Get the form fields and remove whitespace.
        $bid = strip_tags(trim($_POST["offerFormBid"]));
		$bid = str_replace(array("\r","\n"),array(" "," "),$bid);
        $name = strip_tags(trim($_POST["offerFormName"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["offerFormEmail"]), FILTER_SANITIZE_EMAIL);
        $message_via = trim($_POST["domainName"]);


        $validCaptcha = true;
        if( isset($_POST['googleRecaptcha'])){
            $validForm = false;
            if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):
                //your site secret key
                $secret = '6LfhbSAUAAAAAIz1X3WiuQH3uQyQIQxbUk1J4490';
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
        if ( empty($bid) OR empty($name) OR empty($email) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
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
        $email_content = "Bid Amount ($) : $bid\n";
        $email_content .= "Name: $name\n";
        $email_content .= "Email: $email\n";
        if (!empty($message_via)) {
        	$email_content .= "New Bid Via: $message_via\n";
        }

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {

            $file = fopen('mail.txt', 'w');
            fwrite($file, $email_content);
            fclose($file);

            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your Bid has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your bid.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>