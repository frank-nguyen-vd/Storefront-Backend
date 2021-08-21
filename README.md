# GETTING STARTED

### STEP 1

Install Docker from https://docs.docker.com/get-docker/

### STEP 2

Create an `.env` file in project folder with content

```bash
PEPPER=pepper
SALT_ROUNDS=10
TOKEN_SECRET=token-secret
SECRET_USER=admin
SECRET_PASS=secret
```

### STEP 3

Start database postgresql service by `docker-compose up -d`

Database runs on port 5432

### Step 4

Install dependencies by `npm install`

### Step 5

Set up database by `npx db-migrate up`

### Step 6

Run tests by `npm run test`

### Step 7

Running Web API by `npm start`

Web API runs on port 5000

List of APIs are described in [here](REQUIREMENTS.md)
