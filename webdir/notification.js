// Setup

var http = require("http");
var port = 3000;
var qs = require("querystring");
var stringBuilder = require("stringbuilder");
var md5 = require("blueimp-md5");

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBn8EDhHGzZ3L8uqXpwXxf46xdYu1qU9pY",
    authDomain: "fotos-ja-dev.firebaseapp.com",
    databaseURL: "https://fotos-ja-dev.firebaseio.com",
    projectId: "fotos-ja-dev",
    storageBucket: "fotos-ja-dev.appspot.com",
    messagingSenderId: "255849241563"
};
firebase.initializeApp(config);
var database = firebase.database();

// Servidor HTTP

http.createServer(function (req, resp) {

    console.log(req.url);

    switch (req.method) {

        case "GET":

            switch (req.url) {

                case "/":

                    getHome(req, resp);

                    break;

                case "/payu":

                    getData(req, resp);

                    break;

                default:

                    get404(req, resp);

                    break;

            }

            break;

        case "POST":

            switch (req.url) {

                case "/payu":

                    var reqBody = '';

                    req.on('data', function (data) {

                        reqBody += data;

                        if (reqBody > 1e7) { // 10 MB
                            get413(req, resp);
                        }

                    });

                    req.on('end', function (data) {

                        console.log("Post data: " + reqBody);

                        var formData = qs.parse(reqBody);

                        //getPostData(req, resp, formData);

                        postData(req, resp, formData);

                    });

                    break;

                default:

                    get404(req, resp);

                    break;

            }

            break;

        default:

            get505(req, resp);

            break;

    }


}).listen(port);

function getHome(req, resp) {

    resp.writeHead(200, {
        "Content-Type": "text/html"
    });

    resp.write("<html><body>Teste GET Home Ok!</html></body>");

    resp.end();

}

function getPostData(req, resp, data) {

    var sb = new stringBuilder({
        newline: "\r\n"
    });

    sb.appendLine("<html>");
    sb.appendLine(" <body>");
    sb.appendLine("     <form method='post'>");
    sb.appendLine("         <table>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Campo 1</td>");

    if (data && data.field1) {
        sb.appendLine("                 <td><input type='text' id='field1' name='field1' value='{0}' /></td>", data.field1);
    } else {
        sb.appendLine("                 <td><input type='text' id='field1' name='field1' value='' /></td>");
    }

    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Campo 2</td>");

    if (data && data.field2) {
        sb.appendLine("                 <td><input type='text' id='field2' name='field2' value='{0}' /></td>", data.field2);
    } else {
        sb.appendLine("                 <td><input type='text' id='field2' name='field2' value='' /></td>");
    }

    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td><input type='submit' value='Post' /></td>");
    sb.appendLine("             </tr>");


    var sum;
    if (data && data.field1 && data.field2) {
        sum = Number(data.field1) + Number(data.field2);
        sb.appendLine("             <tr>");
        sb.appendLine("                 <td><span>Sum {0}</span></td>", sum);
        sb.appendLine("             </tr>");
    }

    sb.appendLine("         </table>");
    sb.appendLine("     </form>");
    sb.appendLine(" </body>");
    sb.appendLine("</html>");

    sb.build(function (error, result) {

        resp.writeHead(200, {
            "Content-Type": "text/html"
        });

        resp.write(result);

        resp.end();

    });

}


