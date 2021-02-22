import { Repository } from "../../datasource"
import { firestore } from "firebase-admin/lib/firestore"
import { User } from "../../datasource/types"
import { UserModel } from "../../datasource/models"
import { PageableRequest, PageableResult } from "../company/company.repository"

class UserRepository extends Repository<User> {
  protected model
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
    this.model = UserModel
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
    const results: User[] = await this.findAllBy("companyId", companyId)
    return { results, cursor: null }
  }

  async findAllUsers(): Promise<PageableResult<User>> {
    return await this.findAll()
  }
}

export default UserRepository
