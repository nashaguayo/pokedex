import characteristics from '@/store/state/characteristics';
import { getAllCharacteristicsDescriptions as getAllCharacteristicsDescriptionsApi } from '@/api/characteristics';

export async function getAll() {
  characteristics.setAll(await getAllCharacteristicsDescriptionsApi());
}

export function getAllCharacteristics() {
  return characteristics.getAll();
}
