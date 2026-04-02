import { getDefault } from '../javascript/getDefaults';

export function createModel(formData, oldModel) {
    var newModel = createFormModel(formData);
    newModel = replaceValues(newModel, oldModel);
    return newModel;
}

function createFormModel(formData){
    return searchStack([formData]);
}

function replaceValues(newModel, oldModel){
    Object.keys(oldModel).forEach(key => {
        if(newModel.hasOwnProperty(key)) newModel[key] = oldModel.value[key];
    });
    return newModel;
}

function searchStack(stack) {
    var model = {};
    while (stack?.length > 0) {
        var currentObj = stack.pop();
        if(currentObj.hasOwnProperty('model-name')){
            var defaultValue = getDefault(currentObj);
            model[currentObj['model-name']] = {'value': defaultValue, 'validation': '' };
        }
        Object.keys(currentObj).forEach(key => {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                stack.push(currentObj[key]);
            }
        });
    }
    return model;
}