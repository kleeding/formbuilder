export function validate(input, validators) {
    console.log(input, validators);
    var validationErrors = [];

    validators.forEach(validator => {
        var { validatorName, params } = getValidatorSettings(input, validator);
        var error = runValidator(input, validatorName, params);
        if(error != "") validationErrors.push(error);
    });

    return validationErrors ?? [];
}

function getValidatorSettings(input, validator){
    var settings = validator.split("-")
    var validatorName = settings[0];
    var params = [];
    if(settings.length > 1) params = settings.slice(1);
    return { validatorName, params };
}

function runValidator(input, validatorName, params) {
    switch (validatorName) {
        case 'nonempty':
            return nonEmpty(input);
        case 'alphanumeric':
            return alphanumeric(input);
        case 'range':
            return range(input, params);
        case 'greater':
            return greater(input, params);
        case 'less':
            return less(input, params);
        default:
            return "Unknown validation rule";
    }
}

function nonEmpty(input){
    if(input.replace(/\s/g, '').length) return "";
    return "Must not be empty.";
}

function alphanumeric(input){
    if(input == "") return "";
    if(input.match(/^[a-z0-9]+$/i)) return "";
    return "Must be alphanumeric.";
}

function range(input, params){
    var num = parseFloat(input);
    if(isNaN(num)) return "Not a number.";
    if(params.length != 2 || isNaN(params[0]) || isNaN(params[1])) return "Validation not set up correctly."
    if(num >= params[0] && num <= params[1]) return "";
    return `Must be between ${params[0]} and ${params[1]}.`
}

function greater(input){
    return ""
}

function less(input){
    return ""
}