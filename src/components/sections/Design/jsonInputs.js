export const example = (`{
    "title": "My First Form",
    "questions-1": [
        {
            "id": "m.1",
            "model-name": "qm.1",
            "label": "Untitled section question?",
            "component": "textarea",
            "questions": [
                {
                    "id": "m.1.1",
                    "model-name": "qm.1.1",
                    "label": "This is a child question?",
                    "component": "text"
                }
            ]
        }
    ],
    "sections-1": [
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
                    "placeholder": "placeholder text goes here"
                },
                {
                    "id": "1.2",
                    "model-name": "q1.2",
                    "label": "This is a radio?",
                    "component": "radio",
                    "default": "1",
                    "options": [
                        {
                            "label": "Yes",
                            "value": "1"
                        },
                        {
                            "label": "No",
                            "value": "0"
                        }
                    ]
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
                    "label": "Another text input?",
                    "component": "text",
                    "default": "This is a default set text input",
                    "required": "true"
                },
                {
                    "id": "2.2",
                    "model-name": "q2.2",
                    "label": "This is a textarea?",
                    "component": "textarea"
                },
                {
                    "id": "2.3",
                    "model-name": "q2.3",
                    "label": "This is a select?",
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
                    ],
                    "required": "true"
                }
            ]
        }
    ],
    "questions-2": [
        {
            "id": "m.2",
            "model-name": "qm.2",
            "label": "Untitled section question?",
            "component": "textarea",
            "questions": [
                {
                    "id": "m.2.1",
                    "model-name": "qm.2.1",
                    "label": "This is a child question?",
                    "component": "text"
                }
            ]
        }
    ],
    "sections-2": [
        {
            "id": "3",
            "title": "The Third Section",
            "questions": [
                {
                    "id": "3.1",
                    "model-name": "q3.1",
                    "label": "Is this a text input?",
                    "component": "text",
                    "placeholder": "placeholder text goes here"
                }
            ]
        },
        {
            "id": "4",
            "title": "The Fourth Section",
            "questions": [
                {
                    "id": "4.1",
                    "model-name": "q4.1",
                    "label": "This is a select?",
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
                    ],
                    "required": "true"
                }
            ]
        }
    ]
}`);


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