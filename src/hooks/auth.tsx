import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { database } from '../database';
import { User as UserModel } from '../database/model/User';
import { Alert } from 'react-native';

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
    updateUser: (user: UserProps) => Promise<void>;
    isLoading: Boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<UserProps>({} as UserProps);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        const userCollection = database.get<UserModel>('users');

        try {
            const response = await userCollection.query().fetch();

            if(response.length) {
                const userData = response[0]._raw as unknown as UserProps;
                api.defaults.headers.authorizarion = `Bearer ${userData.token}`;
                setData(userData);
            }
        } catch(error) {
            Alert.alert(error.message)
        } finally {
            setIsLoading(false);
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


            await database.write(() => {
                return database.get<UserModel>('users')
                .create(newUser => {
                    newUser.user_id = user.id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.driver_license = user.driver_license,
                    newUser.avatar = user.avatar,
                    newUser.token = token
                })
            })
    
            setData({ ...user, token });   
        } catch(error) {
            throw new Error(error);
        }
    }
 
    async function signOut() {
        try {
            const userCollection = database.get<UserModel>('users');
            const userSelected = await userCollection.find(data.id);

            await database.write(() => {
                return userSelected.destroyPermanently();
            });

            setData({} as UserProps);
        } catch(error) {
            console.log(error)
            throw new Error(error);
        }
    }

    async function updateUser(user: UserProps) {
        try {
            const userCollection = database.get<UserModel>('users');
            const userSelected = await userCollection.find(data.id);

            await database.write(() => {
                return userSelected.update(( userData ) => {
                    userData.name = user.name,
                    userData.driver_license = user.driver_license,
                    userData.avatar = user.avatar
                });
            });

            setData(user);

            return true;
        } catch(error) {
            throw new Error(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut,
                updateUser,
                isLoading
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