function getData(req, resp) {

    var sb = new stringBuilder({
        newline: "\r\n"
    });

    sb.appendLine("<html>");
    sb.appendLine(" <body>");
    sb.appendLine("     <form method='post'>");
    sb.appendLine("         <table>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>merchant_id</td>");
    sb.appendLine("                 <td><input type='text' id='merchant_id' name='merchant_id' value='508029' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>state_pol</td>");
    sb.appendLine("                 <td><input type='text' id='state_pol' name='state_pol' value='4' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>risk</td>");
    sb.appendLine("                 <td><input type='text' id='risk' name='risk' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>response_code_pol</td>");
    sb.appendLine("                 <td><input type='text' id='response_code_pol' name='response_code_pol' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>reference_sale</td>");
    sb.appendLine("                 <td><input type='text' id='reference_sale' name='reference_sale' value='1002219884865' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>reference_pol</td>");
    sb.appendLine("                 <td><input type='text' id='reference_pol' name='reference_pol' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>sign</td>");
    sb.appendLine("                 <td><input type='text' id='sign' name='sign' value='48d5008e7b949c259bc7d5e96fb105e2' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>extra1</td>");
    sb.appendLine("                 <td><input type='text' id='extra1' name='extra1' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>extra2</td>");
    sb.appendLine("                 <td><input type='text' id='extra2' name='extra2' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>payment_method</td>");
    sb.appendLine("                 <td><input type='text' id='payment_method' name='payment_method' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>payment_method_type</td>");
    sb.appendLine("                 <td><input type='text' id='payment_method_type' name='payment_method_type' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>installments_number</td>");
    sb.appendLine("                 <td><input type='text' id='installments_number' name='installments_number' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>value</td>");
    sb.appendLine("                 <td><input type='text' id='value' name='value' value='15.00' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>tax</td>");
    sb.appendLine("                 <td><input type='text' id='tax' name='tax' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>additional_value</td>");
    sb.appendLine("                 <td><input type='text' id='additional_value' name='additional_value' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>transaction_date</td>");
    sb.appendLine("                 <td><input type='text' id='transaction_date' name='transaction_date' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>currency</td>");
    sb.appendLine("                 <td><input type='text' id='currency' name='currency' value='BRL' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>email_buyer</td>");
    sb.appendLine("                 <td><input type='text' id='email_buyer' name='email_buyer' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>cus</td>");
    sb.appendLine("                 <td><input type='text' id='cus' name='cus' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>pse_bank</td>");
    sb.appendLine("                 <td><input type='text' id='pse_bank' name='pse_bank' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>test</td>");
    sb.appendLine("                 <td><input type='text' id='test' name='test' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>description</td>");
    sb.appendLine("                 <td><input type='text' id='description' name='description' value='1002219884865' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>billing_address</td>");
    sb.appendLine("                 <td><input type='text' id='billing_address' name='billing_address' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>shipping_address</td>");
    sb.appendLine("                 <td><input type='text' id='shipping_address' name='shipping_address' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>phone</td>");
    sb.appendLine("                 <td><input type='text' id='phone' name='phone' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>office_phone</td>");
    sb.appendLine("                 <td><input type='text' id='office_phone' name='office_phone' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>account_number_ach</td>");
    sb.appendLine("                 <td><input type='text' id='account_number_ach' name='account_number_ach' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>account_type_ach</td>");
    sb.appendLine("                 <td><input type='text' id='account_type_ach' name='account_type_ach' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>administrative_fee</td>");
    sb.appendLine("                 <td><input type='text' id='administrative_fee' name='administrative_fee' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>administrative_fee_base</td>");
    sb.appendLine("                 <td><input type='text' id='administrative_fee_base' name='administrative_fee_base' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>administrative_fee_tax</td>");
    sb.appendLine("                 <td><input type='text' id='administrative_fee_tax' name='administrative_fee_tax' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>airline_code</td>");
    sb.appendLine("                 <td><input type='text' id='airline_code' name='airline_code' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>attempts</td>");
    sb.appendLine("                 <td><input type='text' id='attempts' name='attempts' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>authorization_code</td>");
    sb.appendLine("                 <td><input type='text' id='authorization_code' name='authorization_code' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>bank_id</td>");
    sb.appendLine("                 <td><input type='text' id='bank_id' name='bank_id' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>billing_city</td>");
    sb.appendLine("                 <td><input type='text' id='billing_city' name='billing_city' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>billing_country</td>");
    sb.appendLine("                 <td><input type='text' id='billing_country' name='billing_country' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>commision_pol</td>");
    sb.appendLine("                 <td><input type='text' id='commision_pol' name='commision_pol' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>commision_pol_currency</td>");
    sb.appendLine("                 <td><input type='text' id='commision_pol_currency' name='commision_pol_currency' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>customer_number</td>");
    sb.appendLine("                 <td><input type='text' id='customer_number' name='customer_number' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>date</td>");
    sb.appendLine("                 <td><input type='text' id='date' name='date' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>error_code_bank</td>");
    sb.appendLine("                 <td><input type='text' id='error_code_bank' name='error_code_bank' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>error_message_bank</td>");
    sb.appendLine("                 <td><input type='text' id='error_message_bank' name='error_message_bank' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>exchange_rate</td>");
    sb.appendLine("                 <td><input type='text' id='exchange_rate' name='exchange_rate' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>ip</td>");
    sb.appendLine("                 <td><input type='text' id='ip' name='ip' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>nickname_buyer</td>");
    sb.appendLine("                 <td><input type='text' id='nickname_buyer' name='nickname_buyer' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>nickname_seller</td>");
    sb.appendLine("                 <td><input type='text' id='nickname_seller' name='nickname_seller' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>payment_method_id</td>");
    sb.appendLine("                 <td><input type='text' id='payment_method_id' name='payment_method_id' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>payment_request_state</td>");
    sb.appendLine("                 <td><input type='text' id='payment_request_state' name='payment_request_state' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>pseReference1</td>");
    sb.appendLine("                 <td><input type='text' id='pseReference1' name='pseReference1' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>pseReference2</td>");
    sb.appendLine("                 <td><input type='text' id='pseReference2' name='pseReference2' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>pseReference3</td>");
    sb.appendLine("                 <td><input type='text' id='pseReference3' name='pseReference3' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>response_message_pol</td>");
    sb.appendLine("                 <td><input type='text' id='response_message_pol' name='response_message_pol' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>shipping_city</td>");
    sb.appendLine("                 <td><input type='text' id='shipping_city' name='shipping_city' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>shipping_country</td>");
    sb.appendLine("                 <td><input type='text' id='shipping_country' name='shipping_country' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>transaction_bank_id</td>");
    sb.appendLine("                 <td><input type='text' id='transaction_bank_id' name='transaction_bank_id' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>transaction_id</td>");
    sb.appendLine("                 <td><input type='text' id='transaction_id' name='transaction_id' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>payment_method_name</td>");
    sb.appendLine("                 <td><input type='text' id='payment_method_name' name='payment_method_name' value='' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td><input type='submit' value='Post' /></td>");
    sb.appendLine("             </tr>");
    sb.appendLine("         </table>");
    sb.appendLine("     </form>");
    sb.appendLine(" </body>");
    sb.appendLine("</html>");

    sb.build(function (error, result) {

        resp.writeHead(200, {
            "Content-Type": "text/html"
        });

        resp.write(result);

        resp.end();

    });

}


