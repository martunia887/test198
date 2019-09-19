// import { cfetch, BadStatusError } from "@confluence/network";
import { MacroMetadata, MacroBrowser, WebResources } from './types';
import { BadStatusError } from './BadStatusError';
import { cfetch } from './cfetch';

export function createMetadataLoader() {
  let macrosMetadataCache: MacroMetadata[] | null = null;

  return function metadataLoader(): Promise<MacroMetadata[]> {
    if (macrosMetadataCache) {
      console.log('======== cached dw');
      return Promise.resolve(macrosMetadataCache);
    }

    // delet "Fetch API cannot load file:///wiki/plugins/macrobrowser/browse-macros.action?detailed=false&t=1.
    // need context path and type
    // This same request will be made again by the macro browser when resources are loaded.
    // Running it standalone means we can show the list of macros before loading the resources,
    // mitigating the perf impact caused by the macro browser.
    const onResponse = response => response.json();
    return cfetch(
      `https://product-fabric.atlassian.net/wiki/plugins/macrobrowser/browse-macros.action?detailed=false&t=1`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )
      .then(
        /* onFulfilled */ onResponse,
        /* onRejected */ reason => {
          console.log('========= meow error');
          if (reason instanceof BadStatusError) {
            return onResponse(reason.response);
          }

          throw reason;
        },
      )
      .then(({ macros }) => {
        console.log('======= macroooooo');
        console.log(macros);
        console.log(JSON.stringify(macros));
        macrosMetadataCache = macros;
        return macros;
      });
  };
}

// const loadMacroMetadata = createMetadataLoader();
//
// export const getMacroMetaData = (extensionKey:string): Promise<MacroMetadata[]> =>
//   loadMacroMetadata().then(macros => macros.filter(macro => macro.macroName === extensionKey));
