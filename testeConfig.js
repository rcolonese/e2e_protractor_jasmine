exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //Mais de uma caminho pode ser informa, embora eu não ver motivo pra isso
    //Abaixo estou informando que todos os arquivos terminados com '-spec.js'
    specs: ['tests/*-spec.js'],
    //specs: ['tests/angularjs.org-spec.js'],
    
    //Aqui posso informar em quais browsers quero que seja testado
    multiCapabilities: [
        //{'browserName': 'safari'}//, 
        {'browserName': 'chrome'}//,
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
}