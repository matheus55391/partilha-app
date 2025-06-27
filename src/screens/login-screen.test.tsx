import LoginScreen from '@/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';


function renderWithProvider(children: React.ReactNode) {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}


describe("LoginScreen", () => {
    test("should render correctly", () => {
        const queryClient = new QueryClient(); // novo cliente para cada teste

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <LoginScreen />
            </QueryClientProvider>
        );

        const emailInput = getByTestId("email-input");
        const passwordInput = getByTestId("password-input");
        const loginButton = getByTestId("login-button");
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(loginButton).toBeTruthy();

    });

})
