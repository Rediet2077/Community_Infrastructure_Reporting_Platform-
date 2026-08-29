import {
  AssetRecord,
  AssetTypeDefinition,
  AuditLogRecord,
  DepartmentRecord,
  ExtensionRecord,
  ReportRecord,
  StaffContractorRecord,
  TaskRecord,
} from "../types/cirp_schema";

const INITIAL_DEPARTMENTS: DepartmentRecord[] = [
  {
    id: "dept-elec",
    code: "ELEC",
    name: "Electricity Department",
    description: "Public illumination, street lighting networks, transformer feeds and power distribution.",
    contact_email: "electric.ops@municipality.gov.et",
    contact_phone: "+251 11 551 2901",
    office_location: "Bole Sub-City Municipal Tower, 4th Floor",
    responsible_asset_types: ["street_light"],
    total_assets: 3210,
    active_reports: 41,
    active_tasks: 28,
    overdue_tasks: 4,
    resolved_reports: 1840,
    resolution_rate_percent: 87,
    avg_acceptance_hours: 2.4,
    avg_completion_days: 2.8,
  },
  {
    id: "dept-roads",
    code: "ROADS",
    name: "Roads & Transport Department",
    description: "Road networks, asphalt rehabilitation, cobblestone repair, traffic signals and pavements.",
    contact_email: "roads.authority@municipality.gov.et",
    contact_phone: "+251 11 552 4890",
    office_location: "Kirkos Infrastructure Complex, Building B",
    responsible_asset_types: ["road"],
    total_assets: 1450,
    active_reports: 35,
    active_tasks: 22,
    overdue_tasks: 3,
    resolved_reports: 920,
    resolution_rate_percent: 81,
    avg_acceptance_hours: 3.1,
    avg_completion_days: 5.2,
  },
  {
    id: "dept-water",
    code: "WATER",
    name: "Water & Sanitation Department",
    description: "Municipal potable water mains, public water points, pipe repairs and distribution pressure.",
    contact_email: "water.services@municipality.gov.et",
    contact_phone: "+251 11 554 1120",
    office_location: "Yeka Water Bureau, Megenagna Station",
    responsible_asset_types: ["water_point"],
    total_assets: 980,
    active_reports: 19,
    active_tasks: 14,
    overdue_tasks: 2,
    resolved_reports: 640,
    resolution_rate_percent: 89,
    avg_acceptance_hours: 1.8,
    avg_completion_days: 1.9,
  },
  {
    id: "dept-drain",
    code: "DRAIN",
    name: "Drainage & Flood Management",
    description: "Stormwater culverts, flood canals, runoff grids, side gutters and waterway clearings.",
    contact_email: "drainage.flood@municipality.gov.et",
    contact_phone: "+251 11 556 7741",
    office_location: "Nifas Silk Drainage Depot, Gotera",
    responsible_asset_types: ["drainage"],
    total_assets: 760,
    active_reports: 14,
    active_tasks: 9,
    overdue_tasks: 1,
    resolved_reports: 410,
    resolution_rate_percent: 83,
    avg_acceptance_hours: 2.9,
    avg_completion_days: 3.4,
  },
  {
    id: "dept-waste",
    code: "WASTE",
    name: "Sanitation & Waste Management",
    description: "Solid waste collection stations, neighborhood public dumpsters and transfer depots.",
    contact_email: "sanitation.solidwaste@municipality.gov.et",
    contact_phone: "+251 11 558 3319",
    office_location: "Arada Sub-City Sanitation Yard",
    responsible_asset_types: ["waste_bin"],
    total_assets: 1820,
    active_reports: 28,
    active_tasks: 18,
    overdue_tasks: 2,
    resolved_reports: 2150,
    resolution_rate_percent: 94,
    avg_acceptance_hours: 1.2,
    avg_completion_days: 1.1,
  },
  {
    id: "dept-build",
    code: "BUILD",
    name: "Public Facilities & Buildings",
    description: "Municipal offices, community healthcare centers, local administration halls and public schools.",
    contact_email: "facilities.management@municipality.gov.et",
    contact_phone: "+251 11 559 9002",
    office_location: "City Hall Annex, 2nd Floor",
    responsible_asset_types: ["public_building"],
    total_assets: 310,
    active_reports: 8,
    active_tasks: 5,
    overdue_tasks: 0,
    resolved_reports: 190,
    resolution_rate_percent: 86,
    avg_acceptance_hours: 4.0,
    avg_completion_days: 6.5,
  },
];

const INITIAL_ASSET_TYPES: AssetTypeDefinition[] = [
  {
    id: "street_light",
    name: "Street Light & Illumination Pole",
    description: "Overhead road illumination, solar lighting units, high-pressure sodium and LED poles.",
    category_id: "cat-electrical",
    responsible_department_id: "dept-elec",
    responsible_department_name: "Electricity Department",
    requires_location: true,
    is_active: true,
    total_assets_count: 3210,
  },
  {
    id: "road",
    name: "Road Segment & Pavement",
    description: "Arterial highways, paved avenues, cobblestone connectors and pedestrian sidewalks.",
    category_id: "cat-civil",
    responsible_department_id: "dept-roads",
    responsible_department_name: "Roads & Transport Department",
    requires_location: true,
    is_active: true,
    total_assets_count: 1450,
  },
  {
    id: "water_point",
    name: "Water Distribution Point / Hydrant",
    description: "Public neighborhood water kiosks, distribution branch valves, fire hydrants and pipe mains.",
    category_id: "cat-water",
    responsible_department_id: "dept-water",
    responsible_department_name: "Water & Sanitation Department",
    requires_location: true,
    is_active: true,
    total_assets_count: 980,
  },
  {
    id: "drainage",
    name: "Drainage Canal / Culvert",
    description: "Stormwater discharge canals, roadside gutters, underground culverts and runoff grates.",
    category_id: "cat-civil",
    responsible_department_id: "dept-drain",
    responsible_department_name: "Drainage & Flood Management",
    requires_location: true,
    is_active: true,
    total_assets_count: 760,
  },
  {
    id: "waste_bin",
    name: "Public Waste Bin & Dumpster Station",
    description: "Heavy communal dumpsters, pedestrian solar compactors and segregated recycling depots.",
    category_id: "cat-sanitation",
    responsible_department_id: "dept-waste",
    responsible_department_name: "Sanitation & Waste Management",
    requires_location: true,
    is_active: true,
    total_assets_count: 1820,
  },
  {
    id: "public_building",
    name: "Public Building / Administrative Hall",
    description: "Kebele administrative centers, public health posts, community centres and education units.",
    category_id: "cat-facilities",
    responsible_department_id: "dept-build",
    responsible_department_name: "Public Facilities & Buildings",
    requires_location: true,
    is_active: true,
    total_assets_count: 310,
  },
];

