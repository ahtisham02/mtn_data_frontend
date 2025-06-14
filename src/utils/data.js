export const apiData = {
  name: 'MtnAPI Services',
  provider: 'Mtn Devs',
  tagline: 'A suite of powerful, reliable APIs for modern applications.',
  subscribers: 1842,
  category: 'Developer Tools',
  stats: {
    popularity: '9.9',
    serviceLevel: '99.8%',
    latency: '120ms',
    testSuccess: '99%',
  },
  plans: [
    { title: 'BASIC', price: '$0.00', active: true },
    { title: 'PRO', price: '$50.00', active: false },
    { title: 'ULTRA', price: '$100.00', active: false },
  ],
};

export const collections = [
  {
    id: 'user-management',
    name: 'User Management API',
    endpoints: [
      {
        slug: 'create-user',
        method: 'POST',
        name: 'Create User',
        url: 'https://api.mtn.com/v1/users',
        params: [],
        headers: [ { key: 'Content-Type', value: 'application/json' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: '{ "name": "John Doe", "email": "john.doe@example.com", "age": 30 }',
        requestSchema: [
            { field: 'name', type: 'string', required: true, description: 'The full name of the user.' },
            { field: 'email', type: 'string (email)', required: true, description: 'A unique email address.' },
            { field: 'age', type: 'integer', required: false, description: 'The age of the user.' },
        ],
        codeSnippets: { curl: 'curl -X POST https://api.mtn.com/v1/users --data \'{"name": "John Doe"}\'' },
        response: { id: "usr_12345", status: "created", timestamp: "2025-06-14T10:35:19Z" },
        responseHeaders: [ 
            { key: 'content-type', value: 'application/json' }, 
            { key: 'server', value: 'nginx' }, 
            { key: 'x-request-id', value: 'abc-123' },
            { key: 'access-control-allow-origin', value: '*' },
        ],
        responseCookies: [ { key: 'sessionId', value: 'xyz789' } ]
      },
      {
        slug: 'get-user',
        method: 'GET',
        name: 'Get User by ID',
        url: 'https://api.mtn.com/v1/users/usr_12345',
        params: [ { key: 'include_details', value: 'true', description: 'Include full user details.' } ],
        headers: [ { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: null,
        requestSchema: [],
        codeSnippets: { curl: 'curl -X GET https://api.mtn.com/v1/users/usr_12345' },
        response: { id: "usr_12345", name: "John Doe", email: "john.doe@example.com", created_at: "2025-06-14T10:35:19Z" },
        responseHeaders: [ { key: 'content-type', value: 'application/json' }, { key: 'cache-control', value: 'max-age=3600' } ],
        responseCookies: []
      },
      {
        slug: 'update-user',
        method: 'PUT',
        name: 'Update User',
        url: 'https://api.mtn.com/v1/users/usr_12345',
        params: [],
        headers: [ { key: 'Content-Type', value: 'application/json' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: '{ "name": "Johnathan Doe" }',
        requestSchema: [
            { field: 'name', type: 'string', required: false, description: 'The updated name.' },
            { field: 'age', type: 'integer', required: false, description: 'The updated age.' }
        ],
        codeSnippets: { curl: 'curl -X PUT https://api.mtn.com/v1/users/usr_12345 --data \'{"name": "Johnathan Doe"}\'' },
        response: { id: "usr_12345", status: "updated", updated_at: "2025-06-14T11:00:00Z" },
        responseHeaders: [ { key: 'content-type', value: 'application/json' } ],
        responseCookies: []
      },
      {
        slug: 'delete-user',
        method: 'DELETE',
        name: 'Delete User',
        url: 'https://api.mtn.com/v1/users/usr_12345',
        params: [],
        headers: [ { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: null,
        requestSchema: [],
        codeSnippets: { curl: 'curl -X DELETE https://api.mtn.com/v1/users/usr_12345' },
        response: { id: "usr_12345", status: "deleted" },
        responseHeaders: [ { key: 'content-length', value: '0' } ],
        responseCookies: []
      }
    ]
  },
  {
    id: 'linkedin-scraper',
    name: 'LinkedIn ScraperX',
    endpoints: [
      {
        slug: 'person-followers-count',
        method: 'POST',
        name: 'Person Followers Count',
        url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/person/followers',
        params: [],
        headers: [ { key: 'Content-Type', value: 'application/json' }, { key: 'x-mtnapi-host', value: 'mtn-linkedin-scraperx-api.p.mtnapi.com' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in the x-mtnapi-key header.'},
        body: '{ "link": "https://linkedin.com/in/aneeqkhurram007" }',
        requestSchema: [
            { field: 'link', type: 'string (url)', required: true, description: 'The full URL of the LinkedIn profile.' }
        ],
        codeSnippets: { curl: 'curl --request POST --url https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/person/followers --header \'Content-Type: application/json\' --data \'{"link": "..."}\'' },
        response: { status: "success", data: 4142 },
        responseHeaders: [ { key: 'content-type', value: 'application/json; charset=utf-8' }, { key: 'x-powered-by', value: 'Express' }, { key: 'content-security-policy', value: "default-src 'self'" } ],
        responseCookies: []
      },
      {
        slug: 'person-skills',
        method: 'GET',
        name: 'Person Skills',
        url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/person/skills',
        params: [ { key: 'profile_url', value: 'https://linkedin.com/in/satyanadella', description: 'URL of the LinkedIn profile.' } ],
        headers: [ { key: 'x-mtnapi-host', value: 'mtn-linkedin-scraperx-api.p.mtnapi.com' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in the x-mtnapi-key header.'},
        body: null,
        requestSchema: [],
        codeSnippets: { curl: 'curl --request GET --url https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/person/skills?profile_url=...' },
        response: { status: "success", skills: ["Cloud Computing", "AI", "Leadership", "Enterprise Software"] },
        responseHeaders: [ { key: 'content-type', value: 'application/json; charset=utf-8' }, { key: 'x-powered-by', value: 'Express' } ],
        responseCookies: []
      },
      {
        slug: 'update-scrape-config',
        method: 'PUT',
        name: 'Update Scrape Config',
        url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/config',
        params: [],
        headers: [ { key: 'Content-Type', value: 'application/json' }, { key: 'x-mtnapi-host', value: 'mtn-linkedin-scraperx-api.p.mtnapi.com' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in the x-mtnapi-key header.'},
        body: '{ "timeout": 10000, "retries": 3 }',
        requestSchema: [
            { field: 'timeout', type: 'integer', required: false, description: 'Request timeout in milliseconds.' },
            { field: 'retries', type: 'integer', required: false, description: 'Number of retries on failure.' }
        ],
        codeSnippets: { curl: 'curl --request PUT --url https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/config --data \'{"timeout": 10000}\'' },
        response: { status: "config_updated" },
        responseHeaders: [ { key: 'content-type', value: 'application/json; charset=utf-8' } ],
        responseCookies: []
      },
      {
        slug: 'delete-scrape-job',
        method: 'DELETE',
        name: 'Delete Scrape Job',
        url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/job/job_xyz',
        params: [],
        headers: [ { key: 'x-mtnapi-host', value: 'mtn-linkedin-scraperx-api.p.mtnapi.com' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in the x-mtnapi-key header.'},
        body: null,
        requestSchema: [],
        codeSnippets: { curl: 'curl --request DELETE --url https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/job/job_xyz' },
        response: { status: "job_deleted" },
        responseHeaders: [ { key: 'content-length', value: '0' } ],
        responseCookies: []
      }
    ]
  },
  {
    id: 'payment-gateway',
    name: 'Payment Gateway API',
    endpoints: [
      {
        slug: 'create-charge',
        method: 'POST',
        name: 'Create Charge',
        url: 'https://api.mtn.com/v1/charge',
        params: [],
        headers: [ { key: 'Content-Type', value: 'application/json' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: '{ "amount": 999, "currency": "usd", "source": "tok_visa" }',
        requestSchema: [
            { field: 'amount', type: 'integer', required: true, description: 'Amount in the smallest currency unit (e.g., cents).' },
            { field: 'currency', type: 'string', required: true, description: 'Three-letter ISO currency code.' },
            { field: 'source', type: 'string', required: true, description: 'A payment source token.' },
        ],
        codeSnippets: { curl: 'curl -X POST https://api.mtn.com/v1/charge -d \'{"amount": 999}\'' },
        response: { id: "ch_9876", status: "succeeded", amount: 999, currency: "usd" },
        responseHeaders: [ { key: 'content-type', value: 'application/json' }, { key: 'x-request-id', value: 'def-456' } ],
        responseCookies: []
      },
      {
        slug: 'get-charge',
        method: 'GET',
        name: 'Get Charge Details',
        url: 'https://api.mtn.com/v1/charge/ch_9876',
        params: [],
        headers: [ { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: null,
        requestSchema: [],
        codeSnippets: { curl: 'curl -X GET https://api.mtn.com/v1/charge/ch_9876' },
        response: { id: "ch_9876", amount: 999, status: "succeeded", captured: true },
        responseHeaders: [ { key: 'content-type', value: 'application/json' } ],
        responseCookies: []
      },
      {
        slug: 'update-charge-metadata',
        method: 'PUT',
        name: 'Update Charge Metadata',
        url: 'https://api.mtn.com/v1/charge/ch_9876',
        params: [],
        headers: [ { key: 'Content-Type', value: 'application/json' }, { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: '{ "metadata": { "order_id": "order_abc" } }',
        requestSchema: [
            { field: 'metadata', type: 'object', required: true, description: 'A set of key-value pairs to store with the charge.' }
        ],
        codeSnippets: { curl: 'curl -X PUT https://api.mtn.com/v1/charge/ch_9876 -d \'{"metadata": {...}}\'' },
        response: { id: "ch_9876", status: "metadata_updated" },
        responseHeaders: [ { key: 'content-type', value: 'application/json' } ],
        responseCookies: []
      },
      {
        slug: 'refund-charge',
        method: 'DELETE',
        name: 'Refund Charge',
        url: 'https://api.mtn.com/v1/charge/ch_9876/refund',
        params: [],
        headers: [ { key: 'x-mtnapi-key', value: 'YOUR_API_KEY_HERE' } ],
        auth: { type: 'API Key', details: 'API Key is passed in a header.' },
        body: null,
        requestSchema: [],
        codeSnippets: { curl: 'curl -X DELETE https://api.mtn.com/v1/charge/ch_9876/refund' },
        response: { id: "ch_9876", status: "refunded" },
        responseHeaders: [ { key: 'content-length', value: '0' } ],
        responseCookies: []
      }
    ]
  }
];