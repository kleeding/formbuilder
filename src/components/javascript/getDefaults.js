export function getDefault(question) {
    if(question.hasOwnProperty('default') && question.default !== "") {
        return question.default;
    }
    if(question.hasOwnProperty('component') && typeDefaults.hasOwnProperty(question.component)) {
        return typeDefaults[question.component];
    }
    return "";
}

const typeDefaults = {
    'text': "",
    'textarea': "",
    'radio': "1",
    'select': "0",
    'checkbox': [],
    'date': new Date().toISOString().slice(0, 10)
}