const INITIAL_ASSETS: AssetRecord[] = [
  {
    id: "asset-sl-001",
    asset_code: "SL-BOL-042",
    asset_type_id: "street_light",
    asset_type_label: "Street Light",
    department_id: "dept-elec",
    department_name: "Electricity Department",
    name: "Bole Medhanialem High Mast Light #42",
    description: "Octagonal galvanized steel high-mast light covering the main roundabout intersection.",
    status: "ACTIVE",
    condition: "GOOD",
    installation_date: "2022-04-15",
    latitude: 8.9954,
    longitude: 38.7892,
    address: "Bole Medhanialem Roundabout, Camerron St",
    landmark: "Directly in front of Edna Mall Complex",
    registered_by: "Eng. Dawit Tadesse",
    registered_at: "2022-04-16 09:30:00",
    updated_at: "2026-08-10 14:20:00",
    last_inspection_date: "2026-07-20",
    active_reports_count: 1,
    specific_data: {
      type: "street_light",
      specs: {
        pole_type: "Steel",
        light_type: "LED",
        power_source: "Grid",
        height_meters: 18,
        wattage_watts: 400,
      },
    },
  },
  {
    id: "asset-rd-002",
    asset_code: "RD-CMC-118",
    asset_type_id: "road",
    asset_type_label: "Road Segment",
    department_id: "dept-roads",
    department_name: "Roads & Transport Department",
    name: "CMC St. Michael to Civil Service University Arterial",
    description: "4-lane dual carriageway asphalt corridor with median drainage.",
    status: "DAMAGED",
    condition: "POOR",
    installation_date: "2019-11-10",
    latitude: 9.0231,
    longitude: 38.8354,
    address: "CMC Road, Section 4B",
    landmark: "Opposite Safari Academy Gate 2",
    registered_by: "Surveyor Helen Mengistu",
    registered_at: "2019-11-12 11:00:00",
    updated_at: "2026-08-14 08:45:00",
    last_inspection_date: "2026-08-01",
    active_reports_count: 2,
    specific_data: {
      type: "road",
      specs: {
        road_name: "CMC Main Arterial Corridor",
        road_type: "Arterial Highway",
        surface_type: "Asphalt",
        length_km: 2.4,
        width_meters: 22,
        lanes_count: 4,
      },
    },
  },
  {
    id: "asset-wp-003",
    asset_code: "WP-YEK-019",
    asset_type_id: "water_point",
    asset_type_label: "Water Point",
    department_id: "dept-water",
    department_name: "Water & Sanitation Department",
    name: "Megenagna Public Kiosk & Hydrant #19",
    description: "Automated municipal token water kiosk with fire department hookup valve.",
    status: "ACTIVE",
    condition: "EXCELLENT",
    installation_date: "2023-01-20",
    latitude: 9.0205,
    longitude: 38.7977,
    address: "Megenagna Square, Next to Light Rail Terminal",
    landmark: "Adjacent to Zefmesh Grand Mall",
    registered_by: "Eng. Samuel Kassa",
    registered_at: "2023-01-22 14:00:00",
    updated_at: "2026-08-05 10:15:00",
    last_inspection_date: "2026-08-05",
    active_reports_count: 0,
    specific_data: {
      type: "water_point",
      specs: {
        pipe_type: "Public Kiosk",
        pipe_diameter_mm: 150,
        material: "Ductile Iron",
        flow_capacity_lps: 28,
        supply_source: "Treatment Plant",
      },
    },
  },
  {
    id: "asset-dr-004",
    asset_code: "DR-GOT-008",
    asset_type_id: "drainage",
    asset_type_label: "Drainage Canal",
    department_id: "dept-drain",
    department_name: "Drainage & Flood Management",
    name: "Gotera Interchange Stormwater Culvert #8",
    description: "Reinforced concrete open canal connecting Gotera runoff to Akaki river basin.",
    status: "UNDER_MAINTENANCE",
    condition: "FAIR",
    installation_date: "2018-06-30",
    latitude: 8.9881,
    longitude: 38.7562,
    address: "Gotera Ring Road Underpass",
    landmark: "Beneath East Interchange Flyover",
    registered_by: "Eng. Berhanu Wolde",
    registered_at: "2018-07-02 08:00:00",
    updated_at: "2026-08-16 16:30:00",
    last_inspection_date: "2026-08-12",
    active_reports_count: 1,
    specific_data: {
      type: "drainage",
      specs: {
        drain_type: "Open Concrete Canal",
        width_meters: 3.5,
        depth_meters: 2.2,
        flow_direction: "Towards River Basin",
        has_safety_grate: true,
      },
    },
  },
  {
    id: "asset-wb-005",
    asset_code: "WB-PIA-055",
    asset_type_id: "waste_bin",
    asset_type_label: "Waste Bin",
    department_id: "dept-waste",
    department_name: "Sanitation & Waste Management",
    name: "Piazza Churchill Road Compactor Depot",
    description: "Solar-powered smart waste compactor with ultrasonic level sensors.",
    status: "ACTIVE",
    condition: "GOOD",
    installation_date: "2024-03-12",
    latitude: 9.0345,
    longitude: 38.7518,
    address: "Churchill Avenue, Near Cinema Empire",
    landmark: "Opposite Commercial Bank of Ethiopia Churchill Branch",
    registered_by: "Supervisor Almaz Bekele",
    registered_at: "2024-03-14 13:20:00",
    updated_at: "2026-08-17 07:10:00",
    last_inspection_date: "2026-08-15",
    active_reports_count: 0,
    specific_data: {
      type: "waste_bin",
      specs: {
        bin_type: "Solar Compactor",
        capacity_liters: 1200,
        collection_frequency: "Daily",
        fill_level_sensor_id: "SEN-WB-055-IOT",
      },
    },
  },
  {
    id: "asset-pb-006",
    asset_code: "PB-ARA-002",
    asset_type_id: "public_building",
    asset_type_label: "Public Building",
    department_id: "dept-build",
    department_name: "Public Facilities & Buildings",
    name: "Arada Health & Community Care Center",
    description: "Three-story municipal primary healthcare facility with emergency clinic wing.",
    status: "ACTIVE",
    condition: "GOOD",
    installation_date: "2015-09-01",
    latitude: 9.0412,
    longitude: 38.7601,
    address: "Arada Sub-City Woreda 03 Health Center Compound",
    landmark: "Behind Saint George Cathedral",
    registered_by: "Architect Yonas Girma",
    registered_at: "2015-09-05 10:00:00",
    updated_at: "2026-07-28 11:00:00",
    last_inspection_date: "2026-07-15",
    active_reports_count: 0,
    specific_data: {
      type: "public_building",
      specs: {
        building_name: "Arada Community Health Center",
        building_type: "Health Center",
        floors_count: 3,
        construction_year: 2015,
        has_emergency_shelter: true,
      },
    },
  },
];

