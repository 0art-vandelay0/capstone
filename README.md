### Research & Planning Log

#### Wednesday 9/13/2023

-   6p: Build out Mongo DB
-   8p: Test Python venv with React front end calls
-   9:30p: Create Google Cloud API account for API key
-   10:30: Test MAP

#### Thursday 9/14/2023

-   12a: Code db calls and mark on map

#### Friday 9/15/2023

-   12p: research Python + React marriage
-   12:45a: research Google Map API
-   1:30p: start to commit necessary code files written over the last two days
-   2p: Research 'git reset' to undo recent commmits and hide sensitive files
-   3p: Debugging, map is mounting twice in paretn container. Used `console.log("Component Mounted");` to confirm yes.
-   3:45: Having trouble getting all python libraries to work on a single shared interpreter. Defaulted to 3.9 out of ease of use.
-   4p: research Twilio and use-cases
-   4:40: encountering Twilio username error

        POST /Accounts/your_twilio_account_sid/Messages.json
        Twilio returned the following information:
        Unable to create record: Authentication Error - invalid username
        More information may be available here:
        https://www.twilio.com/docs/errors/20003

-   4:55p: Finally got .env variables to read but still unsuccessful POST sms. Need to figure out passing body, to, from

        Body: None, To: None, From: None
