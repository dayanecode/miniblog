import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { 
            collection, 
            query, 
            orderBy, 
            onSnapshot, 
            where,
            QuerySnapshot,
         } from "firebase/firestore";
import { async } from "q";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData() {
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)
            // busca
            try {
                let q;

                if (search) {
                    q = await query(
                        collectionRef, 
                        where("tagsArray","array-contains", search), 
                        orderBy("createAt","desc")
                    );
                } else {
                    q = await query(collectionRef, orderBy("createAt", "desc"));
                }

                // Vai servir para mapear os nosso dados
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error.message);

                setLoading(false);
            }
        }

        loadData();

    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};

