/* This method will create an array of sub-arrays, based on max elements per sub-array
 * The primary use of this is to separate an array of data into chunks, where
 * each chunk represents a 'column' or 'row' for frontend styling
 */

import { createSelector } from 'reselect';

const chunkArray = (allItems, subItemCount) => {
  let currentChunk = 1;
  const maxChunks = Math.ceil(allItems.length / subItemCount);
  const chunks = [];

  while (currentChunk <= maxChunks) {
    const startIndex = (currentChunk - 1) * subItemCount;
    const endIndex = subItemCount * currentChunk;
    const chunkValues = allItems.slice(startIndex, endIndex);

    chunks.push(chunkValues);
    currentChunk += 1;
  }

  return chunks;
};

export default createSelector(
  allItems => allItems,
  (_, subItemCount) => subItemCount,
  (allItems, subItemCount) => chunkArray(allItems, subItemCount),
);
