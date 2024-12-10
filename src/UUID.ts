import { v4 as uuidv4 } from 'uuid';

class UUID {
    private constructor(private readonly value: string) {}
    
    public static random(): UUID {
        return new UUID(uuidv4());
    }

    public toString(): string {
        return this.value;
    }
}

export { UUID }