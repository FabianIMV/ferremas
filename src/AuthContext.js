import { createContext, useState, useEffect } from 'react';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_UIO4gNUY8',
  ClientId: '3h1acnaqqioq9kf08d6t0tico1'
};

const userPool = new CognitoUserPool(poolData);

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error(err);
          return;
        }
        setIsAuthenticated(session.isValid());
        setUsername(cognitoUser.getUsername());
      });
    }
  }, []);

  const login = (username, password) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });

    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        setIsAuthenticated(true);
        setUsername(username);
      },
      onFailure: err => {
        console.error(err);
      }
    });
  };

  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
    }

    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};