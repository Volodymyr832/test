import { world } from './vitest-hooks';

export default async function () {
    console.log('Global setup executed');
    world.configService.getConfig();
}
