# Padel Telegram Bot

## Overview

The **Padel Telegram Bot** is a bot designed to help players manage their padel matches. It allows users to register players, update their levels, manage lesson schedules, and find common availability for padel matches. The bot leverages the **Telegraf** library to interact with the Telegram Bot API, and it integrates with a **PostgreSQL** database via **Prisma ORM** for storing player data and availability.

The bot offers various commands that enable players to:

- Register and update their level.
- Add or update their lesson schedule.
- View available players for a specific day or check if a player is available at a specific time.

## Features

- **Registration**: Players can register their username and skill level.
- **Schedule Management**: Players can add or update their padel lesson schedules.
- **Availability**: Players can check their availability for a given day, as well as check the availability of other players.
- **Help Command**: Users can easily get help by typing `/help`, which lists all the available commands and their usage.
- **Error Handling**: The bot provides detailed error messages in case of incorrect usage or issues.

## Technologies

- **Telegraf**: A library to interact with the Telegram Bot API using JavaScript/TypeScript.
- **Prisma ORM**: An ORM used for interacting with a PostgreSQL database. It manages the database schema, migrations, and provides a simple API to interact with the data.
- **PostgreSQL**: A powerful, open-source relational database used to store player and scheduling data.
- **TypeScript**: The bot is built using TypeScript to ensure type safety and better maintainability.

## Setup

### Prerequisites

To get the bot running locally or on a server, ensure you have the following tools installed:

1. **Node.js**: [Install Node.js](https://nodejs.org/en/download/)
2. **PostgreSQL**: [Install PostgreSQL](https://www.postgresql.org/download/)
3. **Git**: [Install Git](https://git-scm.com/)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/EccirilloM/Padel_Bot_Telegram.git
cd Padel_Bot_Telegram
```

### Install Dependencies

Once inside the project directory, install the required dependencies:

```bash
npm install
```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
BOT_TOKEN=your_telegram_bot_token
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database_name
```
- Replace `your_telegram_bot_token` with your bot's token from BotFather.
- Replace `your_user`, `your_password`, and `your_database_name` with the appropriate credentials for your PostgreSQL database.

### Run the Bot

Once you’ve set up the environment variables and installed the dependencies, you can run the bot with the following command:

```bash
npm start
```

