import {
  ForgeInvokeType,
  ForgeInvokeParams,
  ForgeInvokeResponse,
} from './types';
import { JsonLdCollection } from './types/types-json-ld';

const API_ENDPOINT = 'https://api-private.stg.atlassian.com';
const API_PATH = '/graphql';
const QUERY_ARI = 'ari:cloud:jira::site/adabbd0c-91c5-4229-9eb2-9915aa3abe49';
const QUERY_INVOKE = `
mutation invoke($input: InvokeExtensionInput!) {
    invokeExtension(input: $input) {
      statusCode
      success
      message
      response {
        body
      }
      auth: externalAuth {
        key
        displayName
        url
      }
    }
  }`;

export class ForgeClient {
  constructor(private extensionId: string) {}

  public async invoke(
    type: ForgeInvokeType,
    params: ForgeInvokeParams,
  ): Promise<JsonLdCollection> {
    const request = {
      query: QUERY_INVOKE,
      variables: {
        input: {
          contextIds: [QUERY_ARI],
          extensionId: this.extensionId,
          payload: {
            type,
            resourceUrl: params.resourceUrl,
            query: params.query,
            folderId: params.folderId,
          },
        },
      },
    };
    const response = await fetch(API_ENDPOINT + API_PATH, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(request),
      headers: {
        'content-type': 'application/json',
      },
    });
    const responseAsJson = (await response.json()) as ForgeInvokeResponse;
    console.log({ responseAsJson });
    const {
      auth,
      response: invokeResponse,
    } = responseAsJson.data.invokeExtension;
    const { meta, data } = invokeResponse.body;
    return {
      meta: {
        ...meta,
        auth: auth.filter(a => a.key !== 'atlassian-token-service-key'),
      },
      data,
    };
  }
}
