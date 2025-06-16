import { Suspense } from "react";
import Transactions from "./transactions";

export const metadata = {
    title: 'Transactions'
}

export default function TransactionsPage() {
    return <Suspense fallback={
        <div>Loading...</div>
    }>
        <Transactions />
    </Suspense>;
}
