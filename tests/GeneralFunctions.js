//***********************************************
//*                Pré-Requisitos               *
//***********************************************
var Promise = require('promise');
var fs = require('fs'); //para escrever em arquivo
//-----------------------------------------------

var GF = function () {

    //Define se é um site em angular ou não
    //Não sendo um site em angular desativa a espera por carregamentos o que permite usar o DSL "element <.find>" ao invés de "browser.drive <.find>"
    this.isAngularSite = function (flag) {
        browser.ignoreSynchronization = !flag;
    }

    this.navegar_para_URL = function (Url_sistema) {
        browser.get(Url_sistema);
    }

    //Aguarda até que a URL tenha mudado e contenha o texto indicado
    this.waitsForUrlChange = function (regex_Url_part, timout_miliseconds, log_msg) {
        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                //Registro um log caso solicitado
                if (log_msg.length > 0) {
                    if ((regex_Url_part).test(url)) {
                        console.log(log_msg);
                    }
                }
                //Permite continua quando true
                return (regex_Url_part).test(url);
            });
        }, timout_miliseconds);
    }

    //Aguarda o tempo solicitado e retorna um promise
    this.wait = function (miliseconds) {
        return new Promise(
            function (resolve, reject) {
                intId = setInterval(function () {
                    resolve();
                }, miliseconds);
            });
    }

    //salva em arquivo - função privada
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    };

    //Salva a tela
    this.salvarTela = function (nome) {
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'tests/registros/' + nome + '.png');
        });
    };


};

module.exports = new GF();