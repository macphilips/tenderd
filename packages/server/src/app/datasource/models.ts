import { Company, Request, RequestEventLog, User } from "./types"

export type TaggedModel = Record<string, any> & { model: string }

export type CollectionKeys<T extends TaggedModel> = {
  model: T["model"]
  pk: string
  tableName: string
}

class Model<T extends TaggedModel, U extends keyof T> {
  constructor(
    private tableName: string,
    private name: string,
    private pkField: U
  ) {}

  key(param: { [X in U]: string }): CollectionKeys<T> {
    return {
      pk: param[this.pkField],
      tableName: this.tableName,
      model: this.name
    }
  }

  create<T extends TaggedModel>(data: Partial<Omit<T, "model">>) {
    const model = data as T
    return {
      ...model,
      pk: model[this.pkField as keyof T],
      tableName: this.tableName,
      model: this.name
    }
  }
}

class PKBuilder<T extends TaggedModel> {
  constructor(private tableName: string, private name: string) {}

  pk<U extends keyof T>(fields: U) {
    return new Model<T, U>(this.tableName, this.name, fields)
  }
}

function model<T extends TaggedModel>(type: T["model"]): PKBuilder<T> {
  return new PKBuilder<T>("Tenderd", type)
}

export const UserModel = model<User>("User").pk("id")

export const RequestModel = model<Request>("Request").pk("id")

export const CompanyModel = model<Company>("Company").pk("id")

export const RequestEventLogModel = model<RequestEventLog>(
  "RequestEventLog"
).pk("itemId")
