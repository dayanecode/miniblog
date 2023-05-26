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

export const useFetchUrlAvatars = (docCollection, search = null, uid = null) => {

    const [urlAvatars, setUrlAvatars] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData() {
            if (cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)
            // busca
            try {
                let q;

                if (uid) {
                    q = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createAt", "desc")
                    );
                } else {
                    q = await query(collectionRef, orderBy("createAt", "desc"));
                }

                // Vai servir para mapear os nosso dados
                await onSnapshot(q, (querySnapshot) => {
                    setUrlAvatars(
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

    return { urlAvatars, loading, error };
};

