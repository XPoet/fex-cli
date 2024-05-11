import ora from 'ora'

export default async (
  fn,
  { startMsg = 'start', successMsg = 'succeed', failMsg = 'fail' },
  ...args
) => {
  const spinner = ora()

  spinner.start(startMsg)

  try {
    const res = await fn(...args)
    spinner.succeed(successMsg)
    return res || true
  } catch {
    spinner.fail(failMsg)
    return null
  }
}
