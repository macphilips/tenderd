import { User } from "../../datasource/types"

class UserRepository {
  constructor() {}

  async getUserById(
    userId: string
  ): Promise<Omit<User, "password"> | undefined> {
    if (!userId) return undefined
    return {
      name: "Test user",
      id: "user-123",
      email: "titilope@gmail.com",
      companyId: ""
    }
  }
}

export default UserRepository
