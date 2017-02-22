// @flow
const chunkArray = (original: Array<*>): Array<Array<*>> =>
  original.reduce((accumulator: Array<Array<*>>, current: any) => {
    let pushed = false;
    for (const col of accumulator) {
      if (col.length < 4) {
        col.push(current);
        pushed = true;
      }
    }
    if (!pushed) accumulator.push([current]);
    return accumulator;
  }, [[]]);

export default chunkArray;