const INITIAL_STAFF_CONTRACTORS: StaffContractorRecord[] = [
  {
    id: "worker-el-01",
    name: "Kidus Kebede",
    phone_number: "+251 91 123 4567",
    email: "kidus.kebede@municipality.gov.et",
    department_id: "dept-elec",
    department_name: "Electricity Department",
    role_type: "STAFF_OFFICER",
    position_title: "Senior Electrical Engineer",
    specialization: "High Voltage Distribution & Transformers",
    is_contractor: false,
    active_tasks_count: 3,
    completed_tasks_count: 82,
    overdue_tasks_count: 0,
    performance_score: 96,
    is_available: true,
  },
  {
    id: "worker-el-02",
    name: "Yared Haile (Blue Nile Electricals)",
    phone_number: "+251 92 334 5566",
    email: "yared@bluenileelectric.com",
    department_id: "dept-elec",
    department_name: "Electricity Department",
    role_type: "CONTRACTOR_LEAD",
    position_title: "Contractor Lead Electrician",
    specialization: "Streetlight Poles & Underground Cabling",
    is_contractor: true,
    contractor_company_name: "Blue Nile Electrical Works PLC",
    license_number: "LIC-ETH-EE-2023-8891",
    active_tasks_count: 4,
    completed_tasks_count: 140,
    overdue_tasks_count: 1,
    performance_score: 89,
    is_available: true,
  },
  {
    id: "worker-rd-01",
    name: "Aster Desta (Abyssinia Civil Works)",
    phone_number: "+251 91 445 6677",
    email: "aster.desta@abyssiniacivil.com",
    department_id: "dept-roads",
    department_name: "Roads & Transport Department",
    role_type: "CONTRACTOR_LEAD",
    position_title: "Civil Works Project Lead",
    specialization: "Asphalt Milling, Paving & Kerbstone Alignment",
    is_contractor: true,
    contractor_company_name: "Abyssinia Civil Engineering & Asphalt PLC",
    license_number: "LIC-ETH-RD-2021-0412",
    active_tasks_count: 5,
    completed_tasks_count: 118,
    overdue_tasks_count: 1,
    performance_score: 91,
    is_available: true,
  },
  {
    id: "worker-wt-01",
    name: "Tadesse Assefa",
    phone_number: "+251 91 556 7788",
    email: "tadesse.assefa@municipality.gov.et",
    department_id: "dept-water",
    department_name: "Water & Sanitation Department",
    role_type: "FIELD_TECHNICIAN",
    position_title: "Hydraulic Line Technician",
    specialization: "Pressure Relief Valves & Ductile Iron Mains",
    is_contractor: false,
    active_tasks_count: 2,
    completed_tasks_count: 67,
    overdue_tasks_count: 0,
    performance_score: 94,
    is_available: true,
  },
  {
    id: "worker-dr-01",
    name: "Mulugeta Tesfaye (Nile Flood Protection)",
    phone_number: "+251 93 667 8899",
    email: "mulugeta@niledrainage.com",
    department_id: "dept-drain",
    department_name: "Drainage & Flood Management",
    role_type: "CONTRACTOR_LEAD",
    position_title: "Drainage Construction Supervisor",
    specialization: "Culvert Dredging & Safety Grating Installation",
    is_contractor: true,
    contractor_company_name: "Nile Flood Protection & Civil Contractors",
    license_number: "LIC-ETH-DR-2022-7721",
    active_tasks_count: 3,
    completed_tasks_count: 54,
    overdue_tasks_count: 0,
    performance_score: 93,
    is_available: true,
  },
  {
    id: "worker-ws-01",
    name: "Tigist Mekonnen",
    phone_number: "+251 91 778 9900",
    email: "tigist.mekonnen@municipality.gov.et",
    department_id: "dept-waste",
    department_name: "Sanitation & Waste Management",
    role_type: "STAFF_OFFICER",
    position_title: "Sanitation Logistics Officer",
    specialization: "Compactor Repair & Rapid Depot Evacuation",
    is_contractor: false,
    active_tasks_count: 2,
    completed_tasks_count: 195,
    overdue_tasks_count: 0,
    performance_score: 98,
    is_available: true,
  },
];

