import { Interfaces, Container, Types, Exceptions } from '@pdc/core';
import { ValidatorMiddleware as BaseValidatorMiddleware } from '@ilos/provider-validator';

@Container.middleware()
export class ValidatorMiddleware extends BaseValidatorMiddleware implements Interfaces.MiddlewareInterface {}
