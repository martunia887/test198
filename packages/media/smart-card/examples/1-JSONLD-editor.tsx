import * as React from 'react';
import InlineMessage from '@atlaskit/inline-message';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import 'brace/ext/language_tools';
import AceEditor from 'react-ace';
import { Provider, Card } from '../src';

import { AsanaTask as jsonLD } from './_mocks/atlassian.task';

export interface ExampleProps {}

export interface ExampleState {
  text: string;
  json: any;
  error?: string;
}

class Example extends React.Component<ExampleProps, ExampleState> {
  state: ExampleState = {
    text: JSON.stringify(jsonLD, null, 2),
    json: jsonLD,
  };

  handleChange = (text: string) => {
    try {
      const json = JSON.parse(text);
      this.setState({
        text,
        json,
        error: undefined,
      });
    } catch (err) {
      this.setState({
        text,
        error: err.message,
      });
    }
  };

  render() {
    const { text, json, error } = this.state;
    return (
      <Provider>
        <Page>
          <Grid>
            <GridColumn>
              <h6>
                <code>appearance="block"</code>
              </h6>
              <br />
              <Card appearance="block" data={json} />
              <br />
              <h6>
                <code>appearance="inline"</code>
              </h6>
              <br />
              Bowsprit scallywag weigh anchor Davy Jones' Locker warp ballast
              scurvy nipper brigantine Jolly Roger wench sloop Shiver me timbers
              rope's end chandler. Admiral of the Black cackle fruit deck{' '}
              <Card appearance="inline" data={json} /> wench bounty rope's end
              bilge water scourge of the seven seas hardtack come about
              execution dock Nelsons folly handsomely rigging splice the main
              brace.
              <br />
              <h6>
                <code>JSON-LD</code>
              </h6>
              <br />
              <AceEditor
                focus={true}
                mode="json"
                theme="tomorrow"
                value={text}
                defaultValue={this.state.text}
                onChange={this.handleChange}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  useSoftTabs: true,
                }}
                minLines={20}
                tabSize={2}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                width="100%"
              />
              {error && <InlineMessage type="error" title={error} />}
            </GridColumn>
          </Grid>
        </Page>
      </Provider>
    );
  }
}

export default () => <Example />;
