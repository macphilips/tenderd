import { Repository, toJSON } from "../../datasource"
import { firestore } from "firebase-admin/lib/firestore"
import { User } from "../../datasource/types"
import { UserModel } from "../../datasource/models"
import { PageableRequest, PageableResult } from "../company/company.repository"

class UserRepository extends Repository<User> {
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
  }
  async getUserById(
    userId: string
  ): Promise<Omit<User, "password" | "model"> | undefined> {
    const user = await this.findByPK(UserModel.key({ id: userId }))
    if (!user) return undefined
    return user
  }

  async updateUser(user: Partial<User>) {
    if (!user.id) throw new Error("User id cannot be null")

    const result = await this.getUserById(user.id)

    if (result == undefined) throw Error("User not found")

    return this.update(UserModel.create({ ...result, ...user }))
  }

  async findAllUsersByCompanyId(
    companyId: string,
    pageable?: PageableRequest
  ): Promise<PageableResult<User>> {
    // TODO implement pagination
    const results: User[] = await this.findAllBy("User", "companyId", companyId)
    return { results, cursor: null }
  }

  async findAllUsers(): Promise<PageableResult<User>> {
    const docs = await this.firestore.collection("User").limit(25).get()
    const results: User[] = []
    docs.forEach((doc) => {
      results.push(toJSON<User>(doc.data()))
    })
    return { results, cursor: null }
  }
}

export default UserRepository
