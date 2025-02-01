# Smart Farm Project 🌱

## Description

Smart Farm is an innovative agricultural management system that leverages artificial intelligence and robotics for optimizing crop cultivation in multi-span greenhouses and open fields in Algeria. The project is developed in collaboration with CDTA (Centre de Développement des Technologies Avancées) and focuses on tomato and potato crops monitoring using advanced technologies.

## Features

* 🔍 Real-time plant disease detection
* 📊 Environmental measurements monitoring
* 🤖 Integration with agricultural robotics
* 🌡️ Climate control in multi-span greenhouses
* 🔐 Secure user authentication and authorization
* 📱 GraphQL API for flexible data queries

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy & Alembic
* Pydantic
* JWT Authentication
* GraphQL
* SQLite/MySQL/PostgreSQL

## Project Structure

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1"></div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code><span><span>backend/
</span></span><span>├── alembic/          # Database migrations
</span><span>├── app/
</span><span>│   ├── api/          # API endpoints and GraphQL schema
</span><span>│   ├── core/         # Core configurations
</span><span>│   ├── db/           # Database setup and sessions
</span><span>│   ├── models/       # SQLAlchemy models
</span><span>│   ├── schemas/      # Pydantic schemas
</span><span>│   ├── services/     # Business logic
</span><span>│   └── main.py       # Application entry point
</span><span>└── requirements.txt  # Project dependencies</span></code></div></div></div></pre>

## Installation

1. Clone the repository

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1">bash</div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code class="language-bash"><span><span class="token">git</span><span> clone https://github.com/your-username/smart-farm.git
</span></span><span><span></span><span class="token">cd</span><span> smart-farm/backend</span></span></code></div></div></div></pre>

2. Create and activate virtual environment

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1">bash</div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code class="language-bash"><span><span>python -m venv venv
</span></span><span><span></span><span class="token">source</span><span> venv/bin/activate  </span><span class="token"># Linux/macOS</span><span>
</span></span><span><span></span><span class="token"># or</span><span>
</span></span><span><span>.</span><span class="token">\</span><span>venv</span><span class="token">\</span><span>Scripts</span><span class="token">\</span><span>activate  </span><span class="token"># Windows</span></span></code></div></div></div></pre>

3. Install dependencies

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1">bash</div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code class="language-bash"><span><span>pip </span><span class="token">install</span><span> -r requirements.txt</span></span></code></div></div></div></pre>

4. Set up environment variables

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1">bash</div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code class="language-bash"><span><span class="token">cp</span><span> .env.example .env
</span></span><span><span></span><span class="token"># Edit .env with your configurations</span></span></code></div></div></div></pre>

5. Run database migrations

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1">bash</div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code class="language-bash"><span><span>alembic upgrade </span><span class="token">head</span></span></code></div></div></div></pre>

6. Start the server

<pre><div class="relative flex flex-col rounded-lg" bis_skin_checked="1"><div class="text-text-300 absolute pl-3 pt-2.5 text-xs" bis_skin_checked="1">bash</div><div class="pointer-events-none sticky my-0.5 ml-0.5 flex items-center justify-end px-1.5 py-1 mix-blend-luminosity top-0" bis_skin_checked="1"><div class="from-bg-300/90 to-bg-300/70 pointer-events-auto rounded-md bg-gradient-to-b p-0.5 backdrop-blur-md" bis_skin_checked="1"><button class="flex flex-row items-center gap-1 rounded-md p-1 py-0.5 text-xs transition-opacity delay-100 hover:bg-bg-200 opacity-60 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="text-text-500 mr-px -translate-y-[0.5px]"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><span class="text-text-200 pr-0.5">Copy</span></button></div></div><div bis_skin_checked="1"><div class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" bis_skin_checked="1"><code class="language-bash"><span><span>uvicorn app.main:app --reload</span></span></code></div></div></div></pre>

## API Documentation

Once the server is running, access the API documentation at:

* Swagger UI: `http://localhost:8000/docs`
* ReDoc: `http://localhost:8000/redoc`