function postData(req, resp, data) {

    // Pegar dados do pedido

    // Testes
    var api_key = "4Vj8eK4rloUd272L48hsrarnUA";
    // Produção
    // var api_key = "f3PV2MC6776zydnsgBAB5vPj7s";

    var merchant_id = data.merchant_id;
    var reference_sale = data.reference_sale;
    var value = data.value;
    var currency = data.currency;
    var state_pol = data.state_pol;

    var sign = md5(api_key + "~" + merchant_id + "~" + reference_sale + "~" + value + "~" + currency + "~" + state_pol);

    console.log("Sign: " + sign);

    if (String(data.sign) !== String(sign)) {

        console.log("Assinatura não confere");
        return;

    }

    // Atualizar status no Firebase

    var email = "contato@openmindhouse.com";
    var password = "123456";

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Erro ao autenticar usuário no Firebase");
        return;

    });
    
    console.log("Sucesso ao autenticar usuário");
    
    var order = String(data.description);
    
    console.log("Order: " + order);

    var status;

    switch (state_pol) {

        case "4":

            status = "Pagamento Aprovado";
            break;

        case "5":

            status = "Pagamento Rejeitado";
            break;

        case "6":

            status = "Pagamento Expirado";
            break;

        default:

            console.log("Erro na identificação da aprovação do pagamento");
            status = "Pagamento em Aprovação";
            break;

    }
    
    console.log("Status do pagamento: " + status);

    var values = {};
    values["status"] = status;

    var ref1 = firebase.database().ref('orders').orderByChild('order').equalTo(order);
    
    console.log("Ref1: " + ref1);

    ref1.once('value').then(function (snapshot) {

        console.log("Achou o pedido");

        snapshot.forEach(function (childSnapshot) {

            var key = childSnapshot.key;

            var ref2 = firebase.database().ref('orders').child(key);
            
            console.log("Ref2: " + ref2);

            ref2.update(values);

            console.log("Chave do pedido: " + key);
            console.log("Status do pedido alterado no Firebase para " + status);

        });

    });




    /*resp.writeHead(200, {
        "Content-Type": "text/html"
    });*/

    //resp.send(JSON.stringify);

    //resp.write(merchant_id);

    resp.end();

}



function get404(req, resp) {

    resp.writeHead(404, "Resource not found", {
        "Content-Type": "text/html"
    });

    resp.write("<html><body>404: Resource not found</html></body>");

    resp.end();

}

function get405(req, resp) {

    resp.writeHead(405, "Method not supported", {
        "Content-Type": "text/html"
    });

    resp.write("<html><body>405: Method not supported</html></body>");

    resp.end();

}

function get413(req, resp) {

    resp.writeHead(413, "Request entity too large", {
        "Content-Type": "text/html"
    });

    resp.write("<html><body>413: Request entity too large</html></body>");

    resp.end();

}
