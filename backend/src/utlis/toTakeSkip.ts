export function toTakeSkip(page: number, perPage: number) {
  const skip = (page - 1) * perPage;
  const take = perPage;

  return { take, skip };
}
