import * as React from 'react';
import data from './helper/jira-adf-descriptions-quantitative.json';
import { EmailSerializer, renderDocument } from '../src';
import Pagination from '@atlaskit/pagination';

const emailSerializer = new EmailSerializer();
const dataArr = Object.keys(data).map(k => ({
  ...data[k],
  key: k,
}));
const ITEMS_PER_PAGE = 200;
const pagesCount = Math.ceil(dataArr.length / ITEMS_PER_PAGE);
const pages = Array.apply(null, { length: pagesCount }).map(
  (i: any, idx: number) => idx + 1,
);

const traverseNode = (node: any, stats: any) => {
  if (node.type) {
    stats[node.type] = stats[node.type] ? stats[node.type] + 1 : 1;
  }
  if (node.content) {
    for (const childNode of node.content) {
      traverseNode(childNode, stats);
    }
  }
};

export default class Example extends React.Component<{}, {}> {
  emailTextareaRef?: any;
  state = {
    page: 1,
  };
  constructor(props: any) {
    super(props);
  }

  handleChange = (event: React.SyntheticEvent<any>, newPage: any) =>
    this.setState({ page: newPage });

  getStats = (data: any) => {
    const stats: any = {};
    for (const idx in data) {
      const doc = data[idx].data;
      traverseNode(doc, stats);
    }
    delete stats.doc;
    const arr = [];
    for (const key in stats) {
      arr.push({
        node: key,
        count: stats[key],
      });
    }
    return arr.sort((a, b) => b.count - a.count);
  };

  copyHTMLToClipboard = (key: string) => () => {
    if (!this.emailTextareaRef) return;
    this.emailTextareaRef.value = renderDocument<string>(
      data[key].data,
      emailSerializer,
    ).result;
    this.emailTextareaRef.select();
    document.execCommand('copy');
  };

  render() {
    const start = (this.state.page - 1) * ITEMS_PER_PAGE;
    const documents = dataArr.slice(start, start + ITEMS_PER_PAGE);
    const rows = documents.map(issue => {
      const html = renderDocument<string>(issue.data, emailSerializer).result;
      if (html) {
        return (
          <div>
            <div
              key={`${issue.key}-hr`}
              style={{
                backgroundColor: '#8f4990',
                padding: '0 20px',
              }}
            >
              <a
                href={issue.link}
                style={{
                  color: 'white',
                  textDecoration: 'underline',
                }}
              >
                {issue.key}
              </a>
              <button
                onClick={this.copyHTMLToClipboard(issue.key)}
                style={{ marginLeft: '20px' }}
              >
                Copy HTML to clipboard
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              key={`${issue.key}-html`}
              style={{
                margin: '20px',
              }}
            />
          </div>
        );
      }
    });

    return (
      <div>
        <div style={{ margin: '20px' }}>
          {`Displaying ${
            Object.keys(data).length
          } issues, here are some stats on node frequency:`}
          <br />
          <table style={{ display: 'block' }}>
            <thead>
              <tr>
                <th>Node</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {this.getStats(data).map(row => (
                <tr key={row.node}>
                  <td>{row.node}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pages={pages} onChange={this.handleChange} />
        <div style={{ margin: '20px 0' }}>{rows}</div>
        <textarea
          style={{ width: '0px', height: '0px', borderColor: 'white' }}
          ref={ref => {
            this.emailTextareaRef = ref;
          }}
        />
      </div>
    );
  }
}
