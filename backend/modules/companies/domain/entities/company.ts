import { AggregateRoot } from '@otlob/core';
import { CompanyStatus } from '../enums/company_status';
import { CompanyId } from './company_id';

export interface CompanyProps {
  legalName: string;
  tradeName: string | null;
  status: CompanyStatus;
  marketId: string;
  countryCode: string;
}

export class Company extends AggregateRoot<CompanyId> {
  public readonly legalName: string;
  public readonly tradeName: string | null;
  public readonly status: CompanyStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: CompanyId, props: CompanyProps) {
    super(id);
    this.legalName = props.legalName;
    this.tradeName = props.tradeName;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: CompanyId, props: CompanyProps): Company {
    return new Company(id, props);
  }
}
