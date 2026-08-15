import { AggregateRoot } from '@otlob/core';
import { ReviewStatus } from '../enums/review_status';
import { RatingScore } from '../value_objects/rating_score';
import { ReviewId } from './review_id';

export interface ReviewProps {
  bookingId: string;
  customerId: string;
  providerId: string;
  overall: RatingScore;
  comment: string | null;
  status: ReviewStatus;
  marketId: string;
  countryCode: string;
}

export class Review extends AggregateRoot<ReviewId> {
  public readonly bookingId: string;
  public readonly customerId: string;
  public readonly providerId: string;
  public readonly overall: RatingScore;
  public readonly comment: string | null;
  public readonly status: ReviewStatus;
  public readonly marketId: string;
  public readonly countryCode: string;

  private constructor(id: ReviewId, props: ReviewProps) {
    super(id);
    this.bookingId = props.bookingId;
    this.customerId = props.customerId;
    this.providerId = props.providerId;
    this.overall = props.overall;
    this.comment = props.comment;
    this.status = props.status;
    this.marketId = props.marketId;
    this.countryCode = props.countryCode;
  }

  public static create(id: ReviewId, props: ReviewProps): Review {
    return new Review(id, props);
  }
}
