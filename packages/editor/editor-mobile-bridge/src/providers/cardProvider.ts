import {
  EditorCardProvider,
  CardAppearance,
  Client,
} from '@atlaskit/smart-card';
import { createPromise } from '../cross-platform-promise';

class EditorMobileCardProvider extends EditorCardProvider {
  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    /*
     * Called when a link is pasted inisde
     * return {
     *  type: 'inlineCard', // we always want inline cards for Confluence cards
     *   attrs: {
     *     url: string,
     *   },
      };
     */
    const getLinkResolve = await createPromise('getLinkResolve', {
      url,
      appearance,
    }).submit();

    if (typeof getLinkResolve === 'object') {
      return getLinkResolve;
    } else {
      return super.resolve(url, appearance);
    }
  }
}

class MobileSmartCardClient extends Client {
  async fetchData(url: string) {
    /*
     *
     * This is called when an inlineCard | blockCard is loaded in the document
     * or from the renderer
     * Response from the native side should have the shape of ResolveResponse
     * https://atlaskit.atlassian.com/packages/media/smart-card/docs/client
     *
     */
    return createPromise('getResolvedLink', { url })
      .submit()
      .then(
        response => response,
        error => error,
      );
  }
}

export const createCardProvider = async () => new EditorMobileCardProvider();
export const createCardClient = () => new MobileSmartCardClient();
