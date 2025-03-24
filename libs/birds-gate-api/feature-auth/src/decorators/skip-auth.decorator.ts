import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_META_KEY = 'skipEndpointAuth';
export const SkipAuth = () => SetMetadata(SKIP_AUTH_META_KEY, true);
