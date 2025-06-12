import { ApiResponse } from "../types";

export async function mapResponse<TIn, TOut>(
  response: ApiResponse<TIn>,
  mapper: (input: TIn) => TOut
): Promise<ApiResponse<TOut>> {
  if (response.ok && response.data != null) {
    return { ok: true, data: mapper(response.data) };
  }
  return { ok: false, error: response.error };
}
