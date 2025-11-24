import { expect } from "@std/expect";
import { Average } from "./average.ts";
import { IReadNumbers } from "./IReadNumbers.ts";

// Fake
class FakeNumberSource implements IReadNumbers {
  constructor(private numbers: number[]) {}
  readNumbers(): Promise<number[]> {
    return Promise.resolve(this.numbers);
  }
}

// Mock
class MockNumberSource implements IReadNumbers {
  public calls = 0;
  private numbers = [10, 20, 20, 30];
  async readNumbers(): Promise<number[]> {
    this.calls++;
    return await Promise.resolve(this.numbers);
  }
}

Deno.test("Average with Mock: mode call count", async () => {
  const mock = new MockNumberSource();
  const avg = new Average(mock);

  const mode = await avg.computeModeOfFile();
  expect(mode).toEqual([20]); // 20 kommt am häufigsten
  expect(mock.calls).toBe(1); // Mock wurde genau einmal aufgerufen
});

Deno.test("Average with Fake: mean, median, mode", async () => {
  const fake = new FakeNumberSource([1, 2, 3, 4, 5, 5]);
  const avg = new Average(fake);

  expect(await avg.computeMeanOfFile()).toBeCloseTo(20 / 6);
  expect(await avg.computeMedianOfFile()).toBeCloseTo(3.5);
  expect(await avg.computeModeOfFile()).toEqual([5]);
});


Deno.test("Average with Mock: mode call count", async () => {
  const mock = new MockNumberSource();
  const avg = new Average(mock);

  const mode = await avg.computeModeOfFile();
  expect(mode).toEqual([20]);
  expect(mock.calls).toBe(1);
});
