export interface Task {
    id: number;
    type: string;
    description: string;
    estimate: number;
    task_id: string;
    task_date: string;
    task_name: string;
    task_type: string;
    is_delayed: boolean;
    ct_customer: {
        id: number;
        name: string;
        phone: string;
        email: string;
        address_street: string;
        address_city: string;
        address_postal_code: string;
    };
    status_note: {
        id: number;
        ct_status: {
            id: number;
            name: string;
        };
        note: string;
    };
    documentations: Array<{
        id: number;
        doc_type: 'other';
        note: string;
        image_path: string;
    }>;
    note: string;
    order_pdf: string;
    destination_street_address: string;
    destination_postal_code: string;
    destination_city: string;
    pickup_street_address: string;
    pickup_postal_code: string;
    pickup_city: string;
    contact_person: string;
}
