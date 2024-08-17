export interface IUseCase<TRequest = void, TResponse = void> {
    execute(request: TRequest): Promise<TResponse>;
}
