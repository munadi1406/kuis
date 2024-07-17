import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'




const WithQuery = (WrappedComponent) => {
    const queryClient = new QueryClient()
    function WithLogger(props) {
        return (
            <QueryClientProvider client={queryClient}>
                <WrappedComponent {...props}/>
            </QueryClientProvider>
        );
    };
    return WithLogger
};
export default WithQuery;