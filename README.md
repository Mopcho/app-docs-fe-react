# MopDocs ( Frontend )

## Live Demo - https://mopdocs.xyz/active/image
NOTE : Demo may be down if Im doing some changes, try again later if it is down !

## Technologies Used

- React
- React Query
- Tailwind
- HTML/CSS
- Vite

## Setup

The setup is simple. You just have to create a .env file in the root directory and add this field in there :

```
VITE_SERVICE_HOST=http://{backend_host}:{backend_port}/api
```

Replace `backend_host` with the host of your backend. For example : localhost

Replace `backend_port` with the port of your backend. For example : 8080

NOTE: If you haven't changed the default config of the backend and you are running the default docker-compose.yml file you can just copy-paste this :

```
VITE_SERVICE_HOST=http://localhost:8080/api
```

## Running the app

First install all the dependancies, type this:

```
npm i
```

After that simply run this: 

```
npm run dev
```

