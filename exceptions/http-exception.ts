class HttpException extends Error {
  constructor(public message: string, public status = 400) {
    super(message);

    this.name = 'Http Exception';
    this.status = status;
  }
}

export { HttpException };