const INITIAL_REPORTS: ReportRecord[] = [
  {
    id: "rep-001",
    report_code: "REP-2026-0819",
    title: "Broken streetlight pole with sparking wires near roundabout",
    description: "The street light pole near the Bole Medhanialem taxi stand was hit by a truck. The fixture is dangling with exposed sparking wires causing severe safety hazard for pedestrians at night.",
    category_name: "Street Lighting & Electrical",
    asset_id: "asset-sl-001",
    asset_code: "SL-BOL-042",
    asset_type_label: "Street Light",
    department_id: "dept-elec",
    department_name: "Electricity Department",
    citizen_name: "Abebe Kassahun",
    citizen_contact: "+251 91 123 4544",
    citizen_latitude: 8.9953,
    citizen_longitude: 38.7891,
    address: "Bole Medhanialem Roundabout, near Edna Mall taxi stand",
    landmark: "In front of Bole Medhanialem Church Gate 3",
    status: "ACCEPTED",
    priority: "CRITICAL",
    submitted_at: "2026-08-17 19:45:00",
    media_photos: [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1508873696983-2df5703bc686?w=800&auto=format&fit=crop&q=60",
    ],
    ai_category_prediction: {
      suggested_category: "Street Lighting & Electrical",
      confidence: 0.98,
    },
    ai_duplicate_analysis: {
      has_potential_duplicate: false,
    },
    suggested_nearby_assets: [
      {
        asset_id: "asset-sl-001",
        asset_code: "SL-BOL-042",
        asset_name: "Bole Medhanialem High Mast Light #42",
        distance_meters: 14,
        asset_type: "street_light",
      },
    ],
    linked_task_id: "tsk-001",
  },
  {
    id: "rep-002",
    report_code: "REP-2026-0820",
    title: "Massive pothole crater damaging vehicle rims on CMC Road",
    description: "Deep continuous asphalt depression across the inner lane. Several cars broke shock absorbers this morning during rainfall when the hole filled with water.",
    category_name: "Roads & Pavements",
    asset_id: "asset-rd-002",
    asset_code: "RD-CMC-118",
    asset_type_label: "Road Segment",
    department_id: "dept-roads",
    department_name: "Roads & Transport Department",
    citizen_name: "Selamawit Fikru",
    citizen_contact: "+251 92 323 4591",
    citizen_latitude: 9.0232,
    citizen_longitude: 38.8355,
    address: "CMC Road, Section 4B near Safari Academy",
    landmark: "Between Total Energies and Safari Academy",
    status: "IN_PROGRESS",
    priority: "HIGH",
    submitted_at: "2026-08-16 08:15:00",
    media_photos: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60",
    ],
    ai_category_prediction: {
      suggested_category: "Roads & Pavements",
      confidence: 0.96,
    },
    ai_duplicate_analysis: {
      has_potential_duplicate: true,
      duplicate_report_code: "REP-2026-0814",
      similarity_score: 0.89,
    },
    suggested_nearby_assets: [
      {
        asset_id: "asset-rd-002",
        asset_code: "RD-CMC-118",
        asset_name: "CMC St. Michael to Civil Service University Arterial",
        distance_meters: 8,
        asset_type: "road",
      },
    ],
    linked_task_id: "tsk-002",
  },
  {
    id: "rep-003",
    report_code: "REP-2026-0821",
    title: "Broken water main valve spraying potable water across pavement",
    description: "High-pressure clean water gushing out onto the pedestrian pavement for the past 6 hours. Clean water is being wasted and flooding nearby shops.",
    category_name: "Water Supply & Piping",
    asset_id: "asset-wp-003",
    asset_code: "WP-YEK-019",
    asset_type_label: "Water Point",
    department_id: "dept-water",
    department_name: "Water & Sanitation Department",
    citizen_name: "Yohannes Alemu",
    citizen_contact: "+251 91 423 4512",
    citizen_latitude: 9.0204,
    citizen_longitude: 38.7978,
    address: "Megenagna Square, near LRT pedestrian entrance",
    landmark: "Directly beside Zefmesh Mall west steps",
    status: "COMPLETED_PENDING_VERIFICATION",
    priority: "HIGH",
    submitted_at: "2026-08-15 11:30:00",
    media_photos: [
      "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=60",
    ],
    ai_category_prediction: {
      suggested_category: "Water Supply & Piping",
      confidence: 0.99,
    },
    ai_duplicate_analysis: {
      has_potential_duplicate: false,
    },
    linked_task_id: "tsk-003",
  },
  {
    id: "rep-004",
    report_code: "REP-2026-0822",
    title: "Uncovered stormwater canal with missing iron safety grating",
    description: "Safety grates were stolen or washed away. The open trench is 2 meters deep right next to the walkway where children walk to school.",
    category_name: "Drainage & Floods",
    asset_id: "asset-dr-004",
    asset_code: "DR-GOT-008",
    asset_type_label: "Drainage Canal",
    department_id: "dept-drain",
    department_name: "Drainage & Flood Management",
    citizen_name: "Meron Getachew",
    citizen_contact: "+251 93 523 4588",
    citizen_latitude: 8.9882,
    citizen_longitude: 38.7561,
    address: "Gotera Ring Road Underpass pedestrian path",
    landmark: "Under the east ramp bridge",
    status: "NEW",
    priority: "CRITICAL",
    submitted_at: "2026-08-18 07:10:00",
    media_photos: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?w=800&auto=format&fit=crop&q=60",
    ],
    ai_category_prediction: {
      suggested_category: "Drainage & Floods",
      confidence: 0.97,
    },
    ai_duplicate_analysis: {
      has_potential_duplicate: false,
    },
    suggested_nearby_assets: [
      {
        asset_id: "asset-dr-004",
        asset_code: "DR-GOT-008",
        asset_name: "Gotera Interchange Stormwater Culvert #8",
        distance_meters: 18,
        asset_type: "drainage",
      },
    ],
    linked_task_id: null,
  },
  {
    id: "rep-005",
    report_code: "REP-2026-0823",
    title: "Overflowing commercial dumpster blocking sidewalk in Piazza",
    description: "Solid waste dumpster hasn't been emptied in 4 days. Waste is spilling over the walkway and blocking the entrance to commercial offices.",
    category_name: "Waste & Sanitation",
    asset_id: "asset-wb-005",
    asset_code: "WB-PIA-055",
    asset_type_label: "Waste Bin",
    department_id: "dept-waste",
    department_name: "Sanitation & Waste Management",
    citizen_name: "Kassahun Tefera",
    citizen_contact: "+251 91 823 4520",
    citizen_latitude: 9.0346,
    citizen_longitude: 38.7519,
    address: "Churchill Avenue, near Cinema Empire",
    landmark: "Next to Commercial Bank of Ethiopia branch",
    status: "RESOLVED",
    priority: "MEDIUM",
    submitted_at: "2026-08-14 14:20:00",
    media_photos: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=60",
    ],
    ai_category_prediction: {
      suggested_category: "Waste & Sanitation",
      confidence: 0.98,
    },
    ai_duplicate_analysis: {
      has_potential_duplicate: false,
    },
    linked_task_id: "tsk-004",
    resolution_notes: "Dumpster emptied by sanitation compactor truck #14, surrounding area power-washed and disinfected.",
    resolved_at: "2026-08-15 09:30:00",
  },
];

const INITIAL_EXTENSIONS: ExtensionRecord[] = [
  {
    id: "ext-001",
    task_id: "tsk-002",
    task_code: "TSK-RD-CMC-118-092",
    report_code: "REP-2026-0820",
    asset_code: "RD-CMC-118",
    department_id: "dept-roads",
    original_deadline: "2026-08-19",
    requested_new_deadline: "2026-08-23",
    reason_category: "Severe weather / Environmental condition",
    detailed_explanation: "Heavy seasonal torrential rains have saturated the sub-base layer. Applying hot-mix asphalt in current wet conditions would cause premature structural peeling. Requires 3 dry weather curing days.",
    supporting_evidence_note: "Meteorological agency rain alert and wet soil core test report attached.",
    requested_by: "Aster Desta (Abyssinia Civil Works)",
    requested_at: "2026-08-18 10:15:00",
    status: "PENDING",
  },
  {
    id: "ext-002",
    task_id: "tsk-001",
    task_code: "TSK-SL-BOL-042-881",
    report_code: "REP-2026-0819",
    asset_code: "SL-BOL-042",
    department_id: "dept-elec",
    original_deadline: "2026-08-18",
    requested_new_deadline: "2026-08-20",
    reason_category: "Waiting for spare parts",
    detailed_explanation: "Replacement 400W LED modular driver and 18m hydraulic crane truck are scheduled for delivery from central logistics warehouse tomorrow morning.",
    supporting_evidence_note: "Central warehouse dispatch requisition order #WH-ELE-9921.",
    requested_by: "Yared Haile (Blue Nile Electricals)",
    requested_at: "2026-08-17 16:40:00",
    status: "APPROVED",
    decision_date: "2026-08-17 18:00:00",
    decided_by: "Eng. Dawit Tadesse (Electricity Dept Officer)",
    decision_comment: "Approved. Crane availability confirmed with fleet manager.",
  },
];

