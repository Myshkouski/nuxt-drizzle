import { defineNuxtModule, createResolver, resolveModule, resolveAlias, logger, addServerPlugin, addServerTemplate, addTypeTemplate } from '@nuxt/kit'
import { createContext, type ContextOptions } from 'nitro-drizzle/context'
import { type ModuleOptions, addInlineExternals, updateServerAssets, defineModuleConfig } from 'nitro-drizzle/module'
import type { MaybePromise, VirtualModules } from 'nitro-drizzle/shared'
import { join, resolve } from 'pathe'

export type { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-drizzle',
    configKey: 'drizzle',
  },
  async setup(moduleOptions, nuxt) {
    const moduleConfig = defineModuleConfig(moduleOptions)
    const resolver = createResolver(import.meta.url)

    const baseDir = resolve(
      nuxt.options.srcDir,
      resolveAlias(moduleConfig.baseDir, nuxt.options.alias),
    )

    const contextOptions: ContextOptions = {
      cwd: process.cwd(),
      resolver,
      baseDir,
      logger,
      configPattern: moduleConfig.configPattern,
      datasource: { ...moduleConfig.datasources },
      migrations: moduleConfig.migrations || void 0,

      tasks: nuxt.options.nitro.experimental?.tasks
        ? (tasks) => {
            nuxt.options.nitro.tasks ||= {}
            Object.assign(nuxt.options.nitro.tasks, tasks)
          }
        : void 0,

      plugins(plugins) {
        plugins.forEach((plugin) => {
          addServerPlugin(resolveModule(plugin))
        })
      },

      virtualModules(modules: VirtualModules): MaybePromise<void> {
        Object.entries(modules).forEach(([filename, content]) => {
          addServerTemplate({
            filename,
            getContents: async () => 'string' == typeof content ? content : await content(),
          })
        })
      },

      declarations(declarations): MaybePromise<void> {
        const typesDir = join(nuxt.options.buildDir, 'types')

        Object.entries(declarations.module).forEach(([filename, contents]) => {
          addTypeTemplate({
            // @ts-expect-error
            filename: join(typesDir, filename),
            getContents: async () => 'string' === typeof contents ? contents : await contents(),
          }, {
            node: true,
          })
        });

        [
          ...Object.entries(declarations.runtime),
          ...Object.values(declarations.virtual).flatMap(modules => Object.entries(modules)),
        ].forEach(([filename, contents]) => {
          addTypeTemplate({
            // @ts-expect-error
            filename: join(typesDir, filename),
            getContents: async () => 'string' === typeof contents ? contents : await contents(),
          }, {
            nitro: true,
          })
        })
      },

      assets(assets) {
        nuxt.hook('nitro:config', (nitroOptions) => {
          updateServerAssets(nitroOptions, assets)
        })
      },

      inlineExternals(modules) {
        nuxt.hook('nitro:init', (nitro) => {
          addInlineExternals(nitro.options, modules)
        })
      },
    }

    const context = createContext(contextOptions)

    // auto-imports
    // if (nitro.options.imports) {
    //   nitro.options.imports.imports ||= [];

    // TODO
    // nitro.options.imports.imports.push({
    //   name: 'useMigrations',
    //   as: 'useDrizzleMigrations',
    //   from: 'nitro-drizzle/runtime',
    // })
    // }

    // nitro.hooks.hook("rollup:before", async (nitro, config) => {
    //   await addPlugin(config, reloadPlugin(nitro, { baseDir }));
    // });

    await context.init()
  },
})
