export const example = (`{
    "title": "My First Form",
    "sections": [
        {
            "id": "c4328808-cb4b-475e-91a2-a0855cec4ad5",
            "title": "A Section About Text",
            "questions": [
                {
                    "id": "124b465f-6071-491b-a30f-67be07ab8396",
                    "model-name": "text1",
                    "label": "This is a text field",
                    "component": "text",
                    "required": "false",
                    "placeholder": "Enter text here",
                    "default": "",
                    "options": "",
                    "validation": [],
                    "dependency": ""
                },
                {
                    "id": "110fe86e-7746-4066-8c84-cab3ea58bec4",
                    "model-name": "text2",
                    "label": "This is a text field that is required",
                    "component": "text",
                    "required": "true",
                    "placeholder": "Enter text here",
                    "default": "",
                    "options": "",
                    "validation": [],
                    "dependency": ""
                },
                {
                    "id": "ee89e4c9-eb49-44c7-b1c5-1eeed9f96c89",
                    "model-name": "textarea1",
                    "label": "This is a textarea",
                    "component": "textarea",
                    "required": "false",
                    "placeholder": "Enter text here",
                    "default": "",
                    "options": "",
                    "validation": []
                }
            ]
        },
        {
            "id": "8a483da6-ad18-43ee-8391-0a9e1a556b6e",
            "title": "A Section About Inputs with Options",
            "questions": [
                {
                    "id": "4419cf9f-436e-4392-a131-2b76e1bfd44c",
                    "model-name": "radio1",
                    "label": "This is a radio button",
                    "component": "radio",
                    "required": "false",
                    "placeholder": "",
                    "default": "",
                    "options": "YesNo",
                    "validation": []
                },
                {
                    "id": "25b0fd1a-b2b9-4baa-80f0-3cdc0ddab582",
                    "model-name": "radio2",
                    "label": "This is a radio button with dependents (click yes)",
                    "component": "radio",
                    "required": "false",
                    "placeholder": "",
                    "default": "0",
                    "options": "YesNo",
                    "validation": [],
                    "questions": [
                        {
                            "id": "16352b5c-477e-4076-b80a-a8f8b254024b",
                            "model-name": "textarea3",
                            "label": "This is a textarea that is dependent on the above radio button",
                            "component": "textarea",
                            "required": "false",
                            "placeholder": "Enter text here",
                            "dependency": "1",
                            "default": "",
                            "options": "",
                            "validation": []
                        }
                    ]
                },
                {
                    "id": "6fb842c9-fdca-47ee-977d-a04779cbfca1",
                    "model-name": "select1",
                    "label": "This is a select input",
                    "component": "select",
                    "required": "false",
                    "placeholder": "",
                    "default": "0",
                    "options": "BasicOptions",
                    "dependency": "",
                    "validation": [],
                    "questions": [
                        {
                            "id": "129c36c5-c0f7-4ef6-9dfa-6adfef754aa5",
                            "model-name": "text3",
                            "label": "This text depends on the above select being OptionOne",
                            "component": "text",
                            "required": "false",
                            "placeholder": "Enter text here",
                            "default": "",
                            "options": "",
                            "dependency": "1",
                            "validation": []
                        },
                        {
                            "id": "1e035480-ae8c-4e24-b6c6-2de6f2c4d808",
                            "model-name": "textarea4",
                            "label": "This textarea depends on the above select being OptionTwo",
                            "component": "textarea",
                            "required": "false",
                            "placeholder": "Enter text here",
                            "default": "",
                            "options": "",
                            "dependency": "2",
                            "validation": []
                        },
                        {
                            "id": "df1baca8-9dd3-4cd7-80c8-393e3c1ef4b3",
                            "model-name": "text4",
                            "label": "This text depends on the above select being OptionThree or OptionFour",
                            "component": "text",
                            "required": "false",
                            "placeholder": "Enter text here",
                            "default": "",
                            "options": "",
                            "dependency": [
                                "3",
                                "4"
                            ],
                            "validation": []
                        },
                        {
                            "id": "942ed0eb-43e6-4154-91ba-bd6ee5a8461f",
                            "model-name": "radio3",
                            "label": "This radio depends on the above select being OptionOne or OptionFive",
                            "component": "radio",
                            "required": "false",
                            "placeholder": "",
                            "default": "",
                            "options": "YesNo",
                            "dependency": [
                                "1",
                                "5"
                            ],
                            "validation": []
                        }
                    ]
                },
                {
                    "id": "2566e699-c6a1-4673-a2aa-4e997a79d552",
                    "model-name": "checkbox1",
                    "label": "This is a checkbox input with dependents",
                    "component": "checkbox",
                    "required": "false",
                    "placeholder": "",
                    "default": "",
                    "options": "MoreOptions",
                    "dependency": "",
                    "validation": []
                }
            ]
        },
        {
            "id": "0a47e7c2-1582-4218-b44d-7ff80f490e14",
            "title": "A Section About Other Inputs And Options",
            "questions": [
                {
                    "id": "b611786a-7672-463c-9805-50a6dc16cf3a",
                    "model-name": "date1",
                    "label": "This is a date input",
                    "component": "date",
                    "required": "false",
                    "placeholder": "",
                    "default": "",
                    "options": "",
                    "dependency": "",
                    "validation": []
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
        "BasicOptions": [
            {
                "label": "Please Select",
                "value": "0"
            },
            {
                "label": "OptionOne",
                "value": "1"
            },
            {
                "label": "OptionTwo",
                "value": "2"
            },
            {
                "label": "OptionThree",
                "value": "3"
            },
            {
                "label": "OptionFour",
                "value": "4"
            },
            {
                "label": "OptionFive",
                "value": "5"
            }
        ],
        "MoreOptions": [
            {
                "label": "BoxOne",
                "value": "1"
            },
            {
                "label": "BoxTwo",
                "value": "2"
            },
            {
                "label": "BoxThree",
                "value": "3"
            },
            {
                "label": "BoxFour",
                "value": "4"
            }
        ]
    }
}`);