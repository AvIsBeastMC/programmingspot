declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_api: string;
            NEXT_PUBLIC_authDomain: string;
            NEXT_PUBLIC_projectId: string;
            NEXT_PUBLIC_storageBucket: string;
            NEXT_PUBLIC_messagingSenderId: string;
            NEXT_PUBLIC_appId: string;
            NEXT_PUBLIC_mongo: string;
            NEXT_PUBLIC_razorpayKey: string;
        }
    }
}
export {}