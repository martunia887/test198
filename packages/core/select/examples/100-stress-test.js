import Select from '../src';
export default () => {
  return Array.from({ length: 1000 }, (m, i) => i).map(i => (
    <Select
      key={i}
      testId="test-select"
      className="single-select"
      classNamePrefix="react-select"
      options={[
        { label: 'Adelaide', value: 'adelaide' },
        { label: 'Brisbane', value: 'brisbane' },
        { label: 'Canberra', value: 'canberra' },
        { label: 'Darwin', value: 'darwin' },
        { label: 'Hobart', value: 'hobart' },
        { label: 'Melbourne', value: 'melbourne' },
        { label: 'Perth', value: 'perth' },
        { label: 'Sydney', value: 'sydney' },
      ]}
      placeholder="Choose a City"
    />
  ));
};
