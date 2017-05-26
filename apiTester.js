const request = require('request');
const readline = require('readline');
const rp = require('request-promise');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.write("List of available methods: \n");
rl.write("\t 1.-Get\n");
rl.write("\t 2.-Post\n");
rl.write("\t 3.-Put\n");
rl.write("Note: for post, put and delete methods, specify the method and the times of the request e.g. post 100 \n");
    
rl.question('Which metod to test?: ', (answer) => {
    var answerArr = answer.split(' ');
    //Get method
    if(answerArr[0]=='get'){
        request.get(
                'http://nld.bdtdevelop.com/apiAngular2/index.php/restaurantes',
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            let json =JSON.parse(body);                            
                            
                            if(answerArr[1]=='count'){
                                console.log('Total objects recived: '+json.data.length)
                            }
                            else{
                                console.log(json.data)
                            }
                        }
                        else{
                            console.log(error)
                        }
                        console.info('Status code: '+response.statusCode)//dump all the response
                        console.info('Response message: '+response.statusMessage)//dump all the response
                    }
        );
    }

    //Post method
    if(answerArr[0]=='post'){
        
        var headers = {"Content-Type":"application/x-www-form-urlencoded"};
        var req = answerArr[1];
        var contador = 0;
        for(var i = 1; i <= req; i++){
            let json =JSON.stringify({"id":i,"nombre":"apiTestNombre"+i,"direccion":'apiTestDireccion'+i,"descripcion":'apiTestDescripcion'+i,"imagen":'',"precio":'medio'});
            let params ="json="+json;

            request.post({
                headers: { headers },
                url:     'http://nld.bdtdevelop.com/apiAngular2/index.php/restaurantes',
                body:    params
                }, function(error, response, body){
                            if (!error && response.statusCode == 200) {
                                contador++;
                            }else{
                                console.error(error)  //dump error data
                                console.info(response.statusCode)//dump all the response
                                console.info(response.statusMessage)//dump all the response
                            }
                });
        }
        console.log(req + " objetos insertados exitosamente.")
    }

    //Put method
    if(answerArr[0]=='put'){
        // request.post(
        //         'http://nld.bdtdevelop.com/apiAngular2/index.php/restaurantes',
        //         { json: { key: 'value' } },
        //             function (error, response, body) {
        //                 if (!error && response.statusCode == 200) {
        //                     console.log(body)
        //                 }
        //                 console.error(error)  //dump error data
        //                 console.info(response.statusCode)//dump all the response
        //                 console.info(response.statusMessage)//dump all the response
        //             }
        // );
    }
    
    //Delete method
    if(answerArr[0]=='delete'){
        // request.post(
        //         'http://nld.bdtdevelop.com/apiAngular2/index.php/restaurantes',
        //         { json: { key: 'value' } },
        //             function (error, response, body) {
        //                 if (!error && response.statusCode == 200) {
        //                     console.log(body)
        //                 }
        //                 console.error(error)  //dump error data
        //                 console.info(response.statusCode)//dump all the response
        //                 console.info(response.statusMessage)//dump all the response
        //             }
        // );
    }
  rl.close();
});