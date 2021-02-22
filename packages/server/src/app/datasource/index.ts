import { firestore } from "firebase-admin/lib/firestore"
import { CollectionKeys, Model, TaggedModel } from "./models"
import {
  PageableRequest,
  PageableResult
} from "../modules/company/company.repository"

export abstract class Repository<T extends TaggedModel> {
  protected abstract model: Model<T, any>

  protected constructor(protected firestore: firestore.Firestore) {}

  async findByPK<T extends TaggedModel>(
    key: CollectionKeys<T>
  ): Promise<T | null> {
    const { pk } = key
    const docRef = this.firestore.collection(this.model.name).doc(pk)
    const doc = await docRef.get()

    if (!doc.exists) {
      return null
    } else {
      return toJSON<T>(doc.data())
    }
  }

  protected async findAllBy(findKey: keyof T, value: T[keyof T]): Promise<T[]> {
    const docRef = this.firestore
      .collection(this.model.name)
      .where(findKey as string, "==", value)
    const snapshot = await docRef.get()
    if (snapshot.empty) return []
    let result: T[] = []
    snapshot.forEach((doc) => {
      result.push(
        toJSON<T>({
          ...doc.data(),
          createdAt: doc.createTime.toDate(),
          updatedAt: doc.updateTime.toDate()
        })
      )
    })
    return result
  }

  protected async findAll(
    pageable: PageableRequest = {
      limit: 25,
      nextCursor: null,
      prevCursor: null
    }
  ): Promise<PageableResult<T>> {
    //TODO: implement pagination
    const docRef = this.firestore.collection(this.model.name)
    // .limit(pageable.limit)

    const snapshot = await docRef.get()
    let results: T[] = []
    if (snapshot.empty) return { results, cursor: null }

    snapshot.forEach((doc) => {
      results.push(toJSON<T>(doc.data()))
    })
    return { results, cursor: null }
  }

  async create(data: T & CollectionKeys<T>) {
    const { model, tableName, pk, ...item } = data

    const docRef = this.firestore.collection(model).doc(pk)
    const response = await docRef.set(convertToFireStoreDate(item))
  }

  async createAll(data: Array<T & CollectionKeys<T>>) {
    const batch = this.firestore.batch()
    data.forEach(({ model, tableName, pk, ...item }) => {
      batch.set(this.firestore.collection(this.model.name).doc(pk), item)
    })
    await batch.commit()
  }

  async update(data: T & CollectionKeys<T>) {
    const { model, tableName, pk, ...item } = data
    const docRef = this.firestore.collection(model).doc(pk)
    const response = await docRef.update(convertToFireStoreDate(item))
  }
}

export function toJSON<T>(data: any) {
  return convertToDate(data) as T
}
function convertToFireStoreDate(item: any) {
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

function convertToDate(item: any) {
  const dbData: any = {}
  Object.entries(item).forEach(([key, value]) => {
    if (value instanceof firestore.Timestamp) {
      dbData[key] = value.toDate()
    } else {
      dbData[key] = value
    }
  })
  return dbData
}
