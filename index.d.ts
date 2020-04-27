import { LeveledLogMethod } from 'winston'

declare module 'create-winston-debug' {
  export interface Configuration {
    rootDir: string
    prefix: string
    debug?: string
  }

  export function formatTime(timestamp: number): string

  export function createDebug(
    module: NodeModule,
    config: Configuration
  ): LeveledLogMethod
}
