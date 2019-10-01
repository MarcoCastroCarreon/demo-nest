
export class NestUtils {

    async parseString(value: string): Promise<boolean> {
        return /\d/.test(value);
    }
}
