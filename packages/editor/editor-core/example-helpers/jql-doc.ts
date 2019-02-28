export const jqlResponse = {
  expand: 'schema,names',
  startAt: 0,
  maxResults: 50,
  total: 16,
  issues: [
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '89621',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/89621',
      key: 'ED-6381',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11711: null,
        customfield_10500: null,
        customfield_11678: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: '2019-02-28T14:06:28.572+1100',
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/2',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/critical.svg',
          name: 'Critical',
          id: '2',
        },
        customfield_10100: null,
        customfield_11673: null,
        customfield_10101: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        customfield_11704: null,
        timeestimate: null,
        aggregatetimeoriginalestimate: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11650: null,
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_11651: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6381/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-28T10:56:11.567+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6381/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2019-02-28T09:08:16.198+1100',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_11632: null,
        customfield_10300:
          '{build={count=1, dataType=build, failedBuildCount=0, successfulBuildCount=1, unknownBuildCount=0}, repository={count=3, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":3,"lastUpdated":"2019-02-28T10:31:00.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":3,"name":"Bitbucket Cloud"}}},"build":{"overall":{"count":1,"lastUpdated":null,"failedBuildCount":0,"successfulBuildCount":1,"unknownBuildCount":0,"dataType":"build"},"byInstanceType":{"cloud-providers":{"count":1,"name":"Other providers"}}}}},"isStale":true}}',
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-28T10:56:11.583+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Max layout length (line length) should be calculated based on dynamic text sizing, not the default.',
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_10005: 'ED-4976',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: "Table scaling doesn't take dynamic text sizing into account",
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11695: null,
        customfield_10002: null,
        customfield_10003: '1|i04jc2:',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@5997c5c0[id=1576,rapidViewId=21,state=ACTIVE,name=\uD83D\uDC69\uD83C\uDFFB‍⚕️Engineering Health Week,goal=,startDate=2019-02-17T23:59:37.992Z,endDate=2019-02-21T23:59:00.000Z,completeDate=<null>,sequence=1576]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_3978223_*|*_10002_*:*_1_*:*_6649_*|*_10300_*:*_1_*:*_0',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '89495',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/89495',
      key: 'ED-6374',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_10500: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/3',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/major.svg',
          name: 'Major',
          id: '3',
        },
        customfield_10100: null,
        customfield_10101: null,
        customfield_11673: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11704: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '81485',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/81485',
            type: {
              id: '10000',
              name: 'Blocks',
              inward: 'is blocked by',
              outward: 'blocks',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10000',
            },
            outwardIssue: {
              id: '87714',
              key: 'CFE-2768',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/87714',
              fields: {
                summary:
                  "[FE] [BLOCKED] Certain macros don't respect column/table boundaries",
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/3',
                  description:
                    'This issue is being actively worked on at the moment by the assignee.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/inprogress.png',
                  name: 'In progress',
                  id: '3',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/4',
                    id: 4,
                    key: 'indeterminate',
                    colorName: 'yellow',
                    name: 'In Progress',
                  },
                },
                priority: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/priority/1',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/priorities/blocker.svg',
                  name: 'Blocker',
                  id: '1',
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
                  id: '10004',
                  description:
                    'A problem which impairs or prevents the functions of the product.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
                  name: 'Bug',
                  subtask: false,
                  avatarId: 10303,
                },
              },
            },
          },
        ],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_11651: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6374/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-28T10:56:16.733+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6374/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2019-02-27T12:09:14.273+1100',
        customfield_11630: null,
        customfield_10023: null,
        customfield_10024: [],
        customfield_10300:
          '{repository={count=4, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":4,"lastUpdated":"2019-02-28T11:10:41.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":4,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10025: null,
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-28T10:56:16.738+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'On insert it should trigger the column min width check and widen the column',
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_11733: null,
        customfield_10005: 'ED-4976',
        security: null,
        customfield_10009: null,
        summary:
          'Inserting a macro into a table cell with dimensions wider than the cell, it doesnt resize until you click',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_10002: null,
        customfield_11695: null,
        customfield_10003: '1|i04ima:',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@5997c5c0[id=1576,rapidViewId=21,state=ACTIVE,name=\uD83D\uDC69\uD83C\uDFFB‍⚕️Engineering Health Week,goal=,startDate=2019-02-17T23:59:37.992Z,endDate=2019-02-21T23:59:00.000Z,completeDate=<null>,sequence=1576]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_59062923_*|*_10002_*:*_1_*:*_4866017_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_18093529',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '88771',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/88771',
      key: 'ED-6338',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: '2019-02-22T11:19:47.466+1100',
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/1',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/blocker.svg',
          name: 'Blocker',
          id: '1',
        },
        customfield_11673: null,
        customfield_10101: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        customfield_11704: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '81131',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/81131',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '85597',
              key: 'CFE-2663',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/85597',
              fields: {
                summary:
                  '[FE] Jira macro breaks out of table instead of being moved beneath the table',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/priority/1',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/priorities/blocker.svg',
                  name: 'Blocker',
                  id: '1',
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
                  id: '10004',
                  description:
                    'A problem which impairs or prevents the functions of the product.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
                  name: 'Bug',
                  subtask: false,
                  avatarId: 10303,
                },
              },
            },
          },
        ],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_11651: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6338/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        aggregatetimespent: null,
        customfield_11641: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-27T12:01:46.422+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6338/watchers',
          watchCount: 2,
          isWatching: false,
        },
        created: '2019-02-22T11:07:18.021+1100',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10300:
          '{repository={count=2, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":2,"lastUpdated":"2019-02-26T11:27:46.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":2,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10025: null,
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-27T12:01:46.427+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'When an bodiless extension is inserted into a table with a layout attribute, we should remove the layout or set it to default.',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Same applies to tables in bodied extensions and columns.',
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_11733: null,
        customfield_10005: null,
        security: null,
        customfield_10009: null,
        summary: 'Nested nodes should not respect their layout or break modes',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11695: null,
        customfield_10002: null,
        customfield_10003: '1|i04cy0:',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@5997c5c0[id=1576,rapidViewId=21,state=ACTIVE,name=\uD83D\uDC69\uD83C\uDFFB‍⚕️Engineering Health Week,goal=,startDate=2019-02-17T23:59:37.992Z,endDate=2019-02-21T23:59:00.000Z,completeDate=<null>,sequence=1576]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_434805561_*|*_10002_*:*_1_*:*_460814_*|*_10300_*:*_1_*:*_0',
        customfield_11600: '2019-02-22T18:28:26.528+1100',
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '87237',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/87237',
      key: 'ED-6214',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11711: null,
        customfield_11678: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/3',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/major.svg',
          name: 'Major',
          id: '3',
        },
        customfield_10101: null,
        customfield_11673: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11704: null,
        versions: [],
        customfield_11703: null,
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '80027',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/80027',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '87270',
              key: 'FEF-5385',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/87270',
              fields: {
                summary: 'Column sizing',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
        ],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6214/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-14T13:52:35.061+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6214/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2019-02-11T16:04:56.989+1100',
        customfield_11630: null,
        customfield_10023: null,
        customfield_10024: [],
        customfield_10300:
          '{repository={count=7, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":7,"lastUpdated":"2019-02-12T15:07:12.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":7,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10025: null,
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-14T13:52:35.066+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'mediaSingle',
              attrs: { layout: 'center' },
              content: [
                {
                  type: 'media',
                  attrs: {
                    id: '91471608-1aa8-47ce-8962-37d862dc02ff',
                    type: 'file',
                    collection: 'jira-87237-field-description',
                    width: 818,
                    height: 322,
                  },
                },
              ],
            },
            { type: 'paragraph', content: [] },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_10005: 'ED-4976',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: 'Resizing a table with rowspans causes unwanted side-effects',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11695: null,
        customfield_10002: null,
        customfield_10003: '1|i046s2:',
        customfield_11698: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@464805a8[id=1508,rapidViewId=21,state=ACTIVE,name=6 Pack - Tables,goal=- Unblock confluence\n- Prototypes\n- Default Marks,startDate=2019-02-05T04:26:09.506Z,endDate=2019-02-12T04:26:00.000Z,completeDate=<null>,sequence=1508]',
        ],
        customfield_10400: null,
        customfield_11601:
          '3_*:*_1_*:*_994972_*|*_10002_*:*_1_*:*_610690_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_249652419',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '87010',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/87010',
      key: 'ED-6192',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/1',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/blocker.svg',
          name: 'Blocker',
          id: '1',
        },
        customfield_11673: null,
        customfield_10101: null,
        labels: ['collab', 'manual-testing'],
        customfield_11303: null,
        customfield_11304: null,
        aggregatetimeoriginalestimate: null,
        customfield_11704: null,
        timeestimate: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6192/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        aggregatetimespent: null,
        customfield_11641: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-11T13:16:18.054+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6192/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2019-02-08T11:37:49.684+1100',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_11632: null,
        customfield_10300:
          '{build={count=1, dataType=build, failedBuildCount=0, successfulBuildCount=1, unknownBuildCount=0}, repository={count=3, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":3,"lastUpdated":"2019-02-08T15:15:03.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":3,"name":"Bitbucket Cloud"}}},"build":{"overall":{"count":1,"lastUpdated":null,"failedBuildCount":0,"successfulBuildCount":1,"unknownBuildCount":0,"dataType":"build"},"byInstanceType":{"cloud-providers":{"count":1,"name":"Other providers"}}}}},"isStale":true}}',
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-25T14:27:39.377+1100',
        timeoriginalestimate: null,
        description: null,
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_10005: 'ED-4976',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary:
          'Deleting a column while another collab user is resizing the same table causes the page to crash',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11695: null,
        customfield_10002: null,
        customfield_11698: null,
        customfield_10003: '1|i045mi:',
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@464805a8[id=1508,rapidViewId=21,state=ACTIVE,name=6 Pack - Tables,goal=- Unblock confluence\n- Prototypes\n- Default Marks,startDate=2019-02-05T04:26:09.506Z,endDate=2019-02-12T04:26:00.000Z,completeDate=<null>,sequence=1508]',
        ],
        customfield_10400: null,
        customfield_11601:
          '3_*:*_1_*:*_11380261_*|*_10002_*:*_1_*:*_5730_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_253722390',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '86207',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/86207',
      key: 'ED-6167',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11711: null,
        customfield_11678: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/2',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/critical.svg',
          name: 'Critical',
          id: '2',
        },
        customfield_10101: null,
        customfield_11673: null,
        labels: ['collab', 'manual-testing'],
        customfield_11303: null,
        customfield_11304: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11704: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '79744',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/79744',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '86746',
              key: 'ED-6187',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/86746',
              fields: {
                summary:
                  'Some odd things happen with tables while collab editing',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
          {
            id: '79442',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/79442',
            type: {
              id: '10003',
              name: 'Relates',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10003',
            },
            inwardIssue: {
              id: '86199',
              key: 'ED-6186',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/86199',
              fields: {
                summary: 'Investigate table with empty rows cxhtml conversion ',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/3',
                  description:
                    'This issue is being actively worked on at the moment by the assignee.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/inprogress.png',
                  name: 'In progress',
                  id: '3',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/4',
                    id: 4,
                    key: 'indeterminate',
                    colorName: 'yellow',
                    name: 'In Progress',
                  },
                },
                priority: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/priority/3',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/priorities/major.svg',
                  name: 'Major',
                  id: '3',
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10002',
                  id: '10002',
                  description: 'A task that needs to be done.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype',
                  name: 'Task',
                  subtask: false,
                  avatarId: 10318,
                },
              },
            },
          },
        ],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3A1f96567a-6867-4786-964b-102b3e1c7c5c',
          name: 'eshvedai',
          key: 'eshvedai',
          accountId: '557058:1f96567a-6867-4786-964b-102b3e1c7c5c',
          emailAddress: 'eshvedai@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Eduard Shvedai',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3A1f96567a-6867-4786-964b-102b3e1c7c5c',
          name: 'eshvedai',
          key: 'eshvedai',
          accountId: '557058:1f96567a-6867-4786-964b-102b3e1c7c5c',
          emailAddress: 'eshvedai@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/ed8e05983d87b1724f08b8cf09d6957c?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fed8e05983d87b1724f08b8cf09d6957c%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Eduard Shvedai',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11650: null,
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_11651: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6167/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-07T16:48:38.503+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6167/watchers',
          watchCount: 1,
          isWatching: true,
        },
        created: '2019-02-04T17:03:16.970+1100',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10300:
          '{build={count=1, dataType=build, failedBuildCount=0, successfulBuildCount=1, unknownBuildCount=0}, repository={count=10, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":10,"lastUpdated":"2019-02-06T17:13:48.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":10,"name":"Bitbucket Cloud"}}},"build":{"overall":{"count":1,"lastUpdated":null,"failedBuildCount":0,"successfulBuildCount":1,"unknownBuildCount":0,"dataType":"build"},"byInstanceType":{"cloud-providers":{"count":1,"name":"Other providers"}}}}},"isStale":true}}',
        customfield_10025: null,
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-12T12:07:12.261+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'We’re getting invalid ADF from Synchrony that causes ',
                },
                { type: 'text', text: 'RangeError', marks: [{ type: 'code' }] },
                { type: 'text', text: ' on columns resize:' },
              ],
            },
            {
              type: 'codeBlock',
              attrs: {},
              content: [
                {
                  type: 'text',
                  text:
                    'index.js:224 Uncaught RangeError: Index 7 out of range for <tableRow(tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node))), tableRow(tableCell(paragraph), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node))), tableRow(tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node))), tableRow(tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node))), tableRow(tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node))), tableRow(tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node))), tableRow(tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)), tableCell(paragraph(text_node)))>\n    at i.child (index.js:224)\n    at i.findIndex (index.js:280)\n    at E.nodeAt (index.js:1201)\n    at m (actions.js:35)\n    at h (actions.js:18)\n    at b (plugin.js:192)',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'The problem is in colwidths attributes that have doubled values:',
                },
              ],
            },
            {
              type: 'codeBlock',
              attrs: {},
              content: [
                {
                  type: 'text',
                  text:
                    '{\n  "colspan": 1,\n  "rowspan": 1,\n  "colwidth": [136, 136],\n  "background": null\n}',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'While ' },
                {
                  type: 'mention',
                  attrs: {
                    id: '557057:95f1ad9a-2b14-4250-b66f-56f38a38fd2a',
                    text: 'Richard Cordova',
                  },
                },
                {
                  type: 'text',
                  text:
                    ' is working on the fix from Synchrony side, we’re going to prevent editor from crashing the page by trying to repair the table on our side.',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Page: ' },
                {
                  type: 'text',
                  text:
                    'https://hello.atlassian.net/wiki/spaces/VOLTRON/pages/edit-v2/389809512',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href:
                          'https://hello.atlassian.net/wiki/spaces/VOLTRON/pages/edit-v2/389809512',
                      },
                    },
                  ],
                },
              ],
            },
            { type: 'paragraph', content: [] },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_11733: null,
        customfield_10005: 'ED-4976',
        security: null,
        customfield_10009: null,
        summary: 'Repair a table when colwidth has more values than colspan',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11695: null,
        customfield_10002: null,
        customfield_10003: '1|i041fm:',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@464805a8[id=1508,rapidViewId=21,state=ACTIVE,name=6 Pack - Tables,goal=- Unblock confluence\n- Prototypes\n- Default Marks,startDate=2019-02-05T04:26:09.506Z,endDate=2019-02-12T04:26:00.000Z,completeDate=<null>,sequence=1508]',
          'com.atlassian.greenhopper.service.sprint.Sprint@2bcfa13a[id=1494,rapidViewId=21,state=CLOSED,name=5 Tables Extraordinary,goal=,startDate=2019-01-30T04:29:27.803Z,endDate=2019-02-05T04:29:00.000Z,completeDate=2019-02-05T04:25:27.112Z,sequence=1494]',
        ],
        customfield_11601:
          '3_*:*_2_*:*_68760214_*|*_10002_*:*_1_*:*_62659293_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_2_*:*_126902037',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '85837',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/85837',
      key: 'ED-6148',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/4',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
          name: 'Minor',
          id: '4',
        },
        customfield_10100: null,
        customfield_11673: null,
        customfield_10101: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        customfield_11704: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        versions: [],
        customfield_11703: null,
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6148/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-01T10:19:28.177+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6148/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2019-01-31T15:05:55.119+1100',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_10300:
          '{build={count=1, dataType=build, failedBuildCount=0, successfulBuildCount=1, unknownBuildCount=0}, repository={count=7, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":7,"lastUpdated":"2019-02-01T09:46:20.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":7,"name":"Bitbucket Cloud"}}},"build":{"overall":{"count":1,"lastUpdated":null,"failedBuildCount":0,"successfulBuildCount":1,"unknownBuildCount":0,"dataType":"build"},"byInstanceType":{"cloud-providers":{"count":1,"name":"Other providers"}}}}},"isStale":true}}',
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-01T10:19:33.373+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'autoSize is needed for Confluence table migration',
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_10005: 'ED-4976',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: 'Tables with __autoSize go into an infinite loop',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_10002: null,
        customfield_11695: null,
        customfield_11698: null,
        customfield_10003: '1|i03zje:',
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@2bcfa13a[id=1494,rapidViewId=21,state=CLOSED,name=5 Tables Extraordinary,goal=,startDate=2019-01-30T04:29:27.803Z,endDate=2019-02-05T04:29:00.000Z,completeDate=2019-02-05T04:25:27.112Z,sequence=1494]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_1478494_*|*_10002_*:*_1_*:*_5209_*|*_10300_*:*_1_*:*_67729364_*|*_10600_*:*_1_*:*_0',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '85762',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/85762',
      key: 'ED-6133',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_10500: null,
        customfield_11711: null,
        customfield_11678: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: '2019-02-15T10:44:25.460+1100',
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/4',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
          name: 'Minor',
          id: '4',
        },
        customfield_10100: null,
        customfield_10101: null,
        customfield_11673: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        timeestimate: null,
        aggregatetimeoriginalestimate: null,
        customfield_11704: null,
        versions: [],
        customfield_11703: null,
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '79978',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/79978',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '87086',
              key: 'FEF-5313',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/87086',
              fields: {
                summary: 'New editor and table column width',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
        ],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11650: null,
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6133/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        aggregatetimespent: null,
        customfield_11641: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2019-02-13T14:00:31.054+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-6133/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2019-01-31T08:52:51.557+1100',
        customfield_11630: null,
        customfield_10023: null,
        customfield_10024: [],
        customfield_11632: null,
        customfield_10025: null,
        customfield_10300:
          '{repository={count=32, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":32,"lastUpdated":"2019-02-18T17:16:34.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":32,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-19T11:35:48.861+1100',
        timeoriginalestimate: null,
        description: null,
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_10005: 'ED-4976',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: "Table resizing doesn't sync in collab editing",
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11695: null,
        customfield_10002: null,
        customfield_11698: null,
        customfield_10003: '1|hzv3mn:003rj',
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@464805a8[id=1508,rapidViewId=21,state=ACTIVE,name=6 Pack - Tables,goal=- Unblock confluence\n- Prototypes\n- Default Marks,startDate=2019-02-05T04:26:09.506Z,endDate=2019-02-12T04:26:00.000Z,completeDate=<null>,sequence=1508]',
          'com.atlassian.greenhopper.service.sprint.Sprint@2bcfa13a[id=1494,rapidViewId=21,state=CLOSED,name=5 Tables Extraordinary,goal=,startDate=2019-01-30T04:29:27.803Z,endDate=2019-02-05T04:29:00.000Z,completeDate=2019-02-05T04:25:27.112Z,sequence=1494]',
        ],
        customfield_11601:
          '3_*:*_3_*:*_380766652_*|*_10002_*:*_2_*:*_552388969_*|*_10001_*:*_2_*:*_33668432_*|*_10300_*:*_2_*:*_174835457',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '74868',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/74868',
      key: 'ED-5552',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_10500: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/4',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
          name: 'Minor',
          id: '4',
        },
        customfield_10100: null,
        customfield_10101: null,
        customfield_11673: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        customfield_11704: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '71558',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/71558',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '75374',
              key: 'ED-5585',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/75374',
              fields: {
                summary:
                  'Show a shadow indicator on the edge for horizontal scrollable content',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/priority/4',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
                  name: 'Minor',
                  id: '4',
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10001',
                  id: '10001',
                  description:
                    'A user story. Created by JIRA Software - do not edit or delete.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/issuetypes/story.svg',
                  name: 'Story',
                  subtask: false,
                },
              },
            },
          },
        ],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5a838414a08cc5310a6c9a63',
          name: 'vsutrave',
          key: 'vsutrave',
          accountId: '5a838414a08cc5310a6c9a63',
          emailAddress: 'vsutrave@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Vijay Sutrave',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5a838414a08cc5310a6c9a63',
          name: 'vsutrave',
          key: 'vsutrave',
          accountId: '5a838414a08cc5310a6c9a63',
          emailAddress: 'vsutrave@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/2b91916372efa91da6337638ff085c6a?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F2b91916372efa91da6337638ff085c6a%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Vijay Sutrave',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_11651: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5552/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-11-02T15:10:06.976+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5552/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2018-10-18T13:40:05.854+1100',
        customfield_11630: null,
        customfield_10023: null,
        customfield_10024: [],
        customfield_10300:
          '{repository={count=7, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":7,"lastUpdated":"2018-11-02T15:11:07.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":7,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_11632: null,
        customfield_10025: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2018-11-02T15:10:06.980+1100',
        timeoriginalestimate: null,
        description: null,
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_11733: null,
        customfield_10005: 'ED-5377',
        security: null,
        customfield_10009: null,
        summary:
          'Renderer does not show shadow for tables/code blocks with horizontal scroll',
        customfield_11694: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Steps to reproduce:' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Expected:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Actual:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'OTHER INFORMATION:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Crash link:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'STACK TRACE:',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11693: null,
        customfield_11696: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Error states' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need an error state (is there any case where something like network might fail)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'If there are multiple input fields, is there constraints on any of the individual fields? (eg character limit on the name of a component is 255)',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the error states?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Empty state' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Does it need an empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Do we have designs and IX for the empty state?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Permissions' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What permissions are required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'What do we do if the user does not have permission (eg show the screen with a no permissions empty state or not allow the user to get to this screen in the first place)?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Are there special conditions in which this feature can be accessed (for example, only show backlog if backlog feature is enabled)?What analytics should be fired to validate success?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Network' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            "If it hits the network, what are the API's and query parameters/Graph queries we need to use?",
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'What do the responses look like?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Design:' }],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Do we have all assets required in the feature attached to the ticket?',
                  marks: [{ type: 'strong' }],
                },
              ],
            },
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Other' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there old or existing code that can be removed with the addition of this new code?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it need to be stored/ cached on the device',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Is there any on-boarding required for this feature?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text:
                            'Does it require a feature flag? If so, where should we add the flag?',
                          marks: [{ type: 'strong' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_10002: null,
        customfield_11695: null,
        customfield_11698: null,
        customfield_10003: '1|i02fgh:i',
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@423585a2[id=1297,rapidViewId=21,state=CLOSED,name=51 Rodrigo starts,goal=,startDate=2018-10-31T03:29:04.913Z,endDate=2018-11-14T03:29:00.000Z,completeDate=2018-11-14T05:16:37.593Z,sequence=1297]',
          'com.atlassian.greenhopper.service.sprint.Sprint@25ebe1e1[id=1284,rapidViewId=21,state=CLOSED,name=50 Indentation is coming!,goal=,startDate=2018-10-23T09:10:47.372Z,endDate=2018-10-30T09:10:00.000Z,completeDate=2018-10-31T03:28:40.162Z,sequence=1284]',
        ],
        customfield_10400: null,
        customfield_11601:
          '3_*:*_1_*:*_414441680_*|*_10002_*:*_2_*:*_804733947_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_82225503',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '69885',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/69885',
      key: 'ED-5305',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_10500: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/1',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/blocker.svg',
          name: 'Blocker',
          id: '1',
        },
        customfield_10101: null,
        customfield_11673: null,
        labels: ['collab'],
        customfield_11303: null,
        customfield_11304: null,
        timeestimate: null,
        aggregatetimeoriginalestimate: null,
        customfield_11704: null,
        versions: [],
        customfield_11703: null,
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '65607',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/65607',
            type: {
              id: '10003',
              name: 'Relates',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10003',
            },
            inwardIssue: {
              id: '68637',
              key: 'CFE-1725',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/68637',
              fields: {
                summary:
                  '"something\'s gone wrong" Error - every 1-2 minutes ( i can\'t use the editor)',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10001',
                  description: '',
                  iconUrl: 'https://product-fabric.atlassian.net/',
                  name: 'Done',
                  id: '10001',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                priority: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/priority/1',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/priorities/blocker.svg',
                  name: 'Blocker',
                  id: '1',
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
                  id: '10004',
                  description:
                    'A problem which impairs or prevents the functions of the product.',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
                  name: 'Bug',
                  subtask: false,
                  avatarId: 10303,
                },
              },
            },
          },
        ],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5305/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-09-06T14:19:55.288+1000',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5305/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2018-09-06T09:49:13.940+1000',
        customfield_11630: null,
        customfield_10023: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_11632: null,
        customfield_10300:
          '{repository={count=9, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":9,"lastUpdated":"2018-09-13T11:40:28.000+1000","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":9,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-12T12:35:11.962+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'If one session has focus in a table cell and the other session changes the table position (by adding lines above), the menu loses its dom ref and throws.',
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_11733: null,
        customfield_10005: 'ED-4976',
        security: null,
        customfield_10009: null,
        summary:
          'FloatingContextualMenu throws when position changes in collab editing mode',
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_10002: null,
        customfield_11695: null,
        customfield_10003: '1|i01q9u:',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@2308d5b1[id=1144,rapidViewId=21,state=CLOSED,name=✏️ Pyatigorsk,goal=,startDate=2018-09-04T05:54:01.956Z,endDate=2018-09-11T05:54:00.000Z,completeDate=2018-09-11T05:48:21.009Z,sequence=1144]',
          'com.atlassian.greenhopper.service.sprint.Sprint@7598669b[id=1151,rapidViewId=21,state=CLOSED,name=44 Fourty Two,goal=,startDate=2018-09-11T05:48:56.899Z,endDate=2018-09-18T05:48:00.000Z,completeDate=2018-09-18T06:24:17.206Z,sequence=1151]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_1194772_*|*_10002_*:*_1_*:*_178638_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_14867946',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '69672',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/69672',
      key: 'ED-5301',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/2',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/critical.svg',
          name: 'Critical',
          id: '2',
        },
        customfield_10101: null,
        customfield_11673: null,
        labels: ['visual-regression'],
        customfield_11303: null,
        customfield_11304: null,
        customfield_11704: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        versions: [],
        customfield_11703: null,
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '65434',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/65434',
            type: {
              id: '10003',
              name: 'Relates',
              inward: 'relates to',
              outward: 'relates to',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10003',
            },
            inwardIssue: {
              id: '69510',
              key: 'FEF-2615',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/69510',
              fields: {
                summary:
                  "Can't edit status lozenge, user profile pic or image inside tables.",
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10001',
                  description: '',
                  iconUrl: 'https://product-fabric.atlassian.net/',
                  name: 'Done',
                  id: '10001',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
        ],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [
          {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/component/11310',
            id: '11310',
            name: 'Floating toolbars',
          },
        ],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5301/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-09-06T14:13:50.818+1000',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5301/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2018-09-04T11:08:54.138+1000',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_10300:
          '{repository={count=5, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":5,"lastUpdated":"2018-09-06T14:15:39.000+1000","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":5,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-14T14:33:45.204+1100',
        timeoriginalestimate: null,
        description: null,
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_10005: 'ED-1259',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: "Extension toolbar doesn't show when selected inside a table",
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_11695: null,
        customfield_10002: null,
        customfield_11698: null,
        customfield_10003: '1|i01p6a:',
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@2308d5b1[id=1144,rapidViewId=21,state=CLOSED,name=✏️ Pyatigorsk,goal=,startDate=2018-09-04T05:54:01.956Z,endDate=2018-09-11T05:54:00.000Z,completeDate=2018-09-11T05:48:21.009Z,sequence=1144]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_4011_*|*_10002_*:*_1_*:*_619315_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_183273364',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '65765',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/65765',
      key: 'ED-5155',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_10500: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/4',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
          name: 'Minor',
          id: '4',
        },
        customfield_10100: null,
        customfield_11673: null,
        customfield_10101: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        customfield_11704: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [
          {
            id: '62974',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/62974',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '66837',
              key: 'FEF-2362',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/66837',
              fields: {
                summary:
                  'Cell helper menu items do not place themselves correctly based on screen position',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
          {
            id: '64804',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/64804',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '67764',
              key: 'FEF-2451',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/67764',
              fields: {
                summary:
                  'Table colour toolbar renders out of bounds of viewport',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
          {
            id: '64719',
            self:
              'https://product-fabric.atlassian.net/rest/api/3/issueLink/64719',
            type: {
              id: '10002',
              name: 'Duplicate',
              inward: 'is duplicated by',
              outward: 'duplicates',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issueLinkType/10002',
            },
            inwardIssue: {
              id: '68756',
              key: 'FEF-2530',
              self:
                'https://product-fabric.atlassian.net/rest/api/3/issue/68756',
              fields: {
                summary:
                  'Background Colour picker falls off the right side of the screen when editing cells on the right',
                status: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/status/10600',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/images/icons/statuses/generic.png',
                  name: 'Duplicate',
                  id: '10600',
                  statusCategory: {
                    self:
                      'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
                    id: 3,
                    key: 'done',
                    colorName: 'green',
                    name: 'Done',
                  },
                },
                issuetype: {
                  self:
                    'https://product-fabric.atlassian.net/rest/api/3/issuetype/10400',
                  id: '10400',
                  description: '',
                  iconUrl:
                    'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10300&avatarType=issuetype',
                  name: 'Feedback',
                  subtask: false,
                  avatarId: 10300,
                },
              },
            },
          },
        ],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557057%3A736e88a9-5b69-4fa3-a8d4-97c29a97e991',
          name: 'poye',
          key: 'poye',
          accountId: '557057:736e88a9-5b69-4fa3-a8d4-97c29a97e991',
          emailAddress: 'poye@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Phil Oye',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557057%3A736e88a9-5b69-4fa3-a8d4-97c29a97e991',
          name: 'poye',
          key: 'poye',
          accountId: '557057:736e88a9-5b69-4fa3-a8d4-97c29a97e991',
          emailAddress: 'poye@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/b99e9ee055b28adbaf0f05cc1b7da345?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fb99e9ee055b28adbaf0f05cc1b7da345%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Phil Oye',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5155/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-09-10T14:52:50.636+1000',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5155/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2018-07-27T15:12:15.493+1000',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_10300:
          '{repository={count=5, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":5,"lastUpdated":"2018-09-10T14:58:57.000+1000","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":5,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2018-09-10T14:52:50.641+1000',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'At smaller viewports, the contextual table cell colour menu can get cut off.',
                },
              ],
            },
            {
              type: 'mediaSingle',
              attrs: { layout: 'center' },
              content: [
                {
                  type: 'media',
                  attrs: {
                    id: 'e4dfb2db-e88d-41fb-956c-6da9cfe22480',
                    type: 'file',
                    collection: '',
                    width: 200,
                    height: 183,
                  },
                },
              ],
            },
            { type: 'paragraph', content: [{ type: 'text', text: ' ' }] },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_10005: 'ED-4461',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: 'Table contextual menu cell colour menu is not viewport aware',
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_10002: null,
        customfield_11695: null,
        customfield_11698: null,
        customfield_10003: '1|i01ow6:',
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@2308d5b1[id=1144,rapidViewId=21,state=CLOSED,name=✏️ Pyatigorsk,goal=,startDate=2018-09-04T05:54:01.956Z,endDate=2018-09-11T05:54:00.000Z,completeDate=2018-09-11T05:48:21.009Z,sequence=1144]',
        ],
        customfield_10400: null,
        customfield_11601:
          '3_*:*_1_*:*_18316659_*|*_10002_*:*_1_*:*_3528293842_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_340224651',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '63704',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/63704',
      key: 'ED-5050',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11711: null,
        customfield_11678: null,
        customfield_10500: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/3',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/major.svg',
          name: 'Major',
          id: '3',
        },
        customfield_11673: null,
        customfield_10101: null,
        labels: ['manual-testing'],
        customfield_11303: null,
        customfield_11304: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11704: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3A14f955e1-0b75-4e74-bc5e-2e6463d7fe73',
          name: 'brodgers',
          key: 'brodgers',
          accountId: '557058:14f955e1-0b75-4e74-bc5e-2e6463d7fe73',
          emailAddress: 'brodgers@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Bradley Rodgers',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3A14f955e1-0b75-4e74-bc5e-2e6463d7fe73',
          name: 'brodgers',
          key: 'brodgers',
          accountId: '557058:14f955e1-0b75-4e74-bc5e-2e6463d7fe73',
          emailAddress: 'brodgers@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/62c14744e239a113e1dbcfca9480ba10?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F62c14744e239a113e1dbcfca9480ba10%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Bradley Rodgers',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11650: null,
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5050/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-09-18T11:59:22.079+1000',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5050/watchers',
          watchCount: 3,
          isWatching: false,
        },
        created: '2018-07-11T12:10:14.760+1000',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_10300:
          '{repository={count=3, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":3,"lastUpdated":"2018-09-18T11:58:05.000+1000","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":3,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-12T17:02:37.603+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'I highlighted the text in a table cell because I wanted to change the text to something else. When I typed a character, it brought up all the cells from the row below and created a column for each of them.',
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Video here ' },
                {
                  type: 'text',
                  text: 'https://cl.ly/3M0c2a461V0e',
                  marks: [
                    {
                      type: 'link',
                      attrs: { href: 'https://cl.ly/3M0c2a461V0e' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11500: null,
        customfield_11621: null,
        customfield_11733: null,
        customfield_10005: 'ED-4976',
        security: null,
        customfield_10009: null,
        summary: 'Replacing text in a table cell results weird behaviour',
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_10002: null,
        customfield_11695: null,
        customfield_10003: '1|i00w3j:',
        customfield_11698: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@2308d5b1[id=1144,rapidViewId=21,state=CLOSED,name=✏️ Pyatigorsk,goal=,startDate=2018-09-04T05:54:01.956Z,endDate=2018-09-11T05:54:00.000Z,completeDate=2018-09-11T05:48:21.009Z,sequence=1144]',
          "com.atlassian.greenhopper.service.sprint.Sprint@1beee51f[id=1068,rapidViewId=21,state=CLOSED,name=✏️ShipIt & Scott's last sprint,goal=,startDate=2018-08-21T06:34:37.705Z,endDate=2018-09-03T06:34:00.000Z,completeDate=2018-09-04T05:54:17.254Z,sequence=1068]",
          'com.atlassian.greenhopper.service.sprint.Sprint@7598669b[id=1151,rapidViewId=21,state=CLOSED,name=44 Fourty Two,goal=,startDate=2018-09-11T05:48:56.899Z,endDate=2018-09-18T05:48:00.000Z,completeDate=2018-09-18T06:24:17.206Z,sequence=1151]',
        ],
        customfield_10400: null,
        customfield_11601:
          '3_*:*_1_*:*_1044648221_*|*_10002_*:*_1_*:*_4844767042_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_71532068',
        customfield_11600: '2018-08-20T12:10:41.318+1000',
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '63258',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/63258',
      key: 'ED-5030',
      fields: {
        customfield_11683: null,
        fixVersions: [],
        customfield_11682: null,
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11678: null,
        customfield_10500: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/4',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
          name: 'Minor',
          id: '4',
        },
        customfield_11673: null,
        customfield_10101: null,
        labels: ['visual-regression'],
        customfield_11303: null,
        customfield_11304: null,
        aggregatetimeoriginalestimate: null,
        timeestimate: null,
        customfield_11704: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [
          {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/component/15352',
            id: '15352',
            name: 'gap-cursor',
          },
        ],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3A0b97ef40-a145-4b6a-b4e9-da3e4b50ddec',
          name: 'aro',
          key: 'aro',
          accountId: '557058:0b97ef40-a145-4b6a-b4e9-da3e4b50ddec',
          emailAddress: 'aro@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Agnes Ro',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3A0b97ef40-a145-4b6a-b4e9-da3e4b50ddec',
          name: 'aro',
          key: 'aro',
          accountId: '557058:0b97ef40-a145-4b6a-b4e9-da3e4b50ddec',
          emailAddress: 'aro@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/33fae61081fa919cc4adb15a417d16ff?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F33fae61081fa919cc4adb15a417d16ff%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Agnes Ro',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11645: null,
        customfield_11403: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5030/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-10-30T11:22:03.904+1100',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-5030/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2018-07-06T11:28:17.767+1000',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_10025: null,
        customfield_10300:
          '{repository={count=3, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":3,"lastUpdated":"2018-10-29T18:31:04.000+1100","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":3,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_11632: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2019-02-27T13:07:31.088+1100',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'mediaSingle',
              attrs: { layout: 'center' },
              content: [
                {
                  type: 'media',
                  attrs: {
                    id: 'ce28294b-234f-4733-9e75-6dc746aae52d',
                    type: 'file',
                    collection: '',
                    width: 200,
                    height: 183,
                  },
                },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_10005: 'ED-4461',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: 'Gap cursor is showing in the middle of the table',
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_10002: null,
        customfield_11695: null,
        customfield_10003: '1|i02jnl:r',
        customfield_11698: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@61f0eb6a[id=1253,rapidViewId=21,state=CLOSED,name=UX Day,goal=,startDate=2018-10-28T22:19:03.849Z,endDate=2018-10-29T10:19:00.000Z,completeDate=2018-10-31T03:28:16.181Z,sequence=1253]',
        ],
        customfield_10400: null,
        customfield_11601:
          '3_*:*_1_*:*_7759984_*|*_10002_*:*_1_*:*_9938504132_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_72162034',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        customfield_11728: null,
        duedate: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '61976',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/61976',
      key: 'ED-4947',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_10500: null,
        customfield_11678: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/4',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/minor.svg',
          name: 'Minor',
          id: '4',
        },
        customfield_10100: null,
        customfield_11673: null,
        customfield_10101: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        timeestimate: null,
        customfield_11704: null,
        aggregatetimeoriginalestimate: null,
        versions: [],
        customfield_11703: null,
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        customfield_11709: null,
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5a73b1732d61371e861f3130',
          name: 'ahixon',
          key: 'ahixon',
          accountId: '5a73b1732d61371e861f3130',
          emailAddress: 'ahixon@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Alexander Hixon',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        customfield_11650: null,
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5a73b1732d61371e861f3130',
          name: 'ahixon',
          key: 'ahixon',
          accountId: '5a73b1732d61371e861f3130',
          emailAddress: 'ahixon@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/15ab638f4bf4970956c707ad334805ef?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F15ab638f4bf4970956c707ad334805ef%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Alexander Hixon',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11644: null,
        customfield_11402: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-4947/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        aggregatetimespent: null,
        customfield_11641: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-07-30T15:51:38.243+1000',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-4947/watchers',
          watchCount: 2,
          isWatching: false,
        },
        created: '2018-06-22T14:19:10.057+1000',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_11632: null,
        customfield_10025: null,
        customfield_10300:
          '{repository={count=3, dataType=repository}, json={"cachedValue":{"errors":[],"summary":{"repository":{"overall":{"count":3,"lastUpdated":"2018-07-30T15:40:37.000+1000","dataType":"repository"},"byInstanceType":{"bitbucket":{"count":3,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2018-07-30T15:51:38.249+1000',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Probably to do with interaction with prosemirror-tables not copying the attributes along with the ',
                },
                { type: 'text', text: 'table', marks: [{ type: 'code' }] },
                { type: 'text', text: ' DOM node' },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_10005: 'ED-4976',
        customfield_11733: null,
        security: null,
        customfield_10009: null,
        summary: 'Copying tables drops attributes',
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_11695: null,
        customfield_10002: null,
        customfield_10003: '1|i01002:6',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@4300fb8[id=1031,rapidViewId=21,state=CLOSED,name=Oscar \uD83C\uDFC6,goal=,startDate=2018-07-24T04:53:17.485Z,endDate=2018-08-03T04:53:00.000Z,completeDate=2018-08-13T06:16:14.715Z,sequence=1031]',
          'com.atlassian.greenhopper.service.sprint.Sprint@322a0d1b[id=1006,rapidViewId=21,state=CLOSED,name=✏️ France \uD83C\uDFC6,goal=,startDate=2018-07-17T04:43:38.113Z,endDate=2018-07-24T04:43:00.000Z,completeDate=2018-07-24T04:52:37.305Z,sequence=1006]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_1014624567_*|*_10002_*:*_1_*:*_2165378537_*|*_10200_*:*_1_*:*_85722330_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_23022762',
        customfield_11600: '2018-07-18T15:37:16.506+1000',
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
    {
      expand:
        'operations,versionedRepresentations,editmeta,changelog,renderedFields',
      id: '61632',
      self: 'https://product-fabric.atlassian.net/rest/api/3/issue/61632',
      key: 'ED-4921',
      fields: {
        customfield_11683: null,
        customfield_11682: null,
        fixVersions: [],
        customfield_11200: null,
        resolution: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/resolution/10000',
          id: '10000',
          description: 'Work has been completed on this issue.',
          name: 'Done',
        },
        customfield_11720: null,
        customfield_11686: null,
        customfield_11678: null,
        customfield_10500: null,
        customfield_11711: null,
        customfield_11713: null,
        customfield_11712: null,
        customfield_11715: null,
        customfield_11717: null,
        customfield_11719: null,
        customfield_11718: null,
        lastViewed: null,
        customfield_11670: null,
        customfield_11671: null,
        customfield_10100: null,
        priority: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/priority/3',
          iconUrl:
            'https://product-fabric.atlassian.net/images/icons/priorities/major.svg',
          name: 'Major',
          id: '3',
        },
        customfield_10101: null,
        customfield_11673: null,
        labels: [],
        customfield_11303: null,
        customfield_11304: null,
        timeestimate: null,
        aggregatetimeoriginalestimate: null,
        customfield_11704: null,
        customfield_11703: null,
        versions: [],
        customfield_11705: null,
        customfield_11708: null,
        issuelinks: [],
        assignee: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=5b29a0b8c1daa065f98fe943',
          name: 'nflew',
          key: 'nflew',
          accountId: '5b29a0b8c1daa065f98fe943',
          emailAddress: 'nflew@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/13fcb1644be46eb28a2969070a059499?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2F13fcb1644be46eb28a2969070a059499%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Nathan Flew',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11709: null,
        status: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/status/10001',
          description: '',
          iconUrl: 'https://product-fabric.atlassian.net/',
          name: 'Done',
          id: '10001',
          statusCategory: {
            self:
              'https://product-fabric.atlassian.net/rest/api/3/statuscategory/3',
            id: 3,
            key: 'done',
            colorName: 'green',
            name: 'Done',
          },
        },
        components: [],
        customfield_11300: null,
        customfield_11301: null,
        customfield_11302: null,
        customfield_10600: null,
        aggregatetimeestimate: null,
        creator: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3Affd3d35b-5342-4c5b-882b-dd2f18828914',
          name: 'ckrishnakumar',
          key: 'ckrishnakumar',
          accountId: '557058:ffd3d35b-5342-4c5b-882b-dd2f18828914',
          emailAddress: 'ckrishnakumar@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Chethana Krishnakumar',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        subtasks: [],
        reporter: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/user?accountId=557058%3Affd3d35b-5342-4c5b-882b-dd2f18828914',
          name: 'ckrishnakumar',
          key: 'ckrishnakumar',
          accountId: '557058:ffd3d35b-5342-4c5b-882b-dd2f18828914',
          emailAddress: 'ckrishnakumar@atlassian.com',
          avatarUrls: {
            '48x48':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue',
            '24x24':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=24&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D24%26noRedirect%3Dtrue',
            '16x16':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=16&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D16%26noRedirect%3Dtrue',
            '32x32':
              'https://avatar-cdn.atlassian.com/c4cdfe909a80d4d722afea746d2c4e93?s=32&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fc4cdfe909a80d4d722afea746d2c4e93%3Fd%3Dmm%26s%3D32%26noRedirect%3Dtrue',
          },
          displayName: 'Chethana Krishnakumar',
          active: true,
          timeZone: 'Australia/Sydney',
        },
        customfield_11650: null,
        aggregateprogress: { progress: 0, total: 0 },
        customfield_11652: null,
        customfield_10200: {
          hasEpicLinkFieldDependency: false,
          showField: false,
          nonEditableReason: {
            reason: 'EPIC_LINK_SHOULD_BE_USED',
            message: 'To set an epic as the parent, use the epic link instead',
          },
        },
        customfield_11651: null,
        customfield_11654: null,
        customfield_11653: null,
        customfield_11403: null,
        customfield_11645: null,
        customfield_11402: null,
        customfield_11644: null,
        customfield_11647: null,
        customfield_11646: null,
        customfield_11649: null,
        customfield_11648: null,
        progress: { progress: 0, total: 0 },
        votes: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-4921/votes',
          votes: 0,
          hasVoted: false,
        },
        issuetype: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issuetype/10004',
          id: '10004',
          description:
            'A problem which impairs or prevents the functions of the product.',
          iconUrl:
            'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
          name: 'Bug',
          subtask: false,
          avatarId: 10303,
        },
        timespent: null,
        project: {
          self: 'https://product-fabric.atlassian.net/rest/api/3/project/11001',
          id: '11001',
          key: 'ED',
          name: 'Fabric Editor',
          projectTypeKey: 'software',
          avatarUrls: {
            '48x48':
              'https://product-fabric.atlassian.net/secure/projectavatar?pid=11001&avatarId=11101',
            '24x24':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=small&pid=11001&avatarId=11101',
            '16x16':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=xsmall&pid=11001&avatarId=11101',
            '32x32':
              'https://product-fabric.atlassian.net/secure/projectavatar?size=medium&pid=11001&avatarId=11101',
          },
        },
        customfield_11000: null,
        customfield_11641: null,
        aggregatetimespent: null,
        customfield_11640: null,
        customfield_11643: null,
        customfield_11642: null,
        customfield_11634: null,
        customfield_11633: null,
        customfield_11636: null,
        customfield_11635: null,
        customfield_11638: null,
        customfield_11637: null,
        resolutiondate: '2018-06-29T11:57:35.204+1000',
        customfield_11639: null,
        workratio: -1,
        watches: {
          self:
            'https://product-fabric.atlassian.net/rest/api/3/issue/ED-4921/watchers',
          watchCount: 1,
          isWatching: false,
        },
        created: '2018-06-20T11:20:25.745+1000',
        customfield_10023: null,
        customfield_11630: null,
        customfield_10024: [],
        customfield_11632: null,
        customfield_10300:
          '{pullrequest={dataType=pullrequest, state=MERGED, stateCount=1}, json={"cachedValue":{"errors":[],"summary":{"pullrequest":{"overall":{"count":1,"lastUpdated":"2018-06-27T13:48:37.253+1000","stateCount":1,"state":"MERGED","dataType":"pullrequest","open":false},"byInstanceType":{"bitbucket":{"count":1,"name":"Bitbucket Cloud"}}}}},"isStale":true}}',
        customfield_10025: null,
        customfield_10026: null,
        customfield_11623: null,
        customfield_11622: null,
        customfield_11625: null,
        customfield_11624: null,
        customfield_11627: null,
        customfield_11626: null,
        customfield_11629: null,
        customfield_11628: null,
        updated: '2018-06-29T11:57:35.208+1000',
        timeoriginalestimate: null,
        description: {
          version: 1,
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'there is no way to differentiate actions inside of a table header.',
                },
                { type: 'hardBreak' },
                {
                  type: 'text',
                  text:
                    'would be nice to have the same behaviour as date for actions / inline code inside of table header ',
                },
                { type: 'hardBreak' },
                { type: 'text', text: 'attached screenshot ' },
              ],
            },
          ],
        },
        customfield_11100: null,
        customfield_11621: null,
        customfield_11500: null,
        customfield_11733: null,
        customfield_10005: 'ED-4461',
        security: null,
        customfield_10009: null,
        summary: 'make actions / inline code opaque inside of table header',
        customfield_11694: null,
        customfield_11693: null,
        customfield_11696: null,
        customfield_10002: null,
        customfield_11695: null,
        customfield_10003: '1|i00opa:r',
        customfield_11698: null,
        customfield_10400: null,
        customfield_10004: [
          'com.atlassian.greenhopper.service.sprint.Sprint@5e80d05c[id=952,rapidViewId=21,state=CLOSED,name=✏️ World Cup Week 3! ⚽️,goal=,startDate=2018-06-26T10:58:03.366Z,endDate=2018-07-03T10:58:00.000Z,completeDate=2018-07-03T04:40:19.224Z,sequence=952]',
        ],
        customfield_11601:
          '3_*:*_1_*:*_13738572_*|*_10002_*:*_1_*:*_600364947_*|*_10001_*:*_1_*:*_0_*|*_10300_*:*_1_*:*_165725948',
        customfield_11600: null,
        environment: null,
        customfield_11726: null,
        duedate: null,
        customfield_11728: null,
        customfield_11729: null,
      },
    },
  ],
};
