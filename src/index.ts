import { IContainer, noop } from '@aurelia/kernel';
import { IConfig } from './config';

function createConfiguration(optionsProvider) {
  return {
    register(container: IContainer
    ) {

      const config = container.get(IConfig)
      optionsProvider(config)
      return config;
    },
    customize(config?) {
      return createConfiguration(config);
    },
  };
}

export const AureliaAPIConfiguration = createConfiguration(noop);
