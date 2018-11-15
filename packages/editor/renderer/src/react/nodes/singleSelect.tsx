export default function SingleSelect(props) {
  return (
    (props.value || '')
      // Fixes `,` inconsistency
      .split(',')
      .map(s => s.trim())
      .join(', ')
  );
}
