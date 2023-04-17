import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
 doc, getDoc
} from "firebase/firestore";
import { async } from "q";

export const useFetchDocument = (docCollection) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadDocument() {
            if (cancelled) return

            setLoading(true);

        
        
        }

        loadDocument();

    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};

