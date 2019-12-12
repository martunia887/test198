export function findUniqueItemsIn<T>(
  findIn: Array<T>,
  checkWith: Array<T>,
  comparitor?: (firstItem: T, secondItem: T) => boolean,
): Array<T> {
  return findIn.filter(
    firstItem =>
      checkWith.findIndex(secondItem =>
        comparitor
          ? comparitor(firstItem, secondItem)
          : firstItem === secondItem,
      ) === -1,
  );
}
