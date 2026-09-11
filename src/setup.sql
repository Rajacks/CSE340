-- ============================================
-- ORGANIZATIONS
-- ============================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (
    organization_id,
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
    (
        1,
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        2,
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        3,
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );


-- ============================================
-- PROJECTS
-- ============================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

INSERT INTO projects (
    project_id,
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
    (
        1,
        1,
        'Community Center Renovation',
        'Renovate a local community center with sustainable materials and improved facilities.',
        'Bacolod City',
        '2026-09-15'
    ),
    (
        2,
        1,
        'Safe Homes Initiative',
        'Build and repair safe homes for families in underserved communities.',
        'Talisay City',
        '2026-09-22'
    ),
    (
        3,
        1,
        'Green School Construction',
        'Develop environmentally friendly learning spaces for local students.',
        'Silay City',
        '2026-10-05'
    ),
    (
        4,
        1,
        'Community Road Improvement',
        'Improve local roads to provide safer transportation for residents.',
        'Bago City',
        '2026-10-12'
    ),
    (
        5,
        1,
        'Public Park Development',
        'Create a sustainable public park with recreational facilities for families.',
        'Bacolod City',
        '2026-10-20'
    ),
    (
        6,
        2,
        'Urban Garden Project',
        'Establish community gardens to increase access to fresh local produce.',
        'Bacolod City',
        '2026-09-18'
    ),
    (
        7,
        2,
        'School Farming Program',
        'Teach students sustainable farming techniques through hands-on activities.',
        'Talisay City',
        '2026-09-25'
    ),
    (
        8,
        2,
        'Community Composting Program',
        'Create neighborhood composting stations to reduce organic waste.',
        'Silay City',
        '2026-10-03'
    ),
    (
        9,
        2,
        'Rooftop Garden Initiative',
        'Develop productive rooftop gardens for urban communities.',
        'Bacolod City',
        '2026-10-10'
    ),
    (
        10,
        2,
        'Farmers Education Workshop',
        'Provide workshops on sustainable agriculture and food production.',
        'Bago City',
        '2026-10-18'
    ),
    (
        11,
        3,
        'Neighborhood Cleanup Drive',
        'Organize volunteers to clean public spaces and residential areas.',
        'Bacolod City',
        '2026-09-20'
    ),
    (
        12,
        3,
        'Charity Food Distribution',
        'Distribute food packages to families experiencing food insecurity.',
        'Talisay City',
        '2026-09-28'
    ),
    (
        13,
        3,
        'Senior Community Support',
        'Provide volunteer assistance and companionship to senior citizens.',
        'Silay City',
        '2026-10-06'
    ),
    (
        14,
        3,
        'Youth Volunteer Program',
        'Engage young people in community service and volunteer activities.',
        'Bacolod City',
        '2026-10-15'
    ),
    (
        15,
        3,
        'Disaster Preparedness Outreach',
        'Educate communities about emergency preparedness and disaster response.',
        'Bago City',
        '2026-10-25'
    );


-- ============================================
-- CATEGORIES
-- ============================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO category (
    category_id,
    name
)
VALUES
    (1, 'Construction & Infrastructure'),
    (2, 'Environment & Sustainability'),
    (3, 'Community & Social Support');


-- ============================================
-- PROJECT-CATEGORY RELATIONSHIP
-- ============================================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT pk_project_category
        PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects (project_id),

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
);

INSERT INTO project_category (
    project_id,
    category_id
)
VALUES
    -- Construction & Infrastructure
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),

    -- Environment & Sustainability
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 2),
    (10, 2),

    -- Community & Social Support
    (11, 3),
    (12, 3),
    (13, 3),
    (14, 3),
    (15, 3),

    -- Additional category relationships
    (5, 3),
    (11, 2),
    (15, 2);