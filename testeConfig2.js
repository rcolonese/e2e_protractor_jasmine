//Este arquivo de inicialização dos teste foi criado para rodar 
//os testes feitos em Jasmine2.x para exemplificar como é feito 
//o tratamento do sincronismo
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //Mais de uma caminho pode ser informa, embora eu não ver motivo pra isso
    //Abaixo estou informando que todos os arquivos terminados com '-spec.js'
    specs: ['tests/Ionic2_spec.js'],
    //specs: ['tests/angularjs.org-spec.js'],

    //Aqui posso informar em quais browsers quero que seja testado
    multiCapabilities: [
        //{'browserName': 'safari'}//, 
        {
            'browserName': 'chrome'
        } //,
        //{'browserName': 'firefox'}
    ],

    // ---- 4. To connect directly to Drivers ------------------------------------
    // Boolean. If true, Protractor will connect directly to the browser Drivers
    // at the locations specified by chromeDriver and firefoxPath. Only Chrome
    // and Firefox are supported for direct connect.
    directConnect: true,


    // Path to the firefox application binary. If null, will attempt to find
    // firefox in the default locations.
    firefoxPath: null,

    // Specify you want to use jasmine 2.x as you would with mocha and cucumber.
    framework: 'jasmine2'
}