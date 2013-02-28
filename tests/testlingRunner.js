var env = jasmine.getEnv();
var reporter = new jasmine.TapReporter();

// ----

var count = 0;
var interv = setInterval(function(){
// reporter.log('# ********');
    reporter.log('# '+ Object.keys( requirejs.s.contexts._.registry ) );
    reporter.log('# '+ JSON.stringify( requirejs.s.contexts._.urlFetched ).replace(/,"/g, ',\n# "') );
// reporter.log('# ********');
    if (count++ > 50) {
        clearInterval(interv);
    }
}, 5);


requirejs({
    baseUrl : 'spec',
    paths : {
        'mout' : '../../src'
    }
}, [
    'array/spec-append',
    'array/spec-combine',
    'array/spec-compact',
    'array/spec-contains',
    'array/spec-difference',
    'array/spec-every',
    'array/spec-filter',
    'array/spec-find',
    'array/spec-findIndex',
    'array/spec-flatten',
    'array/spec-forEach',
    'array/spec-indexOf',
    'array/spec-insert',
    'array/spec-intersection',
    'array/spec-invoke',
    'array/spec-join',
    'array/spec-lastIndexOf',
    'array/spec-map',
    'array/spec-max',
    'array/spec-min',
    'array/spec-pick',
    'array/spec-pluck',
    'array/spec-range',
    'array/spec-reduce',
    'array/spec-reduceRight',
    'array/spec-reject',
    'array/spec-remove',
    'array/spec-removeAll',
    'array/spec-shuffle',
    'array/spec-some',
    'array/spec-sort',
    'array/spec-split',
    'array/spec-toLookup',
    'array/spec-union',
    'array/spec-unique',
    'array/spec-xor',
    'array/spec-zip'
], function(){

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
});
