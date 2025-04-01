import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
	async transform(value: string, metadata: ArgumentMetadata) {
		if (typeof value === 'undefined') {
			return value;
		}

		return super.transform(value, metadata);
	}
}
