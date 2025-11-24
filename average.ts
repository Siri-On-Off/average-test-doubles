import { mean, median, mode } from "./statistics.ts";
import { IReadNumbers } from "./IReadNumbers.ts";

export class Average {
  constructor(private readNumbers: IReadNumbers) {}

  public async computeMeanOfFile(): Promise<number> {
    const numbers: Array<number> = await this.readNumbers.readNumbers();
    return mean(numbers);
  }

  public async computeMedianOfFile(): Promise<number> {
    const numbers: Array<number> = await this.readNumbers.readNumbers();
    return median(numbers);
  }

  public async computeModeOfFile(): Promise<Array<number>> {
    const numbers: Array<number> = await this.readNumbers.readNumbers();
    return mode(numbers);
  }
}
