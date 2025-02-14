# Smart Farm Project 🌱

## Overview

Smart Farm is an innovative agricultural management system that leverages artificial intelligence, robotics, and IoT to optimize crop cultivation in both multi-span greenhouses and open fields in Algeria. Developed in collaboration with CDTA (Centre de Développement des Technologies Avancées), this project focuses on real-time plant disease detection, environmental monitoring, and seamless robotics integration for crops such as tomatoes and potatoes.

## Technology Stack

### Backend

- **Framework:** FastAPI
- **Database:** SQLite/MySQL/PostgreSQL (managed with SQLAlchemy and Alembic)
- **API:** REST and GraphQL
- **Authentication:** JWT Authentication
- **Tools:** Pydantic, Alembic for database migrations

### Frontend

- **Framework:** React with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS and Shadcn/ui
- **REST:** Axios
- **GraphQL Client:** Apollo Client

## Repository Structure

```
Smart-Farm
    ├── .dist
    ├── .env
    ├── .gitignore
    ├── CONTRIBUTING.md
    ├── LICENSE
    ├── README.md
    ├── backend
    │   ├── .dist
    │   ├── README.md
    │   ├── alembic              # Database migrations
    │   │   ├── README
    │   │   ├── env.py
    │   │   ├── script.py.mako
    │   │   └── versions
    │   │       ├── 28002713e436_init.py
    │   │       └── c8bad824e9aa_add_care_instructions_and_watering_.py
    │   ├── alembic.ini
    │   ├── app
    │   │   ├── __init__.py
    │   │   ├── api               # API endpoints and GraphQL schema
    │   │   │   ├── __init__.py
    │   │   │   ├── api.py
    │   │   │   ├── graphql
    │   │   │   │   └── schema.py
    │   │   │   └── v1
    │   │   │       └── endpoints
    │   │   │           └── auth.py
    │   │   ├── core              # Core configuration and security
    │   │   │   ├── __init__.py
    │   │   │   ├── config.py
    │   │   │   └── security.py
    │   │   ├── db                # Database initialization and sessions
    │   │   │   ├── __init__.py
    │   │   │   ├── base.py
    │   │   │   ├── init_db.py    # Run this script to initialize the database (smart_farm.db)
    │   │   │   └── session.py
    │   │   ├── main.py           # Application entry point
    │   │   ├── models            # SQLAlchemy models
    │   │   │   ├── __init__.py
    │   │   │   ├── disease.py
    │   │   │   ├── measurement.py
    │   │   │   ├── plant.py
    │   │   │   └── user.py
    │   │   ├── schemas           # Pydantic schemas
    │   │   │   ├── __init__.py
    │   │   │   ├── disease.py
    │   │   │   ├── measurement.py
    │   │   │   ├── plant.py
    │   │   │   └── user.py
    │   │   └── services          # Business logic services
    │   │       ├── auth_service.py
    │   │       └── plant_service.py
    │   ├── requirements.txt
    └── frontend
        ├── .gitignore
        ├── README.md
        ├── components.json
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── public
        │   └── robots.txt
        ├── src
        │   ├── App.tsx
        │   ├── api             # Axios API calls
        │   │   ├── auth.ts
        │   │   └── axios.ts
        │   ├── apollo          # Apollo Client configuration
        │   │   └── client.ts
        │   ├── components      # Reusable UI components and features
        │   │   ├── auth
        │   │   │   ├── LoginForm.tsx
        │   │   │   └── RegisterForm.tsx
        │   │   ├── diseases
        │   │   │   ├── AddDiseaseForm.tsx
        │   │   │   └── DiseaseList.tsx
        │   │   ├── layout
        │   │   │   ├── Header.tsx
        │   │   │   ├── Layout.tsx
        │   │   │   └── Sidebar.tsx
        │   │   ├── measurements
        │   │   │   ├── MeasurementChart.tsx
        │   │   │   ├── MeasurementForm.tsx
        │   │   │   └── MeasurementList.tsx
        │   │   ├── plants
        │   │   │   ├── AddPlantForm.tsx
        │   │   │   ├── PlantCard.tsx
        │   │   │   ├── PlantDetails.tsx
        │   │   │   ├── PlantDetailsModal.tsx
        │   │   │   ├── PlantList.tsx
        │   │   │   └── PlantMeasurements.tsx
        │   │   └── ui
        │   │       ├── badge.tsx
        │   │       ├── button.tsx
        │   │       ├── card.tsx
        │   │       ├── dialog.tsx
        │   │       ├── input.tsx
        │   │       ├── select.tsx
        │   │       ├── table.tsx
        │   │       └── use-toast.tsx
        │   ├── contexts         # Global state and authentication contexts
        │   │   └── AuthContext.tsx
        │   ├── hooks            # Custom hooks for GraphQL operations and API calls
        │   │   ├── useAddDiseaseGraphQL.ts
        │   │   ├── useAddMeasurementGraphQL.ts
        │   │   ├── useAddPlantGraphQL.ts
        │   │   ├── useAllPlantsGraphQL.ts
        │   │   ├── useAuth.ts
        │   │   ├── useDeleteDiseaseGraphQL.ts
        │   │   ├── useDeleteMeasurementGraphQL.ts
        │   │   ├── useDeletePlantGraphQL.ts
        │   │   ├── usePlantsGraphQL.ts
        │   │   ├── useUpdateDiseaseGraphQL.ts
        │   │   ├── useUpdateMeasurementGraphQL.ts
        │   │   └── useUpdatePlantGraphQL.ts
        │   ├── lib              # Utility functions and helpers
        │   │   └── utils.ts
        │   ├── main.tsx         # Frontend application entry point
        │   ├── pages            # Page components for routing
        │   │   ├── auth
        │   │   │   ├── Login.tsx
        │   │   │   └── Register.tsx
        │   │   ├── dashboard
        │   │   │   └── Dashboard.tsx
        │   │   ├── myplants
        │   │   │   └── MyPlants.tsx
        │   │   └── settings
        │   │       └── Settings.tsx
        │   ├── styles           # Global styles (Tailwind CSS)
        │   │   └── globals.css
        │   ├── types            # TypeScript definitions
        │   │   ├── auth.ts
        │   │   ├── disease.ts
        │   │   ├── measurement.ts
        │   │   └── plant.ts
        │   └── vite-env.d.ts
        ├── tailwind.config.js
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        └── vite.config.ts
```

## Installation

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/moxer-mmh/Smart-Farm.git
   cd Smart-Farm/backend
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   # On Linux/macOS:
   source venv/bin/activate
   # On Windows:
   .\venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Then edit .env with your configurations
   ```

5. **Initialize the Database:**

   > **Note:** The file `smart_farm.db` is not provided. You must initialize the database by running:
   >
   > ```bash
   > python -m app.db.init_db
   > ```

6. **Run Database Migrations:**

   ```bash
   alembic upgrade head
   ```

7. **Start the Backend Server:**

   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend Development Server:**

   ```bash
   npm run dev
   ```

   The frontend server will typically run on [http://localhost:5173](http://localhost:5173) (or on another port specified in your project configuration).

## API Documentation

Once the backend server is running, you can access the API documentation via:

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the terms of the [LICENSE](LICENSE).
