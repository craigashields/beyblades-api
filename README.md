
<div align="center">

![beyblade-banner](./public/static/images/banner.jpeg)
  <h1>Beyblade API</h1>
  
  <p>
    A RESTful API for Beyblades, providing access to information about various Beyblades, their product information, parts and other related data
  </p>

<!-- Badges -->
<p>
<a href="https://github.com/craigashields/beyblade-api/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/craigashields/beyblade-api" alt="contributors" />
</a>
<a href="">
    <img src="https://img.shields.io/github/last-commit/craigashields/beyblade-api" alt="last update" />
</a>
<a href="https://github.com/craigashields/beyblade-api/network/members">
    <img src="https://img.shields.io/github/forks/craigashields/beyblade-api" alt="forks" />
</a>
<a href="https://github.com/craigashields/beyblade-api/stargazers">
    <img src="https://img.shields.io/github/stars/craigashields/beyblade-api" alt="stars" />
</a>
<a href="https://github.com/craigashields/beyblade-api/issues/">
    <img src="https://img.shields.io/github/issues/craigashields/beyblade-api" alt="open issues" />
</a>
</p>  
<h4>
    <a href="https://github.com/craigashields/beyblade-api/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/craigashields/beyblade-api">Documentation</a>
  <span> · </span>
    <a href="https://github.com/craigashields/beyblade-api/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/craigashields/beyblade-api/issues/">Request Feature</a>
  </h4>
</div>


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Tech Stack](#tech-stack)

## Installation

### Clone Repo

To install and set up the project, follow these steps:

1. Clone the repository: 

    ```
    git clone [repository url]
    ```

2. Navigate to the project directory: cd [project directory]
3. Install dependencies: 
    
    ```
    npm install
    ```

### Setup PlanetScale

Now that the basics are done, you'll need to configure your planetscale db

1. Create `.env` file in the root directory (make sure this file is included in your `.gitignore` file)
2. Create a [PlanetScale account](https://auth.planetscale.com/sign-in)
3. Create a new Database
4. In the Dashboard, select `Branches` from the menu 
5. You'll automatically have the `main` branch. Select this branch
6. On the right-hand side, click the `Connect` button, this will open a dialog, showing connection strings
7. From the `Connect with` dropdown, select `Prisma` 
8. Copy the connection string and paste it into your `.env` file

Next, you'll need to create the database table using Prisma. The Schema for the database table is in the `prisma` directory under the filename `schema.prisma`

1. Open the Terminal (information below assumes VS Code)
2. Run the following command

    ```
    npx prisma db push
    ```

    This will push the schema to the database, resulting in a new table.

### Seed database table

You'll need to seed you're new database table. To do this, the script `seed.ts` can be used in the `prisma` directory. Run the following command in the Terminal

    ```
    npx prisma db seed
    ```

If you need to cleardown the database table for any reason, you can run the following

    ```
    npm run cleardown
    ```

## Usage

Once you are all setup run:

    ```
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000/) in your browser and you'll see the default homepage. To test the API, open your API client of choice, Postman, RapidAPI, ThunderClient etc and try one of the routes.

- GET All Beyblades
    - URL: http://localhost:3000/api/v1/beyblades 
    - Query String Parameters (all optional)
        - limit: Limits the number of records that will be returned e.g. `?limit=5`
        - offset: Skips the number of records specified e.g. `?offset=5`

- GET Beyblade by Id
    - URL: http://localhost:3000/api/v1/beyblades/{id}    

## Contributing

All contributions are welcome, whether it's documentation, new endpoints, performance improvements, bug fixes etc

Please visit the [repo issues](https://github.com/craigashields/beyblade-api/issues) before you submit a pull request or raise an issue, as something may already be inflight. 

1. Fork the repository: Click the "Fork" button on the top right corner of the repository page.
2. Create a new branch: git checkout -b [new branch name]
3. Make your changes and commit them: git commit -m "your commit message"
4. Push to the branch: git push origin [new branch name]
5. Submit a pull request: Click the "New pull request" button on the repository page and follow the instructions.

## License

[MIT](https://github.com/craigashields/beyblade-api/blob/master/LICENSE) © [Craig Shields](https://github.com/craigashields)

## Tech Stack

- [PlanetScale](https://planetscale.com/)
- [Tailwind CSS](https://tailwindcss.com)
- [Next.js](https://nextjs.org)
- [Vercel](https://vercel.com)
- [Prisma](https://www.prisma.io/)