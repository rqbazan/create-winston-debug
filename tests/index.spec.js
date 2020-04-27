describe('create winston debug', () => {
  it('create debug', () => {
    const debug = require('./mock')

    let params = []

    const logSpy = jest
      // @ts-ignore
      .spyOn(console._stdout, 'write')
      .mockImplementation((...args) => {
        params = args
        // @ts-ignore
        process.stderr.write(...args)
      })

    const message = 'Hello There'

    debug(message)

    expect(logSpy).toBeCalled()
    expect(logSpy).toBeCalledWith(...params)
    expect(params.some((p) => p.includes(message))).toBeTruthy()
    expect(params.some((p) => p.includes('mock'))).toBeTruthy()
  })
})
