var env = jasmine.getEnv();
var reporter = new jasmine.TapReporter();

// ---

curl({
    // preloads:['../lib/curl_debug'],
    baseUrl : 'spec',
    paths : {
        mout : '../../src'
    }
}, ['spec-index'], function(){

    env.addReporter(reporter);
    env.execute();

});

