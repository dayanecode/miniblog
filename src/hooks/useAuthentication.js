import {db} from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

// Dois estados possíveis: error e loading
export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup - 
    // deal with memory lek
    // estado que vai cancelar as ações depois que as coisas derem certo
    const[cancelled, setCancelled] = useState(false)

    // Serve para utilizar funções de autenticação
    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

                let systemErrorMessage
                
                if(error.message.includes('Password')) {
                    systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
                } else if (error.message.includes("email-already")) {
                    systemErrorMessage = "E-mail já cadastrado.";
                } else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
                }
                setLoading(false)
                setError(systemErrorMessage)
        }
    };
    
    // Vai fazer com que a gente consiga ter um app mais performático 
    useEffect(() => {
        return () => setCancelled(true)
    },[]);

    return {
        auth,
        createUser,
        error,
        loading
    }
}