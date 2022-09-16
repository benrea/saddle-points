export function saddlePoints(matrix: number[][]) {
  if (!matrix?.length) return [];

  const rows = matrix;
  const columns = transposeMatrix(rows);

  const result: [number, number][] = [];

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];

    for (let x = 0; x < columns.length; x++) {
      const column = columns[x];
      const value = matrix[y][x];

      if (isSaddlePoint(value, row, column)) {
        result.push([x + 1, y + 1]); // convert to 1-based index
      }
    }
  }

  // TODO: do we need to sort the result by x, y?
  return result;
}

export function isSaddlePoint(value: number, row: number[], column: number[]): boolean {
  // TODO: optimise max/min...
  const rowMax = Math.max(...row);
  const colMin = Math.min(...column);

  return value >= rowMax && value <= colMin;
}

export function transposeMatrix(matrix: number[][]): number[][] {
  const rows = matrix;
  const maxRowLength = Math.max(...rows.map((row) => row.length));
  const maxColLength = rows.length;

  const result: number[][] = new Array(maxRowLength).fill(undefined).map(() => new Array(maxColLength).fill(undefined));

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];

    for (let x = 0; x < row.length; x++) {
      result[x][y] = rows[y][x];
    }
  }

  return result;
}
