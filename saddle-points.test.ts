import { saddlePoints, isSaddlePoint, transposeMatrix } from './saddle-points';

describe('Saddle Points', () => {
  type testCase = {
    name: string;
    input: number[][];
    expected: [number, number][];
  };

  const testCases: testCase[] = [
    {
      name: 'returns an empty list when the matrix is empty',
      input: [],
      expected: [],
    },
    {
      name: 'returns all coordinates when the matrix is flat',
      input: [
        [1, 1],
        [1, 1],
      ],
      expected: [
        [1, 1],
        [2, 1],
        [1, 2],
        [2, 2],
      ],
    },
    {
      name: 'returns an empty list when there are no saddle points',
      input: [
        [1, 2, 3],
        [3, 2, 1],
        [2, -1, -2],
      ],
      expected: [],
    },
    {
      name: 'returns single saddle point',
      input: [
        [9, 8, 7],
        [5, 3, 2],
        [6, 6, 7],
      ],
      expected: [[1, 2]],
    },
    {
      name: 'returns multiple saddle points',
      input: [
        [9, 8, 7],
        [5, 3, 5],
        [6, 6, 7],
      ],
      expected: [
        [1, 2],
        [3, 2],
      ],
    },
    // TODO:
    // {
    //   name: 'returns saddle point from a non-square matrix',
    //   input: [
    //     [9, 8, 7, 9],
    //     [5, 3],
    //     [6, 6, 3, 7],
    //   ],
    //   expected: [
    //     [1, 2],
    //     [4, 3],
    //   ],
    // },
  ];

  testCases.forEach(({ name, input, expected }) => it(name, () => expect(saddlePoints(input)).toEqual(expected)));
});

describe('isSaddlePoint', () => {
  type testCase = {
    name: string;
    input: [number, number[], number[]];
    expected: boolean;
  };

  const testCases: testCase[] = [
    {
      name: 'returns false if its not greater than or equal to every element in its row',
      input: [5, [5, 8, 7], [9, 5, 6]],
      expected: false,
    },
    {
      name: 'returns false if its not lower than or equal to every element in its column',
      input: [5, [5, 3, 2], [4, 5, 3]],
      expected: false,
    },
    {
      name: 'returns true if greater than or equal to every element in its row and less than or equal to every element in its column',
      input: [5, [5, 3, 2], [9, 5, 6]],
      expected: true,
    },
    {
      name: 'returns true if greater than or equal to every element in its row and less than or equal to every element in its column',
      input: [5, [5, 5, 2], [9, 5, 5]],
      expected: true,
    },
  ];

  testCases.forEach(({ name, input, expected }) => it(name, () => expect(isSaddlePoint(...input)).toEqual(expected)));
});

describe('transposeMatrix', () => {
  type testCase = {
    name: string;
    input: number[][];
    expected: number[][];
  };

  const testCases = [
    {
      name: 'readme test example',
      input: [
        [9, 8, 7],
        [5, 3, 2],
        [6, 6, 7],
      ],
      expected: [
        [9, 5, 6],
        [8, 3, 6],
        [7, 2, 7],
      ],
    },
    {
      name: 'non-square matrix',
      input: [
        [9, 8, 7, 5],
        [5, 3],
        [6, 6, 7],
      ],
      expected: [
        [9, 5, 6],
        [8, 3, 6],
        [7, undefined, 7],
        [5, undefined, undefined],
      ],
    },
  ];

  testCases.forEach(({ name, input, expected }) => it(name, () => expect(transposeMatrix(input)).toEqual(expected)));
});
