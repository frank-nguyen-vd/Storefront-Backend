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

Start postgresql service by `docker-compose up -d`

### Step 4

Install dependencies by `npm install`

### Step 5

Set up database by `npx db-migrate up`

### Step 6

Running Web API by `npm start`

List of APIs are described in [here](REQUIREMENTS.md)
