import { Gift, Zap, TrendingUp, Rocket } from "lucide-react";

export const packages = [
  {
    id: "plan_free",
    name: "Basic",
    price: 0,
    icon: Gift,
    details: ["100 Credits"],
    features: [
      { text: "LinkedIn Profile Data", included: true },
      { text: "LinkedIn Jobs Data", included: true },
      { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: false },
      { text: "Premium Company Insights", included: false },
      { text: "Sales Navigator Search", included: false },
    ],
    rateLimit: "Rate Limit: 1000 requests/hour",
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: 49,
    icon: Zap,
    details: ["20,000 Credits"],
    features: [
      { text: "LinkedIn Profile Data", included: true },
      { text: "LinkedIn Jobs Data", included: true },
      { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: true },
      { text: "Sales Navigator Search", included: true },
      { text: "Employee Search", included: false },
    ],
    rateLimit: "Rate Limit: 20 requests/minute",
  },
  {
    id: "plan_growth",
    name: "Growth",
    price: 99,
    icon: TrendingUp,
    details: ["100,000 Credits"],
    features: [
      { text: "All Pro Features", included: true },
      { text: "Premium Company Insights", included: true },
      { text: "Employee Search", included: true },
      { text: "AI-Powered Endpoints", included: false },
    ],
    rateLimit: "Rate Limit: 35 requests/minute",
  },
  {
    id: "plan_ultra",
    name: "Ultra",
    price: 199,
    icon: Rocket,
    details: ["350,000 Credits"],
    features: [
      { text: "All Growth Features", included: true },
      { text: "AI-Powered Endpoints", included: true },
      { text: "Amazing Endpoints", included: true },
      { text: "Priority Support", included: true },
    ],
    rateLimit: "Rate Limit: 50 requests/minute",
  },
  {
    id: "plan_mega",
    name: "Custom / Enterprise",
    price: "Custom",
    description:
      "Need a tailor-made solution? Let's build a plan that fits your unique scale, support, and data requirements.",
    features: [
      { text: "Custom Credit Volume" },
      { text: "Dedicated Onboarding" },
      { text: "Custom Rate Limits & SLAs" },
    ],
  },
];

export const apiData = {
  name: "Client API Services",
  provider: "Mtn Devs",
  tagline: "A suite of powerful, reliable APIs for modern applications.",
  subscribers: 1842,
  category: "Developer Tools",
  stats: {
    popularity: "9.9/10",
    serviceLevel: "99.8%",
    latency: "120ms",
    testSuccess: "99%",
  },
};

const API_BASE_URL = import.meta.env.VITE_API_COLLECTIONS_BASE_URL;

