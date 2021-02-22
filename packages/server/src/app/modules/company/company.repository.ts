import { firestore } from "firebase-admin/lib/firestore"
import { Repository } from "../../datasource"
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
  protected model
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
    this.model = CompanyModel
  }

  async findById(companyId: string) {
    return this.findByPK(CompanyModel.key({ id: companyId }))
  }

  async findAllCompanies() {
    const { results } = await this.findAll()
    if (results.length === 0) {
      return await this.initCompanies()
    }
    return results
  }

  async initCompanies(): Promise<Company[]> {
    const companies: Company[] = [
      { id: "company-123", name: "Rancho", model: "Company" },
      { id: "company-124", name: "Tendern", model: "Company" },
      { id: "company-125", name: "CNN", model: "Company" }
    ]

    //TODO: Add a createAll method in Repository and update here.
    const promises = companies.map((company) =>
      this.create(CompanyModel.create(company))
    )
    await Promise.all(promises)

    return companies
  }
}

export default CompanyRepository
