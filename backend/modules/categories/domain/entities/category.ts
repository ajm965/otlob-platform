import { AggregateRoot, LocalizedLabel } from '@otlob/core';
import { CategoryStatus } from '../enums/category_status';
import { CategoryId } from './category_id';

export interface CategoryProps {
  name: LocalizedLabel;
  status: CategoryStatus;
  sortOrder: number;
  marketId: string;
  countryCode: string;
}

export class Category extends AggregateRoot<CategoryId> {
  public readonly name: LocalizedLabel;
  public readonly status: CategoryStatus;
  public readonly sortOrder: number;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: CategoryId, props: CategoryProps) {
    super(id);
    this.name = props.name;
    this.status = props.status;
    this.sortOrder = props.sortOrder;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: CategoryId, props: CategoryProps): Category {
    return new Category(id, props);
  }
}
