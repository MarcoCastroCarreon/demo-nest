import { Logger } from '@nestjs/common';

export class NestUtils {

    async checkString(value: string): Promise<boolean> {
        Logger.log(value);
        const str = /\d/.test(value);
        Logger.log(str);
        return str;
    }
}