const INITIAL_TASKS: TaskRecord[] = [
  {
    id: "tsk-001",
    task_code: "TSK-SL-BOL-042-881",
    report_id: "rep-001",
    report_code: "REP-2026-0819",
    asset_id: "asset-sl-001",
    asset_code: "SL-BOL-042",
    asset_type_label: "Street Light",
    department_id: "dept-elec",
    department_name: "Electricity Department",
    assigned_worker_id: "worker-el-02",
    assigned_worker_name: "Yared Haile (Blue Nile Electricals)",
    is_contractor: true,
    contractor_company: "Blue Nile Electrical Works PLC",
    work_description: "Isolate circuit at feeder pillar, remove dangling damaged luminaire, erect crane to mount new 400W LED module, re-wire and test ground earthing resistance.",
    internal_note: "Coordinate with traffic police for partial lane closure during crane operations.",
    priority: "CRITICAL",
    status: "ASSIGNED",
    progress_percentage: 25,
    created_at: "2026-08-17 20:30:00",
    deadline_date: "2026-08-20",
    original_deadline_date: "2026-08-18",
    is_overdue: false,
    days_overdue: 0,
    progress_notes: [
      {
        timestamp: "2026-08-17 20:35:00",
        author: "Operations Dispatcher",
        note: "Emergency dispatch created and assigned to Blue Nile Electricals contractor crew.",
        percentage: 0,
      },
      {
        timestamp: "2026-08-18 09:00:00",
        author: "Yared Haile",
        note: "Power breaker tripped and isolated safely. Hazard tape placed around pole base.",
        percentage: 25,
      },
    ],
    extensions: [INITIAL_EXTENSIONS[1]],
  },
  {
    id: "tsk-002",
    task_code: "TSK-RD-CMC-118-092",
    report_id: "rep-002",
    report_code: "REP-2026-0820",
    asset_id: "asset-rd-002",
    asset_code: "RD-CMC-118",
    asset_type_label: "Road Segment",
    department_id: "dept-roads",
    department_name: "Roads & Transport Department",
    assigned_worker_id: "worker-rd-01",
    assigned_worker_name: "Aster Desta (Abyssinia Civil Works)",
    is_contractor: true,
    contractor_company: "Abyssinia Civil Engineering & Asphalt PLC",
    work_description: "Mill 85 sqm of cracked asphalt down to base layer, compact crushed aggregate, apply tack coat and lay 50mm hot-mix asphalt binder and wearing course.",
    internal_note: "High traffic zone during morning peak. Work during designated night window 21:00-05:00.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    progress_percentage: 60,
    created_at: "2026-08-16 10:00:00",
    deadline_date: "2026-08-19",
    original_deadline_date: "2026-08-19",
    is_overdue: false,
    days_overdue: 0,
    progress_notes: [
      {
        timestamp: "2026-08-16 10:10:00",
        author: "Roads Dispatcher",
        note: "Work order issued to Abyssinia Civil Works.",
        percentage: 0,
      },
      {
        timestamp: "2026-08-17 04:30:00",
        author: "Aster Desta",
        note: "Milling completed across 85 sqm. Base aggregate compacted. Extension requested due to rain forecast.",
        percentage: 60,
      },
    ],
    extensions: [INITIAL_EXTENSIONS[0]],
  },
  {
    id: "tsk-003",
    task_code: "TSK-WP-YEK-019-441",
    report_id: "rep-003",
    report_code: "REP-2026-0821",
    asset_id: "asset-wp-003",
    asset_code: "WP-YEK-019",
    asset_type_label: "Water Point",
    department_id: "dept-water",
    department_name: "Water & Sanitation Department",
    assigned_worker_id: "worker-wt-01",
    assigned_worker_name: "Tadesse Assefa",
    is_contractor: false,
    work_description: "Excavate valve box, replace blown 150mm flange gasket, install new pressure reducing valve and pressure test at 6 bar.",
    internal_note: "Water pressure restored at 14:00. Contractor completed on-site work.",
    priority: "HIGH",
    status: "COMPLETED_PENDING_VERIFICATION",
    progress_percentage: 100,
    created_at: "2026-08-15 12:00:00",
    deadline_date: "2026-08-16",
    original_deadline_date: "2026-08-16",
    is_overdue: false,
    days_overdue: 0,
    progress_notes: [
      {
        timestamp: "2026-08-15 12:15:00",
        author: "Water Bureau Dispatch",
        note: "Emergency field technician Tadesse Assefa dispatched.",
        percentage: 0,
      },
      {
        timestamp: "2026-08-15 15:45:00",
        author: "Tadesse Assefa",
        note: "Flange gasket replaced and leak sealed. Pressure holding steady. Submitted for officer verification.",
        percentage: 100,
      },
    ],
    completion_submission: {
      completion_date: "2026-08-15 16:00:00",
      completion_notes: "Gasket and relief valve fully replaced. No leakage observed under 6.2 bar test for 45 minutes.",
      before_photos: [
        "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=60",
      ],
      after_photos: [
        "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?w=800&auto=format&fit=crop&q=60",
      ],
      submitted_by: "Tadesse Assefa (Technician)",
    },
    extensions: [],
  },
  {
    id: "tsk-004",
    task_code: "TSK-WB-PIA-055-312",
    report_id: "rep-005",
    report_code: "REP-2026-0823",
    asset_id: "asset-wb-005",
    asset_code: "WB-PIA-055",
    asset_type_label: "Waste Bin",
    department_id: "dept-waste",
    department_name: "Sanitation & Waste Management",
    assigned_worker_id: "worker-ws-01",
    assigned_worker_name: "Tigist Mekonnen",
    is_contractor: false,
    work_description: "Empty compactor station, power wash interior hopper, calibrate ultrasonic sensor.",
    internal_note: "Completed and verified on-site.",
    priority: "MEDIUM",
    status: "RESOLVED",
    progress_percentage: 100,
    created_at: "2026-08-14 15:00:00",
    deadline_date: "2026-08-15",
    original_deadline_date: "2026-08-15",
    is_overdue: false,
    days_overdue: 0,
    progress_notes: [
      {
        timestamp: "2026-08-14 15:10:00",
        author: "Sanitation Ops",
        note: "Dispatched compactor team.",
        percentage: 0,
      },
      {
        timestamp: "2026-08-15 09:30:00",
        author: "Tigist Mekonnen",
        note: "Compactor emptied, cleaned, and sensor reset. Verified operational.",
        percentage: 100,
      },
    ],
    extensions: [],
  },
];

