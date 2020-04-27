import { LeveledLogMethod } from 'winston'

declare module 'create-winston-debug' {
  export interface Configuration {
    rootDir: string
    prefix: string
    debug?: string
    logger?: (msg: string) => void
  }

  export function createDebug(
    module: NodeModule,
    config: Configuration
  ): LeveledLogMethod
}