export const collections = [
  {
    id: "credit-savers",
    name: "Credit Savers",
    endpoints: [
      {
        slug: "get-linkedin-profile",
        method: "POST",
        name: "Get LinkedIn profile",
        url: `${API_BASE_URL}/get-linkedin-profile`,
        params: [],
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Accept", value: "*/*" },
        ],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify(
          { linkedin_url: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "The full URL of the LinkedIn profile to fetch.",
          },
        ],
        response: {},
      },
      {
        slug: "bulk-get-linkedin-profile",
        method: "POST",
        name: "Bulk Get LinkedIn profiles",
        url: `${API_BASE_URL}/bulk/get-linkedin-profile`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify(
          { linkedin_urls: ["https://linkedin.com/in/aneeqkhurram007"] },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_urls",
            type: "array[string]",
            required: true,
            description: "An array of LinkedIn profile URLs.",
          },
        ],
        response: {},
      },
      {
        slug: "find-key-person",
        method: "POST",
        name: "Find key person",
        url: `${API_BASE_URL}/find-key-person`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify({ company: "apple.com" }, null, 2),
        requestSchema: [
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: 'The domain of the company (e.g., "apple.com").',
          },
        ],
        response: {},
      },
      {
        slug: "find-person",
        method: "POST",
        name: "Find person",
        url: `${API_BASE_URL}/find-person`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify(
          { company: "google.com", full_name: "Aneeq Khurram" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "The domain of the company.",
          },
          {
            field: "full_name",
            type: "string",
            required: true,
            description: "The full name of the employee to find.",
          },
        ],
        response: {},
      },
      {
        slug: "find-person-by-department",
        method: "POST",
        name: "Find person by department",
        url: `${API_BASE_URL}/find-person-by-department`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify(
          { company: "google.com", facetValue: 1, seniority: 0 },
          null,
          2
        ),
        requestSchema: [
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "The domain of the company.",
          },
          {
            field: "facetValue",
            type: "integer",
            required: true,
            description: "Identifier for the department/facet.",
          },
          {
            field: "seniority",
            type: "integer",
            required: true,
            description: "Identifier for the seniority level.",
          },
        ],
        response: {},
      },
      {
        slug: "find-decision-makers",
        method: "POST",
        name: "Find decision makers",
        url: `${API_BASE_URL}/find-decision-makers`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify(
          { company: "google.com", facetValue: 1, seniority: 0 },
          null,
          2
        ),
        requestSchema: [
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "The domain of the company.",
          },
          {
            field: "facetValue",
            type: "integer",
            required: true,
            description: "Identifier for the department/facet.",
          },
          {
            field: "seniority",
            type: "integer",
            required: true,
            description: "Identifier for the seniority level.",
          },
        ],
        response: {},
      },
      {
        slug: "bulk-find-decision-makers",
        method: "POST",
        name: "Bulk find decision makers",
        url: `${API_BASE_URL}/bulk/find-decision-makers`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: {
          type: "None",
          details: "This endpoint is open and does not require an API key.",
        },
        body: JSON.stringify(
          { companies: ["google.com"], facetValue: 1, seniority: 0 },
          null,
          2
        ),
        requestSchema: [
          {
            field: "companies",
            type: "array[string]",
            required: true,
            description: "An array of company domains.",
          },
          {
            field: "facetValue",
            type: "integer",
            required: true,
            description: "Identifier for the department/facet.",
          },
          {
            field: "seniority",
            type: "integer",
            required: true,
            description: "Identifier for the seniority level.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "amazing-api",
    name: "Amazing",
    endpoints: [
      {
        slug: "get-profile-cv",
        method: "POST",
        name: "Get profile cv pdf link",
        url: `${API_BASE_URL}/amazing/person-cv`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { profile_link: "https://www.linkedin.com/in/aneeqkhurram007/" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "profile_link",
            type: "string (url)",
            required: true,
            description: "URL of the LinkedIn profile.",
          },
        ],
        response: {},
      },
      {
        slug: "get-open-to-status",
        method: "POST",
        name: "Get profile open to work status",
        url: `${API_BASE_URL}/amazing/open-to-status`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { profile_link: "https://www.linkedin.com/in/aneeqkhurram007/" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "profile_link",
            type: "string (url)",
            required: true,
            description: "URL of the LinkedIn profile.",
          },
        ],
        response: {},
      },
      {
        slug: "get-open-to-message",
        method: "POST",
        name: "Get profile open to message status",
        url: `${API_BASE_URL}/amazing/open-to-message`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { profile_link: "https://www.linkedin.com/in/aneeqkhurram007/" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "profile_link",
            type: "string (url)",
            required: true,
            description: "URL of the LinkedIn profile.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "ai-api",
    name: "AI",
    endpoints: [
      {
        slug: "ai-linkedin-chat-bot",
        method: "POST",
        name: "LinkedIn Chat Bot",
        url: `${API_BASE_URL}/ai/linkedin-chat-bot`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            questions: [
              "What is the name of the person?",
              "What is the current company of the person?",
            ],
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Profile or Company URL.",
          },
          {
            field: "questions",
            type: "array[string]",
            required: true,
            description: "Questions to ask about the profile.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-optimize-profile",
        method: "POST",
        name: "Optimize Profile",
        url: `${API_BASE_URL}/ai/optimize-profile`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Profile or Company URL.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-magic-pen",
        method: "POST",
        name: "Magic Pen",
        url: `${API_BASE_URL}/ai/magic-pen`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Profile or Company URL.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-automated-recommendations",
        method: "POST",
        name: "Automated Recommendations",
        url: `${API_BASE_URL}/ai/automated-recommendations`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Profile or Company URL.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-automated-insights",
        method: "POST",
        name: "Automated Insights",
        url: `${API_BASE_URL}/ai/automated-insights`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Profile or Company URL.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-career-predict-progression",
        method: "POST",
        name: "Career Predict Progression",
        url: `${API_BASE_URL}/ai/career-predict-progression`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "URL of the LinkedIn person profile.",
          },
        ],
        response: {},
      },
      {
        slug: "ai-job-market-trends",
        method: "POST",
        name: "Job Market Trends",
        url: `${API_BASE_URL}/ai/job-market-trends`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { linkedin_url: "https://www.linkedin.com/company/apple/" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "URL of the LinkedIn company page.",
          },
        ],
        response: {},
      },
      {
        slug: "ai-message-email-crafter",
        method: "POST",
        name: "Message & Email Crafter",
        url: `${API_BASE_URL}/ai/message-email-crafter`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            from_profile_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            to_profile_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            subject: "Write a connection message",
            details: "include my last company experience",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "from_profile_url",
            type: "string (url)",
            required: true,
            description: "Sender's profile URL.",
          },
          {
            field: "to_profile_url",
            type: "string (url)",
            required: true,
            description: "Recipient's profile URL.",
          },
          {
            field: "subject",
            type: "string",
            required: true,
            description: "The subject or goal of the message.",
          },
          {
            field: "details",
            type: "string",
            required: true,
            description: "Specific details to include in the message.",
          },
        ],
        response: {},
      },
      {
        slug: "ai-profile-qualifier",
        method: "POST",
        name: "Profile Qualifier",
        url: `${API_BASE_URL}/ai/profile-qualifier`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            leadTitle: "Software Engineer",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Your LinkedIn profile URL.",
          },
          {
            field: "leadTitle",
            type: "string",
            required: true,
            description: "The job title you are targeting.",
          },
        ],
        response: {},
      },
      {
        slug: "ai-bench-marking-tool",
        method: "POST",
        name: "Bench Marking Tool",
        url: `${API_BASE_URL}/ai/bench-marking-tool`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedin_url",
            type: "string (url)",
            required: true,
            description: "Profile or Company URL.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-competitor-profile-analyser",
        method: "POST",
        name: "Competitor Profile Analyser",
        url: `${API_BASE_URL}/ai/competitor-profile-analyser`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            own_linkedin_url: "https://www.linkedin.com/in/aneeqkhurram007/",
            competitor_linkedin_url:
              "https://www.linkedin.com/in/aneeqkhurram007/",
            linkType: "PERSON",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "own_linkedin_url",
            type: "string (url)",
            required: true,
            description: "Your profile URL.",
          },
          {
            field: "competitor_linkedin_url",
            type: "string (url)",
            required: true,
            description: "Competitor's profile URL.",
          },
          {
            field: "linkType",
            type: "string",
            required: true,
            description: "Type of link (PERSON or COMPANY).",
          },
        ],
        response: {},
      },
      {
        slug: "ai-lead-message-crafter",
        method: "POST",
        name: "Lead Message Crafter",
        url: `${API_BASE_URL}/ai/lead-message-crafter`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            lead: {
              id: "string",
              first_name: "string",
              last_name: "string",
              email: "string",
              phone_number: "string",
              company_name: "string",
              website: "string",
              location: "string",
              linkedin_profile: "string",
              company_url: "string",
              is_unsubscribed: true,
              unsubscribed_client_id_map: {},
            },
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "lead",
            type: "object",
            required: true,
            description: "An object containing lead details.",
          },
        ],
        response: {},
      },
      {
        slug: "ai-get-ai-contact",
        method: "GET",
        name: "Get AI contact prompts",
        url: `${API_BASE_URL}/ai/ai-contact/{id}`,
        params: [
          {
            key: "id",
            value: "some-id",
            description: "The ID of the contact.",
            in: "path",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
    ],
  },
  {
    id: "company-api",
    name: "Company",
    endpoints: [
      {
        slug: "company-get-info",
        method: "POST",
        name: "Get company info",
        url: `${API_BASE_URL}/company`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-bulk-info",
        method: "POST",
        name: "Get bulk company info",
        url: `${API_BASE_URL}/company/bulk`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            links: [
              "https://linkedin.in/company/apple",
              "https://linkedin.in/company/google",
            ],
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "links",
            type: "array[string]",
            required: true,
            description: "Array of LinkedIn company page URLs.",
          },
        ],
        response: {},
      },
      {
        slug: "company-info-by-id",
        method: "POST",
        name: "Get company info by ID",
        url: `${API_BASE_URL}/company/id`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/4068479330" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url/id)",
            required: true,
            description: "LinkedIn company URL or ID.",
          },
        ],
        response: {},
      },
      {
        slug: "company-info-by-domain",
        method: "POST",
        name: "Get company info by domain",
        url: `${API_BASE_URL}/company/domain`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ domain: "google.com" }, null, 2),
        requestSchema: [
          {
            field: "domain",
            type: "string",
            required: true,
            description: "Company domain name.",
          },
        ],
        response: {},
      },
      {
        slug: "company-bulk-domain",
        method: "POST",
        name: "Get bulk company info by domain",
        url: `${API_BASE_URL}/company/bulk/domain`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ domains: ["google.com", "apple.com"] }, null, 2),
        requestSchema: [
          {
            field: "domains",
            type: "array[string]",
            required: true,
            description: "Array of company domain names.",
          },
        ],
        response: {},
      },
      {
        slug: "company-deep-info",
        method: "POST",
        name: "Get deep company info",
        url: `${API_BASE_URL}/company/deep`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-jobs",
        method: "POST",
        name: "Get company jobs",
        url: `${API_BASE_URL}/company/jobs`,
        params: [
          {
            key: "count",
            value: "10",
            description: "Number of jobs to return.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Starting index for pagination.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-posts",
        method: "POST",
        name: "Get company posts",
        url: `${API_BASE_URL}/company/posts`,
        params: [
          {
            key: "count",
            value: "10",
            description: "Number of posts to return.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Starting index for pagination.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-post-comments",
        method: "POST",
        name: "Get company post comments",
        url: `${API_BASE_URL}/company/post-comments`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            socialDetailUrn:
              "urn:li:fsd_socialDetail:(urn:li:ugcPost:7247563254971990016,urn:li:ugcPost:7247563254971990016,urn:li:highlightedReply:-)",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "socialDetailUrn",
            type: "string",
            required: true,
            description: "The socialDetail URN of the post.",
          },
        ],
        response: {},
      },
      {
        slug: "company-post-reposts",
        method: "POST",
        name: "Get company post reposts",
        url: `${API_BASE_URL}/company/post-reposts`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { postUrn: "urn:li:ugcPost:7247563254971990016" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "postUrn",
            type: "string",
            required: true,
            description: "The post URN.",
          },
        ],
        response: {},
      },
      {
        slug: "company-employee-count",
        method: "POST",
        name: "Get company employee count",
        url: `${API_BASE_URL}/company/employeeCount`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-c-level-profiles",
        method: "POST",
        name: "Get C-level profiles",
        url: `${API_BASE_URL}/company/c-level-profiles`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ domain: "google.com" }, null, 2),
        requestSchema: [
          {
            field: "domain",
            type: "string",
            required: true,
            description: "Company domain name.",
          },
        ],
        response: {},
      },
      {
        slug: "company-cover-image",
        method: "POST",
        name: "Get company cover image",
        url: `${API_BASE_URL}/company/coverImage`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-profile-image",
        method: "POST",
        name: "Get company profile image",
        url: `${API_BASE_URL}/company/profileImage`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
      {
        slug: "company-followers",
        method: "POST",
        name: "Get company followers",
        url: `${API_BASE_URL}/company/followers`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.in/company/apple" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn company page URL.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "email-to-linkedin-api",
    name: "Email to Linkedin",
    endpoints: [
      {
        slug: "email-to-linkedin-bulk",
        method: "POST",
        name: "Email to Linkedin bulk",
        url: `${API_BASE_URL}/email-to-linkedin/bulk`,
        params: [
          {
            key: "count",
            value: "1",
            description: "Number of emails to process.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ emails: ["example@gmail.com"] }, null, 2),
        requestSchema: [
          {
            field: "emails",
            type: "array[string]",
            required: true,
            description: "Array of emails to look up.",
          },
        ],
        response: {},
      },
      {
        slug: "email-to-linkedin-single",
        method: "POST",
        name: "Email to Linkedin",
        url: `${API_BASE_URL}/email-to-linkedin`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ email: "example@gmail.com" }, null, 2),
        requestSchema: [
          {
            field: "email",
            type: "string",
            required: true,
            description: "A single email to look up.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "geo-locations-api",
    name: "Geo Locations",
    endpoints: [
      {
        slug: "get-geo-locations",
        method: "GET",
        name: "Get Geo Locations",
        url: `${API_BASE_URL}/geo-locations/{location}`,
        params: [
          {
            key: "location",
            value: "london",
            description: "The location to search for.",
            in: "path",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
    ],
  },
  {
    id: "job-api",
    name: "Job",
    endpoints: [
      {
        slug: "job-get-details",
        method: "POST",
        name: "Get job details",
        url: `${API_BASE_URL}/job/details`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ jobId: 4068479330 }, null, 2),
        requestSchema: [
          {
            field: "jobId",
            type: "integer",
            required: true,
            description: "The ID of the job.",
          },
        ],
        response: {},
      },
      {
        slug: "job-search",
        method: "POST",
        name: "Search for jobs",
        url: `${API_BASE_URL}/job/search`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of results.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { title: "Software Engineer", location: "London" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "title",
            type: "string",
            required: true,
            description: "Job title to search for.",
          },
          {
            field: "location",
            type: "string",
            required: true,
            description: "Location to search in.",
          },
        ],
        response: {},
      },
      {
        slug: "job-hiring-team",
        method: "POST",
        name: "Get hiring team",
        url: `${API_BASE_URL}/job/hiring-team`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ jobId: 4068479330 }, null, 2),
        requestSchema: [
          {
            field: "jobId",
            type: "integer",
            required: true,
            description: "The ID of the job.",
          },
        ],
        response: {},
      },
      {
        slug: "job-hiring-team-email",
        method: "POST",
        name: "Get hiring team emails",
        url: `${API_BASE_URL}/job/hiring-team-email`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ jobId: 4068479330 }, null, 2),
        requestSchema: [
          {
            field: "jobId",
            type: "integer",
            required: true,
            description: "The ID of the job.",
          },
        ],
        response: {},
      },
      {
        slug: "job-search-by-url",
        method: "POST",
        name: "Get jobs by search URL",
        url: `${API_BASE_URL}/job/search-by-url`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            searchUrl:
              "https://www.linkedin.com/jobs/search/?currentJobId=4092847736&keywords=Junior%20Architect",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "searchUrl",
            type: "string (url)",
            required: true,
            description: "A LinkedIn job search URL.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "linkedin-to-email-api",
    name: "Linkedin To Email",
    endpoints: [
      {
        slug: "linkedin-to-email-single",
        method: "POST",
        name: "Linkedin To Email",
        url: `${API_BASE_URL}/linkedin-to-email`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { linkedinUrl: "https://www.linkedin.com/in/aneeqkhurram007/" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "linkedinUrl",
            type: "string (url)",
            required: true,
            description: "The LinkedIn profile URL.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "person-api",
    name: "Person",
    endpoints: [
      {
        slug: "person-data",
        method: "POST",
        name: "Get person data",
        url: `${API_BASE_URL}/person`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-bulk-data",
        method: "POST",
        name: "Get bulk person data",
        url: `${API_BASE_URL}/person/bulk`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            links: [
              "https://linkedin.com/in/aneeqkhurram007",
              "https://linkedin.com/in/debosche-user",
            ],
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "links",
            type: "array[string]",
            required: true,
            description: "Array of LinkedIn profile URLs.",
          },
        ],
        response: {},
      },
      {
        slug: "person-data-urn",
        method: "POST",
        name: "Get person data by URN",
        url: `${API_BASE_URL}/person/urn`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/ACoAABu3qVMB5HxQz1vFZQ" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (urn)",
            required: true,
            description: "LinkedIn profile URN link.",
          },
        ],
        response: {},
      },
      {
        slug: "person-bulk-urn",
        method: "POST",
        name: "Get bulk person data by URN",
        url: `${API_BASE_URL}/person/bulk/urn`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            links: [
              "https://linkedin.com/in/aneeqkhurram007",
              "https://linkedin.com/in/debosche-user",
            ],
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "links",
            type: "array[string]",
            required: true,
            description: "Array of LinkedIn profile URN links.",
          },
        ],
        response: {},
      },
      {
        slug: "person-deep-data",
        method: "POST",
        name: "Get elite person data",
        url: `${API_BASE_URL}/person/deep`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-skills",
        method: "POST",
        name: "Get person skills",
        url: `${API_BASE_URL}/person/skills`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-education",
        method: "POST",
        name: "Get person education",
        url: `${API_BASE_URL}/person/education`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-experience",
        method: "POST",
        name: "Get person experience",
        url: `${API_BASE_URL}/person/experience`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-about",
        method: "POST",
        name: "Get person about",
        url: `${API_BASE_URL}/person/about`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-given-recs",
        method: "POST",
        name: "Get given recommendations",
        url: `${API_BASE_URL}/person/given-recommendations`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-received-recs",
        method: "POST",
        name: "Get received recommendations",
        url: `${API_BASE_URL}/person/received-recommendations`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-followers",
        method: "POST",
        name: "Get person followers",
        url: `${API_BASE_URL}/person/followers`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-connections",
        method: "POST",
        name: "Get person connections",
        url: `${API_BASE_URL}/person/connections`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-profile-pic",
        method: "POST",
        name: "Get person profile picture",
        url: `${API_BASE_URL}/person/profile-picture`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-similar-profiles",
        method: "POST",
        name: "Get similar profiles",
        url: `${API_BASE_URL}/person/similar-profiles`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-posts",
        method: "POST",
        name: "Get person posts",
        url: `${API_BASE_URL}/person/posts`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of posts.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
      {
        slug: "person-post-comment",
        method: "POST",
        name: "Get person post comments",
        url: `${API_BASE_URL}/person/post-comment`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            urn: "urn:li:fsd_comment:(7246621444024004609,urn:li:activity:7245052400359665664)",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "urn",
            type: "string (urn)",
            required: true,
            description: "Post social URN.",
          },
        ],
        response: {},
      },
      {
        slug: "person-recent-activity",
        method: "POST",
        name: "Get person recent activity",
        url: `${API_BASE_URL}/person/recent-activity`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { link: "https://linkedin.com/in/aneeqkhurram007" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "link",
            type: "string (url)",
            required: true,
            description: "LinkedIn profile URL.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "sales-nav-api",
    name: "Sales Nav",
    endpoints: [
      {
        slug: "sales-nav-search-employee-profile",
        method: "POST",
        name: "Search employee profile",
        url: `${API_BASE_URL}/sales-nav/search-employee-profile`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { employeeName: "Aneeq Khurram", company: "apple.com" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "employeeName",
            type: "string",
            required: true,
            description: "Name of the employee.",
          },
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "Company domain.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-search-employee-result",
        method: "POST",
        name: "Search employee results",
        url: `${API_BASE_URL}/sales-nav/search-employee-result`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { employeeName: "Aneeq Khurram", company: "apple.com" },
          null,
          2
        ),
        requestSchema: [
          {
            field: "employeeName",
            type: "string",
            required: true,
            description: "Name of the employee.",
          },
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "Company domain.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-search-company-profile",
        method: "POST",
        name: "Search company profile",
        url: `${API_BASE_URL}/sales-nav/search-company-profile`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ company: "apple.com" }, null, 2),
        requestSchema: [
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "Company domain.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-search-company-result",
        method: "POST",
        name: "Search company results",
        url: `${API_BASE_URL}/sales-nav/search-company-result`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ company: "apple.com" }, null, 2),
        requestSchema: [
          {
            field: "company",
            type: "string (domain)",
            required: true,
            description: "Company domain.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-search-status",
        method: "GET",
        name: "Get search status",
        url: `${API_BASE_URL}/sales-nav/search-status`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "sales-nav-search-companies-url",
        method: "POST",
        name: "Search companies with URL",
        url: `${API_BASE_URL}/sales-nav/search-companies-with-url`,
        params: [
          {
            key: "count",
            value: "10",
            description: "Number of companies.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { url: "https://www.linkedin.com/sales/search/company?query=..." },
          null,
          2
        ),
        requestSchema: [
          {
            field: "url",
            type: "string (url)",
            required: true,
            description: "Sales Navigator search URL.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-search-lead-url",
        method: "POST",
        name: "Search lead with URL",
        url: `${API_BASE_URL}/sales-nav/search-lead-with-url`,
        params: [
          {
            key: "count",
            value: "10",
            description: "Number of leads.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          { url: "https://www.linkedin.com/sales/search/people?query=..." },
          null,
          2
        ),
        requestSchema: [
          {
            field: "url",
            type: "string (url)",
            required: true,
            description: "Sales Navigator lead search URL.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-filters-head-count",
        method: "GET",
        name: "Get company head count filter",
        url: `${API_BASE_URL}/sales-nav/filters/company-head-count`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "sales-nav-filters-company-type",
        method: "GET",
        name: "Get company type filter",
        url: `${API_BASE_URL}/sales-nav/filters/company-type`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "sales-nav-filters-seniority-type",
        method: "GET",
        name: "Get seniority type filter",
        url: `${API_BASE_URL}/sales-nav/filters/seniority-type`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "sales-nav-filters-years",
        method: "GET",
        name: "Get years of experience filter",
        url: `${API_BASE_URL}/sales-nav/filters/years`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "sales-nav-filters-languages",
        method: "GET",
        name: "Get languages filter",
        url: `${API_BASE_URL}/sales-nav/filters/languages`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "sales-nav-suggest-function",
        method: "POST",
        name: "Get function suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/function`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-suggest-job-title",
        method: "POST",
        name: "Get job title suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/job-title`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-suggest-industry",
        method: "POST",
        name: "Get industry suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/industry`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-suggest-geo",
        method: "POST",
        name: "Get geo location suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/geo-locations`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-suggest-company",
        method: "POST",
        name: "Get company suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/company`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-suggest-search",
        method: "POST",
        name: "Get search suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/search`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
      {
        slug: "sales-nav-suggest-schools",
        method: "POST",
        name: "Get schools suggestions",
        url: `${API_BASE_URL}/sales-nav/suggestions/schools`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword for suggestion.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "search-api",
    name: "Search",
    endpoints: [
      {
        slug: "search-posts-by-url",
        method: "POST",
        name: "Get posts by search URL",
        url: `${API_BASE_URL}/search/posts-by-url`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            searchUrl:
              "https://www.linkedin.com/search/results/content/?keywords=apple",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "searchUrl",
            type: "string (url)",
            required: true,
            description: "LinkedIn content search URL.",
          },
        ],
        response: {},
      },
      {
        slug: "search-posts",
        method: "POST",
        name: "Get posts by title",
        url: `${API_BASE_URL}/search/posts`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of posts.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "Software Engineer" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword to search for.",
          },
        ],
        response: {},
      },
      {
        slug: "search-persons",
        method: "POST",
        name: "Get persons by keyword",
        url: `${API_BASE_URL}/search/persons`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of persons.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "Aneeq Khurram" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword to search for.",
          },
        ],
        response: {},
      },
      {
        slug: "search-companies",
        method: "POST",
        name: "Get companies by keyword",
        url: `${API_BASE_URL}/search/companies`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of companies.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "Binary" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword to search for.",
          },
        ],
        response: {},
      },
      {
        slug: "search-schools",
        method: "POST",
        name: "Get schools by keyword",
        url: `${API_BASE_URL}/search/schools`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of schools.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ keyword: "Oxford" }, null, 2),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword to search for.",
          },
        ],
        response: {},
      },
      {
        slug: "search-suggest-company-size",
        method: "GET",
        name: "Suggestion: company size",
        url: `${API_BASE_URL}/search/suggestion/company-size`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "search-suggest-language",
        method: "GET",
        name: "Suggestion: language",
        url: `${API_BASE_URL}/search/suggestion/language`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "search-suggest-industry",
        method: "GET",
        name: "Suggestion: industry",
        url: `${API_BASE_URL}/search/suggestion/industry`,
        params: [
          {
            key: "keyword",
            value: "tech",
            description: "Keyword for suggestion.",
            in: "query",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "search-suggest-function",
        method: "GET",
        name: "Suggestion: function",
        url: `${API_BASE_URL}/search/suggestion/function`,
        params: [
          {
            key: "keyword",
            value: "eng",
            description: "Keyword for suggestion.",
            in: "query",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "search-suggest-service",
        method: "GET",
        name: "Suggestion: service",
        url: `${API_BASE_URL}/search/suggestion/service`,
        params: [
          {
            key: "keyword",
            value: "dev",
            description: "Keyword for suggestion.",
            in: "query",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "search-suggest-location",
        method: "GET",
        name: "Suggestion: location",
        url: `${API_BASE_URL}/search/suggestion/location`,
        params: [
          {
            key: "keyword",
            value: "lon",
            description: "Keyword for suggestion.",
            in: "query",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "search-companies-filters",
        method: "POST",
        name: "Search companies with filters",
        url: `${API_BASE_URL}/search/companies-with-filters`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of companies.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            keyword: "Binary",
            companySizeList: "A,D",
            hasJobs: false,
            locationList: "91000002",
            industryList: "1810",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword to search for.",
          },
          {
            field: "companySizeList",
            type: "string",
            required: false,
            description: "Comma-separated list of company size codes.",
          },
          {
            field: "hasJobs",
            type: "boolean",
            required: false,
            description: "Filter by companies with jobs.",
          },
          {
            field: "locationList",
            type: "string",
            required: false,
            description: "Comma-separated list of location IDs.",
          },
          {
            field: "industryList",
            type: "string",
            required: false,
            description: "Comma-separated list of industry IDs.",
          },
        ],
        response: {},
      },
      {
        slug: "search-persons-filters",
        method: "POST",
        name: "Search persons with filters",
        url: `${API_BASE_URL}/search/persons-with-filters`,
        params: [
          {
            key: "count",
            value: "20",
            description: "Number of persons.",
            in: "query",
          },
          {
            key: "start",
            value: "0",
            description: "Pagination start index.",
            in: "query",
          },
        ],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify(
          {
            keyword: "Aneeq Khurram",
            titleText: "Senior Engineer",
            companyText: "Google",
            firstName: "John",
            lastName: "Doe",
            currentCompanyList: "162479,1441",
            pastCompanyList: "162479,1441",
            locationList: "103644278,102095887",
            languageList: "en,fr",
            serviceCategoryList: "220,50413",
            schoolFreetext: "Harvard",
            industryList: "1810,1594",
            schoolList: "1792,1503",
          },
          null,
          2
        ),
        requestSchema: [
          {
            field: "keyword",
            type: "string",
            required: true,
            description: "Keyword to search for.",
          },
        ],
        response: {},
      },
    ],
  },
  {
    id: "default-api",
    name: "Default",
    endpoints: [
      {
        slug: "get-mail-auth-tokens",
        method: "GET",
        name: "Get mail auth tokens",
        url: `${API_BASE_URL}/mail-auth-tokens`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "create-mail-auth-token",
        method: "POST",
        name: "Create mail auth token",
        url: `${API_BASE_URL}/mail-auth-tokens`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ email: "string", token: "string" }, null, 2),
        requestSchema: [
          {
            field: "email",
            type: "string",
            required: true,
            description: "User email.",
          },
          {
            field: "token",
            type: "string",
            required: true,
            description: "Auth token.",
          },
        ],
        response: {},
      },
      {
        slug: "update-mail-auth-token",
        method: "PATCH",
        name: "Update mail auth token",
        url: `${API_BASE_URL}/mail-auth-tokens`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({ email: "string", token: "string" }, null, 2),
        requestSchema: [
          {
            field: "email",
            type: "string",
            required: true,
            description: "User email.",
          },
          {
            field: "token",
            type: "string",
            required: true,
            description: "New auth token.",
          },
        ],
        response: {},
      },
      {
        slug: "reactivate-mail-token",
        method: "PATCH",
        name: "Reactivate mail auth token",
        url: `${API_BASE_URL}/mail-auth-tokens/reactivate/{email}`,
        params: [
          {
            key: "email",
            value: "user@example.com",
            description: "The email to reactivate.",
            in: "path",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "delete-mail-token",
        method: "DELETE",
        name: "Delete mail auth token",
        url: `${API_BASE_URL}/mail-auth-tokens/{email}`,
        params: [
          {
            key: "email",
            value: "user@example.com",
            description: "The email to delete.",
            in: "path",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "get-linkedin-auth-tokens",
        method: "GET",
        name: "Get linkedin auth tokens",
        url: `${API_BASE_URL}/linkedin-auth-tokens`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "create-linkedin-auth-token",
        method: "POST",
        name: "Create linkedin auth token",
        url: `${API_BASE_URL}/linkedin-auth-tokens`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({}, null, 2),
        requestSchema: [],
        response: {},
      },
      {
        slug: "update-linkedin-auth-token",
        method: "PATCH",
        name: "Update linkedin auth token",
        url: `${API_BASE_URL}/linkedin-auth-tokens`,
        params: [],
        headers: [{ key: "Content-Type", value: "application/json" }],
        auth: { type: "None", details: "This endpoint is open." },
        body: JSON.stringify({}, null, 2),
        requestSchema: [],
        response: {},
      },
      {
        slug: "reactivate-linkedin-token",
        method: "PATCH",
        name: "Reactivate linkedin auth token",
        url: `${API_BASE_URL}/linkedin-auth-tokens/reactivate/{email}`,
        params: [
          {
            key: "email",
            value: "user@example.com",
            description: "The email to reactivate.",
            in: "path",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "delete-linkedin-token",
        method: "DELETE",
        name: "Delete linkedin auth token",
        url: `${API_BASE_URL}/linkedin-auth-tokens/{email}`,
        params: [
          {
            key: "email",
            value: "user@example.com",
            description: "The email to delete.",
            in: "path",
          },
        ],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "ping",
        method: "GET",
        name: "Ping",
        url: `${API_BASE_URL}/ping`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "give-away-deals",
        method: "GET",
        name: "Get give away deals",
        url: `${API_BASE_URL}/give-away-deals`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
      {
        slug: "slack-notify",
        method: "POST",
        name: "Slack Notify",
        url: `${API_BASE_URL}/slack-notify`,
        params: [],
        headers: [],
        auth: { type: "None", details: "This endpoint is open." },
        body: null,
        requestSchema: [],
        response: {},
      },
    ],
  },
];
