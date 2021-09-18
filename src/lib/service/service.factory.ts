import { join, Path, strings } from '@angular-devkit/core';
import {
    apply,
    branchAndMerge,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url,
} from '@angular-devkit/schematics';
import { isNullOrUndefined } from 'util';
import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ServiceOptions } from './service.schema';

export function main(options: ServiceOptions): Rule {
    options = transform(options);
    return (tree: Tree, context: SchematicContext) => {
        return branchAndMerge(
            chain([
                mergeSourceRoot(options),
                mergeWith(generate(options)),
            ]),
        )(tree, context);
    };
}

function transform(source: ServiceOptions): ServiceOptions {
    const target: ServiceOptions = Object.assign({}, source);
    target.metadata = 'providers';
    target.type = 'service';

    if (isNullOrUndefined(target.name)) {
        throw new SchematicsException('Option (name) is required.');
    }
    const location: Location = new NameParser().parse(target);
    target.name = strings.dasherize(location.name);
    target.path = strings.dasherize(location.path);
    target.language = target.language !== undefined ? target.language : 'ts';

    target.path = join(target.path as Path, 'services');
    return target;
}

function generate(options: ServiceOptions) {
    return (context: SchematicContext) =>
        apply(url(join('./files' as Path, options.language)), [
            template({
                ...strings,
                ...options,
            }),
            move(options.path),
        ])(context);
}