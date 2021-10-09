import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { database } from '../database';
import { User as UserModel } from '../database/model/User';

interface UserProps {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: UserProps;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<UserProps>({} as UserProps);

    useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        const userCollection = database.get<UserModel>('users');
        const response = await userCollection.query().fetch();

        if(response.length) {
            const userData = response[0]._raw as unknown as UserProps;
            api.defaults.headers.authorizarion = `Bearer ${userData.token}`;
            setData(userData);
        }
    }
 
    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password
            });
    
            const { token, user } = response.data;
    
            api.defaults.headers.authorizarion = `Bearer ${token}`;

            await database
            .get<UserModel>('users')
            .create(newUser => {
                newUser.user_id = user.id,
                newUser.name = user.name,
                newUser.email = user.email,
                newUser.driver_license = user.driver_license,
                newUser.avatar = user.avatar,
                newUser.token = token
            });
    
            setData({ ...user, token });   
        } catch(error) {
            throw new Error(error);
        }
    }
 
    async function signOut() {
        console.log('logout');
    }

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };