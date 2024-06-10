export const dagData = [
    {
       "task": {
          "workflowTaskID": 187,
          "teamName": "Business",
          "status": "In-Progress",
          "predecessorIDs": [
             0
          ]
       },
       "children": [
          {
             "task": {
                "workflowTaskID": 188,
                "teamName": "Development",
                "status": "New",
                "predecessorIDs": [
                   187
                ]
             },
             "children": [
                {
                   "task": {
                      "workflowTaskID": 189,
                      "teamName": "Quality Assurance",
                      "status": "At Risk",
                      "predecessorIDs": [
                         188
                      ]
                   },
                   "children": [
                     {
                        "task": {
                           "workflowTaskID": 191,
                           "teamName": "Marketing",
                           "status": "Completed",
                           "predecessorIDs": [
                              189,
                              190
                           ]
                        },
                        "children": []
                     }
                   ]
                },
                {
                  "task": {
                     "workflowTaskID": 190,
                     "teamName": "Dev Ops",
                     "status": "In-Progress",
                     "predecessorIDs": [
                        188,
                        194
                     ]
                  },
                  "children": [
                     {
                        "task": {
                           "workflowTaskID": 191,
                           "teamName": "Leadership",
                           "status": "In-Progress",
                           "predecessorIDs": [
                              180,
                              190
                           ]
                        },
                        "children": []
                     }
                  ]
               }
             ]
          },
          
       ]
    },
    {
       "task": {
          "workflowTaskID": 192,
          "teamName": "Development",
          "status": "In-Progress",
          "predecessorIDs": [
             0
          ]
       },
       "children": [
         {
            "task": {
               "workflowTaskID": 194,
               "teamName": "Marketing",
               "status": "In-Progress",
               "predecessorIDs": [
                  192
               ]
            },
            "children": [
               {
                  "task": {
                     "workflowTaskID": 190,
                     "teamName": "Business",
                     "status": "New",
                     "predecessorIDs": [
                        188,
                        194
                     ]
                  },
                  "children": [
                     {
                        "task": {
                           "workflowTaskID": 191,
                           "teamName": "Dev Ops",
                           "status": "Past Due",
                           "predecessorIDs": [
                              189,
                              190
                           ]
                        },
                        "children": []
                     }
                  ]
               }
            ]
         }
       ]
    },
    {
       "task": {
          "workflowTaskID": 193,
          "teamName": "Quality Assurance",
          "status": "Completed",
          "predecessorIDs": [
             0
          ]
       },
       "children": []
    }
 ]