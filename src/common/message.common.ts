export class Message {
  constructor(public readonly message: string, public readonly status: number) {
    this.message = message;
    this.status = status;
  }

  static createdSuccess(created: string) {
    return new Message(`${created} created successfully`, 201);
  }

  static updatedSuccess(updated: string) {
    return new Message(`${updated} updated successfully`, 200);
  }

  static deletedSuccess(deleted: string) {
    return new Message(`${deleted} deleted successfully`, 200);
  }

  static notFound(notFound: string) {
    return new Message(`${notFound} not found`, 404);
  }

  static loginSuccess() {
    return new Message(`Login successful`, 200);
  }

  static alreadyExistt(found: string) {
    return new Message(`${found} already exist`, 400);
  }
}
