export class Stack<T> {
  private collection: T[] = [];

  constructor(private readonly capacity: number) {}

  get size(): number {
    return this.collection.length;
  }

  push(element: T): void {
    if (this.size === this.capacity) {
      this.collection.shift();
    }

    this.collection.push(element);
  }

  pop(): T | undefined {
    return this.collection.pop();
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }
}
