export function validate(input, details) {
    var validationErrors = [];

    if(details.required) {
        var error = isNonEmpty(input, details.component);
        if(error != "") validationErrors.push(error);
    }

    var validators = details.validation;

    if(validators === undefined 
        || validators.length === 0 
        || ["select","radio","checkbox"].includes(details.component)) 
        return validationErrors ?? [];

    validators.forEach(validator => {
        var { validatorName, params } = getValidatorSettings(validator);
        if(validatorName.toLowerCase() == 'nonempty' && required) return;
        var error = runValidator(input, validatorName, params);
        if(error != "") validationErrors.push(error);
    });

    return validationErrors ?? [];
}

function getValidatorSettings(validator){
    var settings = validator.split("-")
    var validatorName = settings[0];
    var params = [];
    if(settings.length > 1) params = settings.slice(1);
    return { validatorName, params };
}

function runValidator(input, validatorName, params) {
    switch (validatorName.toLowerCase()) {
        case 'nonempty':
            return isNonEmpty(input);
        case 'alpha':
            return isAlpha(input);
        case 'numeric':
            return isNumeric(input);
        case 'alphanumeric':
            return isAlphanumeric(input);
        case 'validsymbols':
            return isValidSymbols(input);
        case 'range':
            return isInRange(input, params);
        case 'greater':
            return isGreater(input, params);
        case 'less':
            return isLess(input, params);
        default:
            return "Unknown validation rule";
    }
}

function isNonEmpty(input, component) {
    if(Array.isArray(input)) return input.length === 0 ? "Must not be empty." : "";
    if(component === 'select') return input === "0" ? "Must make a selection." : "";
    return input.replace(/\s/g, '').length ? "" : "Must not be empty.";
}

function isAlpha(input) {
    if(input == "") return "";
    if(input.match(/^[a-z]+$/i)) return "";
    return "Must only contain alphabet characters.";
}

function isNumeric(input) {
    if(input == "") return "";
    if(input.match(/^[0-9]+$/i)) return "";
    return "Must only contain numbers.";
}

function isAlphanumeric(input) {
    if(input == "") return "";
    if(input.match(/^[a-z0-9]+$/i)) return "";
    return "Must be alphanumeric.";
}

function isValidSymbols(input) {
    if(input == "") return "";
    if(input.match(/[<>#&{}]/g)) return "Contains invalid symbols.";
    return "";
}

function isInRange(input, params) {
    var num = parseFloat(input);
    if(isNaN(num)) return "Not a number.";
    if(params.length != 2 || isNaN(params[0]) || isNaN(params[1])) return "Validation set up incorrectly."
    if(num >= params[0] && num <= params[1]) return "";
    return `Must be between ${params[0]} and ${params[1]}.`
}

function isGreater(input, params) {
    var num = parseFloat(input);
    if(isNaN(num)) return "Not a number.";
    if(params.length != 1 || isNaN(params[0])) return "Validation set up incorrectly."
    if(num >= params[0]) return "";
    return `Must be greater than or equal to ${params[0]}.`
}

function isLess(input) {
    var num = parseFloat(input);
    if(isNaN(num)) return "Not a number.";
    if(params.length != 1 || isNaN(params[0])) return "Validation set up incorrectly."
    if(num <= params[0]) return "";
    return `Must be less than or equal to ${params[0]}.`
}

/**
 * VALIDATION FOR:
 * [ ] TEXT: nonempty/validsymbols/alpha/numeric/alphanumeric/range/greater/less
 * [ ] TEXTAREA: same as above
 * [X] SELECT: nonempty/(single option default valdiaiton)
 * [X] RADIO: nonempty/(single option default validation)
 * [X] CHECKBOX: nonempty/
 * [X] DATE: nonempty/valid/range/greater/less
 */