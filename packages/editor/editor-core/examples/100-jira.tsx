// import * as React from 'react';
// import styled from 'styled-components';

// import { JiraSelect, Options } from './jira/JiraSelect';
// import json from './data/createMeta.json';

// const projects: Options = json.projects.map(project => ({
//   label: project.name,
//   value: project.key,
//   iconUrl: project.avatarUrls['16x16'],
// }));

// const issueTypes: Options = json.projects[0].issuetypes.map(issueType => ({
//   label: issueType.name,
//   value: issueType.id,
//   iconUrl: issueType.iconUrl,
// }));

// const JiraCreate = styled.div`
//   display: flex;
// `;

// /*
// {optionLabel({
//   label: 'Hello',
//   iconUrl:
//     'https://product-fabric.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10315&avatarType=issuetype',
//   value: 'Hello',
// })}
// */

// export default () => (
//   <JiraCreate>
//     <JiraSelect options={projects} />
//     <JiraSelect options={issueTypes} />
//   </JiraCreate>
// );
