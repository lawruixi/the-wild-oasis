import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    backgroundcolor: var(--color-grey-50);

    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    // 1. Load the authenticated user.
    const { isAuthenticated, isLoading } = useUser();

    // 2. If there is no authenticated user, redirect to login.
    const navigate = useNavigate();
    useEffect(function() {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        } 
    }, [isAuthenticated, isLoading]);

    // 3. Show a loading spinner while that is happening.
    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    // 4. If there is a user, render the app.
    if (isAuthenticated) {
        return children;
    }
}

export default ProtectedRoute;