const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: "aud-001",
    timestamp: "2026-08-18 07:10:00",
    officer_name: "Citizen Reporting App (AI Gateway)",
    officer_role: "Automated Ingestion",
    department_name: "Drainage & Flood Management",
    action_type: "REPORT_ACCEPTED",
    target_entity_type: "REPORT",
    target_code: "REP-2026-0822",
    summary: "New report received: Uncovered stormwater canal",
    details: "Automated geofence matched to DR-GOT-008. AI category prediction confidence: 97%.",
  },
  {
    id: "aud-002",
    timestamp: "2026-08-17 20:30:00",
    officer_name: "Eng. Dawit Tadesse",
    officer_role: "Electricity Department Officer",
    department_name: "Electricity Department",
    action_type: "TASK_CREATED",
    target_entity_type: "TASK",
    target_code: "TSK-SL-BOL-042-881",
    summary: "Created emergency repair task for Bole Medhanialem light pole",
    details: "Assigned to contractor Blue Nile Electrical Works PLC with initial deadline 2026-08-18.",
  },
  {
    id: "aud-003",
    timestamp: "2026-08-17 18:00:00",
    officer_name: "Eng. Dawit Tadesse",
    officer_role: "Electricity Department Officer",
    department_name: "Electricity Department",
    action_type: "EXTENSION_APPROVED",
    target_entity_type: "EXTENSION",
    target_code: "TSK-SL-BOL-042-881",
    summary: "Approved deadline extension to 2026-08-20",
    details: "Reason: Waiting for crane truck and 400W modular driver from central logistics warehouse.",
  },
  {
    id: "aud-004",
    timestamp: "2026-08-15 16:30:00",
    officer_name: "Tadesse Assefa",
    officer_role: "Hydraulic Technician",
    department_name: "Water & Sanitation Department",
    action_type: "TASK_COMPLETION_SUBMITTED",
    target_entity_type: "TASK",
    target_code: "TSK-WP-YEK-019-441",
    summary: "Submitted task completion for Megenagna Water Kiosk",
    details: "Flange gasket replaced and 6 bar pressure test successful. Awaiting officer on-site verification.",
  },
  {
    id: "aud-005",
    timestamp: "2026-08-15 09:30:00",
    officer_name: "Supervisor Almaz Bekele",
    officer_role: "Sanitation Inspector",
    department_name: "Sanitation & Waste Management",
    action_type: "TASK_VERIFIED_RESOLVED",
    target_entity_type: "TASK",
    target_code: "TSK-WB-PIA-055-312",
    summary: "Verified and marked Churchill Avenue Dumpster task RESOLVED",
    details: "On-site inspection confirmed compactor cleared and ultrasonic sensor operational.",
  },
];

// Persistent mutable in-memory state store
class MockDataStore {
  private departments: DepartmentRecord[] = [...INITIAL_DEPARTMENTS];
  private assetTypes: AssetTypeDefinition[] = [...INITIAL_ASSET_TYPES];
  private assets: AssetRecord[] = [...INITIAL_ASSETS];
  private reports: ReportRecord[] = [...INITIAL_REPORTS];
  private tasks: TaskRecord[] = [...INITIAL_TASKS];
  private staffContractors: StaffContractorRecord[] = [...INITIAL_STAFF_CONTRACTORS];
  private auditLogs: AuditLogRecord[] = [...INITIAL_AUDIT_LOGS];

  // Getters
  getDepartments(): DepartmentRecord[] {
    return [...this.departments];
  }

  getAssetTypes(): AssetTypeDefinition[] {
    return [...this.assetTypes];
  }

  getAssets(departmentId?: string, query?: string): AssetRecord[] {
    return this.assets.filter((a) => {
      const matchDept = !departmentId || departmentId === "all" || a.department_id === departmentId;
      const matchQuery =
        !query ||
        a.asset_code.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.address.toLowerCase().includes(query.toLowerCase());
      return matchDept && matchQuery;
    });
  }

  getAssetById(id: string): AssetRecord | undefined {
    return this.assets.find((a) => a.id === id || a.asset_code === id);
  }

  getReports(departmentId?: string, query?: string): ReportRecord[] {
    return this.reports.filter((r) => {
      const matchDept = !departmentId || departmentId === "all" || r.department_id === departmentId;
      const matchQuery =
        !query ||
        r.report_code.toLowerCase().includes(query.toLowerCase()) ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        (r.asset_code && r.asset_code.toLowerCase().includes(query.toLowerCase())) ||
        r.address.toLowerCase().includes(query.toLowerCase());
      return matchDept && matchQuery;
    });
  }

  getReportById(id: string): ReportRecord | undefined {
    return this.reports.find((r) => r.id === id || r.report_code === id);
  }

  getTasks(departmentId?: string, query?: string): TaskRecord[] {
    return this.tasks.filter((t) => {
      const matchDept = !departmentId || departmentId === "all" || t.department_id === departmentId;
      const matchQuery =
        !query ||
        t.task_code.toLowerCase().includes(query.toLowerCase()) ||
        t.asset_code.toLowerCase().includes(query.toLowerCase()) ||
        t.assigned_worker_name.toLowerCase().includes(query.toLowerCase());
      return matchDept && matchQuery;
    });
  }

  getTaskById(id: string): TaskRecord | undefined {
    return this.tasks.find((t) => t.id === id || t.task_code === id);
  }

  getExtensions(departmentId?: string): ExtensionRecord[] {
    const list: ExtensionRecord[] = [];
    this.tasks.forEach((t) => {
      t.extensions.forEach((e) => {
        if (!departmentId || departmentId === "all" || e.department_id === departmentId) {
          list.push(e);
        }
      });
    });
    return list;
  }

  getStaffContractors(departmentId?: string): StaffContractorRecord[] {
    return this.staffContractors.filter((sc) => {
      return !departmentId || departmentId === "all" || sc.department_id === departmentId;
    });
  }

  getAuditLogs(): AuditLogRecord[] {
    return [...this.auditLogs];
  }

