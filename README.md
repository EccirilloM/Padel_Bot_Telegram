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

### Commands

**/register <username> <level>**  
Registers a new player with a specified username and skill level.

Example:  
`/register @john 3.5`

---

**/update <username> <new level>**  
Updates the skill level of an existing player.

Example:  
`/update @john 4.0`

---

**/addcalendar <username> <schedule>**  
Adds a lesson schedule for a player. You can specify another player's schedule by using their username, or if you omit the username, the schedule will be added for the sender of the command.

Example:  
`/addcalendar @john "Mon 08:00-10:00, Wed 10:00-12:00"`

---

**/updatecalendar <username> <schedule>**  
Updates the lesson schedule for a player. Similar to `/addcalendar`, you can specify a player's username or use the sender's username.

Example:  
`/updatecalendar @john "Mon 08:00-10:00, Fri 14:00-16:00"`

---

**/showplayers <day>**  
Displays all players who are available for padel on the specified day.

Example:  
`/showplayers Monday`

---

**/showplayeron <username> <day>**  
Displays the available time slots for a specific player on the specified day.

Example:  
`/showplayeron @john Monday`

---

**/help**  
Shows a message detailing all available commands and their usage.

Example:  
`/help`

