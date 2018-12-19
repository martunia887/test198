import { getLatest } from './steps/get-latest';

export async function updateCommand(packageName: string) {
  await getLatest(packageName);
}
