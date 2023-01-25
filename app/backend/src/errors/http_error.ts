export default class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public name: string = 'HttpError',
  ) {
    super();
  }
}
