export type TestCase = [result: unknown, expected: unknown]

export function testMultipleCases(cases: TestCase[], testFn: (result: unknown, expected: unknown) => void) {
  for (const c of cases) {
    const [result, expected] = c
    testFn(result, expected)
  }
}
