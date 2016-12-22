const querystring = require('querystring');

const nestedObj = {
    foo: {
        bar: {
            baz: 'fk'
        }
    }
};

const otherNestedObj = {
    foo: {
        bar: 'fk'
    }
}

const simpleObj = {
    foo: 'bar'
}


console.log('nested object: ' + querystring.stringify(nestedObj));
console.log('other nested object: ' + querystring.stringify(otherNestedObj));
console.log('simple object: ' + querystring.stringify(simpleObj));
