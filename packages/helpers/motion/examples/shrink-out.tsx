/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Block, RetryContainer, Centered } from '../examples-utils';
import { ShrinkOut, StaggeredEntrance, ExitingPersistence } from '../src';

const products = [
  'Confluence',
  'Bitbucket',
  'Jira Service Desk',
  'Ops Genie',
  'Statuspage',
  'Jira Software',
];

export default () => {
  const [actualProducts, setProducts] = useState(products);

  return (
    <div>
      <div css={{ textAlign: 'center' }}>
        <ButtonGroup>
          <Button onClick={() => setProducts(products)}>Reset</Button>
        </ButtonGroup>
      </div>

      <Centered css={{ height: '82px' }}>
        <StaggeredEntrance>
          <ExitingPersistence>
            {actualProducts.map(product => (
              <ShrinkOut key={product}>
                {props => (
                  <Block
                    {...props}
                    appearance="small"
                    css={{
                      width: 'auto',
                      margin: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Button
                      onClick={() => {
                        setProducts(prods =>
                          prods.filter(val => val !== product),
                        );
                      }}
                    >
                      {product}
                    </Button>
                  </Block>
                )}
              </ShrinkOut>
            ))}
          </ExitingPersistence>
        </StaggeredEntrance>
      </Centered>
    </div>
  );
};
