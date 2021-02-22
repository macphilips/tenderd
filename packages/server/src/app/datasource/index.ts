import { firestore } from "firebase-admin/lib/firestore"
import { CollectionKeys, TaggedModel } from "./models"

export class Repository<T extends TaggedModel> {
  constructor(protected firestore: firestore.Firestore) {}

  async findByPK<T extends TaggedModel>(
    key: CollectionKeys<T>
  ): Promise<T | null> {
    const { model, pk } = key
    const docRef = this.firestore.collection(model).doc(pk)
    const doc = await docRef.get()
    if (!doc.exists) {
      return null
    } else {
      return toJSON<T>(doc.data())
    }
  }

  protected async findAllBy(
    model: T["model"],
    findKey: keyof T,
    value: T[keyof T]
  ): Promise<T[]> {
    const docRef = this.firestore
      .collection(model)
      .where(findKey as string, "==", value)
    const snapshot = await docRef.get()
    if (snapshot.empty) return []
    let result: T[] = []
    snapshot.forEach((doc) => {
      result.push(toJSON<T>(doc.data()))
    })
    return result
  }

  async create(data: T & CollectionKeys<T>) {
    const { model, tableName, pk, ...item } = data

    const docRef = this.firestore.collection(model).doc(pk)
    const response = await docRef.set(this.convertToFireStoreData(item))
  }

  async update(data: T & CollectionKeys<T>) {
    const { model, tableName, pk, ...item } = data
    const docRef = this.firestore.collection(model).doc(pk)
    const response = await docRef.update(this.convertToFireStoreData(item))
  }

  private convertToFireStoreData(item: any) {
    const dbData: any = {}
    Object.entries(item).forEach(([key, value]) => {
      if (value instanceof Date) {
        dbData[key] = firestore.Timestamp.fromDate(value)
      } else {
        dbData[key] = value
      }
    })
    return dbData
  }
}

export function toJSON<T>(data: any) {
  return data as T
}
