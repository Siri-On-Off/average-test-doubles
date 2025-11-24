import { IReadNumbers } from "./IReadNumbers.ts";

export class FileAccess implements IReadNumbers {
  constructor(private path: string) {}

  public async readNumbers() {
    const numbers: Array<number> = [];
    const content: string = await Deno.readTextFile(this.path);
    const lines: Array<string> = content.split("\n");
    for (const line of lines) {
      const n = Number.parseInt(line);
      if (!Number.isNaN(n)) {
        numbers.push(n);
      }
    }
    return numbers;
  }
}
