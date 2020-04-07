declare interface Task {
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
    contact_person: string;
    contact_phone: string;
    deliver_address: {
        id: number;
        name: string;
        street_address: string;
        city: string;
        postal_code: string;
        merged_address: string;
    };
    pickup_address: {
        id: number;
        name: string;
        street_address: string;
        city: string;
        postal_code: string;
        merged_address: string;
    };
    trip_started_time: string;
    trip_ended_time: string;
}
