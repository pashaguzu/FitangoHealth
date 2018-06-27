/*
Fragments
run in graphql
{
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
 */
export const FragmentMatchers = [
    {
        "kind": "UNION",
        "name": "PlanElementUnion",
        "possibleTypes": [
            {
                "name": "PlanElementChecklist"
            },
            {
                "name": "PlanElementRadio"
            },
            {
                "name": "PlanElementText"
            },
            {
                "name": "PlanElementLink"
            },
            {
                "name": "PlanElementLine"
            },
            {
                "name": "PlanElementMedia"
            },
            {
                "name": "PlanElementTextInput"
            },
            {
                "name": "Assessment"
            },
            {
                "name": "Tracker"
            }
        ]
    }/*,
                {
                    kind: 'INTERFACE',
                    name: 'Markup',
                    possibleTypes: [
                        {
                            name: 'DecorationMarkup'
                        },
                        {
                            name: 'LinkMarkup'
                        }
                    ]
                }*/
];