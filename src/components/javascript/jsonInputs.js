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
                        "nonempty", 
                        "alphanumeric",
                        "range-100-300"
                    ]
                },
                {
                    "id": "1.2",
                    "model-name": "q1.2",
                    "label": "Choose a date?",
                    "component": "date",
                    "default": "2026-03-31"
                },
                {
                    "id": "1.3",
                    "model-name": "q1.3",
                    "label": "This is a radio?",
                    "component": "radio",
                    "default": "0",
                    "options": "YesNo",
                    "questions": [
                        {
                            "id": "1.3.1",
                            "model-name": "q1.3.1",
                            "label": "Further information",
                            "component": "textarea",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "1"
                        }
                    ]
                },
                {
                    "id": "1.4",
                    "model-name": "q1.4",
                    "label": "Pick some options?",
                    "component": "checkbox",
                    "options": "YesNo"
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
                                "nonempty",
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


/**
 * GOING TO TURN THIS INTO A SECOND FORM SCHEMA WHERE
 * - ALL QUESTIONS ARE LISTED IN A SINGLE ARRAY
 * - EACH QUESTION HAS A PARENT FIELD THAT LINKS IT WITH IT'S DEPENDENCY
 * 
 * GOING TO TRY AND DO THIS IN A WAY WHERE THE TWO SCHEMAS CAN BE USED INTERCHANGEABLY
 */
export const example2 = (`[
    {
        "id": "1",
        "model-name": "q1",
        "required": "true",
        "label": "This is a radio question?",
        "component": "radio",
        "default": "0",
        "options": [
            {
                "label": "Yes",
                "value": "1"
            },
            {
                "label": "No",
                "value": "0"
            }
        ],
        "questions": [
            {
                "id": "1.1",
                "model-name": "q1.1",
                "label": "This is a textarea question?",
                "component": "textarea",
                "placeholder": "This is placeholder text",
                "dependency": "1"
            }
        ]
    },
    {
        "id": "2",
        "model-name": "q2",
        "label": "This is a text question?",
        "component": "text",
        "placeholder": "This is placeholder text"
    },
    {
        "id": "3",
        "model-name": "q3",
        "label": "This is a textarea question?",
        "component": "textarea",
        "default": "This is a default value"
    },
    {
        "id": "4",
        "model-name": "q4",
        "label": "This is a select question?",
        "component": "select",
        "options": [
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
                "label": "Three",
                "value": "3"
            }
        ]
    }
]`);