  // Mutations
  registerAsset(
    newAssetData: Omit<AssetRecord, "id" | "registered_at" | "updated_at" | "active_reports_count">
  ): AssetRecord {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    const newId = `asset-${newAssetData.asset_code.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;
    const newRecord: AssetRecord = {
      ...newAssetData,
      id: newId,
      registered_at: now,
      updated_at: now,
      active_reports_count: 0,
    };

    this.assets = [newRecord, ...this.assets];

    const newLog: AuditLogRecord = {
      id: `audit-${Date.now()}`,
      timestamp: now,
      officer_name: newAssetData.registered_by || "Municipality Admin",
      officer_role: "Infrastructure Officer",
      department_name: newAssetData.department_name,
      action_type: "ASSET_REGISTERED",
      target_entity_type: "ASSET",
      target_code: newAssetData.asset_code,
      summary: `Registered new ${newAssetData.asset_type_label} (${newAssetData.asset_code})`,
      details: `Location: ${newAssetData.address}. Status: ${newAssetData.status}, Condition: ${newAssetData.condition}.`,
    };
    this.auditLogs = [newLog, ...this.auditLogs];

    return newRecord;
  }

  acceptReport(
    reportId: string,
    data: {
      priority: ReportRecord["priority"];
      assignedWorkerId: string;
      deadlineDate: string;
      workDescription: string;
      internalNote: string;
    }
  ): TaskRecord | null {
    const report = this.reports.find((r) => r.id === reportId);
    if (!report) return null;

    const worker = this.staffContractors.find((w) => w.id === data.assignedWorkerId);
    const workerName = worker ? worker.name : "Assigned Field Officer";
    const isContractor = worker ? worker.is_contractor : false;
    const contractorCompany = worker?.contractor_company_name;

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    const taskId = `task-${Date.now()}`;
    const taskCode = `TSK-${report.asset_code || "GEN"}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTask: TaskRecord = {
      id: taskId,
      task_code: taskCode,
      report_id: report.id,
      report_code: report.report_code,
      asset_id: report.asset_id || "unlinked",
      asset_code: report.asset_code || "N/A",
      asset_type_label: report.asset_type_label || "General Infrastructure",
      department_id: report.department_id,
      department_name: report.department_name,
      assigned_worker_id: data.assignedWorkerId,
      assigned_worker_name: workerName,
      is_contractor: isContractor,
      contractor_company: contractorCompany,
      work_description: data.workDescription,
      internal_note: data.internalNote,
      priority: data.priority,
      status: "ASSIGNED",
      progress_percentage: 0,
      created_at: now,
      deadline_date: data.deadlineDate,
      original_deadline_date: data.deadlineDate,
      is_overdue: false,
      days_overdue: 0,
      progress_notes: [
        {
          timestamp: now,
          author: "System Dispatcher",
          note: `Report accepted and assigned to ${workerName}. Initial deadline: ${data.deadlineDate}.`,
          percentage: 0,
        },
      ],
      extensions: [],
    };

    this.tasks = [newTask, ...this.tasks];

    this.reports = this.reports.map((r) =>
      r.id === reportId
        ? {
            ...r,
            status: "ACCEPTED",
            priority: data.priority,
            linked_task_id: taskId,
          }
        : r
    );

    const newLog: AuditLogRecord = {
      id: `audit-${Date.now()}`,
      timestamp: now,
      officer_name: "Operations Officer",
      officer_role: "Dispatcher",
      department_name: report.department_name,
      action_type: "REPORT_ACCEPTED",
      target_entity_type: "REPORT",
      target_code: report.report_code,
      summary: `Accepted report ${report.report_code} and created task ${taskCode}`,
      details: `Assigned to: ${workerName}. Priority: ${data.priority}. Deadline: ${data.deadlineDate}.`,
    };
    this.auditLogs = [newLog, ...this.auditLogs];

    return newTask;
  }

  updateTaskProgress(
    taskId: string,
    data: {
      progressPercentage: number;
      newStatus: TaskRecord["status"];
      progressNote: string;
      authorName: string;
    }
  ): TaskRecord | null {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    let updatedTask: TaskRecord | null = null;

    this.tasks = this.tasks.map((t) => {
      if (t.id === taskId) {
        updatedTask = {
          ...t,
          status: data.newStatus,
          progress_percentage: data.progressPercentage,
          progress_notes: [
            ...t.progress_notes,
            {
              timestamp: now,
              author: data.authorName,
              note: data.progressNote,
              percentage: data.progressPercentage,
            },
          ],
        };
        return updatedTask;
      }
      return t;
    });

    if (updatedTask) {
      const currentTask = updatedTask as TaskRecord;
      if (data.newStatus === "IN_PROGRESS") {
        this.reports = this.reports.map((r) =>
          r.id === currentTask.report_id ? { ...r, status: "IN_PROGRESS" } : r
        );
      }

      const newLog: AuditLogRecord = {
        id: `audit-${Date.now()}`,
        timestamp: now,
        officer_name: data.authorName,
        officer_role: "Field Technician",
        department_name: currentTask.department_name,
        action_type: "TASK_PROGRESS_UPDATED",
        target_entity_type: "TASK",
        target_code: currentTask.task_code,
        summary: `Progress updated to ${data.progressPercentage}% (${data.newStatus})`,
        details: `Note: ${data.progressNote}`,
      };
      this.auditLogs = [newLog, ...this.auditLogs];
    }

    return updatedTask;
  }

  submitTaskCompletion(
    taskId: string,
    data: {
      completionNotes: string;
      completionDate: string;
      beforePhotos: string[];
      afterPhotos: string[];
      submittedBy: string;
    }
  ): TaskRecord | null {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    let updatedTask: TaskRecord | null = null;

    this.tasks = this.tasks.map((t) => {
      if (t.id === taskId) {
        updatedTask = {
          ...t,
          status: "COMPLETED_PENDING_VERIFICATION",
          progress_percentage: 100,
          completion_submission: {
            completion_date: data.completionDate,
            completion_notes: data.completionNotes,
            before_photos: data.beforePhotos,
            after_photos: data.afterPhotos,
            submitted_by: data.submittedBy,
          },
          progress_notes: [
            ...t.progress_notes,
            {
              timestamp: now,
              author: data.submittedBy,
              note: `Submitted for officer verification: ${data.completionNotes}`,
              percentage: 100,
            },
          ],
        };
        return updatedTask;
      }
      return t;
    });

    if (updatedTask) {
      const currentTask = updatedTask as TaskRecord;
      this.reports = this.reports.map((r) =>
        r.id === currentTask.report_id ? { ...r, status: "COMPLETED_PENDING_VERIFICATION" } : r
      );

      const newLog: AuditLogRecord = {
        id: `audit-${Date.now()}`,
        timestamp: now,
        officer_name: data.submittedBy,
        officer_role: "Contractor Lead / Technician",
        department_name: currentTask.department_name,
        action_type: "TASK_COMPLETION_SUBMITTED",
        target_entity_type: "TASK",
        target_code: currentTask.task_code,
        summary: `Task completed and submitted for verification`,
        details: `Notes: ${data.completionNotes}. Awaiting verification.`,
      };
      this.auditLogs = [newLog, ...this.auditLogs];
    }

    return updatedTask;
  }

