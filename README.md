
# Judge1

Judge1 is a code execution engine that can run C++, JavaScript, and Python code in a containerized manner.

<div align="center">
  <img src="https://raw.githubusercontent.com/AFZL210/image-host/refs/heads/main/judge1-logo.png" alt="Logo">
</div>

## Features

- Sandboxed compilation and execution
- Scalable architecture
- Support for C++, Python and JavaScript (More coming soon!)
- Webhooks (HTTP callbacks)
- Detailed execution results


## Benchmark

Executing 100 codes in 10 seconds. The performance is not very good because of Docker startup time. The system is not suitable for building a problem-solving platform like LeetCode or GitHub but can be used to build contest-based sites like Codeforces and CodeChef.

https://github.com/user-attachments/assets/b9ae7aec-e70e-49d4-8d49-1658e338da98





## Get Started

Judge1 is an experimental code execution engine inspired by Judge0. It is not currently intended for production use, but you can self-host it for small-scale purposes.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - PostgreSQL database connection string

`TOP_SECRET` - JWT Secret (base64 string)

`REDIS_HOST` - Redis server hostname

`REDIS_PORT` - Redis server PORT number

`NODE_ENV` - PROD (Production) or DEV (Development)

`HTTP_SERVER_PORT` - Main server PORT (default - 8080)


## Installation

We recommend using Linux/MacOS or Windows with WSL2 for an easy setup.

- Docker support will be added soon! (Feel free to contribute 😊)


Clone the repository

```bash
  git clone https://github.com/AFZL210/Judge1.git
```

Provide execution permissions to server and worker scripts

```bash
chmod u+x scripts/server.sh
chmod u+x script/worker.sh
```

Run the server and worker

```bash
./scripts/server.sh
./scripts/worker.sh
```

Done! The server will start on port 8080.


    
## Authors

- [@AFZL210](https://www.github.com/AFZL210)

