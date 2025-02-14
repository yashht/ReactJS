import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

interface AppRouteProps {
    component: React.ComponentType<any>;
    layout: React.ComponentType<any>;
    isAuthProtected?: boolean;
}

/**
 * Functional component that defines a route in the application.
 * @param {AppRouteProps} component - The component to render for the route.
 * @param {React.ComponentType} layout - The layout component to wrap the route component.
 * @param {boolean} isAuthProtected - Flag indicating if the route is protected by authentication.
 * @param {object} rest - Additional props to pass to the Route component.
 * @returns JSX element representing the route.
 */
const AppRoute: React.FC<AppRouteProps> = ({
    component: Component,
    layout: Layout,
    isAuthProtected,
    ...rest
}) => (
    <Route
        {...rest}
        element={
            <Layout>
                <Component />
            </Layout>
        }
    />
);

/**
 * PropTypes for the AppRoute component.
 * @param {boolean} isAuthProtected - Indicates if the route is protected by authentication.
 * @param {any} component - The component to be rendered for the route.
 * @param {any} layout - The layout component for the route.
 */
AppRoute.propTypes = {
    isAuthProtected: PropTypes.bool,
    component: PropTypes.any,
    layout: PropTypes.any,
};

export default AppRoute;
