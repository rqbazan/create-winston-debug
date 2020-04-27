const { formatTime, isSilent } = require('../lib/helpers')

describe('format time', () => {
  it('should format time with the timezone offset', () => {
    const now = new Date('2020-04-27T18:27:38.005Z')

    const result = formatTime(now.getTime())

    expect(result).toBe('2020-04-27T18:27:38.005+00:00')
  })
})

describe.each`
  debug            | app:index | web:index | api:index
  ${'app:*'}       | ${false}  | ${true}   | ${true}
  ${'*'}           | ${false}  | ${false}  | ${false}
  ${'web:*,app:*'} | ${false}  | ${false}  | ${true}
  ${'web:*,*'}     | ${false}  | ${false}  | ${false}
  ${'web:*'}       | ${true}   | ${false}  | ${true}
`('is silent using DEBUG=$debug', ({ debug, ...tags }) => {
  it(`should check ${JSON.stringify(tags)}`, () => {
    Object.keys(tags).forEach((tag) => {
      expect(isSilent(tag, debug)).toBe(tags[tag])
    })
  })
})
