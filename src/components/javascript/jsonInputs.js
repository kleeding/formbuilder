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
            "id": "c7c33b35-e6df-4ae4-a383-e4a3a6df11d0",
            "title": "The First Sectionsss",
            "questions": [
                {
                    "id": "4ec2990c-4fd3-469f-b51d-d1f2cc59924a",
                    "model-name": "q1.1",
                    "label": "Is this a text input?",
                    "component": "text",
                    "default": "pre-filled text",
                    "placeholder": "placeholder text goes here",
                    "validation": [
                        "range-100-300",
                        "validsymbols"
                    ],
                    "required": "false",
                    "options": ""
                },
                {
                    "id": "5160e478-5a59-45a2-ab48-ebb5f091985a",
                    "model-name": "q1.2",
                    "label": "Is this a text input?",
                    "component": "text",
                    "default": "pre-filled text",
                    "placeholder": "placeholder text goes here",
                    "required": "true",
                    "validation": [
                        "alphanumeric",
                        "range-100-300"
                    ],
                    "options": ""
                },
                {
                    "id": "fec4432c-9711-4e27-a4f8-fa9df5f861ad",
                    "model-name": "q1.3",
                    "label": "Choose a date?",
                    "component": "date",
                    "required": "false",
                    "placeholder": "",
                    "default": "",
                    "options": ""
                },
                {
                    "id": "c3eefaed-5898-470b-9013-8a6f7b583517",
                    "model-name": "q1.4",
                    "label": "This is a radio?",
                    "component": "radio",
                    "default": "0",
                    "options": "YesNo",
                    "questions": [
                        {
                            "id": "9e3e0f57-cb02-4653-86fd-5ab33f0b4960",
                            "model-name": "q1.4.1",
                            "label": "Further information",
                            "component": "textarea",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "1",
                            "default": "",
                            "options": ""
                        }
                    ],
                    "required": "false",
                    "placeholder": ""
                },
                {
                    "id": "933d91cf-293b-41aa-8c0f-ca74bf9d684c",
                    "model-name": "q1.5",
                    "label": "Pick some options?",
                    "component": "checkbox",
                    "options": "YesNo",
                    "required": "false",
                    "placeholder": "",
                    "default": ""
                },
                {
                    "id": "3c53d59e-9101-4ce9-83df-d766290256ba",
                    "model-name": "q1.6",
                    "label": "Pick some options?",
                    "component": "checkbox",
                    "options": "YesNo",
                    "required": "true",
                    "placeholder": "",
                    "default": ""
                }
            ]
        },
        {
            "id": "56f49ec5-a59b-42bd-9865-b4241096f8b6",
            "title": "The Second Section",
            "questions": [
                {
                    "id": "2b4948b0-a94d-4f06-b366-d181279c9f98",
                    "model-name": "q2.1",
                    "label": "This is a select?",
                    "component": "select",
                    "options": "q2.1-option",
                    "required": "true",
                    "questions": [
                        {
                            "id": "deb78dd6-69e8-431d-9655-06d97ba7d1f9",
                            "model-name": "q2.1.1",
                            "label": "What do you mean 'One'?",
                            "component": "text",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "1",
                            "validation": [
                                "alphanumeric"
                            ],
                            "default": "",
                            "options": ""
                        },
                        {
                            "id": "c41fa1fe-abf1-402c-bff1-93b4c3fc9145",
                            "model-name": "q2.1.2",
                            "label": "Confirm your choice",
                            "component": "radio",
                            "required": "true",
                            "dependency": "2",
                            "default": "1",
                            "options": "YesNo",
                            "placeholder": ""
                        },
                        {
                            "id": "a28b9c82-bc71-40fa-ab27-17901b5a9d52",
                            "model-name": "q2.1.3",
                            "label": "Further information",
                            "component": "textarea",
                            "placeholder": "placeholder text goes here",
                            "required": "true",
                            "dependency": "3",
                            "default": "",
                            "options": ""
                        },
                        {
                            "id": "55077beb-db8d-41ac-b7e2-61b163d00ff8",
                            "model-name": "q2.1.4",
                            "label": "Did you really mean to pick 'One' or 'Two'?",
                            "component": "radio",
                            "default": "1",
                            "required": "true",
                            "options": "YesNo",
                            "dependency": [
                                "1",
                                "2"
                            ],
                            "placeholder": ""
                        }
                    ],
                    "placeholder": "",
                    "default": ""
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