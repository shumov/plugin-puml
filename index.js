var plantumlEncoder = require('plantuml-encoder');
var Iconv  = require('iconv').Iconv;
var iconv = new Iconv('ISO-8859-1', 'UTF-8');

module.exports = {
    blocks: {
        plantuml: {
            process: function(block) {
                var defaultFormat = this.generator == 'ebook'? 'png' : 'svg';
                var format = block.kwargs.format || defaultFormat;

                // Generate url

                console.log('-----BEFORE');
                console.log(block.body);

                var text = iconv.convert(block.body);

                console.log('-----AFTER');
                console.log(text);

                var encoded = plantumlEncoder.encode(text);
                var href = 'http://www.plantuml.com/plantuml/' + format + '/' + encoded;

                return '<img src="' + href + '" />';
            }
        }
    }
};
