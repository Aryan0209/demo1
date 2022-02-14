type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

export default interface LegalFormDetails {
  id: Number;
  document_type: String;
  category: String;
  department: String;
  requester_name: String;
  party_name: String;
  complexity: null | string;
  request_date: String;
  priority: null | String;
  required_days: null | String;
  document_start_date: String;
  document_end_date: String;
  authorized_by: null | String;
  remark: String;
  execution_date: String;
  signed_copy_date: String;
  hard_soft: String | null;
  receipt_acknowledgement: String | null;
  standard_tat: String;
  if_recurring: String | null;
  recuring_duration: null;
  duration_date: String;
  agreement_date: String;
  follow_date: String;
  status: Number;
  created_at: String;
  updated_at: String;
  userable_id: Number;
  hod_st: Number;
  member_st: Number;
  hod2_st: Number;
  assets: any[];
  state: Number;
  renew_count: Number | null;
  renewed_from: String | null;
  required_date: Date;
  other_party1: String | null;
  other_party2: String | null;
  other_party3: String | null;
  other_party4: String | null;
}
