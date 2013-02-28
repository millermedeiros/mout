// ============================================================================
// this file is used to run specs on multiple environments
// ============================================================================

(function(requirejs, jasmine){


var env = jasmine.getEnv();
var reporter;

var opts = {
    baseUrl : 'spec',
    paths : {
        'mout' : '../../src'
    }
};


if (typeof document !== 'undefined') { // browser ---

    if ('HtmlReporter' in jasmine) { // regular browser ---
        reporter = new jasmine.HtmlReporter();
        // in case the user decides to run a single spec
        env.specFilter = function(spec){
            return reporter.specFilter(spec);
        };

        //fail early local and cache bust
        opts.waitSeconds = (location.protocol === 'file:' || location.href.indexOf('://localhost') !== -1)? 5 : 45;
        opts.urlArgs = 'bust='+ (+new Date());

    } else { // tesling ---
        reporter = new jasmine.TapReporter();
        reporter.log('# testling');
        opts.waitSeconds = 90;
    }

} else { // nodejs ---

    // jasmine-node doesn't expose the TerminalReporter :(
    // see: https://github.com/mhevery/jasmine-node/issues/184
    var TerminalReporter = require('jasmine-node/lib/jasmine-node/reporter').jasmineNode.TerminalReporter;
    reporter = new TerminalReporter({
        color: true,
        onComplete : function(reporter) {
            // need to exit with proper status code if failed some spec
            if ( reporter.results().failedCount ) {
                process.exit(1);
            }
        }
    });

    opts.baseUrl = __dirname + '/spec';
    opts.nodeRequire = require;

}


// load and execute specs, should come after all options and jasmine.getEnv()
// calls

var count = 0;
var interv = setInterval(function(){
// reporter.log('# ********');
    reporter.log('# '+ Object.keys( requirejs.s.contexts._.registry ) );
// reporter.log('# ********');
    if (count++ > 50) {
        clearInterval(interv);
    }
}, 5);

define('foo', ['bar', 'ipsum'], function(){});

requirejs(opts, ['spec-index'], function(){

    clearInterval(interv);

    reporter.log('# -------');
    reporter.log('# defined');
    reporter.log('# -------');
    reporter.log('# '+ Object.keys(requirejs.s.contexts._.defined).join('\n# ') );

    reporter.log('# ----------');
    reporter.log('# urlFetched');
    reporter.log('# ----------');
    reporter.log('# '+ JSON.stringify( requirejs.s.contexts._.urlFetched ).replace(/,"/g, ',\n# "') );

    reporter.log('# ---------');
    reporter.log('# defQueue');
    reporter.log('# ---------');
    reporter.log('# '+ JSON.stringify( requirejs.s.contexts._.defQueue ) );

    reporter.log('# ---------');
    reporter.log('# registry');
    reporter.log('# ---------');
    reporter.log('# '+ Object.keys( requirejs.s.contexts._.registry ) );

    reporter.log('# ===============');

    env.addReporter(reporter);
    env.execute();
    reporter.log('# env.execute() ');
});


}(
  typeof requirejs !== 'undefined'? requirejs : require('requirejs'),
  typeof jasmine !== 'undefined'? jasmine : require('jasmine-node')
));