  requestDeadlineExtension(
    taskId: string,
    data: {
      requestedNewDeadline: string;
      reasonCategory: ExtensionRecord["reason_category"];
      detailedExplanation: string;
      supportingEvidenceNote: string;
      requestedBy: string;
    }
  ): ExtensionRecord | null {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    const newExt: ExtensionRecord = {
      id: `ext-${Date.now()}`,
      task_id: task.id,
      task_code: task.task_code,
      report_code: task.report_code,
      asset_code: task.asset_code,
      department_id: task.department_id,
      original_deadline: task.deadline_date,
      requested_new_deadline: data.requestedNewDeadline,
      reason_category: data.reasonCategory,
      detailed_explanation: data.detailedExplanation,
      supporting_evidence_note: data.supportingEvidenceNote,
      requested_by: data.requestedBy,
      requested_at: now,
      status: "PENDING",
    };

    this.tasks = this.tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          extensions: [...t.extensions, newExt],
        };
      }
      return t;
    });

    const newLog: AuditLogRecord = {
      id: `audit-${Date.now()}`,
      timestamp: now,
      officer_name: data.requestedBy,
      officer_role: "Lead Technician / Contractor",
      department_name: task.department_name,
      action_type: "EXTENSION_REQUESTED",
      target_entity_type: "EXTENSION",
      target_code: task.task_code,
      summary: `Requested extension to ${data.requestedNewDeadline}`,
      details: `Reason: ${data.reasonCategory}.`,
    };
    this.auditLogs = [newLog, ...this.auditLogs];

    return newExt;
  }

  decideExtension(
    extensionId: string,
    data: {
      approve: boolean;
      decidedBy: string;
      decisionComment?: string;
    }
  ): boolean {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    let targetTaskCode = "";
    let targetDept = "";
    let newDate = "";

    this.tasks = this.tasks.map((t) => {
      const ext = t.extensions.find((e) => e.id === extensionId);
      if (ext) {
        targetTaskCode = t.task_code;
        targetDept = t.department_name;
        newDate = ext.requested_new_deadline;

        const updatedExtensions = t.extensions.map((e) =>
          e.id === extensionId
            ? {
                ...e,
                status: (data.approve ? "APPROVED" : "REJECTED") as ExtensionRecord["status"],
                decision_date: now,
                decided_by: data.decidedBy,
                decision_comment: data.decisionComment,
              }
            : e
        );

        return {
          ...t,
          deadline_date: data.approve ? ext.requested_new_deadline : t.deadline_date,
          is_overdue: data.approve ? false : t.is_overdue,
          extensions: updatedExtensions,
        };
      }
      return t;
    });

    const newLog: AuditLogRecord = {
      id: `audit-${Date.now()}`,
      timestamp: now,
      officer_name: data.decidedBy,
      officer_role: "Department Officer / Administrator",
      department_name: targetDept || "Operations",
      action_type: data.approve ? "EXTENSION_APPROVED" : "EXTENSION_REJECTED",
      target_entity_type: "EXTENSION",
      target_code: targetTaskCode,
      summary: data.approve
        ? `Approved deadline extension for ${targetTaskCode} to ${newDate}`
        : `Rejected deadline extension request for ${targetTaskCode}`,
      details: data.decisionComment ? `Comment: ${data.decisionComment}` : "Reviewed and decided.",
    };
    this.auditLogs = [newLog, ...this.auditLogs];

    return true;
  }

  verifyAndResolveTask(
    taskId: string,
    data: {
      officerName: string;
      resolutionNotes: string;
    }
  ): boolean {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return false;

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);

    this.tasks = this.tasks.map((t) =>
      t.id === taskId ? { ...t, status: "RESOLVED", is_overdue: false } : t
    );

    this.reports = this.reports.map((r) =>
      r.id === task.report_id
        ? {
            ...r,
            status: "RESOLVED",
            resolution_notes: data.resolutionNotes,
            resolved_at: now,
          }
        : r
    );

    this.assets = this.assets.map((a) =>
      a.id === task.asset_id
        ? {
            ...a,
            status: "ACTIVE",
            condition: "GOOD",
            active_reports_count: Math.max(0, a.active_reports_count - 1),
          }
        : a
    );

    const newLog: AuditLogRecord = {
      id: `audit-${Date.now()}`,
      timestamp: now,
      officer_name: data.officerName,
      officer_role: "Department Officer",
      department_name: task.department_name,
      action_type: "TASK_VERIFIED_RESOLVED",
      target_entity_type: "TASK",
      target_code: task.task_code,
      summary: `Verified work and marked report ${task.report_code} RESOLVED`,
      details: `Resolution verification notes: ${data.resolutionNotes}`,
    };
    this.auditLogs = [newLog, ...this.auditLogs];

    return true;
  }

  returnOrRejectTask(
    taskId: string,
    data: {
      officerName: string;
      reason: string;
      requiredCorrection: string;
      newExpectedDate: string;
    }
  ): boolean {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return false;

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);

    this.tasks = this.tasks.map((t) => {
      if (t.id === taskId) {
        const newRejection = {
          timestamp: now,
          rejected_by: data.officerName,
          reason: data.reason,
          required_correction: data.requiredCorrection,
          new_expected_date: data.newExpectedDate,
        };
        return {
          ...t,
          status: "RETURNED",
          deadline_date: data.newExpectedDate,
          rejection_history: [...(t.rejection_history || []), newRejection],
          progress_notes: [
            ...t.progress_notes,
            {
              timestamp: now,
              author: data.officerName,
              note: `RETURNED / REJECTED: ${data.reason}. Correction needed: ${data.requiredCorrection}`,
              percentage: 70,
            },
          ],
        };
      }
      return t;
    });

    this.reports = this.reports.map((r) =>
      r.id === task.report_id ? { ...r, status: "IN_PROGRESS" } : r
    );

    const newLog: AuditLogRecord = {
      id: `audit-${Date.now()}`,
      timestamp: now,
      officer_name: data.officerName,
      officer_role: "Quality Inspector",
      department_name: task.department_name,
      action_type: "TASK_RETURNED_REJECTED",
      target_entity_type: "TASK",
      target_code: task.task_code,
      summary: `Returned task for required correction: ${data.reason}`,
      details: `Required fix: ${data.requiredCorrection}. New target date: ${data.newExpectedDate}`,
    };
    this.auditLogs = [newLog, ...this.auditLogs];

    return true;
  }

  linkAssetToReport(reportId: string, assetId: string): boolean {
    const targetAsset = this.assets.find((a) => a.id === assetId);
    if (!targetAsset) return false;

    this.reports = this.reports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          asset_id: targetAsset.id,
          asset_code: targetAsset.asset_code,
          asset_type_label: targetAsset.asset_type_label,
          department_id: targetAsset.department_id,
          department_name: targetAsset.department_name,
        };
      }
      return r;
    });

    this.assets = this.assets.map((a) =>
      a.id === assetId ? { ...a, active_reports_count: a.active_reports_count + 1 } : a
    );

    return true;
  }

  addStaffContractor(
    newStaffData: Omit<StaffContractorRecord, "id" | "active_tasks_count" | "completed_tasks_count" | "overdue_tasks_count">
  ): StaffContractorRecord {
    const newId = `sc-${Date.now()}`;
    const newRecord: StaffContractorRecord = {
      ...newStaffData,
      id: newId,
      active_tasks_count: 0,
      completed_tasks_count: 0,
      overdue_tasks_count: 0,
    };
    this.staffContractors = [...this.staffContractors, newRecord];
    return newRecord;
  }
}

// Global singleton instance for local preview/development state
export const mockDataStore = new MockDataStore();
