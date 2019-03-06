import asDataProvider from '../../providers/as-data-provider';

interface MockDataStructure {
  data: string;
}

const SOME_STATIC_DATA: MockDataStructure = {
  data: 'yay!',
};

export default asDataProvider(() => SOME_STATIC_DATA);
