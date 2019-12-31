import { gridSize } from '@atlaskit/theme/constants';
import { N40 } from '@atlaskit/theme/colors';
import { h600 } from '@atlaskit/theme/typography';
import evaluateInner from './utils/evaluate-inner';

const tableBorderWdth = 2;

export default evaluateInner`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead,
  tbody,
  tfoot {
    border-bottom: ${tableBorderWdth}px solid ${N40};
  }

  td,
  th {
    border: none;
    padding: ${gridSize() / 2}px ${gridSize()}px;
    text-align: left;
  }

  th {
    vertical-align: top;
  }

  td:first-child,
  th:first-child {
    padding-left: 0;
  }

  td:last-child,
  th:last-child {
    padding-right: 0;
  }

  caption {
    ${h600()}
    margin-bottom: ${gridSize()}px;
    text-align: left;
  }
`;
