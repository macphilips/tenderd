import { firestore } from "firebase-admin/lib/firestore"
import { Repository, toJSON } from "../../datasource"
import { Company } from "../../datasource/types"
import { CompanyModel, TaggedModel } from "../../datasource/models"

export type PageableResult<T extends TaggedModel> = {
  results: T[]
  cursor: string | null
}

export type PageableRequest = {
  limit: number
  nextCursor: string | null
  prevCursor: string | null
}

class CompanyRepository extends Repository<Company> {
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
  }

  async findById(companyId: string) {
    return this.findByPK(CompanyModel.key({ id: companyId }))
  }

  async findAllCompanies(pageable?: PageableRequest) {
    // Just returns all three companies added manually to the application
    // TODO implement pagination
    const docs = await this.firestore.collection("Company").limit(3).get()
    const result: Company[] = []
    docs.forEach((doc) => {
      result.push(toJSON<Company>(doc.data()))
    })
    if (result.length === 0) {
      return await this.initCompanies()
    }
    return result
  }
  async initCompanies(): Promise<Company[]> {
    const companies: Company[] = [
      { id: "company-123", name: "Rancho", model: "Company" },
      { id: "company-124", name: "Tendern", model: "Company" },
      { id: "company-125", name: "CNN", model: "Company" }
    ]

    //TODO: Add a createAll method in Repository and update here.
    const promises = companies.map((company) =>
      this.create(CompanyModel.create<Company>(company))
    )
    await Promise.all(promises)

    return companies
  }
}

export default CompanyRepository
