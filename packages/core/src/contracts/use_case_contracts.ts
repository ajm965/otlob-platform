/** Generic application use-case contract. No handler implementation lives in Core. */
export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
