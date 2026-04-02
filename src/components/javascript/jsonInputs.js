/**
 * WHAT ABOUT MULTI PAGED QUOTES? 
 *  - ADD A PAGE FIELD
 *  - NEW PAGE COMPONENT 
 *      - IF PAGE FIELDS EXIST THEN PAGE COMPONENT WITH V-FOR LOOP IN THIS
 *      - IF PAGE FIELD DOES NOT EXIST THEN TREAT AS SINGLE PAGE 
 */

export const example = (`{
    "title": "My First Form",
    "sections": [
        {
            "id": "1",
            "title": "The First Section",
            "questions": [
                {
                    "id": "1.1",
                    "model-name": "q1.1",
                    "label": "Is this a text input?",
                    "component": "text",
                    "default": "pre-filled text",
                    "placeholder": "placeholder text goes here",
                    "validation": [
                        "range-100-300",
                        "validsymbols"
                    ]
                },
                {
                    "id": "1.2",
                    "model-name": "q1.2",
                    "label": "Is this a text input?",
                    "component": "text",
                    "default": "pre-filled text",
                    "placeholder": "placeholder text goes here",
                    "required": "true",
                    "validation": [
                        "alphanumeric",
                        "range-100-300"
                    ]
                },
                {
                    "id": "1.3",
                    "model-name": "q1.3",
                    "label": "Choose a date?",
                    "component": "date"
                },
                {
                    "id": "1.4",
                    "model-name": "q1.4",
                    "label": "This is a radio?",
                    "component": "radio",
                    "default": "0",
                    "options": "YesNo",
                    "questions": [
                        {
                            "id": "1.4.1",
                            "model-name": "q1.4.1",
                            "label": "Further information",
                            "component": "textarea",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "1"
                        }
                    ]
                },
                {
                    "id": "1.5",
                    "model-name": "q1.5",
                    "label": "Pick some options?",
                    "component": "checkbox",
                    "options": "YesNo"
                },
                {
                    "id": "1.6",
                    "model-name": "q1.6",
                    "label": "Pick some options?",
                    "component": "checkbox",
                    "options": "YesNo",
                    "required": "true"
                }
            ]
        },
        {
            "id": "2",
            "title": "The Second Section",
            "questions": [
                {
                    "id": "2.1",
                    "model-name": "q2.1",
                    "label": "This is a select?",
                    "component": "select",
                    "options": "q2.1-option",
                    "required": "true",
                    "questions": [
                        {
                            "id": "2.1.1",
                            "model-name": "q2.1.1",
                            "label": "What do you mean 'One'?",
                            "component": "text",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "1",
                            "validation": [
                                "alphanumeric"
                            ]
                        },
                        {
                            "id": "2.1.2",
                            "model-name": "q2.1.2",
                            "label": "Confirm your choice",
                            "component": "radio",
                            "required": "true",
                            "dependency": "2",
                            "default": "1",
                            "options": "YesNo"
                        },
                        {
                            "id": "2.1.3",
                            "model-name": "q2.1.3",
                            "label": "Further information",
                            "component": "textarea",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "3"
                        },
                        {
                            "id": "2.1.4",
                            "model-name": "q2.1.4",
                            "label": "Did you really mean to pick 'One' or 'Two'?",
                            "component": "radio",
                            "default": "1",
                            "required": "true",
                            "options": "YesNo",
                            "dependency": ["1","2"]
                        }
                    ]
                }
            ]
        }
        
    ],
    "options": {
        "YesNo": [
            {
                "label": "Yes",
                "value": "1"
            },
            {
                "label": "No",
                "value": "0"
            }
        ],
        "q2.1-option": [
            {
                "label": "Please Select",
                "value": "0"
            },
            {
                "label": "One",
                "value": "1"
            },
            {
                "label": "Two",
                "value": "2"
            },
            {
                "label": "Other",
                "value": "3"
            }
        ]
    }
}`);