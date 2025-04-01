import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
	async transform(value: T, metadata: ArgumentMetadata) {
		if (typeof value === 'undefined') {
			return value;
		}

		return super.transform(value, metadata);
	}
}
